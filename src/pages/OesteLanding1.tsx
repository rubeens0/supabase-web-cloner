import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Zap, Wifi, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { OesteLeadForm } from '@/components/oeste/OesteLeadForm';

const OESTE_LOGO =
  'https://oeste.digital/wp-content/uploads/2026/04/oeste-energia-solar-telecomunicaciones.svg';

function scrollToForm() {
  const el = document.getElementById('lead-form');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const benefits = [
  {
    icon: Zap,
    title: 'Hasta 1 Gb simétrico',
    desc: 'Velocidad real para teletrabajo, streaming 4K y gaming sin cortes.',
  },
  {
    icon: ShieldCheck,
    title: 'Sin permanencia',
    desc: 'Contrátalo con tranquilidad. Sin letra pequeña ni sorpresas.',
  },
  {
    icon: Wifi,
    title: 'Instalación rápida',
    desc: 'Te conectamos en pocos días con técnicos de la zona.',
  },
  {
    icon: MapPin,
    title: 'Soporte local en Cáceres',
    desc: 'Atención cercana, en persona y por teléfono cuando lo necesites.',
  },
];

export default function OesteLanding1() {
  return (
    <div className="min-h-screen bg-oeste-gradient text-white antialiased oeste-landing">
      <Helmet>
        <title>Fibra Oeste en Cáceres · La más rápida del oeste</title>
        <meta
          name="description"
          content="La fibra más rápida del oeste en Cáceres. Pide información sin compromiso a Oeste — colaboración con Rubén Muñoz."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://rubenmunoz.com/oeste-landing1" />
      </Helmet>

      {/* Top bar co-branding */}
      <header className="relative z-10 px-5 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={OESTE_LOGO} alt="Oeste" className="h-8 sm:h-10 w-auto" />
          <span className="text-white/60 text-lg">×</span>
          <span className="font-display text-xl sm:text-2xl tracking-tight">Rubén Muñoz</span>
        </div>
        <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-white/80 border border-white/30 rounded-full px-3 py-1.5">
          Colaboración oficial
        </span>
      </header>

      {/* Hero */}
      <section className="relative px-5 sm:px-10 pt-10 sm:pt-16 pb-16 sm:pb-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-black/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] bg-white/15 border border-white/25 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Disponible en Cáceres
            </span>

            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              La fibra más rápida del <em className="font-display-italic">oeste</em> en Cáceres.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl">
              Conexión simétrica de alta velocidad, soporte local y precios honestos. Déjanos tus datos y te
              preparamos la mejor oferta para tu dirección.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-semibold px-6 py-3.5 hover:bg-white/90 transition"
              >
                Quiero información
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="text-sm text-white/75">Respuesta en 24h · Sin compromiso</span>
            </div>
          </motion.div>

          <motion.div
            id="lead-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <OesteLeadForm />
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="relative bg-black/15 backdrop-blur-[2px] border-y border-white/10 py-16 sm:py-24 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Por qué Oeste</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
              Una fibra hecha para <em className="font-display-italic">tu zona</em>.
            </h2>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-6 hover:bg-white/15 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-white text-neutral-900 flex items-center justify-center">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-brand statement */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={OESTE_LOGO} alt="Oeste" className="h-9 w-auto" />
              <span className="text-white/60 text-xl">×</span>
              <span className="font-display text-2xl">Rubén Muñoz</span>
            </div>
            <p className="font-display text-3xl sm:text-4xl leading-snug">
              “Apostar por lo de casa también está en cómo nos conectamos. Por eso confío en{' '}
              <em className="font-display-italic">Oeste</em>.”
            </p>
            <p className="mt-6 text-white/75 text-sm uppercase tracking-[0.2em]">— Rubén Muñoz</p>

            <button
              onClick={scrollToForm}
              className="mt-10 group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-semibold px-7 py-4 hover:bg-white/90 transition"
            >
              Pedir mi oferta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="border-t border-white/15 py-8 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
          <div className="flex items-center gap-3">
            <img src={OESTE_LOGO} alt="Oeste" className="h-6 w-auto opacity-90" />
            <span>×</span>
            <span className="font-display">Rubén Muñoz</span>
          </div>
          <a
            href="https://oeste.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            oeste.digital ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
