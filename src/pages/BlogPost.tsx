import cekZaragozaImg from '@/assets/cek-zaragoza.jpg';
import netproImg from '@/assets/netpro-new-logo.jpg';
import albroksaImg from '@/assets/albroksa-patrocinio.jpeg';
import testRecasImg from '@/assets/test-recas-2026.jpg';
import portadaExtremaduraImg from '@/assets/cek-2026-campillos-18.jpg';
import cajaRuralImg from '@/assets/caja-rural-extremadura.png';
import motorlandImg from '@/assets/motorland-cek-r2.webp';
import motorlandRaceImg from '@/assets/motorland-cek-r2-race.jpeg';
import vlog1Img from '@/assets/vlog-1-motorland.jpg';
import fuelExtremImg from '@/assets/fuel-extrem-visita.webp';
import chivaCekImg from '@/assets/chiva-cek-r3.png.asset.json';
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
    {
      id: 'motorland-cek-r2-race',
      title: t('blog.motorlandrace.title'),
      excerpt: t('blog.motorlandrace.excerpt'),
      content: language === 'es'
        ? `Rubén Muñoz firma una gran remontada en la segunda prueba del Campeonato de España de Karting, disputada en MotorLand Aragón (Alcañiz, Teruel) del 15 al 17 de mayo, cerrando un fin de semana muy exigente con un meritorio P18 en la final tras 18 adelantamientos en pista.\n\nUn fin de semana complicadísimo\n\nEl viernes arrancaba de la mejor manera posible: dentro de los 8 pilotos más rápidos en los entrenamientos libres, con buenas sensaciones y un ritmo muy competitivo. Pero a partir del sábado todo se complicó.\n\nLa clasificación oficial del sábado fue totalmente caótica: más de la mitad de los pilotos de la sesión no logramos completar ni una sola vuelta cronometrada en condiciones, lo que obligaba a remontar desde muy atrás durante todo el fin de semana.\n\nHeats y superheat\n\nEn las mangas clasificatorias mantuvimos un ritmo aceptable, aunque no suficiente para escalar todas las posiciones que necesitábamos. En la superheat, saliendo desde el P15, terminamos P11, sumando posiciones y dejando una buena base de cara a la final.\n\nLa final: 18 adelantamientos desde el P34\n\nLa final empezaba con un mal arranque en el que perdíamos 6 posiciones en la primera vuelta, cayendo hasta el P34. A partir de ahí, carrera al ataque: 18 adelantamientos durante la final, recuperando ritmo vuelta a vuelta y peleando dentro del top-20.\n\nEl resultado podría haber sido aún mejor — estábamos en posición de terminar P15 — pero un contacto con otro piloto que nos sacó momentáneamente de pista nos hizo perder varias plazas. Aun así, cruzábamos la línea de meta en el P18.\n\nMucho aprendizaje para Valencia\n\nMás allá del resultado, este fin de semana en MotorLand deja muchas lecciones: gestión del fin de semana en condiciones caóticas, capacidad de remontada, ritmo de carrera y trabajo de equipo con DB Motorsport. Todo eso lo nos llevamos puesto rumbo a la tercera ronda del CEK, que se disputará en Valencia el próximo mes de junio.\n\nGracias a todo el equipo, a los patrocinadores y a quienes habéis seguido la carrera en directo.\n\n📰 Noticia completa en La Portada de Extremadura: https://www.laportadadeextremadura.com/deportes/deportes-extremadura/ruben-munoz-remonta-hasta-top-20-en-exigente-segunda-prueba-nacional-karting-en-motorland-aragon_5223_102.html`
        : `Rubén Muñoz delivered a strong comeback at the second round of the Spanish Karting Championship, held at MotorLand Aragón (Alcañiz, Teruel) from May 15 to 17, closing out a very demanding weekend with a hard-earned P18 in the final after 18 on-track overtakes.\n\nA very tough weekend\n\nFriday started in the best possible way: inside the 8 fastest drivers in free practice, with great feelings and very competitive pace. But from Saturday onwards everything got complicated.\n\nSaturday's official qualifying was completely chaotic: more than half of the drivers in the session were unable to complete a single proper timed lap, which meant fighting back from very far down the order all weekend.\n\nHeats and superheat\n\nIn the heats we held an acceptable pace, although not enough to climb all the positions we needed. In the superheat, starting from P15, we finished P11 — gaining ground and setting up a solid base for the final.\n\nThe final: 18 overtakes from P34\n\nThe final began with a poor start in which we lost 6 positions on the opening lap, dropping back to P34. From there it was full attack: 18 overtakes during the final, finding pace lap after lap and fighting our way back into the top-20.\n\nThe result could have been even better — we were in position to finish P15 — but a contact with another driver that briefly sent us off track cost us several places. Even so, we crossed the line in P18.\n\nA lot of learning ahead of Valencia\n\nBeyond the result, this weekend at MotorLand leaves many lessons: managing a weekend in chaotic conditions, recovery ability, race pace and teamwork with DB Motorsport. All of that comes with us heading into the third round of the CEK, which will take place in Valencia next June.\n\nThanks to the whole team, to the sponsors and to everyone who followed the race live.\n\n📰 Full article in La Portada de Extremadura: https://www.laportadadeextremadura.com/deportes/deportes-extremadura/ruben-munoz-remonta-hasta-top-20-en-exigente-segunda-prueba-nacional-karting-en-motorland-aragon_5223_102.html`,
      date: '2026-05-18',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: motorlandRaceImg,
    },
    {
      id: 'fuel-extrem-visita-ecuador-cek',
      title: t('blog.fuelextrem.title'),
      excerpt: t('blog.fuelextrem.excerpt'),
      content: language === 'es'
        ? `El piloto cacereño aprovechó el paréntesis entre la segunda y la tercera prueba del Campeonato de España de Karting (CEK Hyundai) para rendir visita a uno de sus patrocinadores. El escenario: las instalaciones de una de las gasolineras de Fuel Extrem, firma que forma parte del engranaje de patrocinio que hace posible la temporada de Rubén en la competición nacional.\n\nRubén llega a este punto de la temporada ocupando la posición trigésimo segunda en el clasificatorio general, entre un total de cincuenta y dos pilotos inscritos. Un registro que refleja la dureza de una competición en la que el piloto de Cáceres mide sus fuerzas con los mejores especialistas del país, en una parrilla que no ofrece respiro.\n\nUn gesto de agradecimiento en plena lucha por el campeonato\n\nLa visita no fue solo protocolaria. Rubén quiso trasladar en persona su gratitud a Fuel Extrem por una colaboración que considera decisiva para completar el presupuesto que le permite competir en el máximo escalón del karting en España. Un gesto que dice mucho del carácter del piloto extremeño: saber reconocer el apoyo de quienes hacen posible sus sueños sobre la pista.\n\nLa agenda de Rubén ya apunta a la tercera y penúltima prueba del CEK Hyundai, que se disputará los próximos 20 y 21 de junio en el Karting Chiva de Valencia. Tras el aprendizaje acumulado en Campillos y Motorland Aragón, el piloto cacereño llega a la cita valenciana con más rodaje, más datos y la determinación de seguir escalando posiciones.\n\nImportancia del apoyo\n\nDetrás de cada vuelta en pista hay un tejido institucional y empresarial que hace posible que Extremadura tenga voz en el karting nacional. Rubén Muñoz afronta esta campaña con el apoyo de La Portada de Extremadura, Albroksa, el Ayuntamiento de Cáceres, la Diputación de Cáceres, Fuel Extremadura —gasolineras Galp de Malpartida, Olivenza, Torreorgaz y Casas de Don Gómez— y la Caja Rural de Extremadura. Un bloque sólido de respaldo regional que convierte cada carrera en algo más que una competición: en una bandera extremeña desplegada en los circuitos más exigentes del país.\n\nDesde La Portada de Extremadura continuaremos el seguimiento de la evolución de Rubén Muñoz en esta segunda mitad de temporada, donde cada punto sumado tiene un valor añadido en la lucha por el campeonato.`
        : `The Cáceres driver took advantage of the break between the second and third rounds of the Spanish Karting Championship (CEK Hyundai) to visit one of his sponsors. The setting: the facilities of one of Fuel Extrem's service stations, a company that is part of the sponsorship network making Rubén's national season possible.\n\nRubén reaches this point of the season in 32nd place in the overall standings, out of fifty-two registered drivers. A figure that reflects the toughness of a competition where the Cáceres driver measures himself against the country's best specialists on a grid that offers no respite.\n\nA gesture of gratitude in the middle of the title fight\n\nThe visit was not just a formality. Rubén wanted to thank Fuel Extrem in person for a collaboration he considers decisive to complete the budget that allows him to compete at the top level of karting in Spain. A gesture that says a lot about the Extremaduran driver's character: knowing how to acknowledge the support of those who make his dreams on track possible.\n\nRubén's schedule now points to the third and penultimate round of the CEK Hyundai, which will take place on June 20-21 at Karting Chiva in Valencia. After the lessons learned in Campillos and Motorland Aragón, he arrives in Valencia with more track time, more data and the determination to keep climbing positions.\n\nThe importance of support\n\nBehind every lap on track there is an institutional and business network that allows Extremadura to have a voice in national karting. Rubén Muñoz tackles this season with the support of La Portada de Extremadura, Albroksa, the Cáceres City Council, the Cáceres Provincial Council, Fuel Extremadura —Galp service stations in Malpartida, Olivenza, Torreorgaz and Casas de Don Gómez— and Caja Rural de Extremadura. A solid block of regional support that turns every race into more than just a competition: an Extremaduran flag flying on the country's most demanding circuits.\n\nFrom La Portada de Extremadura we will continue to follow Rubén Muñoz's progress in this second half of the season, where every point earned carries added value in the fight for the championship.`,
      date: '2026-05-25',
      readTime: '3 min',
      category: t('blog.category.karting'),
      image: fuelExtremImg,
    },
    {
      id: 'cek-chiva-valencia-r3',
      title: t('blog.chiva.title'),
      excerpt: t('blog.chiva.excerpt'),
      content: language === 'es'
        ? `Rubén Muñoz y el equipo DB Motorsport han completado tres días intensos de tests previos en el Kartódromo Lucas Guerrero de Chiva (Valencia), escenario de la tercera ronda del Campeonato de España de Karting 2026. Una sesión de preparación marcada por las altas temperaturas, la falta de ritmo inicial y la complejidad de encontrar la puesta a punto ideal en unas condiciones extremas.\n\nUn fin de semana de test muy exigente\n\nLos tres días de entrenamientos en el circuito valenciano han supuesto un desafío técnico y físico desde el primer momento. Las condiciones de calor fueron brutales, con temperaturas que complicaron el trabajo tanto en pista como en boxes. El asfalto, la adherencia y el comportamiento del kart cambiaban constantemente, haciendo prácticamente imposible mantener un ritmo estable.\n\nDurante la primera jornada, el equipo tuvo que luchar contra unos tiempos por vuelta lejos de los esperados. Sin ritmo claro y con el piloto desconectado del feeling ideal del kart, cada tanda se convirtió en una carrera contra el reloj para entender qué estaba fallando. El calor afectaba al motor, a los neumáticos y, sobre todo, a la capacidad de reacción en una pista que exige máxima concentración.\n\nAjustes y problemas mecánicos\n\nEl segundo día no fue más fácil. Los problemas para poner todo a punto se acumularon: ajustes de chasis que no respondían como se esperaba, variaciones de temperatura del motor que obligaban a cambiar el mapping constantemente y una falta de grip generalizada que impedía mejorar los registros. El equipo DB Motorsport trabajó sin descanso, pero las condiciones climáticas hicieron que cada pequeño avance se viera contrarrestado por un nuevo obstáculo.\n\nFue un test de resistencia mental tanto como física. Cuando parecía que el setup empezaba a funcionar, una nueva sesión con temperaturas aún más altas reseteaba todo el trabajo previo. El piloto extremeño tuvo que armarse de paciencia y confiar en el proceso, sabiendo que la información recogida, aunque costosa, sería fundamental para el fin de semana de carrera.\n\nSeñales de mejora al cierre\n\nEl tercer día, finalmente, llegaron las primeras sensaciones positivas. Con el kart más equilibrado y algunos cambios en la puesta a punto que empezaron a dar fruto, Rubén logró mejorar sus tiempos de forma significativa en las últimas tandas. No fue el ritmo ideal todavía, pero sí suficiente para llegar al fin de semana de competición con una base desde la que poder competir.\n\nLa carrera será los días 20 y 21 de junio en el Kartódromo Lucas Guerrero de Chiva, Valencia. Tras unos tests donde nada ha sido fácil, el objetivo es claro: sumar kilómetros, seguir aprendiendo y luchar por cada posición en una parrilla donde cada detalle cuenta.\n\nNos vemos en Chiva, Valencia.`
        : `Rubén Muñoz and the DB Motorsport team have completed three intense days of pre-race testing at the Kartódromo Lucas Guerrero in Chiva (Valencia), venue for the third round of the 2026 Spanish Karting Championship. A preparation session marked by extreme heat, a lack of initial pace and the complexity of finding the ideal setup in extreme conditions.\n\nA very demanding test weekend\n\nThe three days of training at the Valencia circuit proved a technical and physical challenge from the very first moment. The heat conditions were brutal, with temperatures complicating work both on track and in the pits. The asphalt, grip and kart behavior changed constantly, making it practically impossible to maintain a stable pace.\n\nDuring the first day, the team had to fight against lap times far from expectations. With no clear rhythm and the driver disconnected from the kart's ideal feeling, each session became a race against the clock to understand what was going wrong. The heat affected the engine, the tires and, above all, reaction capacity on a track that demands maximum concentration.\n\nAdjustments and mechanical issues\n\nThe second day was no easier. Problems getting everything dialed in accumulated: chassis adjustments that didn't respond as expected, engine temperature variations that forced constant mapping changes, and a generalized lack of grip that prevented improving lap times. The DB Motorsport team worked tirelessly, but the climatic conditions meant every small step forward was countered by a new obstacle.\n\nIt was a test of mental as much as physical endurance. When it seemed the setup was beginning to work, a new session with even higher temperatures reset all previous progress. The Extremaduran driver had to arm himself with patience and trust the process, knowing that the data gathered, however costly, would be fundamental for the race weekend.\n\nSigns of improvement at the end\n\nOn the third day, the first positive sensations finally arrived. With a more balanced kart and some setup changes beginning to pay off, Rubén managed to improve his times significantly in the final sessions. It wasn't the ideal pace yet, but enough to arrive at the race weekend with a base from which to compete.\n\nThe race will take place on June 20-21 at the Kartódromo Lucas Guerrero in Chiva, Valencia. After tests where nothing came easy, the goal is clear: accumulate kilometers, keep learning and fight for every position on a grid where every detail counts.\n\nSee you in Chiva, Valencia.`,
      date: '2026-06-16',
      readTime: '4 min',
      category: t('blog.category.karting'),
      image: chivaCekImg.url,
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
    : post.id === 'fuel-extrem-visita-ecuador-cek'
    ? {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'Fuel Extrem, patrocinio, Rubén Muñoz, karting, CEK Hyundai, Cáceres, Extremadura, La Portada de Extremadura, gasolineras Galp'
          : 'Fuel Extrem, sponsorship, Rubén Muñoz, karting, CEK Hyundai, Cáceres, Extremadura, La Portada de Extremadura, Galp service stations',
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
    : post.id === 'cek-chiva-valencia-r3'
    ? {
        title: post.title,
        description: post.excerpt,
        keywords: language === 'es'
          ? 'CEK, Chiva, Valencia, Kartódromo Lucas Guerrero, Rubén Muñoz, karting, tests, calor, DB Motorsport, Campeonato España Karting, tercera ronda'
          : 'CEK, Chiva, Valencia, Kartódromo Lucas Guerrero, Rubén Muñoz, karting, testing, heat, DB Motorsport, Spanish Karting Championship, third round',
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
            ) : post.id === 'fuel-extrem-visita-ecuador-cek' ? (
              // Fuel Extrem — La Portada de Extremadura, por Antonio Mayorgas
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
                    {language === 'es' ? 'Periodista — La Portada de Extremadura' : 'Journalist — La Portada de Extremadura'}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-white text-lg font-medium mb-4">
                      {language === 'es' ? 'Fuente de la noticia' : 'News Source'}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="https://www.laportadadeextremadura.com/deportes/deportes-extremadura/ruben-munoz-visita-fuel-extrem-en-ecuador-su-aventura-en-karting-nacional_5421_102.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                          La Portada de Extremadura: Rubén Muñoz visita Fuel Extrem en el ecuador de su aventura en el karting nacional
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