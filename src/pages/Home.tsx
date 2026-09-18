import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import backgroundImage from "@/assets/home-editorial-background.jpg";
import logoMark from "@/assets/logo-white-optimized.png";

export function Home() {
  const { language, setLanguage } = useLanguage();
  const isSpanish = language === "es";
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-background px-5 py-7 text-foreground selection:bg-foreground/20 sm:px-10 sm:py-10 md:px-14">
      <motion.img
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        src={backgroundImage}
        alt="Vista nocturna desde un estudio creativo"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/25 to-background/90" aria-hidden="true" />
      <div className="absolute inset-0 bg-background/15" aria-hidden="true" />

      <motion.header {...reveal(0.15)} className="relative z-10 flex w-full items-center justify-between">
        <Link to="/business" className="text-[10px] uppercase text-foreground/65 transition-colors hover:text-foreground sm:text-xs">
          Netpro Agency
        </Link>
        <button
          type="button"
          onClick={() => setLanguage(isSpanish ? "en" : "es")}
          className="text-[10px] uppercase text-foreground/65 transition-colors hover:text-foreground sm:text-xs"
          aria-label={isSpanish ? "Cambiar idioma a inglés" : "Switch language to Spanish"}
        >
          {isSpanish ? "ES / EN" : "EN / ES"}
        </button>
      </motion.header>

      <div className="relative z-10 flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-8 text-center">
        <motion.div {...reveal(0.25)} className="mb-5 sm:mb-7">
          <img src={logoMark} alt="Marca de Rubén Muñoz" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
        </motion.div>

        <motion.h1 {...reveal(0.35)} className="text-sm font-medium uppercase text-foreground sm:text-base">
          Rubén Muñoz
        </motion.h1>
        <motion.p {...reveal(0.42)} className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] uppercase text-foreground/55 sm:text-[11px]">
          <span>{isSpanish ? "Emprendedor digital" : "Digital entrepreneur"}</span>
          <span aria-hidden="true">·</span>
          <span>{isSpanish ? "Estrategia" : "Strategy"}</span>
          <span aria-hidden="true">·</span>
          <span>{isSpanish ? "Marketing" : "Marketing"}</span>
        </motion.p>

        <motion.div {...reveal(0.55)} className="my-8 h-px w-10 bg-foreground/25 sm:my-12" />

        <motion.p
          {...reveal(0.62)}
          className="max-w-3xl px-2 font-display text-3xl leading-[1.14] text-foreground sm:text-5xl md:text-6xl"
        >
          {isSpanish
            ? "Las ideas importan. La estrategia las convierte en negocios que avanzan."
            : "Ideas matter. Strategy turns them into businesses that move forward."}
        </motion.p>
      </div>

      <motion.nav {...reveal(0.78)} aria-label={isSpanish ? "Navegación principal" : "Main navigation"} className="relative z-10 flex w-full flex-col items-center gap-4">
        <p className="text-[9px] uppercase text-foreground/45 sm:text-[10px]">
          {isSpanish ? "Construyamos algo con sentido" : "Let's build something meaningful"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/70 sm:gap-x-9 sm:text-sm">
          <Link to="/business" className="transition-colors hover:text-foreground">{isSpanish ? "Negocio" : "Business"}</Link>
          <Link to="/booking" className="transition-colors hover:text-foreground">Booking</Link>
          <Link to="/contacto" className="transition-colors hover:text-foreground">{isSpanish ? "Contacto" : "Contact"}</Link>
        </div>
      </motion.nav>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </main>
  );
}