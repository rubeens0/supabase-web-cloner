import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import logoWhite from '@/assets/logo-white-optimized.png';
import navBackground from '@/assets/figma/placeholder.svg';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from '../utils/performanceDetector';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, getRoute } = useLanguage();
  const perfSettings = getPerformanceSettings();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Prevent scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'es' ? 'en' : 'es');
  }, [language, setLanguage]);

  const navClass = useMemo(() => 
    `fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
      scrolled 
        ? 'backdrop-blur-xl bg-black/20 border border-white/10' 
        : 'backdrop-blur-md bg-black/10 border border-white/5'
    }`, [scrolled]
  );
  
  // Optimized backdrop styles
  const backdropStyle = useMemo(() => {
    if (perfSettings.disableBlur) {
      return {
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)',
      };
    }
    return {
      backdropFilter: `blur(var(--blur-amount, 20px)) saturate(var(--saturate-amount, 180%))`,
      WebkitBackdropFilter: `blur(var(--blur-amount, 20px)) saturate(var(--saturate-amount, 180%))`,
    };
  }, [perfSettings.disableBlur, scrolled]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={navClass}
        style={backdropStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-5 h-5 sm:w-[26px] sm:h-[26px]"
              >
                <img 
                  src={logoWhite} 
                  alt="Rubén Muñoz Logo" 
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </motion.div>
              <span className="text-white text-sm sm:text-base group-hover:text-white/80 transition-colors">
                Rubén Muñoz
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                to={getRoute('home')}
                className={`relative text-white transition-colors hover:text-white/80 ${
                  isActive(getRoute('home')) || isActive('/') ? 'text-white' : 'text-white/60'
                }`}
              >
                {t('nav.home')}
                {(isActive(getRoute('home')) || isActive('/')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-black"
                  />
                )}
              </Link>
              <Link
                to={getRoute('blog')}
                className={`relative text-white transition-colors hover:text-white/80 ${
                  isActive(getRoute('blog')) ? 'text-white' : 'text-white/60'
                }`}
              >
                {t('nav.blog')}
                {isActive(getRoute('blog')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-black"
                  />
                )}
              </Link>
              <Link
                to={getRoute('business')}
                className={`relative text-white transition-colors hover:text-white/80 ${
                  isActive(getRoute('business')) ? 'text-white' : 'text-white/60'
                }`}
              >
                {t('nav.business')}
                {isActive(getRoute('business')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-black"
                  />
                )}
              </Link>
              <Link
                to="/2026"
                className={`relative text-white transition-colors hover:text-white/80 ${
                  isActive('/2026') ? 'text-white' : 'text-white/60'
                }`}
              >
                2026
                {isActive('/2026') && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
              <Link
                to={getRoute('contact')}
                className={`relative text-white transition-colors hover:text-white/80 ${
                  isActive(getRoute('contact')) ? 'text-white' : 'text-white/60'
                }`}
              >
                {t('nav.contact')}
                {isActive(getRoute('contact')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
              
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors text-sm"
              >
                <span className="text-base">{language === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span className="uppercase">{language}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors text-xs"
              >
                <span className="text-sm">{language === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span className="uppercase">{language}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-black"
          >
            <div className="h-full flex items-center justify-center px-8">
              {/* Menu content */}
              <motion.div 
                className="w-full max-w-md space-y-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    }
                  },
                  hidden: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    }
                  }
                }}
              >
                {[
                  { to: getRoute('home'), label: t('nav.home'), active: isActive(getRoute('home')) || isActive('/') },
                  { to: getRoute('blog'), label: t('nav.blog'), active: isActive(getRoute('blog')) },
                  { to: getRoute('business'), label: t('nav.business'), active: isActive(getRoute('business')) },
                  { to: '/2026', label: '2026', active: isActive('/2026') },
                  { to: getRoute('contact'), label: t('nav.contact'), active: isActive(getRoute('contact')) },
                ].map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: 20,
                      },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                    }}
                  >
                    <Link
                      to={item.to}
                      className={`block py-4 text-center text-2xl transition-colors ${
                        item.active
                          ? 'text-white' 
                          : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}