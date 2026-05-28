import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * /x — Personal storytelling presentation (no scroll, auto-advance).
 * Narrative: not "I'll help you". It's "follow the journey".
 * Arc: 2023 sims → 2024 first karts + first business → 2025 EU + CEK campaign → 2026 scaling.
 */

type SlideBase = {
  kicker: string;
  era?: string;
  /** Big year tag rendered as side marker */
  year?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  pull?: string;
  stats?: { k: string; l: string }[];
  cta?: boolean;
  image?: string;
  layout?: 'center' | 'split-left' | 'split-right' | 'overlay' | 'stats' | 'quote' | 'grid';
};

const SLIDE_DURATION = 9500;

// Placeholder images — replace later
const PH_SIM = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=70&auto=format&fit=crop';
const PH_KART = 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1600&q=70&auto=format&fit=crop';
const PH_DESK = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&q=70&auto=format&fit=crop';
const PH_TEAM = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=70&auto=format&fit=crop';
const PH_RACE = 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=1600&q=70&auto=format&fit=crop';
const PH_NEXT = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=70&auto=format&fit=crop';

function buildSlides(isEs: boolean): SlideBase[] {
  return [
    // ───────────── 0 · COVER
    {
      kicker: isEs ? 'Capítulo X · Un diario abierto' : 'Chapter X · An open diary',
      year: '2023→26',
      title: (
        <>
          {isEs ? 'No es un pitch.' : 'Not a pitch.'}
          <br />
          <span className="font-display-italic text-secondary">
            {isEs ? 'Es el diario.' : 'It\'s the diary.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Esto no va de venderte nada. Va de enseñarte, sin filtros, cómo he pasado de un simulador en mi cuarto a correr en el Campeonato de España y a construir mis propias empresas. Si quieres, sígueme el proceso.'
        : 'This isn\'t a sales page. It\'s the unfiltered story of how I went from a sim rig in my room to racing the Spanish Championship and building my own companies. If you\'re curious — follow along.',
      stats: [
        { k: '2023', l: isEs ? 'Primer click' : 'First click' },
        { k: '3', l: isEs ? 'Años · 3 vidas' : 'Years · 3 lives' },
        { k: '∞', l: isEs ? 'Por delante' : 'Ahead' },
      ],
      layout: 'stats',
    },

    // ───────────── 1 · 2023 — SIMS
    {
      kicker: '01',
      era: isEs ? '2023 — La chispa digital' : '2023 — The digital spark',
      year: '2023',
      title: (
        <>
          {isEs ? 'Todo empezó' : 'It all started'}
          <br />
          <span className="font-display-italic">{isEs ? 'jugando.' : 'playing.'}</span>
        </>
      ),
      body: isEs
        ? 'Pasaba días enteros en el simulador. Por fuera parecía un videojuego, por dentro era otra cosa: trazadas, frenadas, neumático, comunidad. Sin saberlo me estaba abriendo la cabeza a un mundo que no sabía que existía.'
        : 'I spent entire days in the sim. From the outside it looked like a game; on the inside it was something else: lines, braking, tire management, community. Without knowing, I was opening my mind to a world I didn\'t know existed.',
      pull: isEs
        ? 'Lo llamaban perder el tiempo. Yo lo llamaba abrir la mente.'
        : 'They called it wasting time. I called it opening my mind.',
      image: PH_SIM,
      layout: 'split-right',
    },

    // ───────────── 2 · 2024 — RENTAL → COMPETITION
    {
      kicker: '02',
      era: isEs ? '2024 — Del píxel al asfalto' : '2024 — From pixels to asphalt',
      year: '2024',
      title: (
        <>
          {isEs ? 'Del mando' : 'From the controller'}
          <br />
          <span className="font-display-italic text-secondary">
            {isEs ? 'al volante real.' : 'to the real wheel.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Empecé en karting de alquiler. A los pocos meses ya estaba subido a un kart de competición disputando mis 2 primeras carreras en Andalucía. Sin equipo grande, sin presupuesto. Solo ganas, una libreta y la suerte de empezar a entender lo que se siente de verdad.'
        : 'Started in rental karts. A few months later I was in a race kart running my first 2 rounds in Andalucía. No big team, no budget. Just hunger, a notebook, and finally feeling what it really is.',
      stats: [
        { k: '2', l: isEs ? 'Primeras carreras' : 'First races' },
        { k: '0€', l: isEs ? 'Padrinos' : 'Godfathers' },
        { k: '∞', l: isEs ? 'Aprendizaje' : 'Lessons' },
      ],
      image: PH_KART,
      layout: 'split-left',
    },

    // ───────────── 3 · 2024 JUN — FIRST BUSINESS
    {
      kicker: '03',
      era: isEs ? '2024 · Junio — Primer negocio' : '2024 · June — First business',
      year: '2024',
      title: (
        <>
          {isEs ? 'Si quería correr,' : 'If I wanted to race,'}
          <br />
          <span className="font-display-italic">{isEs ? 'lo pagaba yo.' : 'I had to pay for it.'}</span>
        </>
      ),
      body: isEs
        ? 'En junio monté mi primer negocio digital: gestionar redes sociales. Sin saber casi nada al principio, con la idea simple de aprender, generar ingresos y financiar mi temporada. Acabé 2024 con una red de clientes mucho más grande de la que jamás imaginé.'
        : 'In June I launched my first digital business: managing social media. Knowing almost nothing at the start, with one simple goal — learn, earn, and fund my season. By the end of 2024 the client network was way bigger than I ever imagined.',
      pull: isEs
        ? '"Si nadie te paga el sueño, monta la empresa que lo financie."'
        : '"If no one funds your dream, build the company that does."',
      image: PH_DESK,
      layout: 'overlay',
    },

    // ───────────── 4 · 2025 — REBRAND + TEAM + EUROPE
    {
      kicker: '04',
      era: isEs ? '2025 — Netpro escala' : '2025 — Netpro scales',
      year: '2025',
      title: <>{isEs ? 'Rebranding. Equipo. Europa.' : 'Rebrand. Team. Europe.'}</>,
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-2">
          {(isEs
            ? [
                { n: '01', t: 'Rebranding', d: 'Reposicioné Netpro con identidad y propósito propios.' },
                { n: '02', t: 'Equipo', d: 'Sumé talento para escalar la operación más allá de mí.' },
                { n: '03', t: 'Europa', d: 'Clientes en varios países. Ya no era solo España.' },
              ]
            : [
                { n: '01', t: 'Rebrand', d: 'Repositioned Netpro with its own identity and purpose.' },
                { n: '02', t: 'Team', d: 'Brought in talent to scale beyond just me.' },
                { n: '03', t: 'Europe', d: 'Clients across multiple countries. No longer just Spain.' },
              ]
          ).map((r) => (
            <div key={r.n} className="border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
              <div className="font-mono text-[10px] text-secondary tracking-[0.18em]">N° {r.n}</div>
              <div className="mt-2 font-display text-2xl tracking-tight text-white">{r.t}</div>
              <div className="mt-2 text-sm text-white/55 leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      ),
      layout: 'grid',
    },

    // ───────────── 5 · 2025 — CEK CAMPAIGN
    {
      kicker: '05',
      era: isEs ? '2025 — La campaña imposible' : '2025 — The impossible campaign',
      year: '2025',
      title: (
        <>
          {isEs ? 'Sin medios.' : 'No means.'}
          <br />
          <span className="font-display-italic text-secondary">
            {isEs ? 'Lo conseguimos.' : 'We pulled it off.'}
          </span>
        </>
      ),
      body: isEs
        ? 'Junto a mi padre montamos nuestra primera campaña real de patrocinadores. Sin experiencia, sin tiempo de pista y sin equipo estructurado, levantamos el presupuesto para disputar las 3 últimas pruebas del Campeonato de España. Esfuerzo puro, contactos y obsesión.'
        : 'With my dad we built our first real sponsor campaign. No experience, no track time, no structured team — and still raised the budget to race the final 3 rounds of the Spanish Championship. Pure grind, contacts and obsession.',
      pull: isEs
        ? '"Tres pruebas del CEK. Cero atajos."'
        : '"Three CEK rounds. Zero shortcuts."',
      image: PH_RACE,
      layout: 'split-right',
    },

    // ───────────── 6 · 2026 — SCALING / NEW VENTURES
    {
      kicker: '06',
      era: isEs ? '2026 — El siguiente nivel' : '2026 — Next level',
      year: '2026',
      title: (
        <>
          {isEs ? 'Proyectos más grandes.' : 'Bigger bets.'}
          <br />
          <span className="font-display-italic">{isEs ? 'Apuestas más altas.' : 'Stronger plays.'}</span>
        </>
      ),
      body: isEs
        ? 'Arranco 2026 con varios proyectos más escalables y sólidos. Aprendí a detectar oportunidades, a arriesgar con criterio y, sobre todo, a rodearme de gente talentosa que inspira. La diferencia ya no es trabajar más horas — es construir con las personas correctas.'
        : 'I\'m kicking off 2026 with several more scalable, more solid projects. I\'ve learned to spot opportunities, take bets with judgment, and — above all — surround myself with talented, inspiring people. The edge isn\'t more hours anymore; it\'s the right people.',
      stats: [
        { k: '3+', l: isEs ? 'Nuevos proyectos' : 'New projects' },
        { k: 'EU', l: isEs ? 'Alcance' : 'Reach' },
        { k: '+', l: isEs ? 'Equipo' : 'Team' },
      ],
      image: PH_TEAM,
      layout: 'split-left',
    },

    // ───────────── 7 · LESSONS
    {
      kicker: isEs ? '07 — Lo que aprendí' : '07 — What I learned',
      title: (
        <>
          {isEs ? 'Cuatro cosas' : 'Four things'}
          <br />
          <span className="font-display-italic text-secondary">
            {isEs ? 'que me cambiaron.' : 'that changed me.'}
          </span>
        </>
      ),
      body: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-2">
          {(isEs
            ? [
                { n: '01', t: 'Nadie viene a salvarte', d: 'Si esperas a que te abran la puerta, te haces viejo esperando.' },
                { n: '02', t: 'Obsesión > talento', d: 'El talento abre la puerta. La obsesión te mantiene dentro.' },
                { n: '03', t: 'Construye sistemas', d: 'Un piloto depende. Un fundador construye los suyos.' },
                { n: '04', t: 'Rodéate bien', d: 'La velocidad la marca la gente que tienes al lado.' },
              ]
            : [
                { n: '01', t: 'No one is coming', d: 'If you wait for permission, you grow old waiting.' },
                { n: '02', t: 'Obsession > talent', d: 'Talent opens the door. Obsession keeps you in.' },
                { n: '03', t: 'Build systems', d: 'A driver depends. A founder builds them.' },
                { n: '04', t: 'Pick your circle', d: 'Your pace is set by the people next to you.' },
              ]
          ).map((r) => (
            <div key={r.n} className="border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
              <div className="font-mono text-[10px] text-secondary tracking-[0.18em]">N° {r.n}</div>
              <div className="mt-2 font-display text-2xl tracking-tight text-white">{r.t}</div>
              <div className="mt-2 text-sm text-white/55 leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      ),
      layout: 'grid',
    },

    // ───────────── 8 · FOLLOW
    {
      kicker: isEs ? 'Continuará' : 'To be continued',
      title: (
        <>
          {isEs ? 'Esto sigue.' : 'This continues.'}
          <br />
          <span className="font-display-italic text-secondary">
            {isEs ? 'Ven al siguiente capítulo.' : 'Come to the next chapter.'}
          </span>
        </>
      ),
      body: isEs
        ? 'No tengo recetas mágicas para ti. Lo único que tengo es el camino, y lo voy contando en directo. Si quieres ver cómo se construye desde 0 — y los hostiazos por el camino — sígueme el proceso.'
        : 'I don\'t have magic recipes for you. I just have the road — and I\'m telling it live as it happens. If you want to watch how this gets built from zero (and the crashes along the way), follow the process.',
      cta: true,
      image: PH_NEXT,
      layout: 'overlay',
    },
  ];
}

// ────────────────────────────────────────────────────────────────────
// Slide bits
// ────────────────────────────────────────────────────────────────────

function SlideKicker({ slide }: { slide: SlideBase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40"
    >
      {slide.era && <span className="font-mono text-secondary">{slide.kicker}</span>}
      {slide.era && <span className="h-px w-8 bg-white/15" />}
      <span>{slide.era ?? slide.kicker}</span>
    </motion.div>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 font-display leading-[0.95] text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.03em]"
    >
      {children}
    </motion.h1>
  );
}

function SlideBody({ children, delay = 0.4 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="mt-7 max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed"
    >
      {children}
    </motion.div>
  );
}

function SlidePull({ text }: { text: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="mt-8 border-l-2 border-secondary pl-6 font-display-italic text-xl sm:text-2xl text-white/90 leading-snug max-w-2xl"
    >
      "{text}"
    </motion.blockquote>
  );
}

function SlideStats({ stats }: { stats: { k: string; l: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl"
    >
      {stats.map((s) => (
        <div key={s.l}>
          <div className="font-display text-4xl sm:text-6xl tracking-tight">{s.k}</div>
          <div className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40">{s.l}</div>
        </div>
      ))}
    </motion.div>
  );
}

function SlideCTA({ isEs }: { isEs: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="mt-10 flex flex-wrap gap-3"
    >
      <a
        href="https://instagram.com/rubenmunoz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium rounded-full px-6 py-3.5 hover:bg-secondary hover:text-white transition-colors"
      >
        <Instagram className="w-4 h-4" />
        {isEs ? 'Seguir el proceso' : 'Follow the process'}
      </a>
      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-white/15 text-white/80 text-sm font-medium rounded-full px-6 py-3.5 hover:border-white hover:text-white transition-colors"
      >
        {isEs ? 'Volver al inicio' : 'Back home'}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function SlidePhoto({ src, side = 'right' }: { src: string; side?: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05, x: side === 'right' ? 40 : -40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full overflow-hidden"
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div
        className={`absolute inset-0 bg-gradient-to-${side === 'right' ? 'l' : 'r'} from-transparent via-black/20 to-black`}
      />
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/40 tracking-[0.18em] uppercase">
        {side === 'right' ? '◢' : '◣'} placeholder
      </div>
    </motion.div>
  );
}

function renderSlide(slide: SlideBase, isEs: boolean) {
  const layout = slide.layout ?? 'center';

  if ((layout === 'split-left' || layout === 'split-right') && slide.image) {
    const photoSide = layout === 'split-left' ? 'left' : 'right';
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full max-w-7xl mx-auto gap-8 lg:gap-12 items-center">
        {photoSide === 'left' && (
          <div className="hidden lg:block h-[70vh]">
            <SlidePhoto src={slide.image} side="left" />
          </div>
        )}
        <div>
          <SlideKicker slide={slide} />
          <SlideTitle>{slide.title}</SlideTitle>
          {slide.body && <SlideBody>{slide.body}</SlideBody>}
          {slide.pull && <SlidePull text={slide.pull} />}
          {slide.stats && <SlideStats stats={slide.stats} />}
          {slide.cta && <SlideCTA isEs={isEs} />}
        </div>
        {photoSide === 'right' && (
          <div className="hidden lg:block h-[70vh]">
            <SlidePhoto src={slide.image} side="right" />
          </div>
        )}
      </div>
    );
  }

  if (layout === 'overlay' && slide.image) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </motion.div>
        <div className="w-full max-w-5xl">
          <SlideKicker slide={slide} />
          <SlideTitle>{slide.title}</SlideTitle>
          {slide.body && <SlideBody>{slide.body}</SlideBody>}
          {slide.pull && <SlidePull text={slide.pull} />}
          {slide.stats && <SlideStats stats={slide.stats} />}
          {slide.cta && <SlideCTA isEs={isEs} />}
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-6xl">
      <SlideKicker slide={slide} />
      <SlideTitle>{slide.title}</SlideTitle>
      {slide.body && <SlideBody>{slide.body}</SlideBody>}
      {slide.pull && <SlidePull text={slide.pull} />}
      {slide.stats && <SlideStats stats={slide.stats} />}
      {slide.cta && <SlideCTA isEs={isEs} />}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

export function X() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const slides = buildSlides(isEs);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
      startRef.current = performance.now();
      setProgress(0);
    },
    [total],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

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
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, paused, total]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === 'p') setPaused((v) => !v);
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

      {/* Giant ghost year — left side marker */}
      <AnimatePresence mode="wait">
        {slide.year && (
          <motion.div
            key={`year-${index}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.06, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-[-2vw] bottom-[-4vh] font-display text-[28vw] sm:text-[22vw] leading-none tracking-[-0.05em] text-white select-none"
            aria-hidden
          >
            {slide.year}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIVE corner mark */}
      <motion.div
        key={`mark-${index}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-20 sm:top-24 right-6 sm:right-12 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40"
      >
        <span className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
        <span>{isEs ? 'EN DIRECTO' : 'LIVE'}</span>
      </motion.div>

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-20 pt-28 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {renderSlide(slide, isEs)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top progress bars */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-32 sm:right-44 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="flex-1 h-[2px] bg-white/10 overflow-hidden group"
            aria-label={`Slide ${i + 1}`}
          >
            <div
              className="h-full bg-white transition-[width] duration-100 ease-linear group-hover:bg-secondary"
              style={{
                width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%',
              }}
            />
          </button>
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
