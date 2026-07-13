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
      title: 'Rubén Muñoz | Piloto de Karting y Emprendedor',
      description: 'Piloto de karting de Cáceres en el Campeonato de España (CEK) y emprendedor digital. Patrocinios, calendario y blog.',
      keywords: 'Rubén Muñoz, piloto karting, piloto karting Extremadura, piloto karting España, piloto karting Cáceres, emprendedor joven extremeño, marketing digital, patrocinar piloto karting, karting Extremadura, karting España, Rubén Muñoz Cáceres, piloto karting extremeño, patrocinio deportivo, Campeonato España Karting'
    },
    en: {
      title: 'Rubén Muñoz | Karting Driver & Entrepreneur',
      description: 'Karting driver from Cáceres competing in the Spanish Karting Championship (CEK) and digital entrepreneur. Sponsors, schedule and blog.',
      keywords: 'Rubén Muñoz, karting driver Spain, karting driver Extremadura, Spanish karting, Cáceres karting, young entrepreneur Spain, digital marketing, sponsor karting driver, Spanish Karting Championship, motorsport sponsorship'
    }
  };

  const pathMeta: Record<string, { title: string; description: { es: string; en: string } }> = {
    '/': { title: language === 'es' ? 'Inicio' : 'Home', description: {
      es: 'Web oficial de Rubén Muñoz: piloto del CEK y emprendedor digital.',
      en: 'Official site of Rubén Muñoz: CEK karting driver and digital entrepreneur.'
    }},
    // '/inicio' and '/home' are aliases of '/' — resolved via aliasToPrimary below.
    // Alias routes (/patrocinadores, /rdeoperators, /contact, /marketing, /cek2026)
    // are resolved to their primary path via aliasToPrimary below — no separate
    // entries so metadata stays unique per canonical URL.
    '/rde': { title: 'RDE', description: {
      es: 'Programa RDE de Rubén Muñoz: desarrollo deportivo y oportunidades de colaboración.',
      en: 'Rubén Muñoz RDE program: athletic development and partnership opportunities.'
    }},
    '/contacto': { title: 'Contacto', description: {
      es: 'Contacta con Rubén Muñoz: formulario, redes y reserva de reuniones para patrocinios y colaboraciones.',
      en: 'Get in touch with Rubén Muñoz: contact form, social channels and meeting booking for sponsors and collaborations.'
    }},
    '/business': { title: 'Business', description: {
      es: 'Proyectos empresariales de Rubén Muñoz: marketing digital, agencia y colaboraciones con marcas.',
      en: 'Business projects by Rubén Muñoz: digital marketing, agency and brand collaborations.'
    }},
    '/sponsors': { title: language === 'es' ? 'Patrocinio' : 'Sponsorship', description: {
      es: 'Conviértete en patrocinador de Rubén Muñoz en el CEK 2026. Planes, beneficios y dossier.',
      en: 'Become a sponsor of Rubén Muñoz in the 2026 CEK. Plans, benefits and dossier.'
    }},


    '/2026': { title: language === 'es' ? 'Temporada 2026' : '2026 Season', description: {
      es: 'Temporada 2026 del CEK: calendario, circuitos y seguimiento de Rubén Muñoz en el campeonato.',
      en: '2026 CEK season: calendar, circuits and live updates from Rubén Muñoz in the championship.'
    }},
    '/cek2026': { title: language === 'es' ? 'CEK 2026' : 'CEK 2026', description: {
      es: 'Toda la información del CEK 2026 con Rubén Muñoz: calendario, equipo y resultados.',
      en: 'Everything about CEK 2026 with Rubén Muñoz: calendar, team and results.'
    }},
    '/blog': { title: 'Blog', description: {
      es: 'Blog de Rubén Muñoz: crónicas de carreras del CEK, anuncios de patrocinadores y novedades.',
      en: 'Rubén Muñoz blog: CEK race reports, sponsor announcements and project updates.'
    }},
    '/live-timing-streaming': { title: language === 'es' ? 'Live Timing y Streaming' : 'Live Timing & Streaming', description: {
      es: 'Cronometraje en vivo y retransmisiones de las pruebas del CEK con Rubén Muñoz.',
      en: 'Live timing and streaming of CEK rounds featuring Rubén Muñoz.'
    }},
    '/booking': { title: 'Booking', description: {
      es: 'Reserva una reunión con Rubén Muñoz para hablar de patrocinios o colaboraciones.',
      en: 'Book a meeting with Rubén Muñoz to discuss sponsorships or collaborations.'
    }},
  };

  const seoContent = defaultSEO[language];
  // Map alias routes to their primary/canonical route so social previews
  // and search engagement consolidate on a single URL per page.
  const aliasToPrimary: Record<string, string> = {
    '/inicio': '/',
    '/home': '/',
    '/contact': '/contacto',
    '/marketing': '/business',
    '/patrocinadores': '/sponsors',
    '/cek2026': '/2026',
    '/rdeoperators': '/rde',
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

    updateAlternate('es', `https://rubenmunoz.com${primaryPath}`);
    updateAlternate('en', `https://rubenmunoz.com${primaryPath}`);
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