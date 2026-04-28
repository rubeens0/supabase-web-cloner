import testRecasImg from '@/assets/test-recas-2026.jpg';
import albroksaImg from '@/assets/albroksa-patrocinio.jpeg';
import netproImg from '@/assets/netpro-new-logo.jpg';
import netspyImg from '@/assets/netspy-branding-new.jpg';
import cekZaragozaImg from '@/assets/cek-zaragoza.jpg';
import portadaExtremaduraImg from '@/assets/cek-2026-campillos-18.jpg';
import cajaRuralImg from '@/assets/caja-rural-extremadura.png';
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
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-10 md:px-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="N° 01">{t('nav.blog')}</SectionLabel>
          </motion.div>
          <motion.h1
            {...fadeIn(0.2)}
            className="mt-8 font-display leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
          >
            {t('blog.title')}
            <span className="font-display-italic text-gradient-mono-italic">.</span>
          </motion.h1>
          <motion.p
            {...fadeIn(0.3)}
            className="mt-8 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {t('blog.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ============== 02 · FEATURED ============== */}
      {feature && (
        <section className="border-b border-white/[0.08] px-5 sm:px-10 md:px-16 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <SectionLabel index="02">Featured</SectionLabel>
            <Link to={`/blog/${feature.id}`} className="block mt-8 group">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/10]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
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
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-5">
                    {feature.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-6">{feature.excerpt}</p>
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
      <section className="px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03">Archive</SectionLabel>

          <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {rest.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group grid grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 items-center hover:bg-white/[0.02] transition-colors -mx-3 px-3 rounded-lg"
              >
                <div className="col-span-12 sm:col-span-2 hidden sm:block">
                  <div className="aspect-[4/3] rounded-md overflow-hidden border border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-2 font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.18em]">
                  {new Date(post.date).toLocaleDateString(t('blog.locale'), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  <div className="mt-1">{post.category}</div>
                </div>
                <div className="col-span-10 sm:col-span-7">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight group-hover:translate-x-1 transition-transform">
                    {post.title}
                  </h3>
                  <p className="hidden sm:block mt-2 text-sm text-white/55 line-clamp-2 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm">{t('blog.comingSoon')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
