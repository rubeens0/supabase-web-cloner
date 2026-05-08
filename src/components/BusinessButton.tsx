import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BusinessButton() {
  const { t } = useLanguage();
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const linkHref = 'https://assets.calendly.com/assets/external/widget.css';
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js';

    const loadCalendly = () => {
      if (!document.querySelector(`link[href="${linkHref}"]`)) {
        const link = document.createElement('link');
        link.href = linkHref;
        link.rel = 'stylesheet';
        link.media = 'print';
        link.onload = () => { link.media = 'all'; };
        document.head.appendChild(link);
      }
      if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const idleId = idle
      ? idle(loadCalendly, { timeout: 4000 })
      : (window.setTimeout(loadCalendly, 2500) as unknown as number);

    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollPosition = currentScrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        setIsNearFooter(scrollPosition >= documentHeight - 200);

        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/rubenmunooz/30min',
        color: '#ffffff',
        textColor: '#000000',
        branding: true,
      });
    }
  };

  const hidden = isNearFooter || !isVisible;

  return (
    <div className="fixed bottom-6 sm:bottom-8 inset-x-0 z-50 flex justify-center pointer-events-none px-6">
      <motion.button
        onClick={openCalendly}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hidden ? 0.85 : 1,
          y: hidden ? 24 : 0,
          pointerEvents: hidden ? 'none' : 'auto',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative flex items-center justify-center gap-2.5 bg-white text-black rounded-full px-8 py-4 text-[15px] font-semibold hover:bg-white/95 transition-colors shadow-[0_8px_40px_-4px_rgba(255,255,255,0.25)] border border-white/30 whitespace-nowrap pointer-events-auto"
      >
        {/* Pulse glow ring */}
        <span className="absolute inset-0 rounded-full animate-[cta-ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] border-2 border-white/40" />
        <Calendar className="w-4 h-4" />
        <span>{t('business.schedule')}</span>
      </motion.button>

      <style>{`
        @keyframes cta-ping {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
