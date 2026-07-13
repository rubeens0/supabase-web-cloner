import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, ArrowDown, ArrowUpRight, Flag, Calendar } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { AnimatedLogo } from "../components/AnimatedLogo";
import { YoutubeRecent } from "../components/YoutubeRecent";
import { useLanguage } from "../contexts/LanguageContext";
import { useRef } from "react";
import { LIVE_RACE_ACTIVE, CURRENT_RACE } from "@/config/liveRace";
import logoWhiteMark from "@/assets/x-logo-white.png";
import aboutImage from "@/assets/about-image.webp";
import aboutImageAlt from "@/assets/ruben-portrait-grid.jpg";
import { ImageCompareSlider } from "@/components/ImageCompareSlider";
import kartingImage from "@/assets/karting-image.webp";
import torsoImage from "@/assets/ruben-karting-torso.jpg.asset.json";
import marketingImage from "@/assets/marketing-image.webp";
import portadaExtremaduraImg from "@/assets/cek-2026-campillos-18.jpg";
import testRecasImg from "@/assets/test-recas-2026.jpg";
import albroksaImg from "@/assets/albroksa-patrocinio.jpeg";
import netproImg from "@/assets/netpro-new-logo.jpg";
import cekZaragozaImg from "@/assets/cek-zaragoza.jpg";
import cajaRuralImg from "@/assets/caja-rural-extremadura.png";
import motorlandImg from "@/assets/motorland-cek-r2.webp";
import motorlandRaceImg from "@/assets/motorland-cek-r2-race.jpeg";
import vlog1Img from "@/assets/vlog-1-motorland.jpg";
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from "../utils/performanceDetector";

/* ---------- Editorial primitives ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

/* ---------- Cinematic Blog Card with Parallax ---------- */

