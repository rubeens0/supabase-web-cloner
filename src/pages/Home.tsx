import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight, Flag, Trophy, ArrowDown, TrendingUp, Search, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import logoWhite from '@/assets/logo-white.png';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO } from '../components/SEO';
import heroImage from '@/assets/home-hero-bg.jpg';
import aboutImage from '@/assets/figma/placeholder.svg';
import kartingImage from '@/assets/figma/placeholder.svg';
import marketingImage from '@/assets/figma/placeholder.svg';
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from '../utils/performanceDetector';

export function Home() {
  const { t, getRoute, language } = useLanguage();
  const perfSettings = getPerformanceSettings();
  
  // Premium animation variants - smooth and consistent
  const heroImageVariant = perfSettings.simplifyAnimations 
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: PREMIUM_ANIMATIONS.duration.fast } }
    : { 
        initial: { scale: 1.05, opacity: 0 }, 
        animate: { scale: 1, opacity: 1 }, 
        transition: { duration: PREMIUM_ANIMATIONS.duration.verySlow, ease: PREMIUM_ANIMATIONS.ease.premium } 
      };
  
  const fadeInVariant = perfSettings.simplifyAnimations
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: PREMIUM_ANIMATIONS.duration.instant } }
    : { 
        initial: { opacity: 0, y: 20 }, 
        animate: { opacity: 1, y: 0 }, 
        transition: { duration: PREMIUM_ANIMATIONS.duration.slow, ease: PREMIUM_ANIMATIONS.ease.premium } 
      };
  
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          {...heroImageVariant}
          className="absolute inset-0"
          style={perfSettings.simplifyAnimations ? {} : { willChange: 'transform, opacity' }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Karting"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: perfSettings.simplifyAnimations ? 0.2 : 0.7, delay: perfSettings.simplifyAnimations ? 0 : 0.1 }}
            className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] md:w-[62px] md:h-[62px] mx-auto mb-6 sm:mb-8"
          >
            {perfSettings.simplifyAnimations ? (
              <img
                src={logoWhite}
                alt="Rubén Muñoz Logo"
                className="w-full h-full object-contain drop-shadow-2xl brightness-0 invert"
                loading="eager"
              />
            ) : (
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                src={logoWhite}
                alt="Rubén Muñoz Logo"
                className="w-full h-full object-contain drop-shadow-2xl brightness-0 invert"
                style={{ willChange: 'transform' }}
                loading="eager"
              />
            )}
          </motion.div>
          <motion.h1
            {...fadeInVariant}
            transition={{ duration: perfSettings.simplifyAnimations ? 0.2 : 0.7, delay: perfSettings.simplifyAnimations ? 0 : 0.2 }}
            className="mb-4 sm:mb-6 text-white"
            dangerouslySetInnerHTML={{ __html: t('home.hero.title') }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: perfSettings.simplifyAnimations ? 0.2 : 0.7, delay: perfSettings.simplifyAnimations ? 0 : 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <span className="text-white/90 tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base inline-block px-4 py-2 border border-white/20 rounded-full backdrop-blur-sm bg-white/5">
              Built from scratch
            </span>
          </motion.div>
          <motion.p
            {...fadeInVariant}
            transition={{ duration: perfSettings.simplifyAnimations ? 0.2 : 0.7, delay: perfSettings.simplifyAnimations ? 0 : 0.4 }}
            className="mb-6 sm:mb-8 max-w-2xl mx-auto text-white/80"
          >
            {t('home.hero.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: perfSettings.simplifyAnimations ? 0.2 : 0.7, delay: perfSettings.simplifyAnimations ? 0 : 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-3 sm:gap-4"
          >
            <Button 
              size="lg" 
              className="gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 h-11 sm:h-12"
              onClick={() => {
                const aboutSection = document.querySelector('section:nth-of-type(2)');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="mix-blend-normal">{t('home.hero.cta')}</span> 
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 mix-blend-normal" />
            </Button>
            {/* DIRECTO CEK BUTTON REMOVED - Link to /live-timing-streaming disabled */}
            <Link to={getRoute('business')} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 h-11 sm:h-12"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mix-blend-normal" />
                <span className="mix-blend-normal">{t('nav.business')}</span> 
              </Button>
            </Link>
            <Link to="/patrocinadores" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 h-11 sm:h-12"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mix-blend-normal" />
                <span className="mix-blend-normal">{t('footer.sponsors')}</span> 
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-40 sm:bottom-32 left-1/2 transform -translate-x-1/2 sm:hidden"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
            style={{ willChange: 'transform' }}
          >
            <div className="hidden sm:flex w-6 h-10 border-2 border-white/30 rounded-full items-start justify-center p-2">
              <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="mb-4 sm:mb-6 text-white">{t('home.about.title')}</h2>
              <p className="text-white/60 mb-4">
                {t('home.about.p1')}
              </p>
              <p className="text-white/60 mb-4">
                {t('home.about.p2')}
              </p>
              <p className="text-white/60 mb-6 sm:mb-8">
                {t('home.about.p3')}
              </p>
              <Link to="/contacto">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <span className="relative z-10">{t('home.about.cta')}</span>
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-square overflow-hidden bg-white/5 rounded-2xl mb-6 md:mb-0">
                <ImageWithFallback
                  src={aboutImage}
                  alt="Racing"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tagline below image - Mobile only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-center md:hidden"
              >
                {/* Gradient line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="h-[2px] w-48 sm:w-64 mx-auto mb-4 origin-center bg-gradient-to-r from-red-600 via-red-700 to-black"
                />
                
                <p
                  className="text-white/50 text-sm sm:text-base tracking-[0.25em] uppercase font-light"
                  style={{
                    fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                  }}
                >
                  Driver • Creator • Strategist
                </p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Tagline below section - Desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-12 md:mt-16 hidden md:block"
          >
            {/* Gradient line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-[2px] w-64 mx-auto mb-4 origin-center bg-gradient-to-r from-red-600 via-red-700 to-black"
            />
            
            <p
              className="text-white/50 text-base tracking-[0.25em] uppercase font-light"
              style={{
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              }}
            >
              Driver • Creator • Strategist
            </p>
          </motion.div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="mb-4 text-white">{t('home.areas.title')}</h2>
            <p className="text-white/60">
              {t('home.areas.subtitle')}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
            >
              <div className="aspect-video mb-4 sm:mb-6 overflow-hidden bg-white/5 rounded-xl">
                <ImageWithFallback
                  src={kartingImage}
                  alt="Karting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Flag className="w-5 h-5 text-white" />
                <h3 className="text-white">{t('home.areas.karting.title')}</h3>
              </div>
              <p className="text-white/60 mb-4">
                {t('home.areas.karting.p1')}
              </p>
              <p className="text-white/50">
                {t('home.areas.karting.p2')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <Link to="/marketing" className="block">
                <div className="aspect-video mb-4 sm:mb-6 overflow-hidden bg-white/5 rounded-xl">
                  <ImageWithFallback
                    src={marketingImage}
                    alt="Marketing Digital"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: 'center 55%' }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-white" />
                  <h3 className="text-white">{t('home.areas.marketing.title')}</h3>
                </div>
                <p className="text-white/60 mb-4">
                  {t('home.areas.marketing.p1')}
                </p>
                <p className="text-white/50">
                  {t('home.areas.marketing.p2')}
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { value: t('home.stats.growth'), delay: 0.1 },
              { value: t('home.stats.discipline'), delay: 0.2 },
              { value: t('home.stats.ambition'), delay: 0.3 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="p-6 sm:p-8 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-white">{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-neutral-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <AnimatedLogo size={60} className="mx-auto mb-6 sm:mb-8 sm:w-20 sm:h-20" />
          <blockquote className="mb-4 sm:mb-6 text-white italic">
            {t('home.quote')}
          </blockquote>
          <p className="text-white/60">{t('home.quote.author')}</p>
        </motion.div>
      </section>
    </div>
  );
}