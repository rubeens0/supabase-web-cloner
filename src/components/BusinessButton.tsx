import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from '../utils/performanceDetector';

export function BusinessButton() {
  const { t, getRoute } = useLanguage();
  const navigate = useNavigate();
  const [isNearFooter, setIsNearFooter] = useState(false);
  const perfSettings = getPerformanceSettings();

  useEffect(() => {
    // Calendly Setup
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

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide button when within 200px of the bottom
      setIsNearFooter(scrollPosition >= documentHeight - 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    navigate(getRoute('contact'));
  };

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/rubenmunooz/30min',
        color: '#006bff',
        textColor: '#ffffff',
        branding: true
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isNearFooter ? 0 : 1, 
        y: isNearFooter ? 20 : 0,
        pointerEvents: isNearFooter ? 'none' : 'auto'
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 z-50 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center w-full px-4"
    >
      {/* Contact Button */}
      <motion.button
        onClick={handleClick}
        className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden touch-manipulation"
        whileHover={{ scale: perfSettings.simplifyAnimations ? 1 : 1.05 }}
        whileTap={{ scale: perfSettings.simplifyAnimations ? 0.98 : 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated gradient pattern background - Skip on low-end devices */}
        {!perfSettings.simplifyAnimations && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 20px)',
            }}
            initial={{ x: 0 }}
            animate={{ x: [0, 20] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.4 }}
        />

        {/* Content wrapper with mix-blend-normal to prevent cursor inversion */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-3 mix-blend-normal">
          <motion.div 
            className="p-1 sm:p-1.5 md:p-2 bg-white/10 rounded-full group-hover:bg-white/30 transition-all duration-500"
            whileHover={perfSettings.simplifyAnimations ? {} : { rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white group-hover:text-black transition-colors duration-500" />
          </motion.div>
          <span className="text-xs sm:text-sm md:text-base text-white/70 group-hover:text-black tracking-wide whitespace-nowrap transition-all duration-500 group-hover:tracking-wider">
            {t('footer.business')}
          </span>
        </div>

        {/* Animated border glow - Skip on low-end devices */}
        {!perfSettings.simplifyAnimations && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)',
              filter: 'blur(12px)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.button>

      {/* Calendly Button */}
      <motion.button
        onClick={openCalendly}
        className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden touch-manipulation"
        whileHover={{ scale: perfSettings.simplifyAnimations ? 1 : 1.05 }}
        whileTap={{ scale: perfSettings.simplifyAnimations ? 0.98 : 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated gradient pattern background - Skip on low-end devices */}
        {!perfSettings.simplifyAnimations && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 20px)',
            }}
            initial={{ x: 0 }}
            animate={{ x: [0, 20] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.4 }}
        />

        {/* Content wrapper with mix-blend-normal to prevent cursor inversion */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-3 mix-blend-normal">
          <motion.div 
            className="p-1 sm:p-1.5 md:p-2 bg-white/10 rounded-full group-hover:bg-white/30 transition-all duration-500"
            whileHover={perfSettings.simplifyAnimations ? {} : { rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white group-hover:text-black transition-colors duration-500" />
          </motion.div>
          <span className="text-xs sm:text-sm md:text-base text-white/70 group-hover:text-black tracking-wide whitespace-nowrap transition-all duration-500 group-hover:tracking-wider">
            {t('business.schedule')}
          </span>
        </div>

        {/* Animated border glow - Skip on low-end devices */}
        {!perfSettings.simplifyAnimations && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)',
              filter: 'blur(12px)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}