import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import businessEditorial from '@/assets/business-editorial.jpg';
import netproLogo from '@/assets/netpro-branding.jpg';

const services = {
  es: [
    ['01', 'Estrategia digital', 'Definimos una dirección clara, prioridades y una hoja de ruta conectada al negocio.'],
    ['02', 'Identidad visual', 'Construimos sistemas de marca sólidos, reconocibles y preparados para crecer.'],
    ['03', 'Desarrollo web', 'Diseñamos experiencias digitales rápidas que convierten atención en oportunidades.'],
    ['04', 'Paid media', 'Creamos y optimizamos campañas con criterio creativo, datos y foco comercial.'],
  ],
  en: [
    ['01', 'Digital strategy', 'We define a clear direction, priorities and a roadmap connected to the business.'],
    ['02', 'Visual identity', 'We build strong, recognisable brand systems designed to grow.'],
    ['03', 'Web development', 'We design fast digital experiences that turn attention into opportunity.'],
    ['04', 'Paid media', 'We create and optimise campaigns with creative judgement, data and commercial focus.'],
  ],
};

export function Business() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isSpanish = language === 'es';
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[92svh] items-center border-b border-border/10 px-5 pb-16 pt-28 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-border/[0.06] lg:block" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="relative z-10 lg:col-span-5">
            <p className="border-l border-border/30 pl-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {isSpanish ? 'Estrategia / Negocio' : 'Strategy / Business'}
            </p>
            <h1 className="mt-8 font-display text-6xl leading-[0.88] sm:text-8xl lg:text-[106px]">
              {isSpanish ? 'Negocio' : 'Business'}<br />
              <span className="font-display-italic text-muted-foreground">&amp; {isSpanish ? 'visión.' : 'vision.'}</span>
            </h1>
            <p className="mt-9 max-w-md text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              {isSpanish
                ? 'Ideas, diseño y marketing unidos para convertir una buena marca en un negocio que avanza.'
                : 'Ideas, design and marketing working together to turn a strong brand into a business that moves forward.'}
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-none px-8 text-[11px] uppercase tracking-[0.24em]">
                <Link to="/booking">{isSpanish ? 'Reservar una llamada' : 'Book a call'} <ArrowRight /></Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-14 rounded-none px-5 text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:bg-muted hover:text-foreground">
                <Link to="/contacto">{isSpanish ? 'Contacto directo' : 'Direct contact'}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div {...reveal(0.12)} className="relative lg:col-span-7 lg:justify-self-end">
            <div className="relative mx-auto max-w-md border border-border/15 p-2 lg:mr-8">
              <img src={businessEditorial} alt="" width={1280} height={1600} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute -bottom-7 -right-4 border border-border/15 bg-background px-7 py-6 sm:-right-8 sm:px-9">
                <p className="font-display-italic text-4xl">01</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.32em] text-muted-foreground">Netpro Agency</p>
              </div>
            </div>
            <span className="pointer-events-none absolute -right-6 -top-20 hidden select-none text-[160px] font-semibold leading-none text-foreground/[0.025] lg:block">EST.</span>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/10 px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-4">
            <div className="border border-border/15 p-2">
              <img src={netproLogo} alt="Netpro Agency" loading="lazy" width={768} height={768} className="aspect-square w-full object-cover" />
            </div>
            <a href="https://netpro.agency" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between border-b border-border/15 pb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground">
              netpro.agency <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="lg:col-span-8 lg:pt-16">
            <motion.div {...reveal(0.08)}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">02 / Netpro Agency</p>
              <h2 className="mt-7 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
                {isSpanish ? 'Una agencia para ' : 'An agency built for '}<span className="font-display-italic text-muted-foreground">{isSpanish ? 'hacer avanzar.' : 'forward motion.'}</span>
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {isSpanish
                  ? 'Netpro conecta estrategia, identidad, tecnología y adquisición en una sola dirección. Menos ruido, mejores decisiones y una ejecución pensada para generar resultados.'
                  : 'Netpro connects strategy, identity, technology and acquisition under one direction. Less noise, better decisions and execution designed to deliver results.'}
              </p>
            </motion.div>

            <div className="mt-16 border-t border-border/15">
              {services[language].map(([index, title, description], i) => (
                <motion.div key={index} {...reveal(i * 0.05)} className="group grid gap-4 border-b border-border/15 py-7 sm:grid-cols-[48px_1fr_1.25fr] sm:items-start">
                  <span className="font-mono text-[10px] text-muted-foreground">{index}</span>
                  <h3 className="text-sm uppercase tracking-[0.16em] transition-transform duration-500 group-hover:translate-x-1">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <motion.div {...reveal()} className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 border-l border-border/25 pl-6 sm:pl-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">03 / {isSpanish ? 'Siguiente paso' : 'Next step'}</p>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-none sm:text-7xl">
              {isSpanish ? 'Hablemos de lo que ' : 'Let’s talk about what '}<span className="font-display-italic text-muted-foreground">{isSpanish ? 'quieres construir.' : 'you want to build.'}</span>
            </h2>
          </div>
          <Button asChild size="lg" className="h-14 shrink-0 rounded-none px-8 text-[11px] uppercase tracking-[0.24em]">
            <Link to="/booking">{isSpanish ? 'Agendar llamada' : 'Schedule a call'} <ArrowRight /></Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}