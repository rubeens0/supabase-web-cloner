import { useEffect } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Clock, Instagram, Mail, Video } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import backgroundImage from "@/assets/home-editorial-background.jpg";
import businessEditorial from "@/assets/business-editorial.jpg";
import contactEditorial from "@/assets/contact-editorial.jpg";
import netproLogo from "@/assets/netpro-branding.jpg";
import logoMark from "@/assets/logo-white-optimized.png";

const services = {
  es: [
    ["01", "Estrategia digital", "Dirección, prioridades y una hoja de ruta conectada con los objetivos del negocio."],
    ["02", "Identidad visual", "Sistemas de marca sólidos, reconocibles y preparados para crecer."],
    ["03", "Desarrollo web", "Experiencias digitales rápidas que convierten atención en oportunidades."],
    ["04", "Paid media", "Campañas con criterio creativo, datos y un foco comercial claro."],
  ],
  en: [
    ["01", "Digital strategy", "Direction, priorities and a roadmap connected to business goals."],
    ["02", "Visual identity", "Strong, recognisable brand systems designed to grow."],
    ["03", "Web development", "Fast digital experiences that turn attention into opportunity."],
    ["04", "Paid media", "Campaigns driven by creative judgement, data and commercial focus."],
  ],
};

const sectionLink = (id: string) => `/#${id}`;

