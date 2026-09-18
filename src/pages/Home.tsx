import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import netproNIcon from "@/assets/netpro-n-icon.png";
import logoMark from "@/assets/logo-white-optimized.png";

const copy = {
  es: {
    nav: [
      ["work", "Trabajo"],
      ["booking", "Agenda"],
      ["contact", "Contacto"],
    ] as const,
    cta: "Hablemos",
    tagline: "Negocio y marketing digital",
    workTitleA: "No me rindo",
    workTitleB: "con las ideas.",
    services: ["Estrategia", "Identidad", "Web", "Paid media"],
    bookingTitleA: "Hablemos",
    bookingTitleB: "45 minutos.",
    contactLabel: "Escríbeme",
    backToTop: "Volver al inicio",
    langLabel: "Cambiar idioma a inglés",
  },
  en: {
    nav: [
      ["work", "Work"],
      ["booking", "Booking"],
      ["contact", "Contact"],
    ] as const,
    cta: "Let's talk",
    tagline: "Business & digital marketing",
    workTitleA: "I don't give up",
    workTitleB: "on ideas.",
    services: ["Strategy", "Identity", "Web", "Paid media"],
    bookingTitleA: "Let's talk",
    bookingTitleB: "for 45 minutes.",
    contactLabel: "Write to me",
    backToTop: "Back to top",
    langLabel: "Switch language to Spanish",
  },
};

const sectionLink = (id: string) => `/#${id}`;
const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function Home() {
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";
  const t = isSpanish ? copy.es : copy.en;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Load Calendly once, then (re)initialise inline widgets when ready.
    const init = () => {
      (window as unknown as { Calendly?: { initInlineWidgets?: () => void } }).Calendly?.initInlineWidgets?.();
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SRC}"]`);
    if (existing) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = CALENDLY_SRC;
      script.async = true;
      script.onload = init;
      document.body.appendChild(script);
    }

    const hash = window.location.hash.slice(1);
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 120);
  }, []);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <main className="overflow-clip bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7">
          <a href={sectionLink("top")} aria-label={t.backToTop} className="flex items-center">
            <img src={logoMark} alt="Rubén Muñoz" className="h-6 w-6 object-contain sm:h-7 sm:w-7" />
          </a>
          <nav
            className="hidden items-center gap-10 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground lg:flex"
            aria-label={isSpanish ? "Navegación principal" : "Main navigation"}
          >
            {t.nav.map(([id, label]) => (
              <a key={id} href={sectionLink(id)} className="transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setLanguage(isSpanish ? "en" : "es")}
              aria-label={t.langLabel}
              className="flex items-center gap-1.5 rounded-full border border-border/20 px-3 py-1.5 text-[9px] font-semibold tracking-wider"
            >
              <span className={isSpanish ? "text-foreground" : "text-muted-foreground/50"}>ES</span>
              <span className="text-muted-foreground/40">/</span>
              <span className={!isSpanish ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
            </button>
            <Button
              asChild
              size="sm"
              className="h-9 rounded-full px-5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform active:scale-95"
            >
              <a href={sectionLink("booking")}>{t.cta}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — logo X, name, tagline */}
      <section
        id="top"
        className="flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-10"
      >
        <motion.img
          src={logoMark}
          alt=""
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-24 w-24 object-contain sm:h-32 sm:w-32"
        />
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-display text-5xl leading-none tracking-tight sm:text-7xl"
        >
          Rubén Muñoz
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.35 }}
          className="mt-6 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"
        >
          {t.tagline}
        </motion.p>
      </section>

      {/* Netpro Agency */}
      <section
        id="work"
        className="scroll-mt-20 border-t border-border/10 px-5 py-24 text-center sm:px-10 sm:py-32"
      >
        <motion.div {...reveal()} className="mx-auto max-w-2xl">
          <img src={netproNIcon} alt="Netpro Agency" loading="lazy" className="mx-auto h-14 w-auto object-contain sm:h-16" />
          <h2 className="mt-8 font-display text-4xl leading-[1.02] sm:text-5xl">
            {t.workTitleA}{" "}
            <span className="font-display-italic text-muted-foreground">{t.workTitleB}</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:gap-x-10">
            {t.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <a
            href="https://netpro.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            netpro.agency <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </section>

      {/* Booking — Calendly */}
      <section
        id="booking"
        className="scroll-mt-20 border-t border-border/10 bg-muted/30 px-5 py-24 sm:px-10 sm:py-32"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...reveal()} className="mb-12 text-center font-display text-4xl leading-[1.02] sm:mb-16 sm:text-6xl">
            {t.bookingTitleA}{" "}
            <span className="font-display-italic text-muted-foreground">{t.bookingTitleB}</span>
          </motion.h2>
          <motion.div {...reveal(0.1)} className="min-w-0">
            <div
              className="calendly-inline-widget min-w-0"
              data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
              style={{ height: "min(720px, 88svh)", minWidth: 320 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact footer */}
      <footer
        id="contact"
        className="scroll-mt-20 border-t border-border/10 px-5 py-24 text-center sm:px-10 sm:py-32"
      >
        <motion.div {...reveal()} className="mx-auto max-w-2xl">
          <span className="mb-8 block text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
            {t.contactLabel}
          </span>
          <a
            href="mailto:contacto@rubenmunoz.com"
            className="break-all font-display text-2xl leading-tight transition-opacity hover:opacity-60 sm:break-normal sm:text-4xl"
          >
            contacto@rubenmunoz.com
          </a>
          <div className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/rubenmunooz._"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Instagram
            </a>
          </div>
          <p className="mt-16 text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground/60">
            © 2026 Rubén Muñoz
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
