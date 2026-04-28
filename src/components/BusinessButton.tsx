import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function BusinessButton() {
  const { t, getRoute } = useLanguage();
  const navigate = useNavigate();
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [expanded, setExpanded] = useState(false);
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollPosition = currentScrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsNearFooter(scrollPosition >= documentHeight - 200);

      // Show only when scrolling down and past a small threshold
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContact = () => {
    setExpanded(false);
    navigate(getRoute('contact'));
  };

  const openCalendly = () => {
    setExpanded(false);
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/rubenmunooz/30min',
        color: '#ff0000',
        textColor: '#ffffff',
        branding: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isNearFooter || !isVisible ? 0 : 1,
        y: isNearFooter || !isVisible ? 20 : 0,
        pointerEvents: isNearFooter || !isVisible ? 'none' : 'auto',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-50"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-1 bg-black/80 backdrop-blur-xl border border-white/15 rounded-full p-1 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]"
      >
        {/* Trigger / collapsed pill */}
        <motion.button
          layout
          onClick={() => {
            if (expanded) {
              handleContact();
            } else {
              setExpanded(true);
            }
          }}
          className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full pl-3 pr-4 py-2.5 text-[13px] font-medium hover:bg-white hover:text-black transition-colors whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('footer.business')}</span>
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <>
              <motion.button
                key="schedule"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={openCalendly}
                className="flex items-center gap-2 text-white/80 hover:text-white rounded-full pl-3 pr-4 py-2.5 text-[13px] hover:bg-white/10 transition-colors whitespace-nowrap overflow-hidden"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{t('business.schedule')}</span>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
