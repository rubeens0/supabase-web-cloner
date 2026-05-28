import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      {index && <span className="font-mono text-white">{index}</span>}
      {index && <span className="h-px w-8 bg-white/15" />}
      <span>{children}</span>
    </div>
  );
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

type Chapter = {
  index: string;
  era: string;
  title: string;
  italic?: string;
  body: string[];
  pull?: string;
};

const chaptersEs: Chapter[] = [
  {
    index: '01',
    era: '2008 — La chispa',
    title: 'Un karting prestado',
    italic: 'y una obsesión.',
    body: [
      'Todo empezó con un karting prestado, un casco que me venía grande y una pista que me cambió la vida. No venía de una familia del motor. No tenía padrinos. Solo tenía una cosa: la certeza de que aquello era para mí.',
      'Mientras otros niños jugaban a la consola, yo estudiaba trazadas en YouTube y aprendía a leer telemetría antes que saber escribir bien.',
    ],
    pull: 'No tenía padrinos. Tenía hambre.',
  },
  {
    index: '02',
    era: '2012–2018 — La cantera',
    title: 'Aprender perdiendo',
    body: [
      'Compitiendo regionalmente entendí algo que nadie te enseña: en el motorsport no gana el más rápido, gana el que mejor gestiona el caos. Equipos pequeños, presupuestos imposibles, kartings reciclados.',
      'Cada fin de semana era una lección. Aprendí a montar mi propio motor, a negociar con patrocinadores siendo un crío, a presentar dossiers cuando ni sabía qué era un dossier. La pista me enseñó negocio antes que cualquier libro.',
    ],
  },
  {
    index: '03',
    era: '2020 — El punto de inflexión',
    title: 'Si nadie me abre la puerta,',
    italic: 'la construyo yo.',
    body: [
      'Cansado de depender de patrocinadores que llegaban tarde y mal, tomé la decisión que lo cambió todo: si la industria no me daba las herramientas para crecer, las crearía yo mismo.',
      'Cogí un portátil de segunda mano y empecé a aprender diseño, marketing digital y desarrollo web. De madrugada, después de entrenar. Sin cursos caros, sin mentores. Solo documentación, error y obsesión.',
    ],
    pull: 'Construí mi primera web a las 3 de la mañana después de un test en pista.',
  },
  {
    index: '04',
    era: '2021 — Netpro Agency',
    title: 'De piloto a fundador',
    body: [
      'Lo que empezó como una herramienta para mi propia carrera se convirtió en un estudio. Otros pilotos vieron lo que estaba haciendo y me pidieron ayuda. Después llegaron equipos. Después marcas.',
      'Nació Netpro Agency: branding, diseño web y crecimiento digital pensado desde dentro del paddock. Hoy trabajamos con pilotos, equipos y negocios digitales que necesitan algo más que una web bonita: necesitan resultados.',
    ],
  },
  {
    index: '05',
    era: '2023 — EcomScrape',
    title: 'El segundo proyecto',
    body: [
      'Con Netpro funcionando, vi otro problema que nadie estaba resolviendo bien: los negocios de e-commerce necesitaban datos en tiempo real para sobrevivir. Así nació EcomScrape, un software de scraping y análisis de mercado.',
      'No soy ingeniero de formación. Aprendí a programar lo necesario, contraté al resto, y construí un producto que hoy usa gente en tres continentes.',
    ],
    pull: 'Dos empresas. Una carrera profesional. Cero excusas.',
  },
  {
    index: '06',
    era: '2025 — CEK & más allá',
    title: 'Volver al origen,',
    italic: 'con otra perspectiva.',
    body: [
      'Hoy compito en el Campeonato de España de Karting (CEK) con la misma hambre de los 8 años, pero con algo nuevo: la infraestructura para hacerlo a mi manera. Sin depender. Sin pedir permiso.',
      'Cada carrera es también un escaparate: mi propia historia es el caso de estudio. Si construí esto desde cero, puedo ayudar a otros a hacerlo. Esa es la verdadera apuesta.',
    ],
  },
];