export function Home() {
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ["0%", reduceMotion ? "0%" : "12%"]);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const hash = window.location.hash.slice(1);
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 120);
  }, []);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8%" },
    transition: { duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const nav = [
    ["business", isSpanish ? "Negocio" : "Business"],
    ["services", isSpanish ? "Servicios" : "Services"],
    ["booking", isSpanish ? "Agenda" : "Booking"],
    ["contact", isSpanish ? "Contacto" : "Contact"],
  ];

  return (
    <main className="overflow-clip bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-10 lg:px-16">
          <a href={sectionLink("top")} className="flex items-center gap-3" aria-label={isSpanish ? "Volver al inicio" : "Back to top"}>
            <img src={logoMark} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
            <span className="hidden text-[10px] uppercase tracking-[0.2em] sm:block">Rubén Muñoz</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label={isSpanish ? "Navegación principal" : "Main navigation"}>
            {nav.map(([id, label]) => (
              <a key={id} href={sectionLink(id)} className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setLanguage(isSpanish ? "en" : "es")} className="h-9 rounded-none px-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={isSpanish ? "Cambiar idioma a inglés" : "Switch language to Spanish"}>
              {isSpanish ? "ES / EN" : "EN / ES"}
            </Button>
            <Button asChild size="sm" className="h-9 rounded-none px-4 text-[10px] uppercase tracking-[0.16em] sm:px-5">
              <a href={sectionLink("booking")}>{isSpanish ? "Hablemos" : "Let's talk"}</a>
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden border-b border-border/10 px-5 pb-12 pt-28 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
        <motion.img style={{ y: heroImageY }} initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }} animate={{ opacity: 0.52, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }} src={backgroundImage} alt="Vista nocturna desde un estudio creativo" className="absolute inset-0 h-[110%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/20 to-background" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-12">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 1, delay: 0.15 }} className="lg:col-span-9">
            <p className="border-l border-border/35 pl-4 text-[9px] uppercase tracking-[0.32em] text-foreground/65 sm:text-[10px]">
              {isSpanish ? "Emprendedor digital / Estrategia / Marketing" : "Digital entrepreneur / Strategy / Marketing"}
            </p>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(4.2rem,13vw,10rem)] leading-[0.78]">
              Rubén<br /><span className="font-display-italic text-foreground/60">Muñoz.</span>
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 1, delay: 0.55 }} className="flex items-end justify-between gap-8 lg:col-span-3 lg:block">
            <p className="max-w-xs font-display text-2xl leading-tight sm:text-3xl lg:text-4xl">
              {isSpanish ? "Ideas con intención. Ejecución que avanza." : "Ideas with intent. Execution that moves."}
            </p>
            <a href={sectionLink("business")} className="mt-8 inline-flex h-12 w-12 shrink-0 items-center justify-center border border-border/25 transition-colors hover:bg-foreground hover:text-background" aria-label={isSpanish ? "Descubrir más" : "Discover more"}><ArrowDown className="h-4 w-4" /></a>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/10 px-5 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-x-8 gap-y-3 text-[9px] uppercase tracking-[0.26em] text-muted-foreground">
          <span>{isSpanish ? "Estrategia" : "Strategy"}</span><span>{isSpanish ? "Identidad" : "Identity"}</span><span>{isSpanish ? "Tecnología" : "Technology"}</span><span>{isSpanish ? "Adquisición" : "Acquisition"}</span>
        </div>
      </section>

      <section id="business" className="scroll-mt-16 border-b border-border/10 px-5 py-20 sm:scroll-mt-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">01 / {isSpanish ? "Negocio y visión" : "Business and vision"}</p>
            <h2 className="mt-7 max-w-4xl font-display text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
              {isSpanish ? "Convertir claridad en " : "Turning clarity into "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "movimiento." : "momentum."}</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-xl">
              {isSpanish ? "Ideas, diseño y marketing unidos para construir marcas más claras y negocios preparados para crecer." : "Ideas, design and marketing working together to build clearer brands and businesses ready to grow."}
            </p>
          </motion.div>
          <motion.div {...reveal(0.12)} className="relative lg:col-span-5">
            <div className="ml-auto max-w-md border border-border/15 p-2">
              <img src={businessEditorial} alt="Dirección creativa de Netpro Agency" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-7 left-0 border border-border/15 bg-background px-6 py-5 sm:px-8">
              <p className="font-display-italic text-4xl">01</p><p className="mt-2 text-[9px] uppercase tracking-[0.26em] text-muted-foreground">Netpro Agency</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="scroll-mt-16 border-b border-border/10 px-5 py-20 sm:scroll-mt-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-4">
            <div className="max-w-xs border border-border/15 p-2"><img src={netproLogo} alt="Netpro Agency" loading="lazy" className="aspect-square w-full object-cover" /></div>
            <a href="https://netpro.agency" target="_blank" rel="noopener noreferrer" className="mt-5 flex max-w-xs items-center justify-between border-b border-border/15 pb-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground">netpro.agency <ArrowUpRight className="h-4 w-4" /></a>
          </motion.div>
          <div className="lg:col-span-8">
            <motion.div {...reveal(0.06)}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">02 / Netpro Agency</p>
              <h2 className="mt-7 font-display text-5xl leading-[0.95] sm:text-7xl">{isSpanish ? "Una dirección. " : "One direction. "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "Cuatro capacidades." : "Four capabilities."}</span></h2>
            </motion.div>
            <div className="mt-14 border-t border-border/15">
              {services[language].map(([index, title, description], i) => (
                <motion.div key={index} {...reveal(i * 0.05)} className="group grid gap-3 border-b border-border/15 py-7 sm:grid-cols-[44px_1fr_1.35fr] sm:gap-6">
                  <span className="font-mono text-[10px] text-muted-foreground">{index}</span>
                  <h3 className="text-sm uppercase tracking-[0.14em] transition-transform duration-500 group-hover:translate-x-1">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="scroll-mt-16 border-b border-border/10 px-5 py-20 sm:scroll-mt-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="grid gap-7 lg:grid-cols-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:col-span-4">03 / Booking</p>
            <h2 className="font-display text-5xl leading-[0.92] sm:text-7xl lg:col-span-8 lg:text-8xl">{isSpanish ? "Una conversación " : "A conversation "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "con intención." : "with purpose."}</span></h2>
          </motion.div>
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.aside {...reveal(0.08)} className="lg:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{isSpanish ? "Treinta minutos para entender tu contexto, ordenar prioridades y descubrir si podemos construir algo con sentido." : "Thirty minutes to understand your context, clarify priorities and discover whether we can build something meaningful."}</p>
              <div className="mt-8 border-y border-border/15">
                <div className="flex items-center gap-4 border-b border-border/15 py-5 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-foreground" /> {isSpanish ? "30 minutos" : "30 minutes"}</div>
                <div className="flex items-center gap-4 py-5 text-sm text-muted-foreground"><Video className="h-4 w-4 text-foreground" /> Google Meet</div>
              </div>
            </motion.aside>
            <motion.div {...reveal(0.14)} className="min-w-0 lg:col-span-8">
              <div className="border border-border/15 bg-card p-1 sm:p-1.5">
                <div className="calendly-inline-widget min-w-0" data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff" style={{ height: "min(760px, 90svh)" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16 px-5 py-20 sm:scroll-mt-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <motion.div {...reveal()} className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">04 / Contact</p>
            <h2 className="mt-7 font-display text-6xl leading-[0.88] sm:text-8xl lg:text-9xl">{isSpanish ? "Hablemos " : "Let's talk "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "de tu idea." : "about your idea."}</span></h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{isSpanish ? "Si tienes un proyecto, una oportunidad o una idea que merece avanzar, este es el punto de partida." : "If you have a project, an opportunity or an idea worth moving forward, this is the starting point."}</p>
            <div className="mt-10 border-t border-border/15">
              <a href="mailto:contacto@rubenmunoz.com" className="group grid gap-2 border-b border-border/15 py-6 sm:grid-cols-[40px_1fr_24px] sm:items-center"><Mail className="h-4 w-4 text-muted-foreground" /><span className="break-all font-display text-2xl sm:break-normal sm:text-3xl">contacto@rubenmunoz.com</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" /></a>
              <a href="https://www.instagram.com/rubenmunooz._" target="_blank" rel="noopener noreferrer" className="group grid gap-2 border-b border-border/15 py-6 sm:grid-cols-[40px_1fr_24px] sm:items-center"><Instagram className="h-4 w-4 text-muted-foreground" /><span className="font-display text-2xl sm:text-3xl">@rubenmunooz._</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" /></a>
            </div>
          </motion.div>
          <motion.div {...reveal(0.12)} className="relative lg:col-span-5">
            <div className="ml-auto max-w-md border border-border/15 p-2"><img src={contactEditorial} alt="Espacio creativo de Rubén Muñoz" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
            <div className="absolute -bottom-7 left-0 border border-border/15 bg-background px-7 py-6"><p className="font-display-italic text-4xl">04</p><p className="mt-2 text-[9px] uppercase tracking-[0.26em] text-muted-foreground">Digital / Strategy</p></div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/10 px-5 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rubén Muñoz</p>
          <div className="flex flex-wrap gap-5">{nav.map(([id, label]) => <a key={id} href={sectionLink(id)} className="transition-colors hover:text-foreground">{label}</a>)}</div>
        </div>
      </footer>
    </main>
  );
}