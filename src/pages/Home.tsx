import { useEffect } from "react";
import { ArrowDown, ArrowUpRight, Instagram, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import netproNIcon from "@/assets/netpro-n-icon.png";
import logoMark from "@/assets/logo-white-optimized.png";

const services = {
  es: ["Estrategia", "Identidad", "Web", "Paid media"],
  en: ["Strategy", "Identity", "Web", "Paid media"],
};

const sectionLink = (id: string) => `/#${id}`;

export function Home() {
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";
  const reduceMotion = useReducedMotion();

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
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8%" },
    transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const nav = [
    ["work", isSpanish ? "Trabajo" : "Work"],
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

      <section id="top" className="relative flex min-h-[92svh] flex-col items-center justify-center border-b border-border/10 px-5 pb-14 pt-28 text-center sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <motion.p initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 1, delay: 0.1 }} className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[10px]">
            Rubén Muñoz — {isSpanish ? "Negocio y marketing digital" : "Business and digital marketing"}
          </motion.p>
          <motion.blockquote initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.25 }} className="mt-10 font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[0.95]">
            Persistence is very important.<br />
            <span className="font-display-italic text-muted-foreground">You should not give up unless you are forced to give up.</span>
          </motion.blockquote>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 1, delay: 0.6 }} href={sectionLink("work")} className="mt-14 inline-flex h-12 w-12 shrink-0 items-center justify-center border border-border/25 transition-colors hover:bg-foreground hover:text-background" aria-label={isSpanish ? "Descubrir más" : "Discover more"}><ArrowDown className="h-4 w-4" /></motion.a>
        </div>
      </section>

      <section id="work" className="scroll-mt-16 border-b border-border/10 px-5 py-24 text-center sm:scroll-mt-20 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="flex flex-col items-center">
            <img src={netproNIcon} alt="Netpro Agency" loading="lazy" className="h-20 w-auto object-contain sm:h-28" />
            <h2 className="mt-10 font-display text-4xl leading-[1] sm:text-6xl">
              {isSpanish ? "No me rindo con las " : "I don't give up on "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "ideas." : "ideas."}</span>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              {isSpanish ? "Desde Netpro Agency construyo marcas y negocios digitales que insisten hasta funcionar." : "Through Netpro Agency I build brands and digital businesses that keep pushing until they work."}
            </p>
          </motion.div>
          <motion.div {...reveal(0.1)} className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.26em] text-muted-foreground sm:gap-x-12">
            {services[language].map((service) => <span key={service}>{service}</span>)}
          </motion.div>
          <motion.a href="https://netpro.agency" target="_blank" rel="noopener noreferrer" {...reveal(0.16)} className="mt-12 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground">netpro.agency <ArrowUpRight className="h-4 w-4" /></motion.a>
        </div>
      </section>

      <section id="booking" className="scroll-mt-16 border-b border-border/10 px-5 py-24 text-center sm:scroll-mt-20 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()}>
            <h2 className="font-display text-4xl leading-[1] sm:text-6xl">{isSpanish ? "Hablemos " : "Let's talk "}<span className="font-display-italic text-muted-foreground">{isSpanish ? "45 minutos." : "for 45 minutes."}</span></h2>
          </motion.div>
          <motion.div {...reveal(0.1)} className="mx-auto mt-12 min-w-0">
            <div className="border border-border/15 bg-card p-1 sm:p-1.5">
              <div className="calendly-inline-widget min-w-0" data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff" style={{ height: "min(760px, 90svh)" }} />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16 px-5 py-24 text-center sm:scroll-mt-20 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-xl">
          <motion.h2 {...reveal()} className="font-display text-4xl leading-[1] sm:text-6xl">{isSpanish ? "Escríbeme." : "Write to me."}</motion.h2>
          <motion.div {...reveal(0.1)} className="mt-12 border-t border-border/15">
            <a href="mailto:contacto@rubenmunoz.com" className="group flex items-center justify-center gap-3 border-b border-border/15 py-6"><Mail className="h-4 w-4 text-muted-foreground" /><span className="break-all font-display text-xl sm:break-normal sm:text-3xl">contacto@rubenmunoz.com</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" /></a>
            <a href="https://www.instagram.com/rubenmunooz._" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 border-b border-border/15 py-6"><Instagram className="h-4 w-4 text-muted-foreground" /><span className="font-display text-xl sm:text-3xl">@rubenmunooz._</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" /></a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/10 px-5 py-10 text-center sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© 2026 Rubén Muñoz</p>
        </div>
      </footer>
    </main>
  );
}
