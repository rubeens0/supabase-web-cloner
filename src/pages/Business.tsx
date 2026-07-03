import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import netproLogo from '@/assets/netpro-branding.jpg';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Business() {
  const { t } = useLanguage();

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HERO ============== */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-5 sm:px-10 md:px-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="">{t('business.hero.label')}</SectionLabel>
          </motion.div>

          <motion.h1
            {...fadeIn(0.2)}
            className="mt-8 font-display leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
          >
            Business{' '}
            <span className="font-display-italic text-gradient-mono-italic">Lines</span>
            <span className="text-white/40">.</span>
          </motion.h1>
        </div>
      </section>

{/* ============== 01 · NETPRO ============== */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <BusinessSection
            index="01"
            title="Netpro Agency"
            subtitle="Digital & Growth"
            description={t('business.hero.description')}
            extendedDescription={t('business.about.p1')}
            image={netproLogo}
            imageAlt="Netpro Agency Branding"
            href="https://netpro.agency"
            linkText="netpro.agency"
            features={[
              t('business.services.branding'),
              t('business.services.web'),
              t('business.services.growth'),
              t('business.services.social'),
            ]}
            reverse
          />
        </div>
      </section>

    </div>
  );
}

function BusinessSection({
  index,
  title,
  subtitle,
  description,
  extendedDescription,
  image,
  imageAlt,
  href,
  linkText,
  features,
  secondaryLink,
  reverse = false,
  internal = false,
  imageContain = false,
}: {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  extendedDescription?: string;
  image: string;
  imageAlt: string;
  href: string;
  linkText: string;
  features: string[];
  secondaryLink?: { href: string; text: string };
  reverse?: boolean;
  internal?: boolean;
  imageContain?: boolean;
}) {
  const LinkWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) =>
    internal ? (
      <Link to={href} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-start`}>
        {/* Content */}
        <div className="flex-1 order-2 lg:order-none">
          <SectionLabel index={index}>{subtitle}</SectionLabel>

          <LinkWrapper className="block mt-6">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight group-hover:translate-x-1 transition-transform duration-500">
              {title.split(' ').map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="font-display-italic text-gradient-mono-italic">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
          </LinkWrapper>

          <p className="mt-8 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">{description}</p>

          {extendedDescription && (
            <p className="mt-5 text-sm sm:text-base text-white/50 leading-relaxed max-w-xl border-l-2 border-white/10 pl-4 sm:pl-6">
              {extendedDescription}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 border-t border-white/[0.06] pt-3">
                <span className="font-mono text-[10px] text-white/40">0{i + 1}</span>
                <span className="text-white/70 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <LinkWrapper className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-7 rounded-full border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-3 transition-all"
              >
                <span>{linkText}</span>
                {internal ? <ArrowRight className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
              </Button>
            </LinkWrapper>

            {secondaryLink && (
              <a href={secondaryLink.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  className="w-full sm:w-auto h-12 px-6 text-white/70 hover:text-white hover:bg-white/5 gap-2"
                >
                  {secondaryLink.text} <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Visual */}
        <div className="w-full lg:w-[440px] shrink-0 order-1 lg:order-none">
          <LinkWrapper className="block">
            {imageContain ? (
              <div className="relative aspect-[4/3] flex items-center justify-center">
                <ImageWithFallback
                  src={image}
                  alt={imageAlt}
                  className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-[1.04] transition-transform duration-700"
                />
                <div className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  N° {index}
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] group-hover:border-white/25 transition-colors duration-500">
                <ImageWithFallback
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  N° {index}
                </div>
              </div>
            )}
          </LinkWrapper>
        </div>
      </div>
    </motion.div>
  );
}
