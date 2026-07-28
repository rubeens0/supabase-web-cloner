import { supabase } from '@/integrations/supabase/client';
import { trackMetaEvent, trackMetaCustom } from '@/lib/metaPixel';

/**
 * Meta Conversions API client helper.
 *
 * Fires both the browser Pixel and the server-side CAPI event with the same
 * `event_id` so Meta deduplicates them. See:
 * https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
 *
 * Enriches every server event with the recommended `user_data` parameters
 * (fbp, fbc, client_user_agent, external_id) to improve Event Match Quality.
 * See:
 * https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
 */

const STANDARD_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Search',
  'AddToCart',
  'AddToWishlist',
  'InitiateCheckout',
  'AddPaymentInfo',
  'Purchase',
  'Lead',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'Schedule',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
]);

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Persistent, first-party visitor id used as Meta `external_id`.
 * Stored in localStorage so a returning visitor keeps the same id, boosting
 * Event Match Quality without any PII.
 */
function getOrCreateExternalId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const key = '_rm_ext_id';
  try {
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = uuid();
      window.localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

/**
 * Meta encodes the click-id as `fb.1.<timestamp_ms>.<fbclid>`.
 * If the visitor arrived from a Meta ad and the `_fbc` cookie is not present
 * yet, we build the value from the URL so CAPI can still attribute the event.
 * Also persists it for the session.
 */
function getFbcFromUrl(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const url = new URL(window.location.href);
    const fbclid = url.searchParams.get('fbclid');
    if (!fbclid) return undefined;
    const stored = window.sessionStorage.getItem('_rm_fbc');
    if (stored) return stored;
    const value = `fb.1.${Date.now()}.${fbclid}`;
    window.sessionStorage.setItem('_rm_fbc', value);
    return value;
  } catch {
    return undefined;
  }
}

export type MetaUserData = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  gender?: 'm' | 'f';
  /** YYYYMMDD */
  dob?: string;
  external_id?: string;
  subscription_id?: string;
};

export type SendMetaEventOptions = {
  eventName: string;
  customData?: Record<string, unknown>;
  userData?: MetaUserData;
  /** Provide to dedupe with an event already fired elsewhere. */
  eventId?: string;
  /** Pixel-only — skip the CAPI call (e.g. for noisy throttled events). */
  pixelOnly?: boolean;
  /** CAPI-only — skip the browser pixel. */
  capiOnly?: boolean;
  /** Route the event to a specific pixel (browser + CAPI). Defaults to the
   *  sitewide pixel configured in the edge function. */
  pixelId?: string;
  /** Meta Test Event code (Events Manager → Test Events). CAPI-only. */
  testEventCode?: string;
};

/**
 * Fires the browser Pixel + server CAPI for a Meta event with a shared event_id.
 * Returns the event_id used (useful for logging / dedup chains).
 */
export async function sendMetaEvent(opts: SendMetaEventOptions): Promise<string> {
  const eventId = opts.eventId ?? uuid();
  const isStandard = STANDARD_EVENTS.has(opts.eventName);

  // 1) Browser pixel with eventID for dedup
  if (!opts.capiOnly) {
    const params = { ...(opts.customData ?? {}), eventID: eventId } as Record<string, unknown>;
    if (isStandard) {
      trackMetaEvent(opts.eventName, params, opts.pixelId);
    } else {
      trackMetaCustom(opts.eventName, params, opts.pixelId);
    }
  }

  // 2) Server-side via edge function — enrich with recommended user_data
  if (!opts.pixelOnly) {
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc') ?? getFbcFromUrl();
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
    const url = typeof window !== 'undefined' ? window.location.href : undefined;
    const externalId = opts.userData?.external_id ?? getOrCreateExternalId();

    const user_data: Record<string, unknown> = { ...(opts.userData ?? {}) };
    if (externalId) user_data.external_id = externalId;
    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;
    if (ua) user_data.client_user_agent = ua;

    try {
      const { error } = await supabase.functions.invoke('meta-capi', {
        body: {
          event_name: opts.eventName,
          event_id: eventId,
          event_source_url: url,
          action_source: 'website',
          custom_data: opts.customData,
          user_data,
          pixel_id: opts.pixelId,
          test_event_code: opts.testEventCode,
        },
      });
      if (error) console.warn('[meta-capi] invoke error', error.message);
    } catch (e) {
      console.warn('[meta-capi] network error', e);
    }
  }

  return eventId;
}
