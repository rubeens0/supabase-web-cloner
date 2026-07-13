import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Users, Sparkles, Mail, ArrowUpRight, ArrowRight, Rocket, Target, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import heroImage from '@/assets/sponsors-event.png';

import netproLogo from '@/assets/netpro-branding.jpg';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Sponsors() {
  const { t, language, getRoute } = useLanguage();

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const whyCards = [
    { icon: Trophy, title: t('sponsors.why.card1.title'), description: t('sponsors.why.card1.desc') },
    { icon: Sparkles, title: t('sponsors.why.card2.title'), description: t('sponsors.why.card2.desc') },
    { icon: Users, title: t('sponsors.why.card3.title'), description: t('sponsors.why.card3.desc') },
  ];

  const netproFeatures = [
    { icon: Target, label: t('sponsors.netpro.feat1'), desc: t('sponsors.netpro.feat1desc') },
    { icon: Rocket, label: t('sponsors.netpro.feat2'), desc: t('sponsors.netpro.feat2desc') },
    { icon: BarChart3, label: t('sponsors.netpro.feat3'), desc: t('sponsors.netpro.feat3desc') },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={
          language === 'es'
            ? 'Patrocinar Piloto de Karting | Rubén Muñoz - Extremadura'
            : 'Sponsor Karting Driver | Rubén Muñoz - Spain'
        }
        description={
          language === 'es'
            ? 'Patrocinar a Rubén Muñoz, piloto de karting extremeño de Cáceres. Compitiendo en el Campeonato de España de Karting 2026. Oportunidades de patrocinio deportivo con valor añadido en marketing digital gestionado por Netpro Agency.'
            : 'Sponsor Rubén Muñoz, karting driver from Extremadura, Cáceres. Competing in the 2026 Spanish Karting Championship. Sports sponsorship opportunities with added value in digital marketing managed by Netpro Agency.'
        }
        keywords={
          language === 'es'
            ? 'patrocinar piloto karting, piloto karting extremeño, piloto karting Cáceres, Rubén Muñoz, patrocinio deportivo, karting España, Campeonato España Karting, piloto karting español, patrocinio karting, sponsor karting, piloto joven Extremadura, karting Extremadura 2026, Netpro Agency'
            : 'sponsor karting driver, karting driver Extremadura, Spanish karting driver, Rubén Muñoz, sports sponsorship, karting Spain, Spanish Karting Championship, Spanish karting pilot, karting sponsorship, young driver Spain, Extremadura karting 2026, Netpro Agency'
        }
      />

      {/* ============== HERO ============== */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Karting" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel>Sponsorship</SectionLabel>
          </motion.div>

          <motion.h1
            {...fadeIn(0.2)}
            className="mt-8 font-display leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
          >
            {t('sponsors.hero.title').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="font-display-italic text-gradient-mono-italic">
                  {word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
            <span className="text-white/40">.</span>
          </motion.h1>

          <motion.p
            {...fadeIn(0.3)}
            className="mt-10 font-display-italic text-2xl sm:text-3xl md:text-4xl text-white/85 leading-snug max-w-3xl"
          >
            {t('sponsors.tagline')}
          </motion.p>

          <motion.p
            {...fadeIn(0.4)}
            className="mt-8 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {t('sponsors.hero.description')}
          </motion.p>

          <motion.div {...fadeIn(0.5)} className="mt-10 flex flex-wrap gap-3">
            <Link to={getRoute('contact')}>
              <Button className="rounded-full h-12 px-7 bg-white text-black hover:bg-white/90 gap-2">
                <Mail className="w-4 h-4" />
                {language === 'es' ? 'Contáctame' : 'Contact Me'}
              </Button>
            </Link>
            <Link to="/dossier">
              <Button
                variant="outline"
                className="rounded-full h-12 px-7 border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-2"
              >
                {language === 'es' ? 'Ver Dossier' : 'View Dossier'} <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="#sponsors-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('sponsors-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Button
                variant="ghost"
                className="rounded-full h-12 px-6 text-white/70 hover:text-white hover:bg-white/5 gap-2"
              >
                {language === 'es' ? 'Ver Patrocinadores' : 'View Sponsors'} <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============== NETPRO AGENCY STRIP ============== */}
      <section className="border-b border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-10 sm:py-14">
          <motion.div
            {...fadeIn(0)}
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src={netproLogo} alt="Netpro Agency" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{t('sponsors.netpro.badge')}</p>
                <p className="mt-1 font-display text-xl sm:text-2xl text-white">Netpro Agency</p>
              </div>
            </div>
            <p className="text-white/60 text-sm sm:text-base max-w-xl text-center md:text-right leading-relaxed">
              {t('sponsors.netpro.strip')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============== INTRO ============== */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>{t('sponsors.intro.title')}</SectionLabel>

          <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight max-w-4xl mb-14">
            {t('sponsors.intro.title')}
            <span className="text-white/40">.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[t('sponsors.intro.p1'), t('sponsors.intro.p2'), t('sponsors.intro.p3')].map((p, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.1)}
                className="border-t border-white/[0.12] pt-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  0{i + 1}
                </span>
                <p className="mt-5 text-white/70 leading-relaxed text-[15px]">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== NETPRO ENGINE ============== */}
      <section className="relative border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-24 sm:py-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeIn(0.1)}>
              <SectionLabel>{t('sponsors.netpro.label')}</SectionLabel>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight">
                {t('sponsors.netpro.title').split(' ').map((word, i, arr) =>
                  i === arr.length - 1 ? (
                    <span key={i} className="font-display-italic text-gradient-mono-italic">
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
                <span className="text-white/40">.</span>
              </h2>
              <p className="mt-8 text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
                {t('sponsors.netpro.description')}
              </p>

              <div className="mt-10 grid sm:grid-cols-1 gap-4">
                {netproFeatures.map((feat, i) => (
                  <motion.div
                    key={i}
                    {...fadeIn(0.2 + i * 0.1)}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <feat.icon className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <p className="font-display text-lg text-white">{feat.label}</p>
                      <p className="text-white/50 text-sm leading-relaxed mt-1">{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://netpro.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10"
              >
                <Button
                  variant="outline"
                  className="rounded-full h-12 px-7 border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-2"
                >
                  {t('sponsors.netpro.cta')} <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              {...fadeIn(0.2)}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <img
                  src={netproLogo}
                  alt="Netpro Agency"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <p className="font-display-italic text-2xl sm:text-3xl text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {t('sponsors.netpro.cardQuote')}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">Netpro Agency</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== VALUE ADD ============== */}
      <section id="value-add-section" className="relative border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-24 sm:py-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full opacity-[0.18] blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full opacity-[0.10] blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto">
          <SectionLabel>{t('sponsors.valueAdd.title')}</SectionLabel>

          <motion.h3
            {...fadeIn(0.05)}
            className="mt-10 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-5xl"
          >
            <span className="font-display-italic text-gradient-mono-italic align-top mr-2">“</span>
            {t('sponsors.valueAdd.lead')}{' '}
            <span className="font-display-italic text-gradient-mono-italic">
              {t('sponsors.valueAdd.leadHi')}
            </span>
            <span className="font-display-italic text-gradient-mono-italic align-top ml-1">”</span>
          </motion.h3>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mt-14 sm:mt-20 h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent"
          />

          <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-10 md:gap-8">
            {[1, 2, 3].map((n, i) => (
              <motion.div
                key={n}
                {...fadeIn(0.15 + i * 0.12)}
                className="group relative"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/35">
                    0{n}
                  </span>
                  <span className="h-px flex-1 bg-white/10 group-hover:bg-white/25 transition-colors duration-500" />
                </div>
                <h4 className="mt-5 font-display text-2xl sm:text-3xl text-white leading-[1.1] tracking-tight">
                  {t(`sponsors.valueAdd.pillar${n}.label`)}
                </h4>
                <p className="mt-3 text-white/65 leading-relaxed text-[15px]">
                  {t(`sponsors.valueAdd.pillar${n}.body`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeIn(0.55)}
            className="mt-16 sm:mt-20 font-display-italic text-xl sm:text-2xl md:text-3xl text-white/85 leading-snug"
          >
            <span className="text-gradient-mono-italic">→</span>{' '}
            {t('sponsors.valueAdd.signoff')}
          </motion.p>
        </div>
      </section>

      {/* ============== WHY ============== */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <SectionLabel>{t('sponsors.why.title')}</SectionLabel>
            <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight">
              {t('sponsors.why.title')}
              <span className="text-white/40">.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.1)}
                className="group border border-white/10 rounded-2xl p-8 sm:p-10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">
                    0{i + 1}
                  </span>
                  <card.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white mb-4 leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ============== CTA ============== */}
      <section className="px-5 sm:px-10 md:px-16 py-24 sm:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>{t('sponsors.cta.title')}</SectionLabel>
          <motion.h2
            {...fadeIn(0.1)}
            className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl text-white leading-[1.05] tracking-tight mb-8"
          >
            {t('sponsors.cta.title').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="font-display-italic text-gradient-mono-italic">
                  {word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </motion.h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('sponsors.cta.description')}
          </p>
          <Link to={getRoute('contact')}>
            <Button
              size="lg"
              className="rounded-full h-12 px-8 bg-white text-black hover:bg-white/90 gap-2"
            >
              <Mail className="w-5 h-5" />
              {t('sponsors.cta.button')}
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
