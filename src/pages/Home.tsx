import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import netproNIcon from "@/assets/netpro-n-icon.png";

const copy = {
  es: {
    nav: [
      ["work", "Trabajo"],
      ["booking", "Agenda"],
      ["contact", "Contacto"],
    ] as const,
    cta: "Hablemos",
    statement: "Manifiesto / 001",
    workTitleA: "No me rindo",
    workTitleB: "con las ideas.",
    workBody:
      "Desde Netpro Agency construyo marcas y negocios digitales que insisten hasta funcionar.",
    services: [
      { name: "Estrategia", detail: "Posicionamiento y dirección" },
      { name: "Identidad", detail: "Sistemas visuales y marca" },
      { name: "Web", detail: "Diseño y desarrollo de alto nivel" },
      { name: "Paid media", detail: "Adquisición y escala" },
    ],
    bookingTitleA: "Hablemos",
    bookingTitleB: "45 minutos.",
    bookingSub: "Agenda una llamada de descubrimiento",
    contactLabel: "Escríbeme",
    footerNote: "La persistencia es la clave.",
    backToTop: "Volver al inicio",
    langLabel: "Cambiar idioma a inglés",
    discover: "Descubrir más",
  },
  en: {
    nav: [
      ["work", "Work"],
      ["booking", "Booking"],
      ["contact", "Contact"],
    ] as const,
    cta: "Let's talk",
    statement: "Statement / 001",
    workTitleA: "I don't give up",
    workTitleB: "on ideas.",
    workBody:
      "Through Netpro Agency I build brands and digital businesses that keep pushing until they work.",
    services: [
      { name: "Strategy", detail: "Positioning and direction" },
      { name: "Identity", detail: "Visual systems and brand" },
      { name: "Web", detail: "High-end design and development" },
      { name: "Paid media", detail: "Acquisition and scale" },
    ],
    bookingTitleA: "Let's talk",
    bookingTitleB: "for 45 minutes.",
    bookingSub: "Book a discovery call",
    contactLabel: "Write to me",
    footerNote: "Persistence is the key.",
    backToTop: "Back to top",
    langLabel: "Switch language to Spanish",
    discover: "Discover more",
  },
};

const sectionLink = (id: string) => `/#${id}`;

