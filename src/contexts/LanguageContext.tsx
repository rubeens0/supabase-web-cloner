import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getRoute: (route: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const routes = {
  es: {
    home: '/inicio',
    contact: '/contacto',
    business: '/business',
    sponsors: '/patrocinadores',
    blog: '/blog',
  },
  en: {
    home: '/home',
    contact: '/contact',
    business: '/business',
    sponsors: '/sponsors',
    blog: '/blog',
  },
};

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.contact': 'Contacto',
    'nav.business': 'Business',
    'nav.sponsors': 'Patrocinadores',
    'nav.blog': 'Blog',
    
    // Business Page
    'business.hero.description': 'Estudio profesional de diseño y marketing digital. Impulsando marcas y pilotos hacia el siguiente nivel.',
    'business.contact': 'Contactar',
    'business.schedule': 'Agendar reunión',
    
    'business.about.p1': 'Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos muy enfocados al motorsport —pilotos, equipos y proyectos de karting y automovilismo—, pero hoy también trabajamos con empresas de distintos sectores que necesitan una imagen sólida y resultados reales en el entorno digital.',
    'business.about.p2': 'Nos dedicamos a construir y gestionar la imagen de marca: diseñamos la identidad visual, creamos todo el contenido gráfico (carteles, creatividades, anuncios, material corporativo), desarrollamos webs y gestionamos de forma profesional las redes sociales y la publicidad en Meta (Facebook e Instagram) para aumentar visibilidad, generar comunidad y atraer clientes o patrocinadores.',
    'business.about.p3': 'Además, ofrecemos gestión de patrocinios y campañas específicas para dar valor a los sponsors, así como servicios complementarios ligados al rendimiento y la proyección del piloto o la marca.',
    
    'business.goal.title': 'Mi objetivo',
    'business.goal.description': 'Que cada cliente y cada proyecto que este en mis manos, experimente lo mejor de mi y tenga la maxima satisfacion posible. Escala tu negocio o tu marca conmigo y con mi equipo.',
    
    'business.services.branding': 'Identidad Visual',
    'business.services.branding.desc': 'Diseño de identidad corporativa, logotipos y material gráfico profesional.',
    'business.services.social': 'Redes Sociales',
    'business.services.social.desc': 'Gestión estratégica de comunidades y creación de contenido de alto impacto.',
    'business.services.growth': 'Publicidad & Growth',
    'business.services.growth.desc': 'Campañas en Meta Ads (Facebook e Instagram) orientadas a resultados.',
    'business.services.web': 'Desarrollo Web',
    'business.services.web.desc': 'Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',

    'business.netspy.title': 'NetSpy: Comunidad de Emprendedores',
    'business.netspy.description': 'Una comunidad exclusiva para jóvenes visionarios.',
    'business.netspy.p1': 'Rubén Muñoz y Hugo Trébol han creado un grupo privado para jóvenes emprendedores. Si tienes menos de 25 años, ya puedes rodearte de gente que te inspire y te ayude a crecer.',
    'business.netspy.p2': 'En NetSpy, fomentamos el networking, el aprendizaje colaborativo y el desarrollo de proyectos innovadores. Es el lugar donde las ideas se convierten en realidad gracias al apoyo de una comunidad vibrante y ambiciosa.',
    'business.netspy.cta': 'Unirme a la comunidad',
    
    // Home - Hero
    'home.hero.title': 'Construyendo la mejor<br />versión de mí mismo',
    'home.hero.description': 'Piloto de karting y emprendedor digital. Desde 2024, comprometido con el crecimiento personal y la excelencia en cada curva de la vida.',
    'home.hero.cta': 'Ver más',
    'home.hero.scroll': '¡Desliza!',
    
    // Home - About
    'home.about.title': 'Sobre mí',
    'home.about.p1': 'Soy Rubén Muñoz, nacido el 27 de febrero de 2009 en Cáceres, Extremadura (España). Desde 2024, estoy comprometido con un camino de crecimiento personal y excelencia, construyendo la mejor versión de mí mismo tanto a nivel deportivo como emprendedor.',
    'home.about.p2': 'En el ámbito deportivo, me dedico al karting, una de las disciplinas más exigentes que existen. Actualmente compito en el Campeonato de España de Karting, enfrentando cada curva con pasión y determinación.',
    'home.about.p3': 'Paralelamente, también he desarrollado proyectos en el mundo del marketing digital. Mi historia apenas comienza, pero estoy decidido a dejar huella.',
    'home.about.cta': 'Conecta conmigo',
    
    // Home - Areas
    'home.areas.title': 'Mis áreas de enfoque',
    'home.areas.subtitle': 'Dedicación completa en dos mundos que demandan excelencia',
    'home.areas.karting.title': 'Karting',
    'home.areas.karting.p1': 'Competidor en el Campeonato de España de Karting. A pesar de llevar poco tiempo, he logrado un progreso notable gracias a mi constancia y disciplina.',
    'home.areas.karting.p2': 'Cada carrera es una oportunidad para superarme y demostrar que con enfoque y sacrificio, no hay límites.',
    'home.areas.marketing.title': 'Marketing Digital',
    'home.areas.marketing.p1': 'Emprendedor digital desde 2024. He desarrollado proyectos en redes sociales y marketing, consiguiendo escalar con esfuerzo.',
    'home.areas.marketing.p2': 'Aprendo de cada paso y convierto mis ideas en acciones reales, aplicando la misma disciplina que en la pista.',
    
    // Home - Stats
    'home.stats.year.label': 'Año de inicio en karting y redes',
    'home.stats.growth.value': 'Crecimiento',
    'home.stats.growth.label': 'Constante personal y profesional',
    'home.stats.location.label': 'Cáceres, España',
    'home.stats.growth': 'Crecimiento',
    'home.stats.discipline': 'Disciplina',
    'home.stats.ambition': 'Ambición',
    
    // Home - Quote
    'home.quote': '"Trabajo cada día para ser mejor, inspirar a otros y demostrar que con enfoque y sacrificio, no hay límites."',
    'home.quote.author': '— Rubén Muñoz',
    
    // Contact
    'contact.title': 'Contacta conmigo',
    'contact.subtitle': 'Estoy siempre abierto a nuevas oportunidades y colaboraciones',
    'contact.info.title': 'Información de contacto',
    'contact.info.email': 'Email',
    'contact.info.location': 'Ubicación',
    'contact.info.locationValue': 'Cáceres, Extremadura, España',
    'contact.info.instagram': 'Instagram',
    'contact.form.title': 'Envíame un mensaje',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.form.successDesc': 'Te responderé lo antes posible',
    'contact.form.error': 'Error',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.emailPlaceholder': 'tu@email.com',
    'contact.form.messagePlaceholder': 'Escribe tu mensaje...',
    
    // Footer
    'footer.rights': '© 2026 Rubén Muñoz. Todos los derechos reservados.',
    'footer.business': 'Propuestas de negocio',
    'footer.sponsors': 'Para patrocinadores',
    'footer.built': 'Hecho desde cero',
    
    // Marketing Page
    'marketing.hero.title': 'Digital Marketing',
    'marketing.hero.subtitle': 'Professional social media management for drivers',
    'marketing.hero.description': 'I help drivers build their personal brand, connect with their followers and attract sponsors through effective content strategies and professional design.',
    
    'marketing.services.title': 'Servicios',
    'marketing.services.subtitle': 'Soluciones completas para tu presencia digital',
    'marketing.services.realimages': 'Imágenes reales de mis proyectos profesionales',
    
    'marketing.services.design.title': 'Diseño Gráfico',
    'marketing.services.design.p1': 'Creación de contenido visual profesional adaptado a la identidad de cada piloto.',
    'marketing.services.design.p2': 'Posts para redes sociales, banners, infografías y material promocional.',
    
    'marketing.services.social.title': 'Gestión de Redes Sociales',
    'marketing.services.social.p1': 'Planificación y publicación de contenido estratégico en Instagram, TikTok y otras plataformas.',
    'marketing.services.social.p2': 'Análisis de métricas y optimización continua para maximizar el alcance.',
    
    'marketing.services.ads.title': 'Campañas Publicitarias',
    'marketing.services.ads.p1': 'Diseño y ejecución de campañas pagadas en redes sociales para aumentar visibilidad.',
    'marketing.services.ads.p2': 'Segmentación de audiencia y optimización del presupuesto publicitario.',
    
    'marketing.services.webdev.title': 'Desarrollo Web',
    'marketing.services.webdev.p1': 'Creación de sitios web personalizados para pilotos ganadores que quieran destacar.',
    'marketing.services.webdev.p2': 'Portafolios profesionales, modernos y optimizados como esta web.',
    
    'marketing.services.callAction': '¿Te interesa? Contáctame para agendar una llamada',
    
    'marketing.clients.title': '+50 Clientes Satisfechos',
    'marketing.clients.subtitle': 'Pilotos que confían en mi gestión de redes sociales',
    
    'marketing.process.title': 'Mi proceso',
    'marketing.process.step1.title': 'Análisis',
    'marketing.process.step1.desc': 'Estudio tu marca, objetivos y audiencia para crear una estrategia personalizada.',
    'marketing.process.step2.title': 'Estrategia',
    'marketing.process.step2.desc': 'Desarrollo un plan de contenido adaptado a tus necesidades y calendario de competiciones.',
    'marketing.process.step3.title': 'Ejecución',
    'marketing.process.step3.desc': 'Creo y publico contenido de calidad, gestionando tus redes con profesionalidad.',
    'marketing.process.step4.title': 'Análisis y mejora',
    'marketing.process.step4.desc': 'Monitoreo resultados y ajusto la estrategia para mejorar continuamente.',
    
    'marketing.cta.title': '¿Listo para potenciar tu marca?',
    'marketing.cta.description': 'Hablemos sobre cómo puedo ayudarte a destacar en redes sociales',
    'marketing.cta.button': 'Contactar ahora',
    'marketing.services.button': 'Servicios',
    
    'marketing.portfolio.title': 'Portfolio de Diseños',
    'marketing.portfolio.subtitle': 'Algunos de mis trabajos de diseño gráfico para redes sociales',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Novedades sobre mis carreras y proyectos :)',
    'blog.readMore': 'Leer más',
    'blog.comingSoon': 'Más artículos próximamente...',
    'blog.locale': 'es-ES',
    
    'blog.category.karting': 'Karting',
    'blog.category.marketing': 'Marketing',
    'blog.category.personal': 'Desarrollo Personal',
    'blog.category.education': 'Educación',
    
    'blog.post1.title': 'Mi primer año en el karting: Aprendizajes y desafíos',
    'blog.post1.excerpt': 'Un viaje de autodescubrimiento en el que cada carrera me enseñó más sobre disciplina, perseverancia y la importancia de mantener el enfoque en los objetivos.',
    
    'blog.post2.title': 'Estrategias de contenido para pilotos en redes sociales',
    'blog.post2.excerpt': 'Cómo construir una marca personal sólida en el mundo del motorsport a través del marketing digital y la creación de contenido auténtico.',
    
    'blog.post3.title': 'El poder de la mentalidad: Lecciones de la pista',
    'blog.post3.excerpt': 'La mentalidad ganadora no se construye solo en la pista. Descubre cómo aplicar los principios del alto rendimiento deportivo a todos los aspectos de la vida.',
    
    'blog.cek.title': 'Gran última ronda del CEK en Zaragoza',
    'blog.cek.excerpt': 'El pasado fin de semana, el 20 de septiembre, conseguimos clasificarnos para la final del domingo tras superar diversos contratiempos con el motor y el chasis durante el viernes.',
    'blog.backToBlog': 'Volver al blog',
    'blog.notFound': 'Artículo no encontrado',

    'blog.netspy.title': 'Grupo de Jóvenes Emprendedores NetSpyES🇪🇸',
    'blog.netspy.excerpt': 'Rubén Muñoz y Hugo Trébol han creado un grupo privado para jóvenes emprendedores. Si tienes menos de 25 años, ya puedes rodearte de gente que te inspire y te ayude a crecer.',
    
    'blog.netpro.title': 'Netpro global marketing & consulting',
    'blog.netpro.excerpt': 'Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos muy enfocados al motorsport, pero hoy también trabajamos con empresas de distintos sectores.',
    
    'blog.albroksa.title': 'Albroksa impulsa el talento joven con el patrocinio del piloto Rubén Muñoz en el CEK',
    'blog.albroksa.excerpt': 'Albroksa, Correduría de Seguros, reafirma su apuesta por el deporte y las jóvenes promesas anunciando el patrocinio oficial con Rubén Muñoz Cruz.',
    
    'blog.testrecas.title': 'Primer test del 2026 en Recas, Toledo',
    'blog.testrecas.excerpt': 'El pasado fin de semana 21-22 de febrero probamos el material para este año junto a DB Motorsport en el circuito Recas Correcaminos. Muy buenas primeras sensaciones tras 5 meses sin rodar.',
    
    'blog.portadaextremadura.title': 'Crónica CEK R1: Primera cita en Campillos',
    'blog.portadaextremadura.excerpt': 'El piloto extremeño Rubén Muñoz cerró su participación en la primera cita del campeonato en el Circuito de Campillos con una jornada de domingo marcada por la exigencia, las remontadas complicadas y los problemas mecánicos.',
    
    'blog.cajarural.title': 'Caja Rural de Extremadura apoya el talento joven en el deporte promocionando al piloto cacereño Rubén Muñoz',
    'blog.cajarural.excerpt': 'La entidad apuesta por el deporte base y el talento emergente extremeño. Caja Rural de Extremadura ha formalizado un acuerdo de colaboración deportiva con el joven piloto cacereño de karting Rubén Muñoz.',
    
    // Sponsors Page
    'sponsors.hero.title': 'Patrocinio',
    'sponsors.tagline': 'Un patrocinio diferente, unos resultados diferentes',
    'sponsors.hero.description': 'Mi segundo año en el Campeonato de España de Karting está a punto de comenzar. Únete a mi proyecto deportivo y forma parte de esta emocionante temporada 2026.',
    'sponsors.expertise.title': 'Experto en marketing digital',
    'sponsors.expertise.meta': 'Meta Ads',
    'sponsors.intro.title': 'Colabora con mi proyecto deportivo',
    'sponsors.intro.p1': 'Tras un primer año lleno de aprendizajes y dedicación, me preparo para afrontar mi segunda temporada en el Campeonato de España de Karting con más experiencia, hambre de resultados y una visión clara hacia el futuro.',
    'sponsors.intro.p2': 'Estoy buscando aliados que quieran formar parte de este viaje, que crean en el potencial de un piloto joven y comprometido, y que entiendan que un patrocinio no es solo visibilidad, sino una colaboración auténtica que genera valor para ambas partes.',
    'sponsors.intro.p3': 'Si buscas algo diferente, un proyecto con proyección y un piloto que trabaja cada día para ser mejor, este es el momento de unirte.',
    'sponsors.valueAdd.title': 'Más que un piloto: Tu aliado en marketing digital',
    'sponsors.valueAdd.description': 'A diferencia de otros pilotos, yo personalmente administro campañas de marketing en redes sociales. Combino la creatividad con el deporte, garantizando que tu marca sea representada con profesionalidad y estrategia digital efectiva. Tu patrocinio tendrá el respaldo de contenido de calidad gestionado por mí.',
    'sponsors.why.title': '¿Por qué patrocinarme?',
    'sponsors.why.card1.title': 'Visibilidad Nacional',
    'sponsors.why.card1.desc': 'Tu marca presente en cada carrera del Campeonato de España, con exposición ante miles de aficionados al motorsport.',
    'sponsors.why.card2.title': 'Contenido Digital',
    'sponsors.why.card2.desc': 'Presencia activa en redes sociales con contenido profesional que destaca tu marca de forma auténtica.',
    'sponsors.why.card3.title': 'Compromiso Total',
    'sponsors.why.card3.desc': 'Un piloto joven, dedicado y en constante evolución que representa tus valores con profesionalidad.',
    'sponsors.cta.title': '¿Quieres formar parte del proyecto?',
    'sponsors.cta.description': 'Hablemos sobre cómo podemos crear juntos una colaboración que marque la diferencia en la temporada 2026.',
    'sponsors.cta.button': 'Contactar ahora',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.contact': 'Contact',
    'nav.business': 'Business',
    'nav.sponsors': 'Sponsors',
    'nav.blog': 'Blog',

    // Business Page
    'business.hero.description': 'Professional design and digital marketing studio. Propelling brands and drivers to the next level.',
    'business.contact': 'Contact',
    'business.schedule': 'Schedule meeting',
    
    'business.about.p1': 'Netpro Agency is a professional design and digital marketing studio. We were born very focused on motorsport —drivers, teams and karting and racing projects—, but today we also work with companies from different sectors that need a solid image and real results in the digital environment.',
    'business.about.p2': 'We are dedicated to building and managing brand image: we design visual identity, create all graphic content (posters, creatives, ads, corporate material), develop websites and professionally manage social networks and advertising on Meta (Facebook and Instagram) to increase visibility, generate community and attract customers or sponsors.',
    'business.about.p3': 'In addition, we offer sponsorship management and specific campaigns to give value to sponsors, as well as complementary services linked to the performance and projection of the pilot or brand.',
    
    'business.goal.title': 'My goal',
    'business.goal.description': 'That every client and every project in my hands experiences the best of me and has the maximum satisfaction possible. Scale your business or your brand with me and my team.',
    
    'business.services.branding': 'Visual Identity',
    'business.services.branding.desc': 'Corporate identity design, logos and professional graphic material.',
    'business.services.social': 'Social Media',
    'business.services.social.desc': 'Strategic community management and high-impact content creation.',
    'business.services.growth': 'Ads & Growth',
    'business.services.growth.desc': 'Meta Ads campaigns (Facebook and Instagram) oriented to results.',
    'business.services.web': 'Web Development',
    'business.services.web.desc': 'Modern, fast and optimized websites to turn visitors into customers.',

    'business.netspy.title': 'NetSpy: Entrepreneurs Community',
    'business.netspy.description': 'An exclusive community for young visionaries.',
    'business.netspy.p1': 'Rubén Muñoz and Hugo Trébol have created a private group for young entrepreneurs. If you are under 25, you can now surround yourself with people who inspire you and help you grow.',
    'business.netspy.p2': 'At NetSpy, we encourage networking, collaborative learning and the development of innovative projects. It is the place where ideas become reality thanks to the support of a vibrant and ambitious community.',
    'business.netspy.cta': 'Join the community',
    
    // Home - Hero
    'home.hero.title': 'Building the best<br />version of myself',
    'home.hero.description': 'Karting driver and digital entrepreneur. Since 2024, committed to personal growth and excellence at every turn of life.',
    'home.hero.cta': 'View my journey',
    'home.hero.scroll': 'Scroll!',
    
    // Home - About
    'home.about.title': 'About me',
    'home.about.p1': 'I am Rubén Muñoz, born on February 27, 2009 in Cáceres, Extremadura (Spain). Since 2024, I have been committed to a path of personal growth and excellence, building the best version of myself both athletically and entrepreneurially.',
    'home.about.p2': 'In the sports field, I dedicate myself to karting, one of the most demanding disciplines that exist. I currently compete in the Spanish Karting Championship, facing every turn with passion and determination.',
    'home.about.p3': 'In parallel, I have also developed projects in the world of digital marketing. My story is just beginning, but I am determined to leave my mark.',
    'home.about.cta': 'Connect with me',
    
    // Home - Areas
    'home.areas.title': 'My focus areas',
    'home.areas.subtitle': 'Complete dedication in two worlds that demand excellence',
    'home.areas.karting.title': 'Karting',
    'home.areas.karting.p1': 'Competitor in the Spanish Karting Championship. Despite my short time, I have made remarkable progress thanks to my perseverance and discipline.',
    'home.areas.karting.p2': 'Every race is an opportunity to improve myself and prove that with focus and sacrifice, there are no limits.',
    'home.areas.marketing.title': 'Digital Marketing',
    'home.areas.marketing.p1': 'Digital entrepreneur since 2024. I have developed projects in social media and marketing, managing to scale with effort.',
    'home.areas.marketing.p2': 'I learn from every step and turn my ideas into real actions, applying the same discipline as on the track.',
    
    // Home - Stats
    'home.stats.year.label': 'Starting year in karting and networks',
    'home.stats.growth.value': 'Growth',
    'home.stats.growth.label': 'Constant personal and professional',
    'home.stats.location.label': 'Cáceres, Spain',
    'home.stats.growth': 'Growth',
    'home.stats.discipline': 'Discipline',
    'home.stats.ambition': 'Ambition',
    
    // Home - Quote
    'home.quote': '"I work every day to be better, inspire others and prove that with focus and sacrifice, there are no limits."',
    'home.quote.author': '— Rubén Muñoz',
    
    // Contact
    'contact.title': 'Contact me',
    'contact.subtitle': 'I\'m always open to new opportunities and collaborations',
    'contact.info.title': 'Contact information',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    'contact.info.locationValue': 'Cáceres, Extremadura, Spain',
    'contact.info.instagram': 'Instagram',
    'contact.form.title': 'Send me a message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.success': 'Message sent successfully',
    'contact.form.successDesc': 'I will reply as soon as possible.',
    
    // Footer
    'footer.rights': '© 2026 Rubén Muñoz. All rights reserved.',
    'footer.business': 'Business proposals',
    'footer.sponsors': 'For sponsors',
    'footer.built': 'Built from scratch',
    
    // Marketing Page
    'marketing.hero.title': 'Digital Marketing',
    'marketing.hero.subtitle': 'Professional social media management for drivers',
    'marketing.hero.description': 'I help drivers build their personal brand, connect with their followers and attract sponsors through effective content strategies and professional design.',
    
    'marketing.services.title': 'Services',
    'marketing.services.subtitle': 'Complete solutions for your digital presence',
    'marketing.services.realimages': 'Real images of my professional projects',
    
    'marketing.services.design.title': 'Graphic Design',
    'marketing.services.design.p1': 'Professional visual content creation tailored to each driver\'s identity.',
    'marketing.services.design.p2': 'Social media posts, banners, infographics and promotional material.',
    
    'marketing.services.social.title': 'Social Media Management',
    'marketing.services.social.p1': 'Strategic content planning and publishing on Instagram, TikTok and other platforms.',
    'marketing.services.social.p2': 'Metrics analysis and continuous optimization to maximize reach.',
    
    'marketing.services.ads.title': 'Advertising Campaigns',
    'marketing.services.ads.p1': 'Design and execution of paid campaigns on social media to increase visibility.',
    'marketing.services.ads.p2': 'Audience targeting and advertising budget optimization.',
    
    'marketing.services.webdev.title': 'Web Development',
    'marketing.services.webdev.p1': 'Custom website creation for winning drivers who want to stand out.',
    'marketing.services.webdev.p2': 'Professional, modern and optimized portfolios like this website.',
    
    'marketing.services.callAction': 'Interested? Contact me to schedule a call',
    
    'marketing.clients.title': '+50 Satisfied Clients',
    'marketing.clients.subtitle': 'Drivers who trust my social media management',
    
    'marketing.process.title': 'My process',
    'marketing.process.step1.title': 'Analysis',
    'marketing.process.step1.desc': 'I study your brand, goals and audience to create a personalized strategy.',
    'marketing.process.step2.title': 'Strategy',
    'marketing.process.step2.desc': 'I develop a content plan tailored to your needs and competition calendar.',
    'marketing.process.step3.title': 'Execution',
    'marketing.process.step3.desc': 'I create and publish quality content, managing your networks professionally.',
    'marketing.process.step4.title': 'Analysis and improvement',
    'marketing.process.step4.desc': 'I monitor results and adjust the strategy to continuously improve.',
    
    'marketing.cta.title': 'Ready to boost your brand?',
    'marketing.cta.description': 'Let\'s talk about how I can help you stand out on social media',
    'marketing.cta.button': 'Contact now',
    'marketing.services.button': 'Services',
    
    'marketing.portfolio.title': 'Design Portfolio',
    'marketing.portfolio.subtitle': 'Some of my graphic design work for social media',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Updates about my races and projects :)',
    'blog.readMore': 'Read more',
    'blog.comingSoon': 'More articles coming soon...',
    'blog.locale': 'en-US',
    
    'blog.category.karting': 'Karting',
    'blog.category.marketing': 'Marketing',
    'blog.category.personal': 'Personal Development',
    'blog.category.education': 'Education',
    
    'blog.post1.title': 'My first year in karting: Lessons and challenges',
    'blog.post1.excerpt': 'A journey of self-discovery where each race taught me more about discipline, perseverance and the importance of focusing on goals.',
    
    'blog.post2.title': 'Content strategies for drivers on social media',
    'blog.post2.excerpt': 'How to build a solid personal brand in the motorsport world through digital marketing and authentic content creation.',
    
    'blog.post3.title': 'The power of mindset: Lessons from the track',
    'blog.post3.excerpt': 'A winning mindset is not built only on the track. Discover how to apply the principles of high-performance sports to all aspects of life.',
    
    'blog.cek.title': 'Great final round of CEK in Zaragoza',
    'blog.cek.excerpt': 'Last weekend, on September 20th, we managed to qualify for Sunday\'s final after overcoming various setbacks with the engine and chassis during Friday.',
    'blog.backToBlog': 'Back to blog',
    'blog.notFound': 'Article not found',

    'blog.netspy.title': 'Young Entrepreneurs Group NetSpyES🇪🇸',
    'blog.netspy.excerpt': 'Rubén Muñoz and Hugo Trébol have created a private group for young entrepreneurs. If you are under 25 years old, you can already surround yourself with people who inspire you.',
    
    'blog.netpro.title': 'Netpro global marketing & consulting',
    'blog.netpro.excerpt': 'Netpro Agency is a professional design and digital marketing studio. We were born very focused on motorsport, but today we also work with companies from different sectors.',
    
    'blog.albroksa.title': 'Albroksa boosts young talent sponsoring pilot Rubén Muñoz in the CEK',
    'blog.albroksa.excerpt': 'Albroksa, Insurance Brokerage, reaffirms its commitment to sports and young promises by announcing the official sponsorship of Rubén Muñoz Cruz.',
    
    'blog.testrecas.title': 'First test of 2026 in Recas, Toledo',
    'blog.testrecas.excerpt': 'Last weekend, February 21-22, we tested the material for this year with DB Motorsport at the Recas Correcaminos circuit. Very good first sensations after 5 months without driving.',
    
    'blog.portadaextremadura.title': 'CEK R1 Chronicle: First round at Campillos',
    'blog.portadaextremadura.excerpt': 'Extremaduran driver Rubén Muñoz closed his participation in the first round of the championship at the Campillos Circuit with a Sunday marked by demanding conditions, difficult comebacks and mechanical problems.',
    
    'blog.cajarural.title': 'Caja Rural de Extremadura supports young talent in sports by promoting pilot Rubén Muñoz from Cáceres',
    'blog.cajarural.excerpt': 'The entity bets on grassroots sports and emerging talent in Extremadura. Caja Rural de Extremadura has formalized a sports collaboration agreement with young karting pilot Rubén Muñoz from Cáceres.',
    
    // Sponsors Page
    'sponsors.hero.title': 'Sponsorship',
    'sponsors.tagline': 'A different sponsorship, different results',
    'sponsors.hero.description': 'My second year in the Spanish Karting Championship is about to begin. Join my sports project and be part of this exciting 2026 season.',
    'sponsors.expertise.title': 'Digital Marketing expertise',
    'sponsors.expertise.meta': 'Meta Ads',
    'sponsors.intro.title': 'Collaborate with my sports project',
    'sponsors.intro.p1': 'After a first year full of learning and dedication, I am preparing to face my second season in the Spanish Karting Championship with more experience, hunger for results and a clear vision towards the future.',
    'sponsors.intro.p2': 'I am looking for allies who want to be part of this journey, who believe in the potential of a young and committed driver, and who understand that sponsorship is not just visibility, but an authentic collaboration that generates value for both parties.',
    'sponsors.intro.p3': 'If you are looking for something different, a project with projection and a driver who works every day to be better, this is the time to join.',
    'sponsors.valueAdd.title': 'More than a driver: Your digital marketing ally',
    'sponsors.valueAdd.description': 'Unlike other drivers, I personally manage social media marketing campaigns. I combine creativity with sport, ensuring your brand is represented with professionalism and effective digital strategy. Your sponsorship will have the backing of quality content managed by me.',
    'sponsors.why.title': 'Why sponsor me?',
    'sponsors.why.card1.title': 'National Visibility',
    'sponsors.why.card1.desc': 'Your brand present at every race of the Spanish Championship, with exposure to thousands of motorsport fans.',
    'sponsors.why.card2.title': 'Digital Content',
    'sponsors.why.card2.desc': 'Active presence on social media with professional content that highlights your brand authentically.',
    'sponsors.why.card3.title': 'Total Commitment',
    'sponsors.why.card3.desc': 'A young, dedicated and constantly evolving driver who represents your values professionally.',
    'sponsors.cta.title': 'Want to be part of the project?',
    'sponsors.cta.description': 'Let\'s talk about how we can create together a collaboration that makes a difference in the 2026 season.',
    'sponsors.cta.button': 'Contact now',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  const getRoute = (route: string): string => {
    return routes[language][route as keyof typeof routes.es] || route;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getRoute }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}