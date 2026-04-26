import { useEffect } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight, Globe, TrendingUp, Users, Palette, Target, Rocket, ExternalLink, Check, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import netproLogo from 'figma:asset/0f2ee7d13d7a9e660b9073b3e3bd31a8f0c8982a.png';
import netspyImg from 'figma:asset/5adb926763ec87656f3e0e1b6a90f74d3b7399bd.png';

export function Business() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-20 px-4 sm:px-12 md:px-20 lg:px-32">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mb-16 sm:mb-32"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-tight mb-6 sm:mb-8">
          Business <span className="text-white/40">Lines</span>
        </h1>
        <div className="h-px w-24 sm:w-32 bg-white/20" />
      </motion.div>

      <div className="flex flex-col gap-20 sm:gap-32 border-l border-white/10 pl-5 sm:pl-8 md:pl-16 relative">
        {/* Decorative line that spans the height */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent" />

        {/* 01: Netpro Agency */}
        <BusinessSection 
          index="01"
          title="Netpro Agency"
          subtitle="Digital & Growth"
          description={t('business.hero.description')}
          extendedDescription={t('business.about.p1')}
          logo={netproLogo}
          logoAlt="Netpro Agency Logo"
          href="https://netpro.agency"
          linkText="netpro.agency"
          features={[
            t('business.services.branding'),
            t('business.services.web'),
            t('business.services.growth'),
            t('business.services.social')
          ]}
          color="blue"
        />

        {/* 02: Netspy */}
        <BusinessSection 
          index="02"
          title={t('business.netspy.title')}
          subtitle="Community & Networking"
          description={t('business.netspy.description')}
          extendedDescription={t('business.netspy.p1')}
          image={netspyImg}
          imageAlt="Netspy Community"
          href="https://www.netspy.es/?utm_source=rubenweb"
          linkText="netspy.es"
          features={[
            "Community Building",
            "Exclusive Events",
            "Founder Networking",
            "Strategic Partnerships"
          ]}
          color="purple"
          secondaryLink={{
            href: "https://www.netspy.es/?utm_source=rubenweb",
            text: t('business.netspy.cta') || "Follow on Instagram"
          }}
        />

      </div>

      {/* Mission / Goal Section - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 sm:mt-40 border-t border-white/10 pt-16 sm:pt-24 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4">
           <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white/20" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40 mb-4 sm:mb-6 block">{t('business.goal.title')}</span>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-light text-white leading-relaxed md:leading-normal px-2">
              "{t('business.goal.description')}"
            </h3>
          </div>

          <div className="flex justify-center w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-10 h-14 bg-white text-black hover:bg-white/90 transition-all duration-300 text-lg">
                {t('business.contact')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

function BusinessSection({ 
  index, 
  title, 
  subtitle, 
  description, 
  extendedDescription,
  logo,
  image,
  logoAlt,
  imageAlt,
  href, 
  linkText,
  features,
  color,
  secondaryLink
}: { 
  index: string, 
  title: string, 
  subtitle: string, 
  description: string,
  extendedDescription?: string,
  logo?: string,
  image?: string,
  logoAlt?: string,
  imageAlt?: string,
  href: string, 
  linkText: string,
  features: string[],
  color: 'blue' | 'purple',
  secondaryLink?: { href: string, text: string }
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        
        {/* Content Side */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
            <span className={`text-sm font-mono tracking-wider ${color === 'blue' ? 'text-red-500' : 'text-red-600'}`}>{index}</span>
            <span className="h-px flex-1 bg-white/10 max-w-[60px] sm:max-w-[100px]" />
            <span className="text-xs sm:text-sm uppercase tracking-widest text-white/40">{subtitle}</span>
          </div>

          <a href={href} target="_blank" rel="noopener noreferrer" className="block group-hover:opacity-100 transition-opacity">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 group-hover:translate-x-2 transition-transform duration-500 ease-out">
              {title}
            </h2>
          </a>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {description}
          </p>
          
          {extendedDescription && (
            <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-8 max-w-xl border-l-2 border-white/5 pl-4 sm:pl-6 hidden sm:block">
              {extendedDescription}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 sm:mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${color === 'blue' ? 'bg-red-500' : 'bg-red-600'}`} />
                <span className="text-white/60 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                variant="ghost" 
                className="group relative w-full sm:w-auto h-12 px-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 text-white justify-between sm:justify-start gap-3 transition-all duration-300 overflow-hidden"
              >
                {/* Liquid glass effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-white/10 pointer-events-none" />
                
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <span className="relative z-10">{linkText}</span>
                <ExternalLink className="relative z-10 w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </a>
            
            {secondaryLink && (
              <a 
                href={secondaryLink.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="ghost" className="w-full sm:w-auto h-12 px-6 text-white/60 hover:text-white hover:bg-transparent gap-2 justify-between sm:justify-start">
                  {secondaryLink.text} <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Visual Side */}
        <div className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2 mb-4 lg:mb-0">
          <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
            <div className="relative aspect-video sm:aspect-[4/3] bg-white/5 rounded-sm overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500">
              {logo ? (
                <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-16">
                   <ImageWithFallback
                    src={logo}
                    alt={logoAlt || title}
                    className="w-full h-full object-contain drop-shadow-2xl opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ) : image ? (
                <ImageWithFallback
                  src={image}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : null}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          </a>
        </div>

      </div>
    </motion.div>
  );
}