function CinematicBlogCard({
  post,
  index,
}: {
  post: { id: string; title: string; excerpt: string; tag: string; image: string; date: string };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/blog/${post.id}`}
        className="group relative block w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors"
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          style={{ y: imageY }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* Tag badge top-left */}
        <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
            {post.tag}
          </span>
        </div>

        {/* Content bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-4 max-w-4xl">
            {post.title}
          </h3>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-white/40">{post.date}</span>
            <span className="inline-flex items-center gap-1.5 text-white/70 text-sm group-hover:text-white group-hover:gap-2.5 transition-all">
              Leer más <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- Word-by-word scroll reveal ---------- */

function ScrollRevealQuote({ text, author }: { text: string; author: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const words = text.replace(/^"|"$/g, "").split(" ");

  return (
    <div ref={containerRef}>
      <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight">
        <span className="font-display-italic text-gradient-mono-italic">"</span>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return <ScrollWord key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
        <span className="font-display-italic text-gradient-mono-italic">"</span>
      </blockquote>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
        {author}
      </p>
    </div>
  );
}

function ScrollWord({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [range[0], range[1]], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

/* ---------- SVG line draw between sections ---------- */

function SectionDividerLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={ref} className="flex justify-center py-4 overflow-hidden">
      <svg width="2" height="80" viewBox="0 0 2 80" className="text-white/20">
        <motion.line
          x1="1" y1="0" x2="1" y2="80"
          stroke="currentColor"
          strokeWidth="1"
          style={{ pathLength }}
        />
      </svg>
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

  /* Multidirectional reveal helper */
  const slideIn = (direction: "left" | "right" | "up", delay = 0) => ({
    initial: {
      opacity: 0,
      x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
      y: direction === "up" ? 40 : 0,
    },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  const allPosts = [
    {
      id: "motorland-cek-r2-race",
      title: t("blog.motorlandrace.title"),
      excerpt: t("blog.motorlandrace.excerpt"),
      tag: t("blog.category.karting"),
      image: motorlandRaceImg,
      date: "2026-05-18",
    },
    {
      id: "vlog-1-motorland",
      title: t("blog.vlog1.title"),
      excerpt: t("blog.vlog1.excerpt"),
      tag: t("blog.category.karting"),
      image: vlog1Img,
      date: "2026-05-14",
    },
    {
      id: "motorland-cek-r2",
      title: t("blog.motorland.title"),
      excerpt: t("blog.motorland.excerpt"),
      tag: t("blog.category.karting"),
      image: motorlandImg,
      date: "2026-05-06",
    },
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
      {/* ============== HOME INTRO OVERLAY — logo reveal ============== */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, delay: 2.6, ease: [0.65, 0, 0.35, 1] }}
        onAnimationComplete={() => {
          const el = document.getElementById("home-intro-overlay");
          if (el) el.style.display = "none";
        }}
        id="home-intro-overlay"
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none overflow-hidden"
      >
        {/* Subtle radial glow behind the mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.6, 0.35], scale: [0.6, 1.1, 1.2] }}
          transition={{ duration: 3.2, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[60vmin] h-[60vmin] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 65%)" }}
        />

        {/* Logo + line stacked so they never overlap */}
        <div className="relative flex flex-col items-center">
          <motion.img
            src={logoWhiteMark}
            alt="Rubén Muñoz"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(14px)" }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.7, 1, 1, 1.04],
              filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{ duration: 3.2, times: [0, 0.45, 0.85, 1], ease: [0.22, 1, 0.36, 1] }}
            className="w-44 sm:w-56 md:w-72 h-auto drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]"
          />
          {/* Thin line sweep under the mark */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1], opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.6, delay: 0.8, times: [0, 0.5, 1], ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 h-px w-40 sm:w-56 bg-white/60 origin-center"
          />
        </div>
      </motion.div>

      {/* ============== 01 · HERO — Fully centered ============== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 2.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={perfSettings.simplifyAnimations ? {} : { willChange: "transform, opacity" }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Karting"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width={1920}
            height={1080}
          />
        </motion.div>

        {/* Radial vignette centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.4 }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Centered content */}
        <div className="relative z-10 w-full px-6 sm:px-10 flex flex-col items-center justify-center text-center">

          {/* Centered logo mark */}
          <motion.img
            src={logoWhiteMark}
            alt="Rubén Muñoz"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 3.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-48 sm:w-64 md:w-80 lg:w-[22rem] h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 4.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-14"
          >
            <button
              onClick={() =>
                document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-3 bg-white text-black font-medium rounded-full pl-6 pr-2 py-2 text-sm hover:bg-white/90 transition-colors group"
            >
              <span>{t("home.hero.cta")}</span>
              <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                <ArrowDown className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

          {/* Secondary links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 4.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-white/50"
          >
            {LIVE_RACE_ACTIVE && (
              <Link
                to="/live-timing-streaming"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-red-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Directo CEK <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
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

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 4.9 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>



      {/* SVG line draw transition */}
      <SectionDividerLine />

      {/* ============== LIVE CEK BANNER ============== */}
      {LIVE_RACE_ACTIVE && (
        <section className="border-y border-red-500/30 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent">
          <Link
            to="/live-timing-streaming"
            className="block max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-5 sm:py-6 group"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-[10px] font-bold tracking-[0.22em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Live
                </span>
                <div>
                  <p className="font-display text-xl sm:text-2xl text-white leading-tight">
                    Directo CEK {CURRENT_RACE.round} — <span className="font-display-italic text-gradient-mono-italic"> Valencia</span>
                  </p>
                  <p className="text-white/55 text-xs sm:text-sm mt-1">
                    Live timing & streaming · {CURRENT_RACE.datesEs}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-white group-hover:gap-3 transition-all whitespace-nowrap">
                Acceder al directo <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ============== 02 · SOCIAL PROOF ============== */}
      <section className="border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-3xl">
              <span className="font-display-italic text-gradient-mono-italic">{t("home.proof.headlineA")}</span> {t("home.proof.headlineB")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-6 border-t border-white/[0.08]">
            {/* Stats enter from different directions */}
            <motion.div {...slideIn("left", 0)}>
              <div className="font-display text-5xl sm:text-6xl text-white mb-2 tracking-tight">
                Netpro Agency<span className="text-secondary">.</span>
              </div>
              <p className="text-sm text-white/50">{t("home.proof.stat1.label")}</p>
            </motion.div>
            <motion.div {...slideIn("up", 0.1)}>
              <div className="font-display text-5xl sm:text-6xl text-white mb-2 tracking-tight">
                CEK<span className="text-secondary">.</span>
              </div>
              <p className="text-sm text-white/50">{t("home.proof.stat2.label")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 03 · QUIÉN SOY — Sticky headline ============== */}
      <section id="about-section" className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <SectionLabel>{t("home.about.title")}</SectionLabel>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <motion.h2
                {...slideIn("left")}
                className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight mb-10"
              >
                {t("home.about.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.about.headlineB")}</span>
                <br />
                {t("home.about.headlineC")}
              </motion.h2>

              <div className="space-y-5 text-white/70 max-w-xl leading-relaxed text-[15px]">
                <motion.p {...slideIn("left", 0.1)}>{t("home.about.p1")}</motion.p>
                <motion.p {...slideIn("left", 0.15)}>{t("home.about.p2")}</motion.p>
                <motion.p {...slideIn("left", 0.2)}>{t("home.about.p3")}</motion.p>
              </div>

              <motion.div {...slideIn("left", 0.25)}>
                <Link to="/contacto" className="inline-block mt-10">
                  <Button
                    variant="outline"
                    className="rounded-full h-11 px-6 border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-2"
                  >
                    {t("home.about.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              {...slideIn("right", 0.1)}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group">
                <ImageCompareSlider
                  beforeSrc={aboutImage}
                  afterSrc={aboutImageAlt}
                  beforeAlt="Rubén Muñoz"
                  afterAlt="Rubén Muñoz en parrilla"
                  initial={55}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <p className="font-display-italic text-2xl text-white">
                    Driver, creator <span className="text-secondary">&</span> strategist.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 mt-2">
                    Cáceres · 2009 →
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 04 · ÁREAS — Alternating slide in ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <div className="mb-14 max-w-3xl">
            <SectionLabel>{t("home.areas.title")}</SectionLabel>
            <motion.h2
              {...slideIn("up")}
              className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight"
            >
              {t("home.areas.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.areas.headlineB")}</span> {t("home.areas.headlineC")}
            </motion.h2>
            <motion.p {...slideIn("up", 0.1)} className="mt-5 text-white/55 text-[15px] leading-relaxed">
              {t("home.areas.subtitle")}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              {...slideIn("left", 0)}
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
                <p className="text-white/70 text-sm leading-relaxed">{t("home.areas.karting.p2")}</p>
              </div>
            </motion.div>

            <motion.div
              {...slideIn("right", 0.1)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors"
            >
              <Link to="/marketing" className="block">
                <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                  <ImageWithFallback
                    src={torsoImage.url}
                    alt="Emprendimiento"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">02 / Emprendimiento</span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl mb-3 text-white">{t("home.areas.marketing.title")}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">{t("home.areas.marketing.p1")}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{t("home.areas.marketing.p2")}</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== 05 · BLOG — Cinematic Full-Width ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel>{t("nav.blog")}</SectionLabel>
              <motion.h2
                {...slideIn("up")}
                className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight"
              >
                {t("home.blog.headlineA")} <span className="font-display-italic text-gradient-mono-italic">{t("home.blog.headlineB")}</span>.
              </motion.h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("home.blog.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cinematic cards */}
          <div className="space-y-6">
            {latestPosts.map((post, i) => (
              <CinematicBlogCard key={post.id} post={post} index={i} />
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

      {/* SVG line draw transition */}
      <SectionDividerLine />

      {/* ============== 06 · YOUTUBE ============== */}
      <YoutubeRecent />

      {/* SVG line draw transition */}
      <SectionDividerLine />

      {/* ============== 07 · MANIFIESTO — Word-by-word reveal ============== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-16 sm:py-24 text-center">
          <SectionLabel>Manifiesto</SectionLabel>
          <div className="mt-10 mb-10 flex justify-center">
            <AnimatedLogo size={56} />
          </div>
          <ScrollRevealQuote
            text={t("home.quote")}
            author={t("home.quote.author")}
          />
        </div>
      </section>

      {/* ============== 08 · CTA FINAL ============== */}
      <section>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-white/10 rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/15 via-black to-black p-8 sm:p-16"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl">
              <SectionLabel>Hablemos</SectionLabel>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
