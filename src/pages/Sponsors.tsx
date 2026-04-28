import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Users, Sparkles, Mail, X, ArrowUpRight, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import heroImage from '@/assets/sponsors-event.png';

import sponsorsImage from '@/assets/banner-patrocinadores-2026.png';

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-white">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Sponsors() {
  const { t, language, getRoute } = useLanguage();
  const [showSponsorsLightbox, setShowSponsorsLightbox] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setShowSponsorsLightbox(false);
    resetView();
  };

  useEffect(() => {
    if (!showSponsorsLightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 1));
      if (e.key === '0') resetView();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showSponsorsLightbox]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 4));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setOffset({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
  };
  const handlePointerUp = () => {
    dragRef.current = null;
  };

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
            ? 'Patrocinar a Rubén Muñoz, piloto de karting extremeño de Cáceres. Compitiendo en el Campeonato de España de Karting 2025. Oportunidades de patrocinio deportivo con valor añadido en marketing digital. Piloto joven con experiencia en Meta Ads y TikTok Ads.'
            : 'Sponsor Rubén Muñoz, karting driver from Extremadura, Cáceres. Competing in the 2025 Spanish Karting Championship. Sports sponsorship opportunities with added value in digital marketing. Young driver with expertise in Meta Ads and TikTok Ads.'
        }
        keywords={
          language === 'es'
            ? 'patrocinar piloto karting, piloto karting extremeño, piloto karting Cáceres, Rubén Muñoz, patrocinio deportivo, karting España, Campeonato España Karting, piloto karting español, patrocinio karting, sponsor karting, piloto joven Extremadura, karting Extremadura 2025'
            : 'sponsor karting driver, karting driver Extremadura, Spanish karting driver, Rubén Muñoz, sports sponsorship, karting Spain, Spanish Karting Championship, Spanish karting pilot, karting sponsorship, young driver Spain, Extremadura karting 2025'
        }
      />

      {/* ============== 01 · HERO ============== */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Karting" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="N° 01">Sponsorship</SectionLabel>
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

          {/* Tagline pill */}
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

          {/* CTAs */}
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

      {/* ============== 02 · INTRO ============== */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02">{t('sponsors.intro.title')}</SectionLabel>

          <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-4xl mb-12">
            {t('sponsors.intro.title')}
            <span className="text-white/40">.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[t('sponsors.intro.p1'), t('sponsors.intro.p2'), t('sponsors.intro.p3')].map((p, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.1)}
                className="border-t border-white/[0.12] pt-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  0{i + 1}
                </span>
                <p className="mt-4 text-white/70 leading-relaxed text-[15px]">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 03 · VALUE ADD ============== */}
      <section id="value-add-section" className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionLabel index="03">{t('sponsors.valueAdd.title')}</SectionLabel>
          <motion.p
            {...fadeIn(0.1)}
            className="mt-8 font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight"
          >
            <span className="font-display-italic text-gradient-mono-italic">"</span>
            {t('sponsors.valueAdd.description')}
            <span className="font-display-italic text-gradient-mono-italic">"</span>
          </motion.p>
        </div>
      </section>

      {/* ============== 04 · WHY ============== */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <SectionLabel index="04">{t('sponsors.why.title')}</SectionLabel>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight">
              {t('sponsors.why.title')}
              <span className="text-white/40">.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.1)}
                className="group border border-white/10 rounded-2xl p-7 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">
                    0{i + 1}
                  </span>
                  <card.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 05 · SPONSORS IMAGE ============== */}
      <section id="sponsors-section" className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel index="05">{language === 'es' ? 'Patrocinadores' : 'Sponsors'}</SectionLabel>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                {language === 'es' ? (
                  <>
                    Patrocinadores <span className="font-display-italic text-gradient-mono-italic">2026</span>
                  </>
                ) : (
                  <>
                    Sponsors <span className="font-display-italic text-gradient-mono-italic">2026</span>
                  </>
                )}
              </h2>
            </div>
          </div>

          <motion.div
            {...fadeIn(0.1)}
            onClick={() => setShowSponsorsLightbox(true)}
            className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors cursor-pointer group"
          >
            <img
              src={sponsorsImage}
              alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              <div className="bg-white/95 px-4 py-2 rounded-full">
                <p className="text-black text-sm font-medium">
                  {language === 'es' ? 'Click para ampliar' : 'Click to enlarge'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== 06 · CTA ============== */}
      <section className="px-5 sm:px-10 md:px-16 py-24 sm:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel index="06">{t('sponsors.cta.title')}</SectionLabel>
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

      {/* Lightbox — Editorial viewer */}
      <AnimatePresence>
        {showSponsorsLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span className="font-mono text-white">N° 05</span>
                <span className="h-px w-8 bg-white/20" />
                <span className="hidden sm:inline">{language === 'es' ? 'Patrocinadores · 2026' : 'Sponsors · 2026'}</span>
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors text-white/80 text-xs"
              >
                <span className="hidden sm:inline">ESC</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image stage */}
            <div
              className="relative flex-1 overflow-hidden flex items-center justify-center select-none"
              onClick={closeLightbox}
              onWheel={handleWheel}
            >
              <motion.img
                key="sponsors-img"
                src={sponsorsImage}
                alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transition: dragRef.current ? 'none' : 'transform 0.2s ease-out',
                  cursor: zoom > 1 ? (dragRef.current ? 'grabbing' : 'grab') : 'zoom-in',
                  maxWidth: '92vw',
                  maxHeight: 'calc(100vh - 180px)',
                }}
                className="object-contain rounded-xl shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Bottom toolbar */}
            <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full">
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
                  disabled={zoom <= 1}
                  className="p-2.5 rounded-full hover:bg-white/10 text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="px-3 font-mono text-[11px] text-white/70 tabular-nums min-w-[52px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
                  disabled={zoom >= 4}
                  className="p-2.5 rounded-full hover:bg-white/10 text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={resetView}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-colors"
                aria-label="Reset"
                title={language === 'es' ? 'Restablecer' : 'Reset'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoom((z) => (z >= 2 ? 1 : 2))}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-colors"
                aria-label="Fit"
                title={language === 'es' ? 'Ajustar' : 'Fit'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <a
                href={sponsorsImage}
                download="patrocinadores-2026.png"
                className="p-2.5 rounded-full bg-white text-black hover:brightness-110 transition-all border border-white/20"
                aria-label="Download"
                title={language === 'es' ? 'Descargar' : 'Download'}
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
