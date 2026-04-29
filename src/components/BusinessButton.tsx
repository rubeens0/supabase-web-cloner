import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BusinessButton() {
  const { t } = useLanguage();
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calendly setup
    const linkHref = 'https://assets.calendly.com/assets/external/widget.css';
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js';

    if (!document.querySelector(`link[href="${linkHref}"]`)) {
      const link = document.createElement('link');
      link.href = linkHref;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

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
    <div className="fixed bottom-5 sm:bottom-7 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.button
        onClick={openCalendly}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hidden ? 0 : 1,
          y: hidden ? 20 : 0,
          pointerEvents: hidden ? 'none' : 'auto',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2 bg-gradient-mono text-black rounded-full px-6 py-3 text-[13px] font-medium hover:brightness-110 transition-all shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)] border border-white/20 whitespace-nowrap"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>{t('business.schedule')}</span>
      </motion.button>
    </div>
  );
}
