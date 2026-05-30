import testRecasImg from '@/assets/test-recas-2026.jpg';
import albroksaImg from '@/assets/albroksa-patrocinio.jpeg';
import netproImg from '@/assets/netpro-new-logo.jpg';
import netspyImg from '@/assets/netspy-branding-new.jpg';
import cekZaragozaImg from '@/assets/cek-zaragoza.jpg';
import portadaExtremaduraImg from '@/assets/cek-2026-campillos-18.jpg';
import cajaRuralImg from '@/assets/caja-rural-extremadura.png';
import webRedesignImg from '@/assets/website-redesign-2026.webp';
import ecomscrapeImg from '@/assets/ecomscrape-post.webp';
import motorlandImg from '@/assets/motorland-cek-r2.webp';
import motorlandRaceImg from '@/assets/motorland-cek-r2-race.jpeg';
import vlog1Img from '@/assets/vlog-1-motorland.jpg';
import fuelExtremImg from '@/assets/fuel-extrem-visita.webp';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getPerformanceSettings } from '../utils/performanceDetector';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-white">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Blog() {
  const { t } = useLanguage();
  const perfSettings = getPerformanceSettings();

  const blogPosts: BlogPost[] = [
    {
      id: 'portada-extremadura-cek-r1',
      title: t('blog.portadaextremadura.title'),
      excerpt: t('blog.portadaextremadura.excerpt'),
      date: '2026-03-23',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: portadaExtremaduraImg,
    },
    {
      id: 'test-recas-2026',
      title: t('blog.testrecas.title'),
      excerpt: t('blog.testrecas.excerpt'),
      date: '2026-02-22',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: testRecasImg,
    },
    {
      id: 'albroksa-patrocinio',
      title: t('blog.albroksa.title'),
      excerpt: t('blog.albroksa.excerpt'),
      date: '2026-02-17',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: albroksaImg,
    },
    {
      id: 'netpro-agency',
      title: t('blog.netpro.title'),
      excerpt: t('blog.netpro.excerpt'),
      date: '2026-01-16',
      readTime: '3 min',
      category: t('blog.category.marketing'),
      image: netproImg,
    },
    {
      id: 'netspy-emprendedores',
      title: t('blog.netspy.title'),
      excerpt: t('blog.netspy.excerpt'),
      date: '2025-11-05',
      readTime: '3 min',
      category: t('blog.category.marketing'),
      image: netspyImg,
    },
    {
      id: 'cek-zaragoza',
      title: t('blog.cek.title'),
      excerpt: t('blog.cek.excerpt'),
      date: '2025-09-20',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: cekZaragozaImg,
    },
    {
      id: 'caja-rural-extremadura-patrocinio',
      title: t('blog.cajarural.title'),
      excerpt: t('blog.cajarural.excerpt'),
      date: '2026-04-23',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: cajaRuralImg,
    },
    {
      id: 'website-redesign-2026',
      title: t('blog.webredesign.title'),
      excerpt: t('blog.webredesign.excerpt'),
      date: '2026-04-29',
      readTime: '4 min',
      category: t('blog.category.marketing'),
      image: webRedesignImg,
    },
    {
      id: 'ecomscrape-launch',
      title: t('blog.ecomscrape.title'),
      excerpt: t('blog.ecomscrape.excerpt'),
      date: '2026-05-01',
      readTime: '4 min',
      category: t('blog.category.marketing'),
      image: ecomscrapeImg,
    },
    {
      id: 'motorland-cek-r2',
      title: t('blog.motorland.title'),
      excerpt: t('blog.motorland.excerpt'),
      date: '2026-05-06',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: motorlandImg,
    },
    {
      id: 'vlog-1-motorland',
      title: t('blog.vlog1.title'),
      excerpt: t('blog.vlog1.excerpt'),
      date: '2026-05-14',
      readTime: '2 min',
      category: t('blog.category.karting'),
      image: vlog1Img,
    },
    {
      id: 'motorland-cek-r2-race',
      title: t('blog.motorlandrace.title'),
      excerpt: t('blog.motorlandrace.excerpt'),
      date: '2026-05-18',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: motorlandRaceImg,
    },
    {
      id: 'fuel-extrem-visita-ecuador-cek',
      title: t('blog.fuelextrem.title'),
      excerpt: t('blog.fuelextrem.excerpt'),
      date: '2026-05-25',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: fuelExtremImg,
    },
  ];

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: perfSettings.simplifyAnimations ? 0.2 : 0.7,
      delay: perfSettings.simplifyAnimations ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  const [feature, ...rest] = sortedPosts;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HERO ============== */}
      <section className="pt-24 sm:pt-40 pb-12 sm:pb-20 px-4 sm:px-10 md:px-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="N° 01">{t('nav.blog')}</SectionLabel>
          </motion.div>
          <motion.h1
            {...fadeIn(0.2)}
            className="mt-6 sm:mt-8 font-display leading-[0.92] text-[44px] sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
          >
            {t('blog.title')}
            <span className="font-display-italic text-gradient-mono-italic">.</span>
          </motion.h1>
          <motion.p
            {...fadeIn(0.3)}
            className="mt-5 sm:mt-8 text-white/60 text-sm sm:text-lg max-w-2xl leading-relaxed"
          >
            {t('blog.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============== 02 · FEATURED ============== */}
      {feature && (
        <section className="border-b border-white/[0.08] px-4 sm:px-10 md:px-16 py-12 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <SectionLabel index="02">Featured</SectionLabel>
            <Link to={`/blog/${feature.id}`} className="block mt-6 sm:mt-8 group">
              <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 lg:gap-12 items-stretch">
                <div className="w-full lg:w-7/12 shrink-0 relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/10]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="w-full lg:w-5/12 min-w-0 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-white border border-white/30 rounded-full px-2.5 py-1">
                      {feature.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {new Date(feature.date)
                        .toLocaleDateString(t('blog.locale'), {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">· {feature.readTime}</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-white leading-[1.05] tracking-tight mb-4 sm:mb-5 break-words">
                    {feature.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-5 sm:mb-6">{feature.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-white text-sm group-hover:gap-3 transition-all">
                    {t('blog.readMore')} <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============== 03 · ARCHIVE ============== */}
      <section className="px-4 sm:px-10 md:px-16 py-14 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03">Archive</SectionLabel>

          <div className="mt-8 sm:mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {rest.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex sm:grid sm:grid-cols-12 gap-3 sm:gap-8 py-4 sm:py-8 items-center hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-lg"
              >
                {/* Thumbnail — visible on all sizes for visual rhythm */}
                <div className="shrink-0 w-20 h-20 sm:w-auto sm:h-auto sm:col-span-2">
                  <div className="w-full h-full sm:aspect-[4/3] rounded-md overflow-hidden border border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                {/* Date column hidden on mobile, shown on sm+ */}
                <div className="hidden sm:block sm:col-span-2 font-mono text-[11px] text-white/40 uppercase tracking-[0.18em]">
                  {new Date(post.date).toLocaleDateString(t('blog.locale'), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  <div className="mt-1">{post.category}</div>
                </div>
                {/* Title + meta */}
                <div className="flex-1 min-w-0 sm:col-span-7">
                  <div className="flex sm:hidden items-center gap-2 mb-1.5 font-mono text-[10px] text-white/40 uppercase tracking-[0.16em]">
                    <span>{new Date(post.date).toLocaleDateString(t('blog.locale'), { month: 'short', day: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span className="truncate">{post.category}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-3xl md:text-4xl text-white leading-tight tracking-tight group-hover:translate-x-1 transition-transform line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="hidden sm:block mt-2 text-sm text-white/55 line-clamp-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="shrink-0 sm:col-span-1 flex justify-end">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <div className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs sm:text-sm">{t('blog.comingSoon')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
