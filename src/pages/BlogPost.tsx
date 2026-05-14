import cekZaragozaImg from '@/assets/cek-zaragoza.jpg';
import netspyImg from '@/assets/netspy-branding-new.jpg';
import netproImg from '@/assets/netpro-new-logo.jpg';
import albroksaImg from '@/assets/albroksa-patrocinio.jpeg';
import testRecasImg from '@/assets/test-recas-2026.jpg';
import portadaExtremaduraImg from '@/assets/cek-2026-campillos-18.jpg';
import cajaRuralImg from '@/assets/caja-rural-extremadura.png';
import webRedesignImg from '@/assets/website-redesign-2026.webp';
import ecomscrapeImg from '@/assets/ecomscrape-post.webp';
import motorlandImg from '@/assets/motorland-cek-r2.webp';
import vlog1Img from '@/assets/vlog-1-motorland.jpg';
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
    {
      id: 'website-redesign-2026',
      title: t('blog.webredesign.title'),
      excerpt: t('blog.webredesign.excerpt'),
      content: language === 'es'
        ? `Hoy estrenamos una nueva etapa en rubenmunoz.com. La web ha sido rediseñada por completo, con una identidad visual más significativa, una experiencia pensada para acompañar el salto deportivo y profesional.\n\nMás que un lavado de cara, este rediseño marca un cambio de la manera de comunicar mi marca personal. Pasar de una simple web de piloto a una plataforma que reúne el proyecto deportivo, el valor para patrocinadores, los proyectos paralelos y un espacio privado  más cercano.\n\nNueva sección 2026 — Calendario del CEK\n\nUno de los grandes protagonistas del rediseño es la nueva sección dedicada a la temporada 2026 del Campeonato de España de Karting. En ella se incluye un mapa 3D interactivo de España donde se pueden ver, numerados cronológicamente, los cuatro circuitos del calendario: Campillos, MotorLand Aragón, Kartódromo Lucas Guerrero (Chiva) y Aspar Circuit (Guadassuar). Cada cita aparece con su fecha, ubicación y enlace directo a la información de la carrera.\n\nAcceso al paddock\n\nUna de las novedades más importantes es la creación del Acceso al Paddock, un área privada pensada para patrocinadores, colaboradores y miembros seguidores. Desde ahí se podrá acceder a novedades, contenido exclusivo de carreras, mucho valor y comunicaciones directas. Es un paso para profesionalizar al máximo la relación con quienes siguen el proyecto de cerca.\n\nNuevos proyectos\n\nEl rediseño también deja espacio a los proyectos paralelos que han ido tomando forma durante el último año: Netpro Agency. el grupo de jóvenes emprendedores Netspy  y nuevas colaboraciones con marcas como Albroksa y Caja Rural de Extremadura. Todo conectado bajo una misma identidad, dejando claro que no se trata solo de competir, sino de construir una marca personal sólida y a largo plazo.\n\nDetalles técnicos y experiencia\n\n- Nueva paleta y tipografía editorial.\n- Animaciones suaves, transiciones cuidadas y modo oscuro como base.\n- Mapa 3D del calendario del CEK.\n- Sección de blog renovada.\n- Optimización SEO, metadatos por artículo y carga acelerada en móvil.\n\nEsto es solo el principio. La idea es que la web evolucione cada temporada, sumando datos en directo, contenido audiovisual y nuevas formas de conectar con el público y los patrocinadores. Gracias a quienes ya forman parte de este proyecto y bienvenidos a rubenmunoz.com`
        : `Today we kick off a new chapter at rubenmunoz.com. The website has been completely redesigned, with a more editorial visual identity, refined typography and an experience built to support the sporting and professional leap of this 2026 season.\n\nMore than a facelift, this redesign marks a change of mindset: moving from a simple driver website to a platform that brings together the racing project, the sponsor dossier, side projects and a private space for the inner circle.\n\nNew 2026 section — Interactive CEK calendar\n\nOne of the highlights of the redesign is the new section dedicated to the 2026 Spanish Karting Championship. It features an interactive 3D map of Spain showing, numbered chronologically, the four circuits of the calendar: Campillos, MotorLand Aragón, Kartódromo Lucas Guerrero (Chiva) and Aspar Circuit (Guadassuar). Each round includes its date, location and a direct link to race information.\n\nPaddock Access\n\nOne of the most important additions is the new Paddock Access, a private area designed for sponsors, partners and close collaborators. From there it will be possible to access the full dossier, brand materials, internal calendar, exclusive race content and direct communications. A step to professionalize the relationship with everyone who believes in the project.\n\nNew projects\n\nThe redesign also makes room for the side projects that have been taking shape over the last year: Netpro Agency (a motorsport-focused design and marketing studio), the young entrepreneurs group Netspy ES and new collaborations with brands such as Albroksa and Caja Rural de Extremadura. Everything connected under a single identity, making it clear that this is not only about racing, but about building a solid, long-term personal brand.\n\nTechnical details and experience\n\n- New color palette and editorial typography.\n- Smooth animations, refined transitions and a dark-mode-first design.\n- 3D CEK calendar map built with WebGL.\n- Redesigned blog with a featured article and chronological archive.\n- SEO optimization, per-article metadata and faster mobile loading.\n\nThis is just the beginning. The idea is for the website to evolve every season, adding live data, audiovisual content and new ways to connect with the audience and sponsors. Thanks to everyone already part of this project — and welcome to this new chapter.`,
      date: '2026-04-29',
      readTime: '4 min',
      category: t('blog.category.marketing'),
      image: webRedesignImg,
    },
    {
      id: 'ecomscrape-launch',
      title: t('blog.ecomscrape.title'),
      excerpt: t('blog.ecomscrape.excerpt'),
      content: language === 'es'
        ? `EcomScrape es una herramienta profesional de extracción de catálogos e inteligencia competitiva para e-commerce. Permite obtener el catálogo completo de cualquier tienda Shopify, WooCommerce o PrestaShop en cuestión de segundos, con bypass anti-bot integrado, exportación a CSV/JSON y analítica de tráfico.\n\nEl proyecto nace de la colaboración entre Rubén Muñoz, Anas Walton y https://soyrage.es, uniendo experiencia en marketing digital, desarrollo de producto y análisis competitivo de e-commerce.\n\n¿Qué hace EcomScrape?\n\n• Extracción instantánea de catálogos completos (productos, precios, variantes, stock).\n• Store DNA: perfil completo de cualquier tienda — antigüedad del dominio, gasto en ads, ingresos estimados, tech stack, tema, pasarelas de pago, presencia en redes y señal de dropshipping.\n• Inteligencia de producto: bestsellers, productos nuevos, eliminados y cambios de precio en tiempo real.\n• Analítica de tráfico: visitas mensuales, países top, distribución por edad/género, dispositivo y tasa de rebote.\n• API REST lista para desarrolladores con endpoints limpios en JSON.\n• Extensión de navegador: instala, visita cualquier tienda y extrae con un clic.\n\nEcomScrape sustituye horas de investigación manual, scripts frágiles y herramientas caras por una solución todo-en-uno con créditos de pago por uso y sin compromisos mensuales.\n\nMás información en https://ecomscrape.com`
        : `EcomScrape is a professional catalog extraction and competitive intelligence tool for e-commerce. It lets you pull the full catalog from any Shopify, WooCommerce or PrestaShop store in seconds, with built-in anti-bot bypass, CSV/JSON export and traffic analytics.\n\nThe project is a collaboration between Rubén Muñoz, Anas Walton and https://soyrage.es, combining experience in digital marketing, product development and competitive e-commerce analysis.\n\nWhat does EcomScrape do?\n\n• Instant extraction of full catalogs (products, prices, variants, stock).\n• Store DNA: complete profile of any store — domain age, ad spend, estimated revenue, tech stack, theme, payment processors, social presence and dropshipper signal.\n• Product Intelligence: bestsellers, new items, deleted products and real-time price changes.\n• Traffic Analytics: monthly visits, top countries, age/gender distribution, device and bounce rate.\n• Developer-ready REST API with clean JSON endpoints.\n• Browser extension: install, visit any store and extract with one click.\n\nEcomScrape replaces hours of manual research, brittle scripts and expensive tools with an all-in-one solution featuring pay-as-you-go credits and no monthly commitment.\n\nLearn more at https://ecomscrape.com`,
      date: '2026-05-01',
      readTime: '4 min',
      category: t('blog.category.marketing'),
      image: ecomscrapeImg,
    },
    {
      id: 'motorland-cek-r2',
      title: t('blog.motorland.title'),
      excerpt: t('blog.motorland.excerpt'),
      content: language === 'es'
        ? `Rubén Muñoz se prepara para afrontar la segunda prueba del Campeonato de España de Karting 2026 en el circuito de MotorLand Aragón, en Alcañiz (Teruel), que se disputará del 15 al 17 de mayo.\n\nTras la experiencia acumulada en la primera ronda de Campillos, el piloto extremeño llega a esta cita con un plan de preparación ambicioso: tres días completos de entrenamientos en el mismo trazado durante el fin de semana del 8 al 10 de mayo. Tres jornadas intensivas que permitirán a Rubén y al equipo DB Motorsport conocer a fondo el circuito, ajustar la puesta a punto del kart y trabajar en la mejora del ritmo de cara a la competición.\n\nMotorLand Aragón es uno de los trazados más técnicos y exigentes del calendario, con cambios de altimetría, curvas de media y alta velocidad y una recta de salida/meta que pone a prueba la velocidad punta del kart. Es un circuito que premia la constancia y la precisión, y donde la preparación previa marca la diferencia.\n\nEl objetivo para esta segunda ronda es claro: aprovechar al máximo los días de test para llegar al fin de semana de competición con confianza, ritmo y un setup competitivo. Rubén buscará mejorar sus posiciones respecto a Campillos y seguir sumando experiencia en su primer año completo en la categoría Senior del CEK.\n\nLa página de seguimiento en directo se habilitará el 15 de mayo para que podáis seguir la evolución de Rubén durante todo el fin de semana de competición.\n\n¡Nos vemos en Motorland!`
        : `Rubén Muñoz is getting ready to take on the second round of the 2026 Spanish Karting Championship at the MotorLand Aragón circuit in Alcañiz (Teruel), which will take place from May 15 to 17.\n\nAfter the experience gained in the first round at Campillos, the Extremaduran driver arrives at this event with an ambitious preparation plan: three full days of testing at the same track during the weekend of May 8 to 10. Three intensive sessions that will allow Rubén and DB Motorsport to get to know the circuit in depth, fine-tune the kart setup and work on improving pace ahead of the competition.\n\nMotorLand Aragón is one of the most technical and demanding layouts on the calendar, with elevation changes, medium and high-speed corners and a start/finish straight that tests the kart's top speed. It is a circuit that rewards consistency and precision, and where prior preparation makes the difference.\n\nThe goal for this second round is clear: make the most of the test days to arrive at the race weekend with confidence, rhythm and a competitive setup. Rubén will look to improve his positions from Campillos and continue gaining experience in his first full year in the CEK Senior category.\n\nThe live timing page will be enabled on May 15 so you can follow Rubén's progress throughout the race weekend.\n\nSee you at Motorland!`,
      date: '2026-05-06',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: motorlandImg,
    },
    {
      id: 'vlog-1-motorland',
      title: t('blog.vlog1.title'),
      excerpt: t('blog.vlog1.excerpt'),
      content: language === 'es'
        ? `Ya está disponible mi primer vlog en YouTube. Lo grabé durante los tres días de tests previos a la segunda ronda del Campeonato de España de Karting en MotorLand Aragón (Alcañiz, Teruel), del 8 al 10 de mayo.\n\nEn el vídeo enseño cómo es un fin de semana de tests por dentro: la llegada al circuito, el trabajo con el equipo DB Motorsport para ajustar la puesta a punto del kart, las sensaciones vuelta a vuelta y todo lo que pasa entre tanda y tanda. MotorLand Aragón es un trazado exigente, con cambios de altimetría y curvas rápidas, y estos tres días han sido clave para llegar al fin de semana de carrera (15-17 de mayo) con ritmo y confianza.\n\nEste vlog es solo el principio. Se vienen muchos más vlogs, contenido detrás de cámaras y onboards desde dentro del kart en los próximos meses. La idea es abrir las puertas del paddock y mostrar el día a día real de un piloto en su primera temporada completa en CEK Senior.\n\nMira el vídeo aquí: https://youtu.be/nwomAlGMyHg\n\nGracias por estar ahí — y nos vemos en el siguiente vlog.`
        : `My first vlog is now live on YouTube. I filmed it during the three days of testing ahead of the second round of the Spanish Karting Championship at MotorLand Aragón (Alcañiz, Teruel), from May 8 to 10.\n\nThe video takes you inside a full test weekend: arriving at the track, working with the DB Motorsport team to dial in the kart, lap-by-lap feelings and everything that happens between sessions. MotorLand Aragón is a demanding circuit with elevation changes and fast corners, and these three days have been key to arriving at the race weekend (May 15-17) with rhythm and confidence.\n\nThis vlog is just the beginning. Many more vlogs, behind-the-scenes content and in-kart onboards are coming over the next months. The idea is to open the paddock doors and show the real day-to-day of a driver in his first full season in CEK Senior.\n\nWatch the video here: https://youtu.be/nwomAlGMyHg\n\nThanks for being there — see you in the next vlog.`,
      date: '2026-05-14',
      readTime: '2 min',
      category: t('blog.category.karting'),
      image: vlog1Img,
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

  // Keep SEO title under ~60 chars and description under ~160 chars
  const truncate = (s: string, max: number) => {
    if (!s || s.length <= max) return s;
    const cut = s.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut) + '…';
  };
  const seoTitle = truncate(seoConfig.title || '', 60);
  const seoDescription = truncate(seoConfig.description || '', 160);

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoConfig.keywords}
        ogImage={seoConfig.ogImage}
        ogType={seoConfig.ogType}
        structuredData={seoConfig.structuredData}
      />
      <div className="min-h-screen bg-black text-white pt-32 sm:pt-40 pb-20">
        <article className="max-w-4xl mx-auto px-5 sm:px-10 md:px-16">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              {t('blog.backToBlog')}
            </Link>
          </motion.div>

          {/* Editorial label */}
          <motion.div
            {...fadeIn}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40 mb-6"
          >
            <span className="font-mono text-white">N° {String(blogPosts.findIndex(p => p.id === post.id) + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-white/15" />
            <span>{post.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeIn}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white leading-[1.02] tracking-[-0.02em] mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            {...fadeIn}
            className="text-white/65 text-lg sm:text-xl leading-relaxed max-w-3xl mb-10 font-display-italic"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta + share */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10">
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(t('blog.locale'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all text-white/65 hover:text-white text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'es' ? 'Copiar enlace' : 'Copy link'}</span>
            </button>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-14 rounded-2xl overflow-hidden border border-white/10"
          >
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
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
                
                <div className="mt-16 pt-10 border-t border-white/10">
                  {/* Author card */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center font-mono text-[11px] tracking-wider text-white/80 shrink-0">
                      CR
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                        {language === 'es' ? 'Redactado por' : 'Written by'}
                      </span>
                      <span className="text-white text-sm mt-1">Caja Rural de Extremadura</span>
                    </div>
                  </div>

                  {/* Related news */}
                  <div className="mt-12">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40 mb-6">
                      <span className="font-mono text-secondary">N°</span>
                      <span className="h-px w-8 bg-white/15" />
                      <span>{language === 'es' ? 'Noticias relacionadas' : 'Related news'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          source: 'Europa Press',
                          title: language === 'es'
                            ? 'Caja Rural de Extremadura patrocinará al joven piloto cacereño de karting'
                            : 'Caja Rural de Extremadura to sponsor the young karting pilot from Cáceres',
                          href: 'https://www.europapress.es/extremadura/noticia-caja-rural-extremadura-patrocinara-joven-piloto-cacereno-karting-ruben-munoz-20260423113309.html',
                        },
                        {
                          source: 'La Gaceta Independiente',
                          title: language === 'es'
                            ? 'Caja Rural de Extremadura apoya el talento joven en el deporte'
                            : 'Caja Rural de Extremadura supports young sports talent',
                          href: 'https://lagacetaindependiente.com/2026/04/23/caja-rural-de-extremadura-apoya-el-talento-joven-en-el-deporte-promocionando-al-piloto-cacereno-ruben-munoz/',
                        },
                        {
                          source: 'Región Digital',
                          title: language === 'es'
                            ? 'Caja Rural de Extremadura patrocinará al joven piloto cacereño de karting'
                            : 'Caja Rural de Extremadura to sponsor the young karting pilot from Cáceres',
                          href: 'https://www.regiondigital.com/noticias/deportes/428716-caja-rural-de-extremadura-patrocinara-al-joven-piloto-cacereno-de-karting-ruben-munoz.html',
                        },
                      ].map((item) => (
                        <a
                          key={item.source}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-colors min-h-[160px]"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-secondary">
                              {item.source}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-white/85 text-sm leading-snug group-hover:text-white transition-colors">
                            {item.title}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Contenido normal para otros posts
              post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/80 mb-6 leading-relaxed">
                  {paragraph.split(/(https?:\/\/[^\s]+)/g).map((part, j) => {
                    if (/^https?:\/\//.test(part)) {
                      const clean = part.replace(/[,;!?)]+$/, '');
                      const trailing = part.slice(clean.length);
                      return (
                        <span key={j}>
                          <a href={clean} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">
                            {clean.replace(/^https?:\/\/(www\.)?/, '')}
                          </a>{trailing}
                        </span>
                      );
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </p>
              ))
            )}

            {/* Links section for EcomScrape post */}
            {post.id === 'ecomscrape-launch' && (
              <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                <p className="text-white/50 text-sm uppercase tracking-widest font-mono mb-4">Links</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://ecomscrape.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/80 text-sm hover:bg-white/5 hover:border-white/30 transition-all">
                    🌐 ecomscrape.com
                  </a>
                  <a href="https://www.instagram.com/anaswalton/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/80 text-sm hover:bg-white/5 hover:border-white/30 transition-all">
                    📸 @anaswalton
                  </a>
                  <a href="https://soyrage.es" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/80 text-sm hover:bg-white/5 hover:border-white/30 transition-all">
                    🔗 soyrage.es
                  </a>
                </div>
              </div>
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