import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, ArrowDown, ArrowUpRight, Flag, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import logoWhite from "@/assets/logo-white-optimized.png";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { useLanguage } from "../contexts/LanguageContext";
import heroImage from "@/assets/home-hero-bg.webp";
import aboutImage from "@/assets/about-image.png";
import kartingImage from "@/assets/karting-image.webp";
import marketingImage from "@/assets/marketing-image.webp";
import portadaExtremaduraImg from "@/assets/cek-2026-campillos-18.jpg";
import testRecasImg from "@/assets/test-recas-2026.jpg";
import albroksaImg from "@/assets/albroksa-patrocinio.jpeg";
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from "../utils/performanceDetector";

/* ---------- Small editorial primitives ---------- */

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
      <span className="font-mono text-[hsl(var(--accent-red))]">{index}</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{children}</span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-red))]/35 bg-[hsl(var(--accent-red))]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[hsl(var(--accent-red-soft))]">
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-red))]" />
      {children}
    </span>
  );
}

/* ---------- Page ---------- */

export function Home() {
  const { t, getRoute } = useLanguage();
  const perfSettings = getPerformanceSettings();

  const heroImageVariant = perfSettings.simplifyAnimations
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: PREMIUM_ANIMATIONS.duration.fast } }
    : {
        initial: { scale: 1.05, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: PREMIUM_ANIMATIONS.duration.verySlow, ease: PREMIUM_ANIMATIONS.ease.premium },
      };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: perfSettings.simplifyAnimations ? 0.2 : 0.7,
      delay: perfSettings.simplifyAnimations ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  const latestPosts = [
    {
      id: "portada-extremadura-cek-r1",
      title: t("blog.portadaextremadura.title"),
      excerpt: t("blog.portadaextremadura.excerpt"),
      tag: t("blog.category.karting"),
      image: portadaExtremaduraImg,
      date: "23.03.2026",
    },
    {
      id: "test-recas-2026",
      title: t("blog.testrecas.title"),
      excerpt: t("blog.testrecas.excerpt"),
      tag: t("blog.category.karting"),
      image: testRecasImg,
      date: "22.02.2026",
    },
    {
      id: "albroksa-patrocinio",
      title: t("blog.albroksa.title"),
      excerpt: t("blog.albroksa.excerpt"),
      tag: t("blog.category.karting"),
      image: albroksaImg,
      date: "17.02.2026",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HERO ============== */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <motion.div
          {...heroImageVariant}
          className="absolute inset-0"
          style={perfSettings.simplifyAnimations ? {} : { willChange: "transform, opacity" }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Karting"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        {/* Editorial overlay: vertical fade + side vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Top meta bar */}
        <div className="absolute top-28 left-0 right-0 px-4 sm:px-10 md:px-16 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span className="font-mono">N° 01 — INDEX</span>
            <span className="hidden sm:inline">CÁCERES · ESPAÑA</span>
            <span className="font-mono">2026</span>
          </div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-10 md:px-16 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn(0.1)} className="mb-6">
              <Badge>Piloto · Fundador · 2026</Badge>
            </motion.div>

            <motion.h1
              {...fadeIn(0.2)}
              className="text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-[-0.02em] text-white mb-6 max-w-4xl"
              dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
            />

            <motion.div
              {...fadeIn(0.3)}
              className="flex items-center gap-4 mb-8 max-w-xl"
            >
              <span className="h-px w-10 bg-[hsl(var(--accent-red))] shrink-0" />
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                {t("home.hero.description")}
              </p>
            </motion.div>

            <motion.div
              {...fadeIn(0.4)}
              className="flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full h-12 px-7 bg-[hsl(var(--accent-red))] text-white hover:bg-[hsl(var(--accent-red-soft))] transition-colors gap-2"
              >
                {t("home.hero.cta")}
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Link to={getRoute("business")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full h-12 px-7 bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white hover:border-white/40 gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  {t("nav.business")}
                </Button>
              </Link>
              <Link to="/patrocinadores">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full h-12 px-7 bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white hover:border-white/40 gap-2"
                >
                  <Flag className="w-4 h-4" />
                  {t("footer.sponsors")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hairline at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ============== 02 · STATS / SOCIAL PROOF ============== */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-black p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Año de inicio</div>
              <div className="text-4xl sm:text-5xl font-light tracking-tight">
                2024<span className="text-[hsl(var(--accent-red))]">.</span>
              </div>
              <div className="text-xs text-white/50 mt-2">Built from scratch</div>
            </div>
            <div className="bg-black p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Frentes activos</div>
              <div className="text-4xl sm:text-5xl font-light tracking-tight">
                2<span className="text-[hsl(var(--accent-red))]"> / </span>
                <span className="text-white/40 text-2xl sm:text-3xl">karting · digital</span>
              </div>
              <div className="text-xs text-white/50 mt-2">Doble disciplina, mismo enfoque</div>
            </div>
            <div className="bg-black p-6 sm:p-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Campeonato</div>
              <div className="text-4xl sm:text-5xl font-light tracking-tight">
                CEK<span className="text-[hsl(var(--accent-red))]">.</span>
              </div>
              <div className="text-xs text-white/50 mt-2">Campeonato de España de Karting</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 03 · QUIÉN SOY (Dualidad) ============== */}
      <section id="about-section" className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 py-20 sm:py-28">
          <SectionLabel index="03">{t("home.about.title")}</SectionLabel>

          <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT: split dualidad + texto */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mb-10">
                <div className="bg-black p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">En la pista</div>
                  <div className="text-lg font-medium mb-2">{t("home.areas.karting.title")}</div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Competición, disciplina, cada curva entrenada.
                  </p>
                </div>
                <div className="bg-black p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Fuera de la pista</div>
                  <div className="text-lg font-medium mb-2">{t("home.areas.marketing.title")}</div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Proyectos digitales, audiencia, crecimiento desde cero.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-8 leading-[1.1]">
                {t("home.about.title")}
              </h2>
              <div className="space-y-5 text-white/70 max-w-xl leading-relaxed">
                <p>{t("home.about.p1")}</p>
                <p>{t("home.about.p2")}</p>
                <p>{t("home.about.p3")}</p>
              </div>

              <Link to="/contacto" className="inline-block mt-10">
                <Button
                  variant="outline"
                  className="rounded-full h-11 px-6 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white hover:border-white/40 gap-2"
                >
                  {t("home.about.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* RIGHT: image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src={aboutImage}
                  alt="Rubén Muñoz"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Driver · Creator · Strategist
                  </span>
                  <span className="font-mono text-[10px] text-[hsl(var(--accent-red-soft))]">2009 →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 04 · ÁREAS ============== */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 py-20 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <SectionLabel index="04">{t("home.areas.title")}</SectionLabel>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight max-w-2xl leading-[1.1]">
                {t("home.areas.subtitle")}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Karting */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                <ImageWithFallback
                  src={kartingImage}
                  alt="Karting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent-red-soft))]">
                    01 / Pista
                  </span>
                  <Flag className="w-4 h-4 text-white/30" />
                </div>
                <h3 className="text-2xl font-light mb-3">{t("home.areas.karting.title")}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">{t("home.areas.karting.p1")}</p>
                <p className="text-white/45 text-sm leading-relaxed">{t("home.areas.karting.p2")}</p>
              </div>
            </motion.div>

            {/* Marketing */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors"
            >
              <Link to="/marketing" className="block">
                <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                  <ImageWithFallback
                    src={marketingImage}
                    alt="Marketing Digital"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: "center 55%" }}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent-red-soft))]">
                      02 / Digital
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-light mb-3">{t("home.areas.marketing.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{t("home.areas.marketing.p1")}</p>
                  <p className="text-white/45 text-sm leading-relaxed">{t("home.areas.marketing.p2")}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 05 · BLOG EN HOME ============== */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel index="05">{t("nav.blog")}</SectionLabel>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                Últimas <span className="text-white/40">entradas</span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--accent-red-soft))] border border-[hsl(var(--accent-red))]/30 rounded-full px-2.5 py-1">
                      {post.tag}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">{post.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium leading-snug mb-2 group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link to="/blog">
              <Button
                variant="outline"
                className="w-full rounded-full h-11 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white gap-2"
              >
                Ver todas <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============== 06 · MANIFIESTO / QUOTE ============== */}
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-10 md:px-16 py-24 sm:py-32 text-center">
          <SectionLabel index="06">Manifiesto</SectionLabel>
          <div className="mt-8 mb-8 flex justify-center">
            <AnimatedLogo size={56} />
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-[1.3] tracking-tight text-white">
            {t("home.quote")}
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">{t("home.quote.author")}</p>
        </div>
      </section>

      {/* ============== 07 · CTA FINAL ============== */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16 py-20 sm:py-28">
          <div className="relative border border-white/10 rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(var(--accent-red))]/10 via-black to-black p-8 sm:p-14">
            {/* Decorative corner mark */}
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              N° 07 — CONTACT
            </div>
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[hsl(var(--accent-red))]/10 blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <Badge>Hablemos</Badge>
              <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6">
                ¿Tienes una <span className="text-[hsl(var(--accent-red-soft))]">propuesta</span>?
                <br />
                Siempre abierto a lo que tiene sentido.
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
                {t("home.about.p3")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contacto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full h-12 px-7 bg-[hsl(var(--accent-red))] text-white hover:bg-[hsl(var(--accent-red-soft))] gap-2"
                  >
                    {t("home.about.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to={getRoute("business")}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full h-12 px-7 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white hover:border-white/40"
                  >
                    {t("nav.business")}
                  </Button>
                </Link>
                <Link to="/patrocinadores">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full h-12 px-7 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white hover:border-white/40"
                  >
                    {t("footer.sponsors")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
