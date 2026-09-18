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
export const sitemapUrls: SitemapUrl[] = [];

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