import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import netproNIcon from "@/assets/netpro-n-icon.png";
import logoMark from "@/assets/logo-white-optimized.png";
import bgAtmos from "@/assets/bg-atmos-1.jpg";
import bgOffice from "@/assets/bg-atmos-2.jpg";

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
  const pageRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const bgY = useTransform(progress, [0, 1], ["0%", "12%"]);
  const bgScale = useTransform(progress, [0, 1], [1.08, 1.22]);
  const bgFade = useTransform(scrollYProgress, [0, 0.45, 1], [0.55, 0.22, 0.4]);
  const heroFade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroLift = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  useEffect(() => {
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
    initial: reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-12%" },
    transition: {
      duration: reduceMotion ? 0 : 0.9,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <main
      ref={pageRef}
      className="relative overflow-clip bg-background text-foreground antialiased selection:bg-foreground selection:text-background"
    >
      {/* Continuous atmospheric backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          style={reduceMotion ? undefined : { y: bgY, scale: bgScale, opacity: bgFade }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <img
            src={bgOffice}
            alt=""
            width={1920}
            height={1200}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div
          className="absolute inset-0 mix-blend-screen opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAtmos})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-foreground/50"
      />

      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7">
          <a href={sectionLink("top")} aria-label={t.backToTop} className="flex items-center">
            <img src={logoMark} alt="Rubén Muñoz" className="h-6 w-6 object-contain transition-transform duration-500 hover:rotate-90 sm:h-7 sm:w-7" />
          </a>
          <nav
            className="hidden items-center gap-10 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground lg:flex"
            aria-label={isSpanish ? "Navegación principal" : "Main navigation"}
          >
            {t.nav.map(([id, label]) => (
              <a key={id} href={sectionLink(id)} className="story-link transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setLanguage(isSpanish ? "en" : "es")}
              aria-label={t.langLabel}
              className="flex items-center gap-1.5 rounded-full border border-border/20 px-3 py-1.5 text-[9px] font-semibold tracking-wider transition-colors hover:border-border/50"
            >
              <span className={isSpanish ? "text-foreground" : "text-muted-foreground/50"}>ES</span>
              <span className="text-muted-foreground/40">/</span>
              <span className={!isSpanish ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
            </button>
            <Button
              asChild
              size="sm"
              className="h-9 rounded-full px-5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform hover:scale-105 active:scale-95"
            >
              <a href={sectionLink("booking")}>{t.cta}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* One continuous flow */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-10">
        {/* Hero */}
        <motion.section
          id="top"
          style={reduceMotion ? undefined : { opacity: heroFade, y: heroLift }}
          className="flex min-h-[100svh] flex-col items-center justify-center pb-20 pt-28"
        >
          <motion.img
            src={logoMark}
            alt=""
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-24 w-24 object-contain sm:h-32 sm:w-32"
          />
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display text-[clamp(2.75rem,10vw,5.5rem)] leading-none tracking-tight"
          >
            Rubén Muñoz
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1, delay: 0.4 }}
            className="mt-6 text-[10px] uppercase tracking-[0.35em] text-muted-foreground sm:text-xs"
          >
            {t.tagline}
          </motion.p>
        </motion.section>

        {/* Work — flows straight on, no divider */}
        <section id="work" className="w-full scroll-mt-24 pb-24 pt-8 sm:pb-32">
          <motion.img
            {...reveal()}
            src={netproNIcon}
            alt="Netpro Agency"
            loading="lazy"
            className="mx-auto h-12 w-auto object-contain sm:h-16"
          />
          <motion.h2
            {...reveal(0.08)}
            className="mt-8 font-display text-[clamp(2rem,7vw,3.5rem)] leading-[1.05]"
          >
            {t.workTitleA} <span className="font-display-italic text-muted-foreground">{t.workTitleB}</span>
          </motion.h2>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:gap-x-10">
            {t.services.map((service, i) => (
              <motion.span
                key={service}
                {...reveal(0.12 + i * 0.07)}
                className="cursor-default transition-colors duration-300 hover:text-foreground"
              >
                {service}
              </motion.span>
            ))}
          </div>
          <motion.a
            {...reveal(0.4)}
            href="https://netpro.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            netpro.agency <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.a>
        </section>

        {/* Booking */}
        <section id="booking" className="w-full scroll-mt-24 pb-24 sm:pb-32">
          <motion.h2
            {...reveal()}
            className="mb-12 font-display text-[clamp(2rem,7vw,3.75rem)] leading-[1.05] sm:mb-16"
          >
            {t.bookingTitleA} <span className="font-display-italic text-muted-foreground">{t.bookingTitleB}</span>
          </motion.h2>
          <motion.div {...reveal(0.1)} className="min-w-0 overflow-hidden rounded-2xl bg-background/60 backdrop-blur-sm">
            <div
              className="calendly-inline-widget min-w-0"
              data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
              style={{ height: "min(720px, 88svh)", minWidth: 320 }}
            />
          </motion.div>
        </section>

        {/* Contact */}
        <footer id="contact" className="w-full scroll-mt-24 pb-20 sm:pb-28">
          <motion.span
            {...reveal()}
            className="mb-8 block text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70"
          >
            {t.contactLabel}
          </motion.span>
          <motion.a
            {...reveal(0.08)}
            href="mailto:contacto@rubenmunoz.com"
            className="inline-block break-all font-display text-[clamp(1.5rem,5.5vw,2.5rem)] leading-tight transition-opacity hover:opacity-60 sm:break-normal"
          >
            contacto@rubenmunoz.com
          </motion.a>
          <motion.div {...reveal(0.16)} className="mt-10 flex justify-center">
            <a
              href="https://www.instagram.com/rubenmunooz._"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Instagram
            </a>
          </motion.div>
          <p className="mt-16 text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground/60">
            © 2026 Rubén Muñoz
          </p>
        </footer>
      </div>
    </main>
  );
}