const chaptersEn: Chapter[] = [
  {
    index: '01',
    era: '2008 — The spark',
    title: 'A borrowed kart',
    italic: 'and an obsession.',
    body: [
      'It all started with a borrowed kart, a helmet two sizes too big, and a track that changed my life. I didn\'t come from a motorsport family. I had no godfathers. I had one thing: certainty that this was mine.',
      'While other kids played video games, I studied racing lines on YouTube and learned to read telemetry before I could write properly.',
    ],
    pull: 'No godfathers. Just hunger.',
  },
  {
    index: '02',
    era: '2012–2018 — The grind',
    title: 'Learning by losing',
    body: [
      'Racing regionally taught me what no one talks about: in motorsport, the fastest doesn\'t win. The one who manages chaos best wins. Small teams, impossible budgets, recycled karts.',
      'Every weekend was a lesson. I learned to rebuild my engine, to negotiate with sponsors as a kid, to pitch dossiers before I knew what a dossier was. The track taught me business before any book did.',
    ],
  },
  {
    index: '03',
    era: '2020 — The turning point',
    title: 'If no one opens the door,',
    italic: 'I\'ll build it.',
    body: [
      'Tired of depending on sponsors who showed up late and short, I made the decision that changed everything: if the industry wouldn\'t give me the tools to grow, I\'d build them myself.',
      'I grabbed a second-hand laptop and started learning design, digital marketing and web development. Late nights, after training. No expensive courses, no mentors. Just docs, mistakes and obsession.',
    ],
    pull: 'Built my first site at 3am after a track test.',
  },
  {
    index: '04',
    era: '2021 — Netpro Agency',
    title: 'From driver to founder',
    body: [
      'What started as a tool for my own career became a studio. Other drivers saw what I was doing and asked for help. Then teams. Then brands.',
      'Netpro Agency was born: branding, web design and digital growth thought from inside the paddock. Today we work with drivers, teams and digital businesses that need more than a pretty website: they need results.',
    ],
  },
  {
    index: '05',
    era: '2023 — EcomScrape',
    title: 'The second build',
    body: [
      'With Netpro running, I saw another problem no one was solving well: e-commerce businesses needed real-time data to survive. EcomScrape was born — a scraping and market intelligence platform.',
      'I\'m not a trained engineer. I learned what I needed, hired the rest, and shipped a product used today across three continents.',
    ],
    pull: 'Two companies. A pro racing career. Zero excuses.',
  },
  {
    index: '06',
    era: '2025 — CEK & beyond',
    title: 'Back to the start,',
    italic: 'with a new lens.',
    body: [
      'Today I race in the Spanish Karting Championship (CEK) with the same hunger I had at 8, but with something new: the infrastructure to do it my way. No dependencies. No permission needed.',
      'Every race is also a showcase: my own story is the case study. If I built this from zero, I can help others do the same. That\'s the real bet.',
    ],
  },
];

const principles = {
  es: [
    { n: '01', t: 'Nadie viene a salvarte', d: 'Si esperas a que alguien te abra la puerta, te haces viejo esperando.' },
    { n: '02', t: 'Obsesión > talento', d: 'El talento abre la puerta. La obsesión te mantiene dentro.' },
    { n: '03', t: 'Construye sistemas', d: 'Un piloto depende de equipos. Un fundador construye los suyos.' },
    { n: '04', t: 'Aprende en público', d: 'Cada fracaso documentado es un activo. Cada victoria, una credencial.' },
  ],
  en: [
    { n: '01', t: 'No one is coming', d: 'If you wait for someone to open the door, you grow old waiting.' },
    { n: '02', t: 'Obsession > talent', d: 'Talent opens the door. Obsession keeps you in.' },
    { n: '03', t: 'Build systems', d: 'A driver depends on teams. A founder builds them.' },
    { n: '04', t: 'Learn in public', d: 'Every documented failure is an asset. Every win, a credential.' },
  ],
};

