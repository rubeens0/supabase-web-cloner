import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { sendMetaEvent } from '@/lib/metaCapi';

type Props = {
  onCtaClick: () => void;
  /** Element id that, when visible, shows the sticky CTA. */
  showWhenVisibleId?: string;
  /** Element id that, when visible, hides the sticky CTA. */
  hideWhenVisibleId?: string;
};

/**
 * Sticky bottom CTA bar — mobile only.
 * Sólo aparece cuando la sección de ofertas está en pantalla, y desaparece
 * cuando el formulario entra en viewport.
 */
export function OesteStickyCTA({
  onCtaClick,
  showWhenVisibleId = 'oeste-offers-section',
  hideWhenVisibleId = 'oeste-form-section',
}: Props) {
  const [offersVisible, setOffersVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const showEl = document.getElementById(showWhenVisibleId);
    const hideEl = document.getElementById(hideWhenVisibleId);
    if (!showEl && !hideEl) return;

    const observers: IntersectionObserver[] = [];
    if (showEl) {
      const o = new IntersectionObserver(
        ([entry]) => setOffersVisible(entry.isIntersecting),
        { threshold: 0.15 }
      );
      o.observe(showEl);
      observers.push(o);
    }
    if (hideEl) {
      const o = new IntersectionObserver(
        ([entry]) => setFormVisible(entry.isIntersecting),
        { threshold: 0.15 }
      );
      o.observe(hideEl);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [showWhenVisibleId, hideWhenVisibleId]);

  const visible = offersVisible && !formVisible;

  const handleCta = () => {
    void sendMetaEvent({
      eventName: 'ClickCTA',
      customData: { source: 'sticky-mobile', destination: 'lead-form' },
    });
    onCtaClick();
  };

  return (
    <div
      aria-hidden={!visible}
      className={`lg:hidden fixed inset-x-0 bottom-4 sm:bottom-6 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-md">
        <button
          onClick={handleCta}
          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-bold uppercase tracking-wider text-sm px-5 h-13 py-3.5 active:scale-[0.98] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition"
        >
          Rellena el formulario
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
