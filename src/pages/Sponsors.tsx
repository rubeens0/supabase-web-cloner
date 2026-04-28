import { motion } from 'motion/react';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Users, Sparkles, Mail, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useState } from 'react';
import heroImage from '@/assets/sponsors-event.png';
import tiktokLogo from '@/assets/figma/placeholder.svg';
import sponsorsImage from '@/assets/figma/placeholder.svg';

export function Sponsors() {
  const { t, language, getRoute } = useLanguage();
  const [showSponsorsLightbox, setShowSponsorsLightbox] = useState(false);

  const scrollToValueAdd = () => {
    const element = document.getElementById('value-add-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToSponsors = () => {
    const element = document.getElementById('sponsors-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const whyCards = [
    {
      icon: Trophy,
      title: t('sponsors.why.card1.title'),
      description: t('sponsors.why.card1.desc'),
    },
    {
      icon: Sparkles,
      title: t('sponsors.why.card2.title'),
      description: t('sponsors.why.card2.desc'),
    },
    {
      icon: Users,
      title: t('sponsors.why.card3.title'),
      description: t('sponsors.why.card3.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <SEO 
        title={language === 'es' 
          ? 'Patrocinar Piloto de Karting | Rubén Muñoz - Extremadura' 
          : 'Sponsor Karting Driver | Rubén Muñoz - Spain'}
        description={language === 'es' 
          ? 'Patrocinar a Rubén Muñoz, piloto de karting extremeño de Cáceres. Compitiendo en el Campeonato de España de Karting 2025. Oportunidades de patrocinio deportivo con valor añadido en marketing digital. Piloto joven con experiencia en Meta Ads y TikTok Ads.'
          : 'Sponsor Rubén Muñoz, karting driver from Extremadura, Cáceres. Competing in the 2025 Spanish Karting Championship. Sports sponsorship opportunities with added value in digital marketing. Young driver with expertise in Meta Ads and TikTok Ads.'}
        keywords={language === 'es'
          ? 'patrocinar piloto karting, piloto karting extremeño, piloto karting Cáceres, Rubén Muñoz, patrocinio deportivo, karting España, Campeonato España Karting, piloto karting español, patrocinio karting, sponsor karting, piloto joven Extremadura, karting Extremadura 2025'
          : 'sponsor karting driver, karting driver Extremadura, Spanish karting driver, Rubén Muñoz, sports sponsorship, karting Spain, Spanish Karting Championship, Spanish karting pilot, karting sponsorship, young driver Spain, Extremadura karting 2025'}
      />
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Karting" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedLogo size={80} className="mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-white"
          >
            {t('sponsors.hero.title')}
          </motion.h1>

          {/* Main Tagline - DESTACADA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 cursor-default"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-red-800/20 to-black/20 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className="relative text-white px-6 py-6 border border-white/20 rounded-3xl bg-white/5 backdrop-blur-xl shadow-2xl">
              {t('sponsors.tagline')}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/70 max-w-3xl mx-auto mb-8"
          >
            {t('sponsors.hero.description')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to={getRoute('contact')}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="group/btn gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:border-white transition-all duration-300 px-8"
                >
                  <Mail className="w-4 h-4 group-hover/btn:text-black transition-colors duration-300" />
                  <span className="group-hover/btn:text-black transition-colors duration-300">
                    {language === 'es' ? 'Contáctame' : 'Contact Me'}
                  </span>
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/dossier">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="group/btn gap-2 bg-gradient-to-r from-red-600/20 to-red-900/20 backdrop-blur-xl border border-red-500/30 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 hover:border-red-500 transition-all duration-300 px-8"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>
                    {language === 'es' ? 'Ver Dossier' : 'View Dossier'}
                  </span>
                </Button>
              </motion.div>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToSponsors}
                size="lg"
                className="group/btn gap-2 bg-gradient-to-r from-red-600/20 to-red-900/20 backdrop-blur-xl border border-red-500/30 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 hover:border-red-500 transition-all duration-300 px-8"
              >
                <Users className="w-4 h-4" />
                <span>
                  {language === 'es' ? 'Ver Patrocinadores' : 'View Sponsors'}
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToValueAdd}
                size="lg"
                variant="outline"
                className="group/btn gap-2 bg-transparent backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:border-white transition-all duration-300 px-8"
              >
                <Sparkles className="w-4 h-4 group-hover/btn:text-black transition-colors duration-300" />
                <span className="group-hover/btn:text-black transition-colors duration-300">
                  {language === 'es' ? 'Saber más' : 'Learn More'}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-white">{t('sponsors.intro.title')}</h2>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 leading-relaxed p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {t('sponsors.intro.p1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 leading-relaxed p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {t('sponsors.intro.p2')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 leading-relaxed p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {t('sponsors.intro.p3')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Value Add Section - Marketing Skills */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/5" id="value-add-section">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-white">{t('sponsors.valueAdd.title')}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <p className="text-white/80 leading-relaxed text-center">
              {t('sponsors.valueAdd.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-white">{t('sponsors.why.title')}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <motion.div 
                  className="mb-6 p-4 bg-white/5 rounded-2xl w-fit"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <card.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-white mb-3">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatedLogo size={60} className="mx-auto mb-8" />
          </motion.div>
          <h2 className="text-white mb-6">
            {t('sponsors.cta.title')}
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('sponsors.cta.description')}
          </p>
          <Link to={getRoute('contact')}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 px-8 py-6"
              >
                <Mail className="w-5 h-5" />
                {t('sponsors.cta.button')}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Sponsors Image Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/5" id="sponsors-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            className="text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {language === 'es' ? 'Patrocinadores 2026' : 'Sponsors 2026'}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setShowSponsorsLightbox(true)}
            className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
          >
            <img 
              src={sponsorsImage} 
              alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'} 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Zoom indicator */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-black font-medium">{language === 'es' ? 'Click para ampliar' : 'Click to enlarge'}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Lightbox for Sponsors Image */}
      {showSponsorsLightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSponsorsLightbox(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowSponsorsLightbox(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            src={sponsorsImage}
            alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </div>
  );
}