import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  X,
  Target,
  Map as MapIcon,
  Zap,
  TrendingUp,
  ShieldCheck,
  Quote,
  PlayCircle,
  Users,
} from "lucide-react";
import rdeLogo from "@/assets/rde-logo.png";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-white">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function RDE() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== TOP BAR — Scarcity ============== */}
      <div className="fixed top-0 inset-x-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 text-center py-2 px-4 text-[11px] sm:text-xs text-white/70 tracking-wide">
        <span className="font-mono text-white">●</span>{" "}
        Solo trabajamos con 3 clientes nuevos por mes ·{" "}
        <span className="text-white font-medium">1 plaza disponible</span>
      </div>

      {/* ============== 01 · HERO ============== */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 px-5 sm:px-10 md:px-16 border-b border-white/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={rdeLogo}
            alt="RDE Operators"
            className="h-7 sm:h-8 w-auto mx-auto mb-8 opacity-90"
          />

          <motion.div
            {...fadeIn(0.05)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-white/60 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Para info-empresarios hispanohablantes
          </motion.div>

          <motion.h1
            {...fadeIn(0.1)}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em] text-white max-w-4xl mx-auto mb-8"
          >
            Ayudamos a info-empresarios a convertir su audiencia en{" "}
            <span className="font-display-italic text-gradient-mono-italic">ingresos predecibles</span>{" "}
            sin depender de su presencia constante
          </motion.h1>

          <motion.p
            {...fadeIn(0.2)}
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Si ya tienes conocimiento, audiencia o producto pero tus ventas dependen de que tú estés
            activo cada día — ve el vídeo completo.
          </motion.p>

          {/* VSL placeholder */}
          <motion.div
            {...fadeIn(0.3)}
            className="relative mx-auto mb-5 max-w-3xl aspect-video rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="relative flex flex-col items-center gap-3 z-10">
                <div className="p-5 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                  <PlayCircle className="w-12 h-12 text-white" strokeWidth={1.2} />
                </div>
                <span className="text-white/60 text-xs font-mono uppercase tracking-[0.22em]">
                  VSL · Reproducir vídeo
                </span>
              </div>
            </div>
          </motion.div>

          <motion.p {...fadeIn(0.35)} className="text-white/45 text-xs sm:text-sm mb-6">
            Ve el vídeo completo antes de aplicar
          </motion.p>

          <motion.div {...fadeIn(0.4)}>
            <a
              href="#cta-final"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
            >
              Quiero aplicar con RDE Operators
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            {...fadeIn(0.5)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] text-white/55"
          >
            {["Sin compromiso", "Revisamos cada solicitud", "Respuesta en 48h"].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-white/80" />
                <span>{b}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============== 02 · PROBLEMA ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn(0.05)}>
            <SectionLabel index="02">Diagnóstico</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-3xl mb-14"
          >
            ¿Te suena <span className="font-display-italic text-gradient-mono-italic">familiar</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {[
              "Publicas constantemente pero tus ventas dependen de que sigas publicando",
              "Tienes audiencia o lista pero no sabes convertirla en clientes de forma predecible",
              "Probaste funnels, email y ads por tu cuenta pero nada funciona de forma consistente",
              "No tienes tiempo de aprender a automatizar y ejecutar a la vez",
            ].map((text, i) => (
              <motion.div
                key={i}
                {...fadeIn(0.1 + i * 0.05)}
                className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 sm:p-8 hover:border-white/25 hover:bg-white/[0.04] transition-colors"
              >
                <div className="font-mono text-[11px] text-white/35 mb-4">0{i + 1}</div>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeIn(0.4)}
            className="mt-14 text-center text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            El problema no eres tú. Es que nadie te enseñó a construir un sistema que{" "}
            <span className="font-display-italic text-white">venda mientras tú descansas</span>.
          </motion.p>
        </div>
      </section>

      {/* ============== 03 · ¿ES PARA TI? ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn(0.05)}>
            <SectionLabel index="03">Encaje</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-3xl mb-14"
          >
            ¿Es esto <span className="font-display-italic text-gradient-mono-italic">para ti</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* For you */}
            <motion.div
              {...fadeIn(0.15)}
              className="border border-white/15 rounded-2xl p-7 sm:p-9 bg-white/[0.03]"
            >
              <div className="flex items-center gap-2 mb-6 text-white">
                <Check className="w-5 h-5" strokeWidth={2.5} />
                <h3 className="text-xl sm:text-2xl font-medium">Es para ti si…</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Tienes un infoproducto, curso o servicio de conocimiento",
                  "Ya generas ventas pero quieres que sean predecibles",
                  "Estás dispuesto a construir un sistema a largo plazo",
                  "Facturas al menos 2.000€/mes con tu negocio actual",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-[15px] leading-relaxed">
                    <Check className="w-4 h-4 mt-1 flex-shrink-0 text-white/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not for you */}
            <motion.div
              {...fadeIn(0.2)}
              className="border border-white/10 rounded-2xl p-7 sm:p-9 bg-white/[0.01]"
            >
              <div className="flex items-center gap-2 mb-6 text-white/60">
                <X className="w-5 h-5" strokeWidth={2.5} />
                <h3 className="text-xl sm:text-2xl font-medium">No es para ti si…</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Buscas resultados de un día para otro",
                  "No tienes oferta ni audiencia definida",
                  "Quieres que lo hagamos todo sin tu implicación",
                  "Buscas el precio más bajo del mercado",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/55 text-[15px] leading-relaxed">
                    <X className="w-4 h-4 mt-1 flex-shrink-0 text-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 04 · METODOLOGÍA ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn(0.05)}>
            <SectionLabel index="04">Metodología</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-3xl mb-4"
          >
            Cómo construimos tu{" "}
            <span className="font-display-italic text-gradient-mono-italic">sistema</span>
          </motion.h2>
          <motion.p {...fadeIn(0.15)} className="text-white/55 text-base sm:text-lg mb-14">
            4 fases. Sin genéricos. Con implicación real.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                num: "①",
                Icon: Target,
                title: "Diagnóstico",
                text: "Analizamos tu oferta, audiencia y puntos de fuga. Identificamos dónde está el dinero que se escapa.",
              },
              {
                num: "②",
                Icon: MapIcon,
                title: "Estrategia",
                text: "Diseñamos el sistema completo: qué publicar, cómo captar leads, qué automatizar y cómo convertir.",
              },
              {
                num: "③",
                Icon: Zap,
                title: "Ejecución",
                text: "Implementamos funnels, secuencias, ads y CRM. Tú sigues vendiendo, nosotros construimos la máquina.",
              },
              {
                num: "④",
                Icon: TrendingUp,
                title: "Optimización",
                text: "Medimos, ajustamos y escalamos. No entregamos un proyecto y desaparecemos. Somos tu equipo de crecimiento.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                {...fadeIn(0.15 + i * 0.07)}
                className="border border-white/10 rounded-2xl p-7 sm:p-8 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-3xl text-white/70">{step.num}</span>
                  <div className="p-2.5 rounded-xl border border-white/15 bg-white/[0.04]">
                    <step.Icon className="w-4 h-4 text-white/80" />
                  </div>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 05 · CASOS ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn(0.05)}>
            <SectionLabel index="05">Casos</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight max-w-3xl mb-4"
          >
            Resultados que <span className="font-display-italic text-gradient-mono-italic">hablan</span>
          </motion.h2>
          <motion.p {...fadeIn(0.15)} className="text-white/55 text-base sm:text-lg mb-14">
            Negocios de conocimiento que escalaron con RDE Operators
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                {...fadeIn(0.15 + i * 0.05)}
                className="border border-white/10 rounded-2xl p-7 sm:p-9 bg-white/[0.02]"
              >
                <div className="flex items-start justify-between mb-6">
                  <Quote className="w-6 h-6 text-white/30" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/50 border border-white/15 rounded-full px-3 py-1">
                    Resultado real
                  </span>
                </div>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed italic mb-8">
                  [Testimonio de cliente — próximamente]
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15" />
                  <div>
                    <p className="text-white text-sm font-medium">Nombre</p>
                    <p className="text-white/45 text-xs">Nicho</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeIn(0.3)}
            className="text-center text-white/45 text-sm italic mt-10"
          >
            Actualmente incorporando los primeros casos documentados. ¿Quieres ser uno de ellos?
          </motion.p>
        </div>
      </section>

      {/* ============== 06 · GARANTÍA ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeIn(0.1)}
            className="border border-white/15 rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-white/[0.05] to-transparent text-center"
          >
            <div className="flex justify-center mb-7">
              <div className="p-4 rounded-2xl border border-white/20 bg-white/[0.05]">
                <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <SectionLabel index="06">Garantía</SectionLabel>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
              Nuestra garantía de{" "}
              <span className="font-display-italic text-gradient-mono-italic">trabajo</span>
            </h2>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-5">
              Si en 90 días no tienes un sistema de captación y conversión funcionando que mejore tus
              resultados actuales, seguimos trabajando sin coste adicional hasta lograrlo.
            </p>
            <p className="text-white/45 text-sm italic">
              No cobramos por consultorías. Cobramos por sistemas que funcionan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============== 07 · EQUIPO ============== */}
      <section className="border-b border-white/10 px-5 sm:px-10 md:px-16 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn(0.05)} className="flex justify-center">
            <SectionLabel index="07">Equipo</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
          >
            No somos una agencia{" "}
            <span className="font-display-italic text-gradient-mono-italic">al uso</span>
          </motion.h2>

          <motion.p
            {...fadeIn(0.15)}
            className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          >
            RDE Operators somos Rubén, Diego y Edu — tres operadores especializados en el crecimiento
            de negocios de conocimiento en el mercado hispanohablante. No vendemos servicios sueltos.
            Nos convertimos en el equipo de crecimiento de un número muy limitado de clientes, con
            implicación real en su estrategia y ejecución.
          </motion.p>

          <motion.div
            {...fadeIn(0.2)}
            className="relative aspect-[16/7] rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3 text-white/40">
              <Users className="w-10 h-10" strokeWidth={1.2} />
              <span className="text-xs font-mono uppercase tracking-[0.22em]">
                [Foto del equipo]
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== 08 · CTA FINAL ============== */}
      <section id="cta-final" className="px-5 sm:px-10 md:px-16 py-24 sm:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn(0.05)} className="flex justify-center">
            <SectionLabel index="08">Solicitar plaza</SectionLabel>
          </motion.div>

          <motion.h2
            {...fadeIn(0.1)}
            className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
          >
            Si estás listo para construir un sistema que{" "}
            <span className="font-display-italic text-gradient-mono-italic">escale</span> tu negocio —
            hablemos
          </motion.h2>

          <motion.p
            {...fadeIn(0.15)}
            className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Revisamos cada solicitud manualmente. Si vemos encaje, te contactamos en menos de 48h
            para una llamada de diagnóstico sin coste.
          </motion.p>

          <motion.div {...fadeIn(0.2)}>
            <a
              href="https://calendly.com/rubenmunooz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
            >
              Solicitar mi plaza ahora
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.p {...fadeIn(0.25)} className="mt-5 text-white/45 text-xs sm:text-sm">
            Sin compromiso. Sin presión. Solo una conversación.
          </motion.p>

          <motion.div
            {...fadeIn(0.3)}
            className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-[11px] uppercase tracking-[0.2em] text-white/60"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Plazas limitadas a 3 clientes por mes
          </motion.div>
        </div>
      </section>
    </div>
  );
}
