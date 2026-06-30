import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { sendMetaEvent } from '@/lib/metaCapi';

type Props = {
  onCtaClick: () => void;
};

/**
 * Sticky bottom CTA bar — mobile only.
 * Aparece tras scroll para mantener la conversión a un toque.
 */
export function OesteStickyCTA({ onCtaClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.88) 100%)',
      }}
    >
      <div className="mx-auto max-w-md">
        <button
          onClick={handleCta}
          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-bold uppercase tracking-wider text-sm px-5 h-13 py-3.5 active:scale-[0.98] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition"
        >
          Ver ofertas · sin compromiso
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="mt-1.5 text-center text-[10px] uppercase tracking-[0.2em] text-white/80">
          Respuesta en 24h
        </p>
      </div>
    </div>
  );
}

