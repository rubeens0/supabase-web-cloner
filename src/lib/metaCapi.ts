import { supabase } from '@/integrations/supabase/client';
import { trackMetaEvent, trackMetaCustom } from '@/lib/metaPixel';

/**
 * Meta Conversions API client helper.
 *
 * Fires both the browser Pixel and the server-side CAPI event with the same
 * `event_id` so Meta deduplicates them. See:
 * https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
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

export type MetaUserData = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  external_id?: string;
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
      trackMetaEvent(opts.eventName, params);
    } else {
      trackMetaCustom(opts.eventName, params);
    }
  }

  // 2) Server-side via edge function
  if (!opts.pixelOnly) {
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
    const url = typeof window !== 'undefined' ? window.location.href : undefined;

    const user_data: Record<string, unknown> = { ...(opts.userData ?? {}) };
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
        },
      });
      if (error) console.warn('[meta-capi] invoke error', error.message);
    } catch (e) {
      console.warn('[meta-capi] network error', e);
    }
  }

  return eventId;
}
