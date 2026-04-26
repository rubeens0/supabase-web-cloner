import cekZaragozaImg from '@/assets/figma/placeholder.svg';
import netspyImg from '@/assets/figma/placeholder.svg';
import netproImg from '@/assets/figma/placeholder.svg';
import albroksaImg from '@/assets/figma/placeholder.svg';
import testRecasImg from '@/assets/figma/placeholder.svg';
import portadaExtremaduraImg from '@/assets/figma/placeholder.svg';
import cajaRuralImg from '../../imports/unnamed-5.jpg.png';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { getPerformanceSettings } from '../utils/performanceDetector';
import { SEO } from '../components/SEO';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export function BlogPost() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const perfSettings = getPerformanceSettings();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(language === 'es' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard');
    } catch (err) {
      // Fallback for environments where Clipboard API is blocked
      try {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        
        // Ensure it's not visible but part of the DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          toast.success(language === 'es' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard');
        } else {
           throw new Error('Fallback failed');
        }
      } catch (fallbackErr) {
        console.error('Failed to copy: ', fallbackErr);
        toast.error(language === 'es' ? 'No se pudo copiar el enlace' : 'Could not copy link');
      }
    }
  };

  // Simplified animation config
  const fadeIn = perfSettings.simplifyAnimations
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } };

  // Blog posts data completos
  const blogPosts: BlogPostData[] = [
    {
      id: 'portada-extremadura-cek-r1',
      title: t('blog.portadaextremadura.title'),
      excerpt: t('blog.portadaextremadura.excerpt'),
      content: language === 'es'
        ? `El piloto extremeño Rubén Muñoz cerró su participación en la primera cita del campeonato en el Circuito de Campillos con una jornada de domingo marcada por la exigencia, las remontadas complicadas y los problemas mecánicos en una segunda carrera especialmente accidentada.\n\nLa primera de las mangas, disputada a 15 vueltas, arrancó con Muñoz partiendo desde la 22ª posición, fruto de los entrenamientos cronometrados del sábado. Desde el inicio, la carrera se mostró muy competida, con constantes luchas en el grupo medio que dificultaban mantener el ritmo y evitar pérdidas de posiciones. En ese contexto, el piloto extremeño fue cediendo terreno progresivamente hasta caer a la 35ª posición en pista por sus problemas mecánicos.\n\nSin embargo, el desarrollo posterior de la prueba, con diversas sanciones a otros participantes, permitió a Muñoz escalar posiciones en la clasificación final. De este modo, el resultado oficial le situó en la 31ª plaza, un desenlace que, sin reflejar completamente las dificultades vividas en pista, le permitió cerrar la primera manga completando todas las vueltas y acumulando una valiosa experiencia en condiciones de carrera.\n\nLa segunda manga, también a 15 vueltas, volvió a poner a prueba la resistencia y la capacidad de adaptación del piloto extremeño. En esta ocasión, Muñoz tomó la salida desde la 31ª posición. Al igual que en la primera carrera, el inicio fue complicado, perdiendo algunas posiciones en los primeros compases antes de encontrar un ritmo que le permitió estabilizar su rendimiento.\n\nEn una parrilla muy igualada, Muñoz logró recomponerse y recuperar terreno hasta situarse en la 32ª posición, en plena lucha dentro del grupo. No obstante, cuando parecía haber encontrado una dinámica más favorable, los problemas mecánicos hicieron acto de presencia, obligándole a abandonar antes de completar la carrera.\n\nEsta segunda manga estuvo especialmente marcada por las incidencias, con numerosos abandonos y cambios constantes en la clasificación. Uno de los casos más destacados fue el de Aarón García, que llegó a liderar la prueba durante ocho vueltas antes de verse relegado al final de la clasificación y terminar también fuera de carrera, reflejo de la dureza de la jornada.\n\nCon este resultado, Rubén Muñoz cierra un fin de semana en el que ha logrado clasificarse entre los mejores en una categoría muy numerosa y completar una de las dos carreras, sumando kilómetros clave en su objetivo de disputar al completo el campeonato nacional.\n\nLa próxima cita del calendario tendrá lugar los días 16 y 17 de mayo en el circuito de MotorLand Aragón, donde el piloto extremeño buscará seguir avanzando y transformar la experiencia acumulada en mejores resultados en pista.`
        : `Extremaduran driver Rubén Muñoz closed his participation in the first round of the championship at the Campillos Circuit with a Sunday marked by demanding conditions, difficult comebacks and mechanical problems in a particularly eventful second race.\n\nThe first heat, contested over 15 laps, started with Muñoz from 22nd position, the result of Saturday's qualifying sessions. From the start, the race proved highly competitive, with constant battles in the midfield making it difficult to maintain pace and avoid losing positions. In this context, the Extremaduran driver gradually lost ground, falling to 35th position on track due to mechanical problems.\n\nHowever, the subsequent development of the race, with various penalties to other participants, allowed Muñoz to climb positions in the final classification. Thus, the official result placed him in 31st place, an outcome that, without fully reflecting the difficulties experienced on track, allowed him to close the first heat completing all laps and accumulating valuable experience in race conditions.\n\nThe second heat, also over 15 laps, again tested the resistance and adaptability of the Extremaduran driver. This time, Muñoz started from 31st position. As in the first race, the start was complicated, losing some positions in the opening laps before finding a rhythm that allowed him to stabilize his performance.\n\nOn a very tight grid, Muñoz managed to recover and regain ground to position himself in 32nd place, in the midst of battling within the group. However, when he seemed to have found a more favorable dynamic, mechanical problems appeared, forcing him to retire before completing the race.\n\nThis second heat was especially marked by incidents, with numerous retirements and constant changes in the classification. One of the most notable cases was that of Aarón García, who led the race for eight laps before being relegated to the end of the classification and also finishing out of the race, reflecting the harshness of the day.\n\nWith this result, Rubén Muñoz closes a weekend in which he managed to qualify among the best in a very large category and complete one of the two races, adding key kilometers in his goal of competing in the full national championship.\n\nThe next round of the calendar will take place on May 16 and 17 at the MotorLand Aragón circuit, where the Extremaduran driver will seek to continue advancing and transform the accumulated experience into better results on track.`,
      date: '2026-03-23',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: portadaExtremaduraImg,
    },
    {
      id: 'test-recas-2026',
      title: t('blog.testrecas.title'),
      excerpt: t('blog.testrecas.excerpt'),
      content: language === 'es'
        ? `El pasado Sábado y Domingo 21-22 de febrero estuvimos probando el material para este año junto a mi equipo DB Motorsport en el circuito de Recas Correcaminos en Recas, Toledo.\n\nMuy buenas primeras sensaciones tras estar sin rodar aproximadamente 5 meses. Logramos ser el más rápido en la pista y mejorando progresivamente a lo largo del fin de semana.\n\nEste test fue fundamental para retomar el ritmo y prepararnos de la mejor manera para la temporada que viene. El trabajo con DB Motorsport fue excepcional, y el circuito de Recas Correcaminos nos brindó las condiciones perfectas para evaluar el rendimiento del kart.\n\nNos veremos otra vez en Campillos, Málaga para los tests del campeonato de españa.`
        : `Last Saturday and Sunday, February 21-22, we were testing the material for this year with my team DB Motorsport at the Recas Correcaminos circuit in Recas, Toledo.\n\nVery good first impressions after not driving for approximately 5 months. We managed to be the fastest on the track and improving progressively throughout the weekend.\n\nThis test was fundamental to regain rhythm and prepare in the best way for the coming season. The work with DB Motorsport was exceptional, and the Recas Correcaminos circuit gave us the perfect conditions to evaluate the kart's performance.\n\nWe will meet again in Campillos, Málaga for the Spanish championship tests.`,
      date: '2026-02-22',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: testRecasImg,
    },
    {
      id: 'albroksa-patrocinio',
      title: t('blog.albroksa.title'),
      excerpt: t('blog.albroksa.excerpt'),
      content: language === 'es'
        ? `Albroksa, Correduría de Seguros, reafirma su apuesta por el deporte y las jóvenes promesas anunciando el patrocinio oficial con Rubén Muñoz Cruz. Este acuerdo vincula a Albroksa con uno de los talentos más precoces del motor cacereño para la presente temporada.\n\nCon tan solo 16 años, Rubén Muñoz afronta un reto de máxima exigencia en la categoría Senior: disputar su primer campeonato completo. El calendario del Campeonato de España de Karting (CEK) contará con cuatro citas decisivas entre marzo y septiembre, arrancando en Campillos y visitando trazados de primer nivel como MotorLand Aragón y Chiva, para cerrar la temporada en el Aspar Circuit.\n\nAlbroksa se convierte en uno de sus patrocinadores principales, acompañando al piloto en este salto cualitativo y reforzando su proyección deportiva en un entorno de alta competición.\n\nEsta colaboración refleja fielmente la filosofía de Albroksa: apoyar el esfuerzo, la superación y el talento de nuestra tierra.\n\nLa imagen de Albroksa acompañará a Rubén Muñoz en los circuitos, consolidando la presencia de la marca en el ámbito nacional y su apoyo incondicional al futuro del deporte extremeño.\n\nDesde la correduría, deseamos a Rubén "una temporada llena de éxitos y reafirmamos nuestro compromiso con el deporte y el talento local".`
        : `Albroksa, Insurance Brokerage, reaffirms its commitment to sports and young promises by announcing the official sponsorship of Rubén Muñoz Cruz. This agreement links Albroksa with one of the most precocious talents of Caceres motor for the current season.\n\nWith only 16 years old, Rubén Muñoz faces a challenge of maximum demand in the Senior category: to dispute his first complete championship. The calendar of the Spanish Karting Championship (CEK) will have four decisive dates between March and September, starting in Campillos and visiting top-level tracks such as MotorLand Aragón and Chiva, to close the season at the Aspar Circuit.\n\nAlbroksa becomes one of his main sponsors, accompanying the pilot in this qualitative leap and reinforcing his sports projection in a high competition environment.\n\nThis collaboration faithfully reflects the philosophy of Albroksa: support the effort, improvement and talent of our land.\n\nThe image of Albroksa will accompany Rubén Muñoz on the circuits, consolidating the presence of the brand in the national scope and its unconditional support for the future of Extremaduran sport.\n\nFrom the brokerage, we wish Rubén "a season full of success and reaffirm our commitment to sports and local talent".`,
      date: '2026-02-17',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: albroksaImg,
    },
    {
      id: 'netpro-agency',
      title: t('blog.netpro.title'),
      excerpt: t('blog.netpro.excerpt'),
      content: language === 'es'
        ? `Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos muy enfocados al motorsport —pilotos, equipos y proyectos de karting y automovilismo—, pero hoy también trabajamos con empresas de distintos sectores que necesitan una imagen sólida y resultados reales en el entorno digital.\n\nNos dedicamos a construir y gestionar la imagen de marca: diseñamos la identidad visual, creamos todo el contenido gráfico (carteles, creatividades, anuncios, material corporativo), desarrollamos webs y gestionamos de forma profesional las redes sociales y la publicidad en Meta (Facebook e Instagram) para aumentar visibilidad, generar comunidad y atraer clientes o patrocinadores.\n\nAdemás, ofrecemos gestión de patrocinios y campañas específicas para dar valor a los sponsors, así como servicios complementarios ligados al rendimiento y la proyección del piloto o la marca. Nuestro objetivo es claro: que cada cliente —sea un piloto, un equipo o una empresa— tenga una presencia profesional, coherente y atractiva que le ayude a diferenciarse y a convertir su presencia digital en oportunidades de negocio reales. https://netpro.agency`
        : `Netpro Agency is a professional design and digital marketing studio. We were born very focused on motorsport —drivers, teams and karting and racing projects—, but today we also work with companies from different sectors that need a solid image and real results in the digital environment.\n\nWe are dedicated to building and managing brand image: we design visual identity, create all graphic content (posters, creatives, ads, corporate material), develop websites and professionally manage social networks and advertising on Meta (Facebook and Instagram) to increase visibility, generate community and attract customers or sponsors.\n\nIn addition, we offer sponsorship management and specific campaigns to give value to sponsors, as well as complementary services linked to the performance and projection of the pilot or brand. Our goal is clear: that each client —whether a pilot, a team or a company— has a professional, coherent and attractive presence that helps them differentiate themselves and turn their digital presence into real business opportunities. https://netpro.agency`,
      date: '2026-01-16',
      readTime: '3 min',
      category: t('blog.category.marketing'),
      image: netproImg,
    },
    {
      id: 'netspy-emprendedores',
      title: t('blog.netspy.title'),
      excerpt: t('blog.netspy.excerpt'),
      content: language === 'es' 
        ? `Rubén Muñoz junto a Hugo Trébol han creado un grupo de acceso privado para jóvenes emprendedores; Si eres menor o un joven de menos de 25 años ya puedes rodearte de gente que te inspire y te ayude a crecer como emprendedor, cualquier pregunta me puedes enviar un mensaje por correo electrónico ;) (Grupo en telegram)

rubenmunooz2009@gmail.com`
        : `Rubén Muñoz and Hugo Trébol have created a private access group for young entrepreneurs; If you are a minor or a young person under 25 years old, you can already surround yourself with people who inspire you and help you grow as an entrepreneur. For any questions, you can send me a message by email ;) (Telegram group)

rubenmunooz2009@gmail.com`,
      date: '2025-11-05',
      readTime: '3 min',
      category: t('blog.category.marketing'),
      image: netspyImg,
    },
    {
      id: 'cek-zaragoza',
      title: t('blog.cek.title'),
      excerpt: t('blog.cek.excerpt'),
      content: language === 'es' 
        ? `El pasado fin de semana, el 20 de septiembre, conseguimos clasificarnos para la final del domingo tras superar diversos contratiempos con el motor y el chasis durante el viernes. En el circuito de Zuera, considerado uno de los más rápidos de Europa por la longitud de su rectas, perdimos entre 4 y 6 décimas por vuelta únicamente en las rectas.

El sábado, pese a competir con el mismo motor, logramos una destacada remontada partiendo desde la última posición, completando 17 adelantamientos en las dos mangas clasificatorias, lo que nos permitió asegurar la presencia en la final del domingo. Ya con un nuevo motorista y el chasis perfectamente ajustado, afrontamos la carrera final desde la posición 36, avanzando hasta el puesto 16, lo que reflejó el gran ritmo alcanzado en pista.

El balance general ha sido muy positivo para esta primera temporada, dejando buenas sensaciones y una clara motivación para seguir avanzando y aspirar a más próximamente.

Muchas gracias a todas las personas implicadas.`
        : `Last weekend, on September 20th, we managed to qualify for Sunday's final after overcoming various setbacks with the engine and chassis during Friday. At the Zuera circuit, considered one of the fastest in Europe due to the length of its straights, we lost between 4 and 6 tenths per lap solely on the straights.

On Saturday, despite competing with the same engine, we achieved a remarkable comeback starting from the last position, completing 17 overtakes in the two qualifying heats, which allowed us to secure our place in Sunday's final. With a new engine specialist and the chassis perfectly adjusted, we faced the final race from position 36, advancing to 16th place, which reflected the great pace achieved on track.

The overall balance has been very positive for this first season, leaving good feelings and clear motivation to continue advancing and aspire to more soon.

Many thanks to all the people involved.`,
      date: '2025-09-20',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: cekZaragozaImg,
    },
    {
      id: 'caja-rural-extremadura-patrocinio',
      title: t('blog.cajarural.title'),
      excerpt: t('blog.cajarural.excerpt'),
      content: language === 'es'
        ? `Caja Rural de Extremadura ha formalizado un acuerdo de colaboración deportiva con el joven piloto cacereño de karting Rubén Muñoz, reafirmando así su compromiso con el apoyo al deporte y al talento emergente de la región.\n\nCon tan solo 17 años, Rubén Muñoz se ha consolidado como una de las promesas del automovilismo extremeño, compitiendo en el Campeonato de España de Karting y representando a Cáceres en circuitos de ámbito nacional.\n\nA través de esta colaboración, la entidad acompañará al piloto en su trayectoria deportiva durante la presente temporada, contribuyendo a su desarrollo en la disciplina.\n\nLa imagen de Caja Rural de Extremadura estará presente en las competiciones en las que participe el deportista, tanto en el vehículo como en el mono, reforzando la visibilidad del compromiso de la entidad con el deporte base y el talento joven.\n\nRubén Muñoz, natural de Cáceres, ha destacado en los últimos años por su progresión en el karting, llegando a proclamarse campeón regional y dando el salto a competiciones nacionales, donde continúa desarrollando su carrera deportiva con el objetivo de seguir creciendo en el mundo del motor.`
        : `Caja Rural de Extremadura has formalized a sports collaboration agreement with young karting pilot Rubén Muñoz from Cáceres, reaffirming its commitment to supporting sports and emerging talent in the region.\n\nAt only 17 years old, Rubén Muñoz has established himself as one of the promises of Extremaduran motorsport, competing in the Spanish Karting Championship and representing Cáceres in national circuits.\n\nThrough this collaboration, the entity will accompany the pilot in his sports career during the current season, contributing to his development in the discipline.\n\nThe image of Caja Rural de Extremadura will be present in the competitions in which the athlete participates, both on the vehicle and on the suit, reinforcing the visibility of the entity's commitment to grassroots sports and young talent.\n\nRubén Muñoz, native of Cáceres, has stood out in recent years for his progression in karting, becoming regional champion and making the leap to national competitions, where he continues to develop his sports career with the aim of continuing to grow in the world of motorsport.`,
      date: '2026-04-23',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: cajaRuralImg,
    },
  ];

  const post = blogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-6">{t('blog.notFound')}</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  // SEO específico para cada post
  const seoConfig = post.id === 'portada-extremadura-cek-r1'
    ? {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'CEK, Campillos, Rubén Muñoz, karting, primera carrera, R1, Campeonato España Karting, Extremadura, La Portada de Extremadura'
          : 'CEK, Campillos, Rubén Muñoz, karting, first race, R1, Spanish Karting Championship, Extremadura, La Portada de Extremadura',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: 'Antonio Mayorgas',
            jobTitle: language === 'es' ? 'Periodista' : 'Journalist'
          },
          publisher: {
            '@type': 'Organization',
            name: 'La Portada de Extremadura',
            url: 'https://www.laportadadeextremadura.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://rubenmunoz.com/blog/${post.id}`
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'test-recas-2026'
    ? {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'test, Recas, Toledo, karting, DB Motorsport, Rubén Muñoz, Campillos, CEK, Campeonato España Karting, Recas Correcaminos'
          : 'test, Recas, Toledo, karting, DB Motorsport, Rubén Muñoz, Campillos, CEK, Spanish Karting Championship, Recas Correcaminos',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://rubenmunoz.com/blog/test-recas-2026'
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'albroksa-patrocinio'
    ? {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'Albroksa, patrocinio, Rubén Muñoz, karting, CEK, seguros, deporte, Extremadura'
          : 'Albroksa, sponsorship, Rubén Muñoz, karting, CEK, insurance, sports, Extremadura',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: 'Alba Heras',
            jobTitle: 'Imagen y Comunicación'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Albroksa',
            url: 'https://albroksa.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://rubenmunoz.com/blog/${post.id}`
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'netpro-agency' 
    ? {
        title: language === 'es' 
          ? 'Netpro Agency: Estudio de Diseño y Marketing Digital'
          : 'Netpro Agency: Design and Digital Marketing Studio',
        description: language === 'es'
          ? 'Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos muy enfocados al motorsport —pilotos, equipos y proyectos de karting y automovilismo—, pero hoy también trabajamos con empresas de distintos sectores que necesitan una imagen sólida y resultados reales en el entorno digital.'
          : 'Netpro Agency is a professional design and digital marketing studio. We were born very focused on motorsport —drivers, teams and karting and racing projects—, but today we also work with companies from different sectors that need a solid image and real results in the digital environment.',
        keywords: language === 'es'
          ? 'Netpro Agency, diseño, marketing digital, motorsport, pilotos, equipos, proyectos de karting y automovilismo, empresas, imagen sólida, resultados reales'
          : 'Netpro Agency, design, digital marketing, motorsport, drivers, teams, karting and racing projects, companies, solid image, real results',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: language === 'es' 
            ? 'Netpro Agency: Estudio de Diseño y Marketing Digital'
            : 'Netpro Agency: Design and Digital Marketing Studio',
          description: language === 'es'
            ? 'Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos muy enfocados al motorsport —pilotos, equipos y proyectos de karting y automovilismo—, pero hoy también trabajamos con empresas de distintos sectores que necesitan una imagen sólida y resultados reales en el entorno digital.'
            : 'Netpro Agency is a professional design and digital marketing studio. We were born very focused on motorsport —drivers, teams and karting and racing projects—, but today we also work with companies from different sectors that need a solid image and real results in the digital environment.',
          image: post.image,
          datePublished: '2026-01-16',
          dateModified: '2026-01-16',
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://rubenmunoz.com/blog/netpro-agency'
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'netspy-emprendedores' 
    ? {
        title: language === 'es' 
          ? 'Netspy: Grupo de Acceso Privado para Jóvenes Emprendedores'
          : 'Netspy: Private Access Group for Young Entrepreneurs',
        description: language === 'es'
          ? 'Rubén Muñoz junto a Hugo Trébol han creado un grupo de acceso privado para jóvenes emprendedores; Si eres menor o un joven de menos de 25 años ya puedes rodearte de gente que te inspire y te ayude a crecer como emprendedor.'
          : 'Rubén Muñoz and Hugo Trébol have created a private access group for young entrepreneurs; If you are a minor or a young person under 25 years old, you can already surround yourself with people who inspire you and help you grow as an entrepreneur.',
        keywords: language === 'es'
          ? 'Netspy, grupo de acceso privado, jóvenes emprendedores, inspiración, crecimiento'
          : 'Netspy, private access group, young entrepreneurs, inspiration, growth',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: language === 'es' 
            ? 'Netspy: Grupo de Acceso Privado para Jóvenes Emprendedores'
            : 'Netspy: Private Access Group for Young Entrepreneurs',
          description: language === 'es'
            ? 'Rubén Muñoz junto a Hugo Trébol han creado un grupo de acceso privado para jóvenes emprendedores; Si eres menor o un joven de menos de 25 años ya puedes rodearte de gente que te inspire y te ayude a crecer como emprendedor.'
            : 'Rubén Muñoz and Hugo Trébol have created a private access group for young entrepreneurs; If you are a minor or a young person under 25 years old, you can already surround yourself with people who inspire you and help you grow as an entrepreneur.',
          image: post.image,
          datePublished: '2025-11-05',
          dateModified: '2025-11-05',
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://rubenmunoz.com/blog/netspy-emprendedores'
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'cek-zaragoza' 
    ? {
        title: language === 'es' 
          ? 'Campeonato España Karting (CEK) en Zaragoza: Clasificación para la Final'
          : 'Spanish Karting Championship (CEK) in Zaragoza: Qualification for the Final',
        description: language === 'es'
          ? 'El pasado fin de semana, el 20 de septiembre, conseguimos clasificarnos para la final del domingo tras superar diversos contratiempos con el motor y el chasis durante el viernes. En el circuito de Zuera, considerado uno de los más rápidos de Europa por la longitud de su rectas, perdimos entre 4 y 6 décimas por vuelta únicamente en las rectas.'
          : 'Last weekend, on September 20th, we managed to qualify for Sunday\'s final after overcoming various setbacks with the engine and chassis during Friday. At the Zuera circuit, considered one of the fastest in Europe due to the length of its straights, we lost between 4 and 6 tenths per lap solely on the straights.',
        keywords: language === 'es'
          ? 'Campeonato España Karting, CEK, Zaragoza, karting, clasificación, final, motor, chasis, rectas'
          : 'Spanish Karting Championship, CEK, Zaragoza, karting, qualification, final, engine, chassis, straights',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: language === 'es' 
            ? 'Campeonato España Karting (CEK) en Zaragoza: Clasificación para la Final'
            : 'Spanish Karting Championship (CEK) in Zaragoza: Qualification for the Final',
          description: language === 'es'
            ? 'El pasado fin de semana, el 20 de septiembre, conseguimos clasificarnos para la final del domingo tras superar diversos contratiempos con el motor y el chasis durante el viernes. En el circuito de Zuera, considerado uno de los más rápidos de Europa por la longitud de su rectas, perdimos entre 4 y 6 décimas por vuelta únicamente en las rectas.'
            : 'Last weekend, on September 20th, we managed to qualify for Sunday\'s final after overcoming various setbacks with the engine and chassis during Friday. At the Zuera circuit, considered one of the fastest in Europe due to the length of its straights, we lost between 4 and 6 tenths per lap solely on the straights.',
          image: post.image,
          datePublished: '2025-09-20',
          dateModified: '2025-09-20',
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://rubenmunoz.com/blog/cek-zaragoza'
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : post.id === 'caja-rural-extremadura-patrocinio' 
    ? {
        title: language === 'es' 
          ? 'Caja Rural de Extremadura: Patrocinio para el Campeonato de Karting de Rubén Muñoz Cruz'
          : 'Caja Rural de Extremadura: Sponsorship for Rubén Muñoz Cruz\'s Karting Championship',
        description: language === 'es'
          ? 'Caja Rural de Extremadura ha formalizado un acuerdo de colaboración deportiva con el joven piloto cacereño de karting Rubén Muñoz, reafirmando así su compromiso con el apoyo al deporte y al talento emergente de la región.'
          : 'Caja Rural de Extremadura has formalized a sports collaboration agreement with young karting pilot Rubén Muñoz from Cáceres, reaffirming its commitment to supporting sports and emerging talent in the region.',
        keywords: language === 'es'
          ? 'Caja Rural de Extremadura, patrocinio, Rubén Muñoz, karting, CEK, financiera, deporte, Extremadura'
          : 'Caja Rural de Extremadura, sponsorship, Rubén Muñoz, karting, CEK, financial, sports, Extremadura',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: language === 'es' 
            ? 'Caja Rural de Extremadura: Patrocinio para el Campeonato de Karting de Rubén Muñoz Cruz'
            : 'Caja Rural de Extremadura: Sponsorship for Rubén Muñoz Cruz\'s Karting Championship',
          description: language === 'es'
            ? 'Caja Rural de Extremadura ha formalizado un acuerdo de colaboración deportiva con el joven piloto cacereño de karting Rubén Muñoz, reafirmando así su compromiso con el apoyo al deporte y al talento emergente de la región.'
            : 'Caja Rural de Extremadura has formalized a sports collaboration agreement with young karting pilot Rubén Muñoz from Cáceres, reaffirming its commitment to supporting sports and emerging talent in the region.',
          image: post.image,
          datePublished: '2026-04-23',
          dateModified: '2026-04-23',
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://rubenmunoz.com/blog/caja-rural-extremadura-patrocinio'
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      }
    : {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'karting, Rubén Muñoz, Campeonato España Karting, CEK, Zaragoza, motorsport'
          : 'karting, Rubén Muñoz, Spanish Karting Championship, CEK, Zaragoza, motorsport',
        ogImage: post.image,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com',
            jobTitle: language === 'es' ? 'Piloto de Karting' : 'Karting Driver'
          },
          publisher: {
            '@type': 'Person',
            name: 'Rubén Muñoz',
            url: 'https://rubenmunoz.com'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://rubenmunoz.com/blog/${post.id}`
          },
          articleSection: language === 'es' ? 'Karting' : 'Karting',
          inLanguage: language === 'es' ? 'es-ES' : 'en-US'
        }
      };

  return (
    <>
      <SEO 
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        ogImage={seoConfig.ogImage}
        ogType={seoConfig.ogType}
        structuredData={seoConfig.structuredData}
      />
      <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              {t('blog.backToBlog')}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            {...fadeIn}
            className="mb-8"
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-white mb-6">
              {post.title}
            </h1>

            {/* Meta Info & Share */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6 text-white/50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      t('blog.locale'),
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white text-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'es' ? 'Copiar enlace' : 'Copy link'}</span>
              </button>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden border border-white/10"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            {...fadeIn}
            className="prose prose-invert prose-lg max-w-none"
          >
            {post.id === 'portada-extremadura-cek-r1' ? (
              // Contenido especial para Portada Extremadura con footer especial
              <>
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white/80 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-white/80 font-medium mb-1">
                    {language === 'es' ? 'Redactado por:' : 'Written by:'} <span className="text-white">Antonio Mayorgas</span>
                  </p>
                  <p className="text-white/60 text-sm mb-8">
                    {language === 'es' ? 'Periodista' : 'Journalist'}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-white text-lg font-medium mb-4">
                      {language === 'es' ? 'Fuente de la noticia' : 'News Source'}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="https://www.laportadadeextremadura.com/deportes/deportes-extremadura/ruben-munoz-completa-primera-carrera-abandona-en-segunda_3946_102.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          La Portada de Extremadura: Rubén Muñoz completa la primera carrera y abandona en la segunda
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : post.id === 'netspy-emprendedores' ? (
              // Contenido especial para NetSpy con enlace al formulario de contacto
              <>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {language === 'es' 
                    ? 'Rubén Muñoz junto a Hugo Trébol han creado un grupo de acceso privado para jóvenes emprendedores; Si eres menor o un joven de menos de 25 años ya puedes rodearte de gente que te inspire y te ayude a crecer como emprendedor, cualquier pregunta me puedes enviar un mensaje por correo electrónico ;) (Grupo en telegram)'
                    : 'Rubén Muñoz and Hugo Trébol have created a private access group for young entrepreneurs; If you are a minor or a young person under 25 years old, you can already surround yourself with people who inspire you and help you grow as an entrepreneur. For any questions, you can send me a message by email ;) (Telegram group)'}
                </p>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {language === 'es' 
                    ? 'rubenmunooz2009@gmail.com'
                    : 'rubenmunooz2009@gmail.com'}
                </p>
              </>
            ) : post.id === 'netpro-agency' ? (
              // Contenido para Netpro Agency con link formateado
              <>
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Detect URL at the end and make it a link
                  const urlRegex = /(https?:\/\/[^\s]+)/g;
                  const parts = paragraph.split(urlRegex);
                  
                  return (
                    <p key={index} className="text-white/80 mb-6 leading-relaxed">
                      {parts.map((part, i) => {
                        if (part.match(urlRegex)) {
                          return (
                            <a 
                              key={i}
                              href={part}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-white/80 underline decoration-white/50 hover:decoration-white transition-colors"
                            >
                              {part}
                            </a>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </>
            ) : post.id === 'albroksa-patrocinio' ? (
              // Contenido para Albroksa con footer especial
              <>
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white/80 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-white/80 font-medium mb-1">
                    {language === 'es' ? 'Redactado por:' : 'Written by:'} <span className="text-white">Alba Heras</span>
                  </p>
                  <p className="text-white/60 text-sm mb-1">
                    {language === 'es' ? 'Imagen y Comunicación' : 'Image and Communication'}
                  </p>
                  <a 
                    href="mailto:imagenycomunicacion@albroksa.com"
                    className="text-white/60 hover:text-white text-sm transition-colors block mb-8"
                  >
                    imagenycomunicacion@albroksa.com
                  </a>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-white text-lg font-medium mb-4">
                      {language === 'es' ? 'Noticias relacionadas' : 'Related News'}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="https://www.grupoaseguranza.com/noticias-de-mediacion/albroksa-patrocina-piloto-ruben-munoz-campeonato-espana-karting"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          Grupo Aseguranza: Albroksa patrocina al piloto Rubén Muñoz
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://segurosnews.com/news/albroksa-patrocina-al-piloto-cacereno-ruben-munoz-en-el-campeonato-de-espana-de-karting"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          Seguros News: Albroksa patrocina al piloto cacereño Rubén Muñoz
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : post.id === 'caja-rural-extremadura-patrocinio' ? (
              // Contenido para Caja Rural con footer especial
              <>
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-white/80 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-white/80 font-medium mb-8">
                    {language === 'es' ? 'Redactado por:' : 'Written by:'} <span className="text-white">Caja Rural de Extremadura</span>
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-white text-lg font-medium mb-4">
                      {language === 'es' ? 'Noticias relacionadas' : 'Related News'}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="https://www.europapress.es/extremadura/noticia-caja-rural-extremadura-patrocinara-joven-piloto-cacereno-karting-ruben-munoz-20260423113309.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          Europa Press: Caja Rural de Extremadura patrocinará al joven piloto cacereño de karting Rubén Muñoz
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://lagacetaindependiente.com/2026/04/23/caja-rural-de-extremadura-apoya-el-talento-joven-en-el-deporte-promocionando-al-piloto-cacereno-ruben-munoz/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          La Gaceta Independiente: Caja Rural de Extremadura apoya el talento joven en el deporte
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://www.regiondigital.com/noticias/deportes/428716-caja-rural-de-extremadura-patrocinara-al-joven-piloto-cacereno-de-karting-ruben-munoz.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          Región Digital: Caja Rural de Extremadura patrocinará al joven piloto cacereño de karting Rubén Muñoz
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              // Contenido normal para otros posts
              post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/80 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))
            )}
          </motion.div>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              {t('blog.backToBlog')}
            </Link>
          </motion.div>
        </article>
      </div>
    </>
  );
}