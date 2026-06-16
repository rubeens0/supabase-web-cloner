declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function initMetaPixel(pixelId: string): void {
  if (typeof window === 'undefined') return;
  if (window.fbq) return;

  const f = window as unknown as Record<string, unknown>;
  const b = document;
  const e = 'script';
  const v = 'https://connect.facebook.net/en_US/fbevents.js';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n: any = (f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const t = b.createElement(e) as HTMLScriptElement;
  t.async = true;
  t.src = v;
  const s = b.getElementsByTagName(e)[0];
  if (s && s.parentNode) s.parentNode.insertBefore(t, s);

  n('init', pixelId);
  n('track', 'PageView');
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
