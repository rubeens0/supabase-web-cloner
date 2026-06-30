import { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { sendMetaEvent } from '@/lib/metaCapi';

type Props = {
  onCtaClick: () => void;
};

/**
 * Sticky bottom CTA bar — mobile only.
 * Aparece tras hacer scroll fuera del hero para mantener la conversión
 * siempre a un toque de distancia.
 */
export function OesteStickyCTA({ onCtaClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Mostrar tras 320px de scroll (fuera del hero en móvil)
      setVisible(window.scrollY > 320);
    };
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

  const handleCall = () => {
    void sendMetaEvent({
      eventName: 'ClickCTA',
      customData: { source: 'sticky-mobile', destination: 'phone-call' },
    });
  };

  return (
    <div
      aria-hidden={!visible}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.85) 100%)',
      }}
    >
      <div className="mx-auto max-w-md flex items-center gap-2">
        <a
          href="tel:+34927000000"
          onClick={handleCall}
          aria-label="Llamar a Oeste"
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 border border-white/25 backdrop-blur-md text-white shrink-0 active:scale-95 transition"
        >
          <Phone className="w-5 h-5" />
        </a>
        <button
          onClick={handleCta}
          className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-bold uppercase tracking-wider text-sm px-5 h-12 active:scale-[0.98] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition"
        >
          Ver ofertas
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
