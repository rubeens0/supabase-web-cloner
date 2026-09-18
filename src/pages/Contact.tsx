import { ArrowRight, ArrowUpRight, Instagram, Mail, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import contactEditorial from '@/assets/contact-editorial.jpg';

export function Contact() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isSpanish = language === 'es';
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const channels = [
    { index: '01', icon: Mail, label: 'Email', value: 'contacto@rubenmunoz.com', href: 'mailto:contacto@rubenmunoz.com' },
    { index: '02', icon: MapPin, label: isSpanish ? 'Ubicación' : 'Location', value: isSpanish ? 'Cáceres, Extremadura, España' : 'Cáceres, Extremadura, Spain' },
    { index: '03', icon: Instagram, label: 'Instagram', value: '@rubenmunooz._', href: 'https://www.instagram.com/rubenmunooz._' },
  ];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="px-5 pb-20 pt-28 sm:px-10 sm:pt-36 lg:px-16 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-6">
            <p className="border-l border-border/30 pl-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">01 / Contact</p>
            <h1 className="mt-8 font-display text-6xl leading-[0.88] sm:text-8xl lg:text-[108px]">
              {isSpanish ? 'Hablemos' : 'Let’s talk'}<br />
              <span className="font-display-italic text-muted-foreground">{isSpanish ? 'de tu idea.' : 'about your idea.'}</span>
            </h1>
            <p className="mt-9 max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
              {isSpanish
                ? 'Si tienes un proyecto, una oportunidad o una idea que merece avanzar, este es el punto de partida.'
                : 'If you have a project, an opportunity or an idea worth moving forward, this is the starting point.'}
            </p>
            <Button asChild size="lg" className="mt-10 h-14 rounded-none px-8 text-[11px] uppercase tracking-[0.24em]">
              <a href="mailto:contacto@rubenmunoz.com">{isSpanish ? 'Escribir un email' : 'Send an email'} <ArrowRight /></a>
            </Button>
          </motion.div>

          <motion.div {...reveal(0.12)} className="relative lg:col-span-6 lg:justify-self-end">
            <div className="relative mx-auto max-w-md border border-border/15 p-2">
              <img src={contactEditorial} alt="" width={1280} height={1600} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute -bottom-7 -left-4 border border-border/15 bg-background px-7 py-6 sm:-left-8 sm:px-9">
                <p className="font-display-italic text-4xl">03</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.32em] text-muted-foreground">Cáceres / Digital</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/10 px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">02 / {isSpanish ? 'Canales abiertos' : 'Open channels'}</p>
            <h2 className="mt-6 font-display text-5xl leading-none sm:text-6xl">
              {isSpanish ? 'Encuéntrame ' : 'Find me '}<span className="font-display-italic text-muted-foreground">{isSpanish ? 'aquí.' : 'here.'}</span>
            </h2>
          </motion.div>

          <motion.div {...reveal(0.08)} className="border-t border-border/15 lg:col-span-8">
            {channels.map((channel) => {
              const content = (
                <div className="group grid gap-4 border-b border-border/15 py-7 sm:grid-cols-[42px_150px_1fr_24px] sm:items-center">
                  <span className="font-mono text-[10px] text-muted-foreground">{channel.index}</span>
                  <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground"><channel.icon className="h-4 w-4" />{channel.label}</span>
                  <span className="break-all font-display text-2xl transition-transform duration-500 group-hover:translate-x-1 sm:break-normal sm:text-3xl">{channel.value}</span>
                  {channel.href && <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />}
                </div>
              );
              return channel.href ? (
                <a key={channel.index} href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}</a>
              ) : <div key={channel.index}>{content}</div>;
            })}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/10 px-5 py-20 sm:px-10 lg:px-16">
        <motion.div {...reveal()} className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">03 / Booking</p>
            <p className="mt-4 font-display text-4xl sm:text-5xl">{isSpanish ? '¿Prefieres hablarlo?' : 'Would you rather talk?'}</p>
          </div>
          <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-border/25 bg-transparent px-8 text-[11px] uppercase tracking-[0.24em] hover:bg-foreground hover:text-background">
            <Link to="/booking">{isSpanish ? 'Agendar llamada' : 'Schedule a call'} <ArrowRight /></Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}