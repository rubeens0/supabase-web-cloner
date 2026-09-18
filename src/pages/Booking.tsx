import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import homeEditorial from '@/assets/home-editorial-background.jpg';

export function Booking() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isSpanish = language === 'es';

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative border-b border-border/10 px-5 pb-20 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <img src={homeEditorial} alt="" width={1360} height={768} className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-25 lg:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20" />
        <motion.div {...reveal()} className="relative mx-auto max-w-7xl">
          <p className="border-l border-border/30 pl-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">01 / Booking</p>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[0.9] sm:text-8xl lg:text-[112px]">
            {isSpanish ? 'Una conversación' : 'A conversation'}<br />
            <span className="font-display-italic text-muted-foreground">{isSpanish ? 'con intención.' : 'with purpose.'}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {isSpanish
              ? 'Treinta minutos para entender tu contexto, ordenar prioridades y descubrir si podemos construir algo con sentido.'
              : 'Thirty minutes to understand your context, clarify priorities and discover whether we can build something meaningful.'}
          </p>
        </motion.div>
      </section>

      <section className="px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.aside {...reveal(0.08)} className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">02 / {isSpanish ? 'La llamada' : 'The call'}</p>
            <h2 className="mt-6 font-display text-5xl leading-none sm:text-6xl">
              {isSpanish ? 'Elige tu ' : 'Choose your '}<span className="font-display-italic text-muted-foreground">{isSpanish ? 'momento.' : 'moment.'}</span>
            </h2>
            <div className="mt-10 border-y border-border/15">
              <div className="flex items-center gap-4 border-b border-border/15 py-5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-foreground" /> {isSpanish ? '30 minutos' : '30 minutes'}
              </div>
              <div className="flex items-center gap-4 py-5 text-sm text-muted-foreground">
                <Video className="h-4 w-4 text-foreground" /> Google Meet
              </div>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {isSpanish
                ? 'Selecciona una fecha disponible. Recibirás la confirmación y el enlace de la videollamada por email.'
                : 'Select an available date. You will receive confirmation and the video call link by email.'}
            </p>
            <Button asChild variant="ghost" className="mt-8 h-12 rounded-none px-0 text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:bg-transparent hover:text-foreground">
              <Link to="/contacto">{isSpanish ? 'Prefiero escribir' : 'I prefer to write'} <ArrowRight /></Link>
            </Button>
          </motion.aside>

          <motion.div {...reveal(0.16)} className="relative lg:col-span-8">
            <div className="absolute -left-5 -top-6 font-display-italic text-5xl text-foreground/10 sm:-left-10">02</div>
            <div className="border border-border/15 bg-card p-1.5">
              <div
                className="calendly-inline-widget min-w-[280px]"
                data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
                style={{ height: '720px' }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}