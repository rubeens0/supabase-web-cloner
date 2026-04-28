import testRecasImg from '@/assets/test-recas-2026.jpg';
import albroksaImg from '@/assets/albroksa-patrocinio.jpeg';
import netproImg from '@/assets/netpro-logo.png';
import netspyImg from '@/assets/netspy-branding-new.jpg';
import cekZaragozaImg from '@/assets/cek-zaragoza.jpg';
import portadaExtremaduraImg from '@/assets/cek-2026-campillos-18.jpg';
import cajaRuralImg from '@/assets/caja-rural-extremadura.png';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from '../utils/performanceDetector';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export function Blog() {
  const { t, language } = useLanguage();
  const perfSettings = getPerformanceSettings();

  // Blog posts data - puedes añadir más posts aquí
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

  const containerVariants = perfSettings.simplifyAnimations 
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemVariants = perfSettings.simplifyAnimations
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-white mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
            >
              <motion.article
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3 text-white/50 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(
                          t('blog.locale'),
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white mb-2 group-hover:text-white/90 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors text-sm">
                    <span>{t('blog.readMore')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-white/60 text-sm">
              {t('blog.comingSoon')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}