export function X() {
  const { language, getRoute } = useLanguage();
  const isEs = language === 'es';
  const chapters = isEs ? chaptersEs : chaptersEn;
  const rules = isEs ? principles.es : principles.en;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* HERO */}
      <section className="relative pt-32 sm:pt-44 pb-20 sm:pb-32 px-5 sm:px-10 md:px-16 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="max-w-7xl mx-auto relative">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="">{isEs ? 'Capítulo X · La historia detrás' : 'Chapter X · The story behind'}</SectionLabel>
          </motion.div>

          <motion.h1
            {...fadeIn(0.2)}
            className="mt-8 font-display leading-[0.92] text-5xl sm:text-7xl md:text-8xl lg:text-[140px] text-white tracking-[-0.03em] max-w-6xl"
          >
            {isEs ? 'Empecé sin nada.' : 'Started with nothing.'}
            <br />
            <span className="font-display-italic text-white/40">
              {isEs ? 'Construí todo.' : 'Built everything.'}
            </span>
          </motion.h1>

          <motion.p
            {...fadeIn(0.35)}
            className="mt-10 max-w-2xl text-lg sm:text-xl text-white/60 leading-relaxed"
          >
            {isEs
              ? 'Piloto profesional. Fundador de dos empresas. Sin herencias, sin atajos, sin nadie esperándome al otro lado del teléfono. Esta es la historia de cómo se construye una carrera —y un negocio— desde cero.'
              : 'Pro driver. Founder of two companies. No inheritance, no shortcuts, no one waiting on the other end of the phone. This is the story of how you build a career —and a business— from zero.'}
          </motion.p>

          <motion.div {...fadeIn(0.5)} className="mt-12 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl">
            {[
              { k: '17', l: isEs ? 'Años en pista' : 'Years on track' },
              { k: '2', l: isEs ? 'Empresas fundadas' : 'Companies founded' },
              { k: '0', l: isEs ? 'Excusas' : 'Excuses' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl sm:text-6xl tracking-tight">{s.k}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CHAPTERS */}
      {chapters.map((c, i) => (
        <section
          key={c.index}
          className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-20 sm:py-32"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <motion.div {...fadeIn(0)} className="md:col-span-4 md:sticky md:top-32 self-start">
              <SectionLabel index={c.index}>{c.era}</SectionLabel>
              <div className="mt-6 font-mono text-[11px] text-white/30">
                {String(i + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
              </div>
            </motion.div>

            <div className="md:col-span-8 max-w-2xl">
              <motion.h2
                {...fadeIn(0.1)}
                className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-0.02em]"
              >
                {c.title}
                {c.italic && (
                  <>
                    {' '}
                    <span className="font-display-italic text-white/50">{c.italic}</span>
                  </>
                )}
              </motion.h2>

              <div className="mt-8 space-y-6">
                {c.body.map((p, idx) => (
                  <motion.p
                    key={idx}
                    {...fadeIn(0.15 + idx * 0.05)}
                    className="text-base sm:text-lg text-white/70 leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {c.pull && (
                <motion.blockquote
                  {...fadeIn(0.3)}
                  className="mt-10 border-l-2 border-secondary pl-6 font-display-italic text-2xl sm:text-3xl text-white/90 leading-snug"
                >
                  "{c.pull}"
                </motion.blockquote>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* PRINCIPLES */}
      <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-24 sm:py-40 bg-gradient-to-b from-black via-neutral-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn(0)}>
            <SectionLabel index="07">{isEs ? 'Lo que aprendí' : 'What I learned'}</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-4xl"
          >
            {isEs ? 'Cuatro reglas' : 'Four rules'}
            <br />
            <span className="font-display-italic text-white/40">
              {isEs ? 'que lo cambiaron todo.' : 'that changed everything.'}
            </span>
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {rules.map((r, i) => (
              <motion.div
                key={r.n}
                {...fadeIn(0.1 + i * 0.05)}
                className="bg-black p-8 sm:p-12 hover:bg-neutral-950 transition-colors"
              >
                <div className="font-mono text-[11px] text-white/40 tracking-[0.18em]">N° {r.n}</div>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl tracking-tight">{r.t}</h3>
                <p className="mt-4 text-white/60 leading-relaxed">{r.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-10 md:px-16 py-24 sm:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeIn(0)} className="flex justify-center">
            <SectionLabel index="">{isEs ? 'Siguiente capítulo' : 'Next chapter'}</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-8 font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-0.03em]"
          >
            {isEs ? 'Tu historia' : 'Your story'}{' '}
            <span className="font-display-italic text-white/40">
              {isEs ? 'puede empezar hoy.' : 'can start today.'}
            </span>
          </motion.h2>

          <motion.p {...fadeIn(0.2)} className="mt-8 text-lg text-white/60 max-w-xl mx-auto">
            {isEs
              ? 'Si construí esto desde cero, puedo ayudarte a hacerlo. Sin humo. Sin promesas. Solo el mismo método que uso yo.'
              : 'If I built this from zero, I can help you do the same. No fluff. No promises. Just the method I use myself.'}
          </motion.p>

          <motion.div {...fadeIn(0.3)} className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              to={getRoute('contact')}
              className="inline-flex items-center gap-2 bg-white text-black text-[14px] font-medium rounded-full px-6 py-3.5 hover:bg-secondary hover:text-white transition-colors"
            >
              {isEs ? 'Hablemos' : 'Let\'s talk'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={getRoute('business')}
              className="inline-flex items-center gap-2 border border-white/15 text-white text-[14px] font-medium rounded-full px-6 py-3.5 hover:border-white transition-colors"
            >
              {isEs ? 'Ver mis empresas' : 'See my companies'} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default X;
