import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, ArrowDown, ArrowUpRight, Flag, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { useLanguage } from "../contexts/LanguageContext";
import heroImage from "@/assets/hero-bg.webp";
import aboutImage from "@/assets/about-image.png";
import kartingImage from "@/assets/karting-image.webp";
import marketingImage from "@/assets/marketing-image.webp";
import portadaExtremaduraImg from "@/assets/cek-2026-campillos-18.jpg";
import testRecasImg from "@/assets/test-recas-2026.jpg";
import albroksaImg from "@/assets/albroksa-patrocinio.jpeg";
import netproImg from "@/assets/netpro-new-logo.jpg";
import netspyImg from "@/assets/netspy-branding-new.jpg";
import cekZaragozaImg from "@/assets/cek-zaragoza.jpg";
import cajaRuralImg from "@/assets/caja-rural-extremadura.png";
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from "../utils/performanceDetector";

/* ---------- Editorial primitives ---------- */

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-secondary">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
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

  const allPosts = [
    {
      id: "caja-rural-extremadura-patrocinio",
      title: t("blog.cajarural.title"),
      excerpt: t("blog.cajarural.excerpt"),
      tag: t("blog.category.karting"),
      image: cajaRuralImg,
      date: "2026-04-23",
    },
    {
      id: "portada-extremadura-cek-r1",
      title: t("blog.portadaextremadura.title"),
      excerpt: t("blog.portadaextremadura.excerpt"),
      tag: t("blog.category.karting"),
      image: portadaExtremaduraImg,
      date: "2026-03-23",
    },
    {
      id: "test-recas-2026",
      title: t("blog.testrecas.title"),
      excerpt: t("blog.testrecas.excerpt"),
      tag: t("blog.category.karting"),
      image: testRecasImg,
      date: "2026-02-22",
    },
    {
      id: "albroksa-patrocinio",
      title: t("blog.albroksa.title"),
      excerpt: t("blog.albroksa.excerpt"),
      tag: t("blog.category.karting"),
      image: albroksaImg,
      date: "2026-02-17",
    },
    {
      id: "netpro-agency",
      title: t("blog.netpro.title"),
      excerpt: t("blog.netpro.excerpt"),
      tag: t("blog.category.marketing"),
      image: netproImg,
      date: "2026-01-16",
    },
    {
      id: "netspy-emprendedores",
      title: t("blog.netspy.title"),
      excerpt: t("blog.netspy.excerpt"),
      tag: t("blog.category.marketing"),
      image: netspyImg,
      date: "2025-11-05",
    },
    {
      id: "cek-zaragoza",
      title: t("blog.cek.title"),
      excerpt: t("blog.cek.excerpt"),
      tag: t("blog.category.karting"),
      image: cekZaragozaImg,
      date: "2025-09-20",
    },
  ];

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    return `${d}.${m}.${y}`;
  };

  const latestPosts = [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((p) => ({ ...p, date: formatDate(p.date) }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HERO — Editorial Slash style ============== */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-32 sm:pt-40 pb-12 sm:pb-20">
        {/* Background image with strong fade */}
        <motion.div
          {...heroImageVariant}
          className="absolute inset-0"
          style={perfSettings.simplifyAnimations ? {} : { willChange: "transform, opacity" }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Karting"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />

        <div className="relative z-10 w-full px-5 sm:px-10 md:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn(0.1)} className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50">
              <span className="font-mono text-secondary">N° 01</span>
              <span className="h-px w-10 bg-white/20" />
              <span>{t("home.hero.kicker")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: perfSettings.simplifyAnimations ? 0.2 : 0.7,
                delay: perfSettings.simplifyAnimations ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="font-display leading-[0.95] sm:text-7xl md:text-8xl lg:text-[140px] text-white mb-10 max-w-5xl tracking-[-0.02em] text-5xl"
            >
              {t("home.hero.titleA")}{" "}
              <span className="font-display-italic text-gradient-mono-italic">{t("home.hero.titleB")}</span>
              <br />
              {t("home.hero.titleC")}{" "}
              <span className="font-display-italic">{t("home.hero.titleD")}</span>
              <span className="text-secondary">.</span>
            </motion.h1>

            <motion.p
              {...fadeIn(0.3)}
              className="text-[15px] sm:text-base md:text-lg text-white/65 leading-relaxed max-w-xl mb-10"
            >
              {t("home.hero.description")}
            </motion.p>

            {/* Slash-style CTA bar (input + button) */}
            <motion.div {...fadeIn(0.4)} className="max-w-xl mb-6">
              <button
                onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full flex items-center justify-between gap-3 bg-white/[0.04] border border-white/15 rounded-full p-1.5 pl-6 hover:border-white/30 transition-colors group"
              >
                <span className="text-white/55 text-[14px] sm:text-[15px]">{t("home.hero.placeholder")}</span>
                <span className="bg-white text-black font-medium rounded-full px-5 sm:px-6 py-3 text-sm flex items-center gap-2 group-hover:bg-black group-hover:text-white transition-colors whitespace-nowrap border border-transparent group-hover:border-white/30">
                  {t("home.hero.cta")} <ArrowDown className="w-3.5 h-3.5" />
                </span>
              </button>
            </motion.div>

            <motion.div {...fadeIn(0.5)} className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/45">
              <Link to={getRoute("business")} className="hover:text-white transition-colors inline-flex items-center gap-1">
                {t("nav.business")} <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link to={getRoute("sponsors")} className="hover:text-white transition-colors inline-flex items-center gap-1">
                {t("footer.sponsors")} <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link to="/2026" className="hover:text-white transition-colors inline-flex items-center gap-1">
                {t("home.hero.season")} <ArrowUpRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 02 · SOCIAL PROOF ============== */}
      <section className="border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <div className="mb-10">
            <p className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-3xl">
              <span className="font-display-italic text-gradient-mono-italic">{t("home.proof.headlineA")}</span> {t("home.proof.headlineB")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 pt-6 border-t border-white/[0.08]">
            <div>
              <div className="font-display text-5xl sm:text-6xl text-white mb-2 tracking-tight">
                2024<span className="text-secondary">.</span>
              </div>
              <p className="text-sm text-white/50">{t("home.proof.stat1.label")}</p>
            </div>
            <div>
              <div className="font-display text-5xl sm:text-6xl text-white mb-2 tracking-tight">
                CEK<span className="text-secondary">.</span>
              </div>
              <p className="text-sm text-white/50">{t("home.proof.stat2.label")}</p>
            </div>
            <div>
              <div className="font-display text-5xl sm:text-6xl text-white mb-2 tracking-tight">
                <span className="text-primary">{t("home.proof.stat3.value")}</span>
              </div>
              <p className="text-sm text-white/50">{t("home.proof.stat3.label")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 03 · QUIÉN SOY ============== */}
      <section id="about-section" className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-20 sm:py-32">
          <SectionLabel index="03">{t("home.about.title")}</SectionLabel>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight mb-10">
                {t("home.about.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.about.headlineB")}</span>
                <br />
                {t("home.about.headlineC")}
              </h2>

              <div className="space-y-5 text-white/70 max-w-xl leading-relaxed text-[15px]">
                <p>{t("home.about.p1")}</p>
                <p>{t("home.about.p2")}</p>
                <p>{t("home.about.p3")}</p>
              </div>

              <Link to="/contacto" className="inline-block mt-10">
                <Button
                  variant="outline"
                  className="rounded-full h-11 px-6 border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-2"
                >
                  {t("home.about.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback src={aboutImage} alt="Rubén Muñoz" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display-italic text-2xl text-white">
                    Driver, creator <span className="text-secondary">&</span> strategist.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 mt-2">
                    Cáceres · 2009 →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 04 · ÁREAS ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-20 sm:py-32">
          <div className="mb-14 max-w-3xl">
            <SectionLabel index="04">{t("home.areas.title")}</SectionLabel>
            <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight">
              {t("home.areas.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.areas.headlineB")}</span> {t("home.areas.headlineC")}
            </h2>
            <p className="mt-5 text-white/55 text-[15px] leading-relaxed">{t("home.areas.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors"
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">01 / Pista</span>
                  <Flag className="w-4 h-4 text-white/30" />
                </div>
                <h3 className="font-display text-3xl mb-3 text-white">{t("home.areas.karting.title")}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-3">{t("home.areas.karting.p1")}</p>
                <p className="text-white/40 text-sm leading-relaxed">{t("home.areas.karting.p2")}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors"
            >
              <Link to="/marketing" className="block">
                <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                  <ImageWithFallback
                    src={marketingImage}
                    alt="Emprendimiento"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: "center 55%" }}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">02 / Emprendimiento</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl mb-3 text-white">{t("home.areas.marketing.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{t("home.areas.marketing.p1")}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{t("home.areas.marketing.p2")}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 05 · BLOG ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-20 sm:py-32">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel index="05">{t("nav.blog")}</SectionLabel>
              <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight">
                {t("home.blog.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.blog.headlineB")}</span>.
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("home.blog.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors"
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
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-secondary border border-secondary/30 rounded-full px-2.5 py-1">
                      {post.tag}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">{post.date}</span>
                  </div>
                  <h3 className="font-display text-xl leading-tight mb-3 text-white group-hover:text-white">
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
                className="w-full rounded-full h-11 border-white/20 bg-transparent text-white hover:bg-white hover:text-black gap-2"
              >
                {t("home.blog.viewAll")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============== 06 · YOUTUBE ============== */}
      <YoutubeRecent />

      {/* ============== 07 · MANIFIESTO ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-24 sm:py-40 text-center">
          <SectionLabel index="07">Manifiesto</SectionLabel>
          <div className="mt-10 mb-10 flex justify-center">
            <AnimatedLogo size={56} />
          </div>
          <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight">
            <span className="font-display-italic text-gradient-mono-italic">"</span>
            {t("home.quote").replace(/^"|"$/g, "")}
            <span className="font-display-italic text-gradient-mono-italic">"</span>
          </blockquote>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {t("home.quote.author")}
          </p>
        </div>
      </section>

      {/* ============== 07 · CTA FINAL ============== */}
      <section>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-20 sm:py-32">
          <div className="relative border border-white/10 rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/15 via-black to-black p-8 sm:p-16">
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
              N° 07 — CONTACT
            </div>
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <SectionLabel index="07">Hablemos</SectionLabel>
              <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight mb-8">
                ¿Tienes una <span className="font-display-italic text-gradient-mono-italic">propuesta</span>?
                <br />
                Hablemos.
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
                Siempre abierto a lo que tiene sentido. Proyectos, colaboraciones, patrocinios.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    // @ts-ignore
                    if (window.Calendly) {
                      // @ts-ignore
                      window.Calendly.initPopupWidget({
                        url: 'https://calendly.com/rubenmunooz/30min',
                        color: '#ffffff',
                        textColor: '#000000',
                        branding: true,
                      });
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 bg-gradient-mono text-black font-medium text-sm hover:brightness-110 transition-all border border-white/20 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]"
                >
                  <Calendar className="w-4 h-4" />
                  {t('business.schedule')}
                </button>
                <Link to="/contacto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full h-12 px-7 bg-white text-black hover:bg-white/90 gap-2"
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
