/**
 * Sitemap Generator Utility
 * Generador de sitemap para rubenmunoz.com
 * 
 * Este archivo contiene la estructura de URLs para generar el sitemap.xml
 * Actualiza las fechas y prioridades según sea necesario.
 */

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    hreflang: string;
    href: string;
  }[];
}

export const sitemapConfig = {
  domain: 'https://rubenmunoz.com',
  defaultChangefreq: 'monthly' as const,
  defaultPriority: 0.5,
};

/**
 * Estructura de todas las URLs del sitio
 */
export const sitemapUrls: SitemapUrl[] = [
  // Home Pages (Prioridad máxima)
  {
    loc: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
    alternates: [
      { hreflang: 'es', href: '/inicio' },
      { hreflang: 'en', href: '/home' },
    ],
  },
  {
    loc: '/inicio',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
    alternates: [
      { hreflang: 'es', href: '/inicio' },
      { hreflang: 'en', href: '/home' },
    ],
  },
  {
    loc: '/home',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
    alternates: [
      { hreflang: 'es', href: '/inicio' },
      { hreflang: 'en', href: '/home' },
    ],
  },

  // Gallery Pages
  {
    loc: '/galeria',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
    alternates: [
      { hreflang: 'es', href: '/galeria' },
      { hreflang: 'en', href: '/gallery' },
    ],
  },
  {
    loc: '/gallery',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
    alternates: [
      { hreflang: 'es', href: '/galeria' },
      { hreflang: 'en', href: '/gallery' },
    ],
  },

  // Business Pages (Alta prioridad - Actualizado recientemente)
  {
    loc: '/business',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: '/marketing',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },

  // Blog (Alta prioridad - Se actualiza regularmente)
  {
    loc: '/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },

  // Blog Posts
  {
    loc: '/blog/test-recas-2026',
    lastmod: '2026-03-15',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/blog/albroksa-patrocinio',
    lastmod: '2026-02-17',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/blog/netpro-agency',
    lastmod: '2026-01-16',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/blog/netspy-emprendedores',
    lastmod: '2025-11-05',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/blog/cek-zaragoza',
    lastmod: '2025-09-20',
    changefreq: 'monthly',
    priority: 0.8,
  },

  // Sponsors Pages
  {
    loc: '/patrocinios',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
    alternates: [
      { hreflang: 'es', href: '/patrocinios' },
      { hreflang: 'en', href: '/sponsors' },
    ],
  },
  {
    loc: '/sponsors',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
    alternates: [
      { hreflang: 'es', href: '/patrocinios' },
      { hreflang: 'en', href: '/sponsors' },
    ],
  },

  // Contact Pages
  {
    loc: '/contacto',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.7,
    alternates: [
      { hreflang: 'es', href: '/contacto' },
      { hreflang: 'en', href: '/contact' },
    ],
  },
  {
    loc: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.7,
    alternates: [
      { hreflang: 'es', href: '/contacto' },
      { hreflang: 'en', href: '/contact' },
    ],
  },

  // Dossier Page
  {
    loc: '/dossier',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  },

  // CEK 2026 Pages
  {
    loc: '/2026',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: '/cek2026',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
];

/**
 * Genera el contenido XML del sitemap
 */
export function generateSitemapXML(urls: SitemapUrl[] = sitemapUrls): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urlEntries = urls
    .map((url) => {
      const loc = `${sitemapConfig.domain}${url.loc}`;
      const alternates = url.alternates
        ? url.alternates
            .map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${sitemapConfig.domain}${alt.href}" />`
            )
            .join('\n')
        : '';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>${alternates ? '\n' + alternates : ''}
  </url>`;
    })
    .join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
}

/**
 * Obtiene las URLs del blog desde los datos
 * Útil para generar automáticamente las entradas del blog en el sitemap
 */
export function getBlogPostUrls(posts: Array<{ id: string; date: string }>): SitemapUrl[] {
  return posts.map((post) => ({
    loc: `/blog/${post.id}`,
    lastmod: post.date,
    changefreq: 'monthly' as const,
    priority: 0.8,
  }));
}

/**
 * Ejemplo de uso para generar el sitemap completo
 * 
 * import { generateSitemapXML, sitemapUrls } from './utils/sitemapGenerator';
 * 
 * const sitemapXML = generateSitemapXML(sitemapUrls);
 * console.log(sitemapXML);
 */