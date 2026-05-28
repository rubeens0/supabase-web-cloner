import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Slide = {
  kicker: string;
  era?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  pull?: string;
  stats?: { k: string; l: string }[];
  cta?: boolean;
};

const SLIDE_DURATION = 8000;

function buildSlides(isEs: boolean): Slide[] {
  return [
    {
      kicker: isEs ? 'Capítulo X · La historia detrás' : 'Chapter X · The story behind',
      title: (
        <>
          {isEs ? 'Empecé sin nada.' : 'Started with nothing.'}
          <br />
          <span className="font-display-italic text-white/40">
            {isEs ? 'Construí todo.' : 'Built everything.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Piloto profesional. Fundador de dos empresas. Sin herencias, sin atajos, sin nadie esperándome al otro lado del teléfono.'
        : 'Pro driver. Founder of two companies. No inheritance, no shortcuts, no one waiting on the other end of the phone.',
      stats: [
        { k: '17', l: isEs ? 'Años en pista' : 'Years on track' },
        { k: '2', l: isEs ? 'Empresas fundadas' : 'Companies founded' },
        { k: '0', l: isEs ? 'Excusas' : 'Excuses' },
      ],
    },
    {
      kicker: '01',
      era: isEs ? '2008 — La chispa' : '2008 — The spark',
      title: (
        <>
          {isEs ? 'Un karting prestado' : 'A borrowed kart'}
          <br />
          <span className="font-display-italic text-white/50">
            {isEs ? 'y una obsesión.' : 'and an obsession.'}
          </span>
        </>
      ),
      body: isEs
        ? 'No venía de una familia del motor. No tenía padrinos. Mientras otros niños jugaban a la consola, yo estudiaba trazadas y aprendía a leer telemetría antes que a escribir bien.'
        : 'I didn\'t come from a motorsport family. No godfathers. While other kids played video games, I studied racing lines and learned telemetry before I could write properly.',
      pull: isEs ? 'No tenía padrinos. Tenía hambre.' : 'No godfathers. Just hunger.',
    },
    {
      kicker: '02',
      era: isEs ? '2012–2018 — La cantera' : '2012–2018 — The grind',
      title: <>{isEs ? 'Aprender perdiendo.' : 'Learning by losing.'}</>,
      body: isEs
        ? 'En el motorsport no gana el más rápido, gana el que mejor gestiona el caos. Equipos pequeños, presupuestos imposibles. Aprendí a montar mi propio motor y a negociar con patrocinadores siendo un crío. La pista me enseñó negocio antes que cualquier libro.'
        : 'In motorsport, the fastest doesn\'t win. The one who manages chaos best wins. Small teams, impossible budgets. I learned to rebuild engines and pitch sponsors as a kid. The track taught me business before any book did.',
    },
    {
      kicker: '03',
      era: isEs ? '2020 — El punto de inflexión' : '2020 — The turning point',
      title: (
        <>
          {isEs ? 'Si nadie me abre la puerta,' : 'If no one opens the door,'}
          <br />
          <span className="font-display-italic text-white/50">
            {isEs ? 'la construyo yo.' : 'I\'ll build it.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Cogí un portátil de segunda mano y empecé a aprender diseño, marketing y desarrollo web. De madrugada, después de entrenar. Sin cursos caros, sin mentores. Solo documentación, error y obsesión.'
        : 'I grabbed a second-hand laptop and started learning design, marketing and web dev. Late nights, after training. No expensive courses, no mentors. Just docs, mistakes and obsession.',
      pull: isEs
        ? 'Construí mi primera web a las 3 AM después de un test en pista.'
        : 'Built my first site at 3am after a track test.',
    },
    {
      kicker: '04',
      era: '2021 — Netpro Agency',
      title: <>{isEs ? 'De piloto a fundador.' : 'From driver to founder.'}</>,
      body: isEs
        ? 'Lo que empezó como una herramienta para mi propia carrera se convirtió en un estudio. Branding, diseño web y crecimiento digital pensado desde dentro del paddock. Hoy trabajamos con pilotos, equipos y negocios que necesitan resultados, no solo una web bonita.'
        : 'What started as a tool for my own career became a studio. Branding, web design and digital growth thought from inside the paddock. Today we work with drivers, teams and businesses that need results — not just a pretty site.',
    },
    {
      kicker: '05',
      era: '2023 — EcomScrape',
      title: <>{isEs ? 'El segundo proyecto.' : 'The second build.'}</>,
      body: isEs
        ? 'Los negocios de e-commerce necesitaban datos en tiempo real para sobrevivir. Nació EcomScrape: software de scraping y análisis de mercado. No soy ingeniero de formación. Aprendí lo necesario, contraté al resto, y construí un producto que hoy usa gente en tres continentes.'
        : 'E-commerce businesses needed real-time data to survive. EcomScrape was born: scraping and market intelligence. I\'m not a trained engineer. I learned what I needed, hired the rest, and shipped a product used today across three continents.',
      pull: isEs
        ? 'Dos empresas. Una carrera profesional. Cero excusas.'
        : 'Two companies. A pro racing career. Zero excuses.',
    },
    {
      kicker: '06',
      era: isEs ? '2025 — CEK & más allá' : '2025 — CEK & beyond',
      title: (
        <>
          {isEs ? 'Volver al origen,' : 'Back to the start,'}
          <br />
          <span className="font-display-italic text-white/50">
            {isEs ? 'con otra perspectiva.' : 'with a new lens.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Hoy compito en el CEK con la misma hambre de los 8 años, pero con la infraestructura para hacerlo a mi manera. Sin depender. Sin pedir permiso. Cada carrera es también un escaparate: mi historia es el caso de estudio.'
        : 'Today I race in CEK with the same hunger I had at 8, but with the infrastructure to do it my way. No dependencies. No permission. Every race is a showcase: my own story is the case study.',
    },
    {
      kicker: isEs ? '07 — Lo que aprendí' : '07 — What I learned',
      title: (
        <>
          {isEs ? 'Cuatro reglas' : 'Four rules'}
          <br />
          <span className="font-display-italic text-white/40">
            {isEs ? 'que lo cambiaron todo.' : 'that changed everything.'}
          </span>
        </>
      ),
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {(isEs
            ? [
                { n: '01', t: 'Nadie viene a salvarte', d: 'Si esperas a que alguien te abra la puerta, te haces viejo esperando.' },
                { n: '02', t: 'Obsesión > talento', d: 'El talento abre la puerta. La obsesión te mantiene dentro.' },
                { n: '03', t: 'Construye sistemas', d: 'Un piloto depende. Un fundador construye los suyos.' },
                { n: '04', t: 'Aprende en público', d: 'Cada fracaso documentado es un activo. Cada victoria, una credencial.' },
              ]
            : [
                { n: '01', t: 'No one is coming', d: 'If you wait for someone to open the door, you grow old waiting.' },
                { n: '02', t: 'Obsession > talent', d: 'Talent opens the door. Obsession keeps you in.' },
                { n: '03', t: 'Build systems', d: 'A driver depends. A founder builds them.' },
                { n: '04', t: 'Learn in public', d: 'Every documented failure is an asset. Every win, a credential.' },
              ]
          ).map((r) => (
            <div key={r.n} className="border border-white/10 p-5 sm:p-6">
              <div className="font-mono text-[10px] text-white/40 tracking-[0.18em]">N° {r.n}</div>
              <div className="mt-2 font-display text-xl sm:text-2xl tracking-tight text-white">{r.t}</div>
              <div className="mt-2 text-sm text-white/55 leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      kicker: isEs ? 'Siguiente capítulo' : 'Next chapter',
      title: (
        <>
          {isEs ? 'Tu historia' : 'Your story'}
          <br />
          <span className="font-display-italic text-white/40">
            {isEs ? 'puede empezar hoy.' : 'can start today.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Si construí esto desde cero, puedo ayudarte a hacerlo. Sin humo. Sin promesas. Solo el mismo método que uso yo.'
        : 'If I built this from zero, I can help you do the same. No fluff. No promises. Just the method I use myself.',
      cta: true,
    },
  ];
}

export function X() {
  const { language, getRoute } = useLanguage();
  const isEs = language === 'es';
  const slides = buildSlides(isEs);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  const total = slides.length;

  const go = useCallback((next: number) => {
    setIndex((next + total) % total);
    startRef.current = performance.now();
    setProgress(0);
  }, [total]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance with progress
  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now();
    setProgress(0);
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % total);
        startRef.current = performance.now();
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [index, paused, total]);

  // Lock scroll on this page
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key.toLowerCase() === 'p') setPaused((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const slide = slides[index];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden select-none">
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, white 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-24 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-6xl"
          >
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40"
            >
              {slide.era && <span className="font-mono text-white">{slide.kicker}</span>}
              {slide.era && <span className="h-px w-8 bg-white/15" />}
              <span>{slide.era ?? slide.kicker}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display leading-[0.95] text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em]"
            >
              {slide.title}
            </motion.h1>

            {/* Body */}
            {slide.body && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-white/65 leading-relaxed"
              >
                {slide.body}
              </motion.div>
            )}

            {/* Pull quote */}
            {slide.pull && (
              <motion.blockquote
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-10 border-l-2 border-secondary pl-6 font-display-italic text-xl sm:text-2xl md:text-3xl text-white/90 leading-snug max-w-3xl"
              >
                "{slide.pull}"
              </motion.blockquote>
            )}

            {/* Stats */}
            {slide.stats && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl"
              >
                {slide.stats.map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-4xl sm:text-6xl tracking-tight">{s.k}</div>
                    <div className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            {slide.cta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to={getRoute('contact')}
                  className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium rounded-full px-6 py-3.5 hover:bg-secondary hover:text-white transition-colors"
                >
                  {isEs ? 'Hablemos' : 'Let\'s talk'} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={getRoute('business')}
                  className="inline-flex items-center gap-2 border border-white/15 text-white text-sm font-medium rounded-full px-6 py-3.5 hover:border-white transition-colors"
                >
                  {isEs ? 'Ver mis empresas' : 'See my companies'}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top progress bars */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-6 sm:right-12 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-[2px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white transition-[width] duration-100 ease-linear"
              style={{
                width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-6 sm:pb-8 flex items-center justify-between z-10">
        <div className="font-mono text-[11px] text-white/40 tracking-[0.18em]">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full border border-white/15 text-white/70 flex items-center justify-center hover:border-white hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? 'Play' : 'Pause'}
            className="h-10 w-10 rounded-full border border-white/15 text-white/70 flex items-center justify-center hover:border-white hover:text-white transition-colors"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="h-10 w-10 rounded-full border border-white/15 text-white/70 flex items-center justify-center hover:border-white hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:block text-[10px] text-white/30 uppercase tracking-[0.2em]">
          {isEs ? '← → para navegar · P para pausar' : '← → to navigate · P to pause'}
        </div>
      </div>
    </div>
  );
}

export default X;
