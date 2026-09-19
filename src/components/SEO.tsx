import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: object; // Allow custom structured data
}

export function SEO({ 
  title, 
  description, 
  keywords,
  ogImage = 'https://rubenmunoz.com/og-image.jpg',
  ogType = 'website',
  canonical,
  structuredData
}: SEOProps) {
  const location = useLocation();
  const { language } = useLanguage();

  // SEO content based on language
  const defaultSEO = {
    es: {
      title: 'Rubén Muñoz | Negocio y Marketing Digital',
      description: 'Estrategia, diseño y marketing digital para marcas y negocios que crecen.',
      keywords: 'Rubén Muñoz, marketing digital, Netpro Agency, diseño web, identidad visual, redes sociales'
    },
    en: {
      title: 'Rubén Muñoz | Business & Digital Marketing',
      description: 'Strategy, design and digital marketing for brands and businesses that grow.',
      keywords: 'Rubén Muñoz, digital marketing, Netpro Agency, web design, visual identity, social media'
    }
  };

  const pathMeta: Record<string, { title: string; description: { es: string; en: string } }> = {
    '/': { title: language === 'es' ? 'Inicio' : 'Home', description: {
       es: 'Negocio, estrategia, diseño y marketing digital con Rubén Muñoz.',
       en: 'Business, strategy, design and digital marketing with Rubén Muñoz.'
    }},
    // Language aliases resolve to these four primary pages.
  };

  const seoContent = defaultSEO[language];
  // Map alias routes to their primary/canonical route so social previews
  // and search engagement consolidate on a single URL per page.
  const aliasToPrimary: Record<string, string> = {
    '/inicio': '/',
    '/home': '/',
    '/contacto': '/',
    '/contact': '/',
    '/business': '/',
    '/marketing': '/',
    '/booking': '/',
  };
  const primaryPath = aliasToPrimary[location.pathname] ?? location.pathname;
  // Use the primary route's metadata for aliases so title/description match
  // the canonical URL (no duplicate content signals across alias routes).
  const pageMeta = pathMeta[primaryPath];
  const pageTitle = title || (pageMeta
    ? `${pageMeta.title} | Rubén Muñoz`
    : seoContent.title);
  const pageDescription = description || (pageMeta ? pageMeta.description[language] : seoContent.description);
  const pageKeywords = keywords || seoContent.keywords;
  const pageUrl = canonical || `https://rubenmunoz.com${primaryPath}`;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    updateMeta('description', pageDescription);
    updateMeta('keywords', pageKeywords);
    updateMeta('author', 'Rubén Muñoz');
    updateMeta('robots', 'noindex, nofollow, noarchive');
    updateMeta('googlebot', 'noindex, nofollow, noarchive');
    updateMeta('language', language === 'es' ? 'Spanish' : 'English');
    document.querySelector('meta[name="geo.region"]')?.remove();
    document.querySelector('meta[name="geo.placename"]')?.remove();

    // Open Graph meta tags
    updateMeta('', pageTitle, 'og:title');
    updateMeta('', pageDescription, 'og:description');
    updateMeta('', pageUrl, 'og:url');
    updateMeta('', ogType, 'og:type');
    updateMeta('', ogImage, 'og:image');
    updateMeta('', 'Rubén Muñoz', 'og:site_name');
    updateMeta('', language === 'es' ? 'es_ES' : 'en_US', 'og:locale');

    // Twitter Card meta tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', pageTitle);
    updateMeta('twitter:description', pageDescription);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:creator', '@rubenmunooz_');
    updateMeta('twitter:site', '@rubenmunooz_');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = pageUrl;

    // Alternate language links
    const updateAlternate = (hreflang: string, href: string) => {
      const selector = `link[hreflang="${hreflang}"]`;
      let link = document.querySelector(selector) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      
      link.href = href;
    };

    updateAlternate('es', `https://rubenmunoz.com${primaryPath}`);
    updateAlternate('en', `https://rubenmunoz.com${primaryPath}`);
    updateAlternate('x-default', 'https://rubenmunoz.com/');

    // Structured data (JSON-LD)
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Rubén Muñoz',
      alternateName: 'Netpro Agency',
      description: pageDescription,
      url: 'https://rubenmunoz.com',
      image: ogImage,
      sameAs: [
        'https://www.instagram.com/rrxxczzz'
      ],
      knowsAbout: ['Digital Marketing', 'Brand Strategy', 'Web Development', 'Social Media']
    };

    const finalStructuredData = structuredData || defaultStructuredData;

    // Update or create JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      const newScript = document.createElement('script');
      newScript.type = 'application/ld+json';
      document.head.appendChild(newScript);
      jsonLdScript = newScript;
    }
    jsonLdScript.textContent = JSON.stringify(finalStructuredData);

  }, [pageTitle, pageDescription, pageKeywords, pageUrl, ogImage, ogType, language, location.pathname, structuredData]);

  return null;
}