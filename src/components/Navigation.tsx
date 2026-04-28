import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, ArrowRight, User, LogOut, Mail } from 'lucide-react';
import logoX from '@/assets/logo-x-white.png';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t, getRoute } = useLanguage();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'es' ? 'en' : 'es');
  }, [language, setLanguage]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    navigate('/');
  }, [navigate]);

  const userInitial = (user?.email?.[0] ?? user?.user_metadata?.name?.[0] ?? '').toUpperCase();
  const isEs = language === 'es';

  const navItems = [
    { to: getRoute('home'), label: t('nav.home'), match: [getRoute('home'), '/'] },
    { to: getRoute('blog'), label: t('nav.blog'), match: [getRoute('blog')] },
    { to: getRoute('business'), label: t('nav.business'), match: [getRoute('business')] },
    { to: '/2026', label: '2026', match: ['/2026'] },
    { to: getRoute('sponsors'), label: t('nav.sponsors'), match: [getRoute('sponsors'), '/sponsors', '/patrocinadores'] },
    { to: getRoute('contact'), label: t('nav.contact'), match: [getRoute('contact')] },
  ];

  return (
    <>
      {/* Top announcement bar (Slash style) */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-white/5 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 text-[12px] sm:text-[13px]">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-secondary animate-pulse shrink-0" />
                <span className="text-white/80 truncate">
                  {t('banner.season')} — <span className="text-white/50">{t('banner.seasonNote')}</span>
                </span>
              </div>
              <Link
                to="/2026"
                className="hidden sm:inline-flex items-center gap-1.5 text-white hover:text-secondary transition-colors whitespace-nowrap shrink-0"
              >
                {t('banner.learnMore')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setBannerVisible(false)}
                aria-label="Close banner"
                className="text-white/40 hover:text-white transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          bannerVisible ? 'top-[40px] sm:top-[42px]' : 'top-0'
        } ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo — X mark */}
          <Link to="/" className="group flex items-center" aria-label="Rubén Muñoz">
            <img
              src={logoX}
              alt="Rubén Muñoz"
              className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-80 transition-opacity"
              loading="eager"
            />
          </Link>

          {/* Desktop nav links — minimal underline */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = item.match.some((p) => isActive(p));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative text-[14px] transition-colors ${
                    active ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-secondary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors uppercase tracking-wider px-2 py-1"
            >
              {language}
              <span className="text-white/30">/</span>
              <span className="text-white/30">{language === 'es' ? 'en' : 'es'}</span>
            </button>

            <Link
              to={getRoute('contact')}
              className="hidden md:inline-flex items-center gap-2 bg-white text-black text-[13px] font-medium rounded-full px-4 py-2 hover:bg-secondary hover:text-white transition-colors"
            >
              {t('nav.contact')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-black"
          >
            <div className="h-full flex flex-col justify-between px-6 pt-28 pb-12">
              <motion.div
                className="flex flex-col gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
                  hidden: {},
                }}
              >
                {navItems.map((item) => {
                  const active = item.match.some((p) => isActive(p));
                  return (
                    <motion.div
                      key={item.to}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Link
                        to={item.to}
                        className={`block py-4 border-b border-white/[0.06] font-display text-4xl tracking-tight transition-colors ${
                          active ? 'text-white' : 'text-white/40'
                        }`}
                      >
                        {item.label}
                        {active && <span className="text-secondary">.</span>}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={toggleLanguage}
                  className="text-sm text-white/60 uppercase tracking-widest"
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </button>
                <Link
                  to={getRoute('contact')}
                  className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium rounded-full px-5 py-2.5"
                >
                  {t('nav.contact')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