export function Home() {
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";
  const t = isSpanish ? copy.es : copy.en;
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const indicatorScale = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
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
    initial: reduceMotion ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: {
      duration: reduceMotion ? 0 : 0.9,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const heroLine = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 1.1,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <main className="overflow-clip bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      {/* Fixed nav — transparent, blends over content */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7">
          <a
            href={sectionLink("top")}
            aria-label={t.backToTop}
            className="font-display text-xl italic leading-none tracking-tight sm:text-2xl"
          >
            RM.
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

      {/* Hero — the quote as the centerpiece, staggered asymmetric lines */}
      <section
        id="top"
        className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-20 pt-28 sm:px-10 md:px-16 lg:px-24"
      >
        <div className="w-full max-w-6xl">
          <motion.span
            {...heroLine(0.1)}
            className="mb-10 block text-[10px] font-semibold uppercase tracking-[0.4em] text-muted-foreground/70 sm:mb-14"
          >
            {t.statement}
          </motion.span>
          <h1 className="font-display text-[clamp(2.6rem,8vw,8.5rem)] leading-[0.92] tracking-tight">
            <motion.span {...heroLine(0.2)} className="block">
              Persistence is <span className="font-display-italic text-muted-foreground">very</span>{" "}
              important.
            </motion.span>
            <motion.span {...heroLine(0.35)} className="mt-4 block sm:mt-6 md:ml-24 lg:ml-32">
              You should not give up
            </motion.span>
            <motion.span
              {...heroLine(0.5)}
              className="mt-4 block font-display-italic text-muted-foreground sm:mt-6 md:ml-40 lg:ml-64"
            >
              unless you are forced to give up.
            </motion.span>
          </h1>
          <motion.p {...heroLine(0.7)} className="mt-12 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:mt-16">
            Rubén Muñoz — {isSpanish ? "Negocio y marketing digital" : "Business & digital marketing"}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href={sectionLink("work")}
          aria-label={t.discover}
          style={reduceMotion ? undefined : { scaleY: indicatorScale }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 origin-top sm:block"
        >
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="block h-14 w-px bg-gradient-to-b from-foreground to-transparent"
          />
        </motion.a>
      </section>

      {/* Netpro Agency — sticky intro + interactive service list */}
      <section
        id="work"
        className="scroll-mt-20 border-t border-border/10 px-5 py-24 sm:px-10 sm:py-36 md:px-16 lg:px-24"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <motion.div {...reveal()}>
                <img
                  src={netproNIcon}
                  alt="Netpro Agency"
                  loading="lazy"
                  className="h-16 w-auto object-contain sm:h-20"
                />
                <h2 className="mt-8 font-display text-4xl leading-[1.02] sm:text-5xl">
                  {t.workTitleA}{" "}
                  <span className="font-display-italic text-muted-foreground">{t.workTitleB}</span>
                </h2>
                <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                  {t.workBody}
                </p>
                <a
                  href="https://netpro.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  netpro.agency <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {t.services.map((service, i) => (
                <motion.div
                  key={service.name}
                  {...reveal(i * 0.08)}
                  className="group flex items-baseline justify-between gap-6 border-b border-border/10 py-9 transition-colors first:border-t hover:border-border/40 sm:py-12"
                >
                  <div className="flex min-w-0 items-baseline gap-5 sm:gap-8">
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground/60">
                      / 0{i + 1}
                    </span>
                    <h3 className="min-w-0 break-words font-display text-3xl transition-all duration-500 group-hover:translate-x-3 group-hover:font-display-italic sm:text-5xl lg:text-6xl">
                      {service.name}
                    </h3>
                  </div>
                  <p className="hidden max-w-[180px] text-right text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-60 md:block">
                    {service.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking — Calendly */}
      <section
        id="booking"
        className="scroll-mt-20 border-t border-border/10 bg-muted/30 px-5 py-24 sm:px-10 sm:py-36 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="mb-12 sm:mb-16">
            <h2 className="font-display text-4xl leading-[1.02] sm:text-6xl">
              {t.bookingTitleA}{" "}
              <span className="font-display-italic text-muted-foreground">{t.bookingTitleB}</span>
            </h2>
            <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.bookingSub}
            </p>
          </motion.div>
          <motion.div {...reveal(0.1)} className="min-w-0">
            <div className="border border-border/15 bg-background p-1 sm:p-1.5">
              <div
                className="calendly-inline-widget min-w-0"
                data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
                style={{ height: "min(720px, 88svh)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact footer */}
      <footer
        id="contact"
        className="scroll-mt-20 border-t border-border/10 px-5 py-24 sm:px-10 sm:py-32 md:px-16 lg:px-24"
      >
        <div className="grid grid-cols-1 items-end gap-16 md:grid-cols-2">
          <motion.div {...reveal()} className="space-y-12">
            <div>
              <span className="mb-6 block text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
                {t.contactLabel}
              </span>
              <a
                href="mailto:contacto@rubenmunoz.com"
                className="break-all font-display text-2xl leading-tight transition-opacity hover:opacity-60 sm:break-normal sm:text-4xl lg:text-5xl"
              >
                contacto@rubenmunoz.com
              </a>
            </div>
            <div className="flex gap-10">
              <a
                href="https://www.instagram.com/rubenmunooz._"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-border/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                Instagram
              </a>
            </div>
          </motion.div>
          <motion.p
            {...reveal(0.1)}
            className="text-[9px] font-medium uppercase leading-loose tracking-[0.35em] text-muted-foreground/60 md:text-right"
          >
            © 2026 Rubén Muñoz
            <br />
            {t.footerNote}
          </motion.p>
        </div>
      </footer>
    </main>
  );
}
