import { ArrowRight, Calendar, Mail, MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import netproImage from "@/assets/netpro-branding.jpg";

const services = [
  { number: "01", es: "Identidad visual", en: "Visual identity" },
  { number: "02", es: "Desarrollo web", en: "Web development" },
  { number: "03", es: "Redes sociales", en: "Social media" },
  { number: "04", es: "Marketing digital", en: "Digital marketing" },
];

export function Home() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative flex min-h-[92vh] items-end border-b border-border/10 px-5 pb-14 pt-32 sm:px-10 sm:pb-20 md:px-16">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(to_right,hsl(var(--foreground)/0.16)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.16)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 text-[11px] uppercase text-muted-foreground"
            >
              Rubén Muñoz · {isSpanish ? "Negocio y marketing digital" : "Business and digital marketing"}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-display text-6xl leading-[0.9] sm:text-8xl md:text-9xl lg:text-[9rem]"
            >
              {isSpanish ? "Ideas que se" : "Ideas built to"}{" "}
              <span className="font-display-italic text-muted-foreground">
                {isSpanish ? "convierten." : "convert."}
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border-l border-border/20 pl-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {isSpanish
                ? "Estrategia, diseño y ejecución digital para construir marcas claras y negocios que avanzan."
                : "Strategy, design and digital execution for clear brands and businesses that move forward."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/business">
                <Button className="h-11 rounded-full px-6">
                  {isSpanish ? "Ver negocio" : "View business"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="h-11 rounded-full border-border/20 bg-transparent px-6 text-foreground hover:bg-muted">
                  <Calendar className="mr-2 h-4 w-4" />
                  {isSpanish ? "Agendar" : "Book a call"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/10 px-5 py-16 sm:px-10 sm:py-24 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[11px] uppercase text-muted-foreground">Netpro Agency</p>
            <h2 className="mt-6 max-w-lg font-display text-5xl leading-none sm:text-7xl">
              {isSpanish ? "Un equipo para hacer crecer tu" : "A team to grow your"}{" "}
              <span className="font-display-italic text-muted-foreground">{isSpanish ? "marca." : "brand."}</span>
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed text-muted-foreground">
              {isSpanish
                ? "Desde la identidad hasta la captación: conectamos cada parte de tu presencia digital con un objetivo de negocio."
                : "From identity to acquisition, we connect every part of your digital presence to a business goal."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden border border-border/10 bg-card"
          >
            <img src={netproImage} alt="Netpro Agency" className="aspect-[16/10] w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/10 px-5 py-16 sm:px-10 sm:py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-6xl">{isSpanish ? "Qué hacemos" : "What we do"}</h2>
            <span className="text-[11px] uppercase text-muted-foreground">04 services</span>
          </div>
          <div className="border-t border-border/10">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="grid grid-cols-[48px_1fr_auto] items-center border-b border-border/10 py-6 sm:grid-cols-[100px_1fr_auto]"
              >
                <span className="font-mono text-[10px] text-muted-foreground">{service.number}</span>
                <span className="font-display text-3xl sm:text-5xl">{isSpanish ? service.es : service.en}</span>
                <MoveUpRight className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 sm:py-28 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-5xl leading-none sm:text-7xl md:text-8xl">
            {isSpanish ? "¿Tienes un proyecto?" : "Have a project?"}<br />
            <span className="font-display-italic text-muted-foreground">{isSpanish ? "Hablemos." : "Let's talk."}</span>
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/booking">
              <Button className="h-12 w-full rounded-full px-7 sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {isSpanish ? "Agendar reunión" : "Book a meeting"}
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" className="h-12 w-full rounded-full border-border/20 bg-transparent px-7 text-foreground hover:bg-muted sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                {isSpanish ? "Contacto" : "Contact"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}