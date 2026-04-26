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
      title: 'Rubén Muñoz | Piloto de Karting Extremeño y Emprendedor Digital',
      description: 'Rubén Muñoz - Piloto de karting de Cáceres, Extremadura. Compitiendo en el Campeonato de España de Karting. Emprendedor joven extremeño especializado en marketing digital. Busco patrocinadores para mi carrera deportiva.',
      keywords: 'Rubén Muñoz, piloto karting, piloto karting Extremadura, piloto karting España, piloto karting Cáceres, emprendedor joven extremeño, marketing digital, patrocinar piloto karting, karting Extremadura, karting España, Rubén Muñoz Cáceres, piloto karting extremeño, patrocinio deportivo, Campeonato España Karting'
    },
    en: {
      title: 'Rubén Muñoz | Spanish Karting Driver & Digital Entrepreneur',
      description: 'Rubén Muñoz - Karting driver from Cáceres, Extremadura, Spain. Competing in the Spanish Karting Championship. Young entrepreneur specializing in digital marketing. Seeking sponsors for my racing career.',
      keywords: 'Rubén Muñoz, karting driver Spain, karting driver Extremadura, Spanish karting, Cáceres karting, young entrepreneur Spain, digital marketing, sponsor karting driver, Spanish Karting Championship, motorsport sponsorship'
    }
  };

  const pathTitles: Record<string, string> = {
    '/': language === 'es' ? 'Inicio' : 'Home',
    '/inicio': 'Inicio',
    '/home': 'Home',
    '/contacto': language === 'es' ? 'Contacto' : 'Contact',
    '/contact': 'Contact',
    '/business': 'Business',
    '/marketing': 'Marketing Digital',
    '/sponsors': language === 'es' ? 'Patrocinio' : 'Sponsorship',
    '/patrocinadores': 'Patrocinio',
    '/2026': language === 'es' ? 'Temporada 2026' : '2026 Season',
  };

  const seoContent = defaultSEO[language];
  const pageTitle = title || (pathTitles[location.pathname] 
    ? `${pathTitles[location.pathname]} | Rubén Muñoz` 
    : seoContent.title);
  const pageDescription = description || seoContent.description;
  const pageKeywords = keywords || seoContent.keywords;
  const pageUrl = canonical || `https://rubenmunoz.com${location.pathname}`;

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
    updateMeta('robots', 'index, follow');
    updateMeta('language', language === 'es' ? 'Spanish' : 'English');
    updateMeta('geo.region', 'ES-EX');
    updateMeta('geo.placename', 'Cáceres, Extremadura, España');

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

    updateAlternate('es', `https://rubenmunoz.com${location.pathname}`);
    updateAlternate('en', `https://rubenmunoz.com${location.pathname}`);
    updateAlternate('x-default', 'https://rubenmunoz.com/');

    // Structured data (JSON-LD)
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Rubén Muñoz',
      birthDate: '2009-02-27',
      birthPlace: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cáceres',
          addressRegion: 'Extremadura',
          addressCountry: 'ES'
        }
      },
      jobTitle: language === 'es' 
        ? 'Piloto de Karting y Emprendedor Digital' 
        : 'Karting Driver and Digital Entrepreneur',
      description: pageDescription,
      url: 'https://rubenmunoz.com',
      image: ogImage,
      sameAs: [
        'https://www.instagram.com/rubenmunooz._'
      ],
      knowsAbout: [
        'Karting',
        'Motorsports',
        'Digital Marketing',
        'Entrepreneurship',
        'Spanish Karting Championship'
      ],
      nationality: {
        '@type': 'Country',
        name: 'Spain'
      },
      homeLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cáceres',
          addressRegion: 'Extremadura',
          addressCountry: 'ES'
        }
      },
      award: language === 'es' 
        ? 'Competidor del Campeonato de España de Karting'
        : 'Spanish Karting Championship Competitor',
      sponsor: {
        '@type': 'Organization',
        name: language === 'es' ? 'Buscando patrocinadores' : 'Seeking sponsors'
      }
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