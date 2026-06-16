declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

interface FbqFunction {
  (...args: unknown[]): void;
  push?: FbqFunction;
  loaded?: boolean;
  version?: string;
  queue?: unknown[][];
  callMethod?: (...args: unknown[]) => void;
}

export function initMetaPixel(pixelId: string): void {
  if (typeof window === 'undefined') return;
  if (window.fbq) return;

  const f = window as unknown as Record<string, unknown>;
  const b = document;
  const e = 'script';
  const v = 'https://connect.facebook.net/en_US/fbevents.js';

  const fbqFn: FbqFunction = (...args: unknown[]) => {
    if (fbqFn.callMethod) {
      fbqFn.callMethod(...args);
    } else {
      fbqFn.queue?.push(args);
    }
  };
  fbqFn.push = fbqFn;
  fbqFn.loaded = true;
  fbqFn.version = '2.0';
  fbqFn.queue = [];

  f.fbq = fbqFn;
  if (!f._fbq) f._fbq = fbqFn;

  const t = b.createElement(e) as HTMLScriptElement;
  t.async = true;
  t.src = v;
  const s = b.getElementsByTagName(e)[0];
  if (s && s.parentNode) s.parentNode.insertBefore(t, s);

  fbqFn('init', pixelId);
  fbqFn('track', 'PageView');
}

export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  const fbq = window.fbq;
  if (!fbq) return;
  if (params) {
    fbq('track', event, params);
  } else {
    fbq('track', event);
  }
}

/**
 * Custom (non-standard) event. Uses `trackCustom` per Meta Pixel API.
 * https://developers.facebook.com/docs/meta-pixel/reference#events
 */
export function trackMetaCustom(
  event: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  const fbq = window.fbq;
  if (!fbq) return;
  if (params) {
    fbq('trackCustom', event, params);
  } else {
    fbq('trackCustom', event);
  }
}

/** Parses prices like "27" or "6,95" into a number. */
export function parsePrice(price?: string): number | undefined {
  if (!price) return undefined;
  const n = parseFloat(price.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
}
