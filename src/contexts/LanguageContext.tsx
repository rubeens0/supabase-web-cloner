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
    /* ===== Navigation ===== */
    'nav.home': 'Inicio',
    'nav.contact': 'Contacto',
    'nav.business': 'Negocio',
    'nav.sponsors': 'Patrocinadores',
    'nav.blog': 'Blog',

    /* ===== Banner / Top bar ===== */
    'banner.season': 'CEK 2026',
    'banner.seasonNote': 'Temporada en marcha',
    'banner.learnMore': 'Más información',

    /* ===== Footer ===== */
    'footer.rights': '© 2026 Rubén Muñoz. Todos los derechos reservados.',
    'footer.business': 'Propuestas de negocio',
    'footer.sponsors': 'Para patrocinadores',
    'footer.built': 'Hecho desde cero',

    /* ===== Home – Hero ===== */
    'home.hero.kicker': 'Piloto · Emprendedor · 2026',
    'home.hero.titleA': 'Construyendo la',
    'home.hero.titleB': 'mejor',
    'home.hero.titleC': 'versión de mí',
    'home.hero.titleD': 'mismo',
    'home.hero.description':
      'Piloto de karting y emprendedor. Desde 2024, comprometido con mi crecimiento personal y la excelencia.',
    'home.hero.placeholder': '¿Quieres conocer mi historia?',
    'home.hero.cta': 'Ver más',
    'home.hero.scroll': '¡Desliza!',
    'home.hero.season': 'Temporada 2026',

    /* ===== Home – Social proof (sec. 02) ===== */
    'home.proof.headlineA': 'Sobre',
    'home.proof.headlineB': 'mis proyectos.',
    'home.proof.stat1.label': 'Mi agencia de marketing.',
    'home.proof.stat2.label': 'Campeonato de España de Karting.',
    'home.proof.stat3.value': '3',
    'home.proof.stat3.label': 'Lines de emprendimiento activas.',

    /* ===== Home – About (sec. 03) ===== */
    'home.about.title': 'Sobre mí',
    'home.about.headlineA': 'Una',
    'home.about.headlineB': 'historia',
    'home.about.headlineC': 'en dos pistas.',
    'home.about.p1':
      'Soy Rubén Muñoz, nacido el 27 de febrero de 2009 en Cáceres, Extremadura (España). Desde 2024, estoy comprometido con un camino de crecimiento personal y excelencia, construyendo la mejor versión de mí mismo tanto a nivel deportivo como emprendedor.',
    'home.about.p2':
      'En el ámbito deportivo, me dedico al karting, una de las disciplinas más exigentes que existen. Actualmente compito en el Campeonato de España de Karting, enfrentando cada prueba con pasión y determinación.',
    'home.about.p3':
      'Paralelamente, también he desarrollado proyectos en el mundo del emprendimiento, desarrollando múltiples proyectos con desde los 15 años.',
    'home.about.cta': 'Contacta conmigo',
    'home.about.tag': 'Driver, creator',
    'home.about.tagAnd': '&',
    'home.about.tagRole': 'strategist.',
    'home.about.location': 'Cáceres · 2009 →',

    /* ===== Home – Areas (sec. 04) ===== */
    'home.areas.title': 'Mis áreas de enfoque',
    'home.areas.headlineA': 'Dos',
    'home.areas.headlineB': 'mundos',
    'home.areas.headlineC': 'que demandan excelencia.',
    'home.areas.subtitle': 'Dedicación completa en dos mundos que exigen excelencia.',
    'home.areas.karting.tag': '01 / Pista',
    'home.areas.karting.title': 'Karting',
    'home.areas.karting.p1':
      'Competidor en el Campeonato de España de Karting. A pesar de llevar poco tiempo, he logrado un progreso notable gracias a mi constancia y disciplina.',
    'home.areas.karting.p2':
      'Cada carrera es una oportunidad para superarme y demostrar que con enfoque y sacrificio, no hay límites.',
    'home.areas.marketing.tag': '02 / Emprendimiento',
    'home.areas.marketing.title': 'Emprendimiento',
    'home.areas.marketing.p1':
      'Emprendedor desde 2024. He desarrollado proyectos en redes sociales y marketing, escalando a base de esfuerzo.',
    'home.areas.marketing.p2':
      'Aprendo de cada paso y convierto mis ideas en acciones reales, aplicando la misma disciplina que en la pista.',

    /* ===== Home – Blog (sec. 05) ===== */
    'home.blog.headlineA': 'Últimas',
    'home.blog.headlineB': 'entradas',
    'home.blog.viewAll': 'Ver todas',

    /* ===== Home – Manifesto (sec. 06) ===== */
    'home.manifesto.label': 'Manifiesto',

    /* ===== Home – Final CTA (sec. 07) ===== */
    'home.cta.label': 'Hablemos',
    'home.cta.headlineA': '¿Tienes una',
    'home.cta.headlineB': 'propuesta',
    'home.cta.headlineC': '? Hablemos.',
    'home.cta.description':
      'Siempre abierto a lo que tiene sentido. Proyectos, colaboraciones, patrocinios.',
    'home.cta.contactNumber': 'N° 07 — CONTACTO',

    /* ===== Home – Quote ===== */
    'home.quote':
      '"Trabajo cada día para ser mejor, inspirar a otros y demostrar que con enfoque y sacrificio, no hay límites."',
    'home.quote.author': '— Rubén Muñoz',

    /* ===== Home – Stats (legacy keys, kept) ===== */
    'home.stats.year.label': 'Año de inicio en karting y redes',
    'home.stats.growth.value': 'Crecimiento',
    'home.stats.growth.label': 'Constante personal y profesional',
    'home.stats.location.label': 'Cáceres, España',
    'home.stats.growth': 'Crecimiento',
    'home.stats.discipline': 'Disciplina',
    'home.stats.ambition': 'Ambición',

    /* ===== Business page ===== */
    'business.label': 'Negocio · Líneas',
    'business.headlineA': 'Líneas de',
    'business.headlineB': 'negocio',
    'business.hero.label': 'Marketing Digital',
    'business.hero.description':
      'Agencia profesional de diseño y marketing digital. Impulsando marcas y pilotos hacia el siguiente nivel.',
    'business.contact': 'Contactar',
    'business.schedule': 'Agendar reunión',

    'business.about.p1':
      'Netpro Agency es una agencia profesional de diseño y marketing digital. Nacimos enfocados al motorsport —pilotos, equipos y proyectos del automovilismo— Trabajamos para crear marcas de pilotos y equipos rentables a través de las redes sociales. Visita la pagina web y descubre la agencia.',
    'business.about.p2':
      'Construimos y gestionamos la imagen de marca: diseñamos la identidad visual, creamos todo el contenido gráfico (carteles, creatividades, anuncios, material corporativo), desarrollamos webs y gestionamos de forma profesional las redes sociales y la publicidad en Meta (Facebook e Instagram) para aumentar visibilidad, generar comunidad y atraer clientes o patrocinadores.',
    'business.about.p3':
      'Además, ofrecemos gestión de patrocinios y campañas específicas para dar valor a los sponsors, así como servicios complementarios ligados al rendimiento y la proyección del piloto o la marca.',

    'business.goal.title': 'Mi objetivo',
    'business.goal.description':
      'Que cada cliente y cada proyecto en mis manos experimente lo mejor de mí y la máxima satisfacción posible. Escala tu negocio o tu marca conmigo y con mi equipo.',

    'business.services.branding': 'Identidad Visual',
    'business.services.branding.desc':
      'Diseño de identidad corporativa, logotipos y material gráfico profesional.',
    'business.services.social': 'Redes Sociales',
    'business.services.social.desc':
      'Gestión estratégica de comunidades y creación de contenido de alto impacto.',
    'business.services.growth': 'Motorsport',
    'business.services.growth.desc':
      'Campañas en Meta Ads (Facebook e Instagram) orientadas a resultados.',
    'business.services.web': 'Motorsport marketing',
    'business.services.web.desc':
      'Sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.',

    /* RDE block on Business page */
    'business.rde.subtitle': 'Funnels & Generación de Leads',
    'business.rde.description':
      'Optimización de embudos de venta y generación de leads para info-empresarios hispanohablantes que quieren convertir su audiencia en ingresos predecibles.',
    'business.rde.extended':
      'Somos Rubén, Diego y Erik — Nos convertimos en el equipo de crecimiento de un número limitado de clientes, con implicación real en estrategia y ejecución.',
    'business.rde.cta': 'Conocer RDE',
    'business.rde.feat1': 'Diagnóstico',
    'business.rde.feat2': 'Estrategia',
    'business.rde.feat3': 'Ejecución',
    'business.rde.feat4': 'Optimización',

    'business.netpro.subtitle': 'Motorsport',

    'business.netspy.title': 'Netspy: Comunidad de Emprendedores',
    'business.netspy.subtitle': 'Comunidad & Networking',
    'business.netspy.description': 'Una comunidad exclusiva para jóvenes visionarios.',
    'business.netspy.p1':
      'Rubén Muñoz y Hugo Trébol han creado un grupo privado para jóvenes emprendedores. Si tienes menos de 25 años, ya puedes rodearte de gente que te inspire y te ayude a crecer.',
    'business.netspy.p2':
      'En Netspy, fomentamos el networking, el aprendizaje colaborativo y el desarrollo de proyectos innovadores. Es el lugar donde las ideas se convierten en realidad gracias al apoyo de una comunidad vibrante y ambiciosa.',
    'business.netspy.cta': 'Síguenos en Instagram',
    'business.netspy.feat1': 'Construcción de comunidad',
    'business.netspy.feat2': 'Eventos exclusivos',
    'business.netspy.feat3': 'Networking entre fundadores',
    'business.netspy.feat4': 'Alianzas estratégicas',

    'business.ecomscrape.title': 'EcomScrape',
    'business.ecomscrape.subtitle': 'E-commerce Intelligence',
    'business.ecomscrape.description':
      'Extrae catálogos completos de cualquier e-commerce en segundos. Extractores profesionales para Shopify, WooCommerce y PrestaShop con bypass anti-bot, exportación CSV/JSON y analítica de tráfico integrada.',
    'business.ecomscrape.extended':
      'Colaboración de Rubén Muñoz con Anas Walton (@anaswalton) y soyrage.es. Inteligencia competitiva real: precios, bestsellers, tech stack, demografía y gasto en ads de cualquier tienda online en un solo clic.',
    'business.ecomscrape.cta': 'ecomscrape.com',
    'business.ecomscrape.feat1': 'Extracción de catálogos',
    'business.ecomscrape.feat2': 'Inteligencia de tienda',
    'business.ecomscrape.feat3': 'Software',
    'business.ecomscrape.feat4': 'Analítica de tráfico',

    /* ===== RDE landing ===== */
    'rde.bar.note': 'Solo trabajamos con 3 clientes nuevos por mes',
    'rde.bar.slots': '1 plaza disponible',
    'rde.hero.audience': 'Para info-empresarios hispanohablantes',
    'rde.hero.titleA': 'Ayudamos a info-empresarios a convertir su audiencia en',
    'rde.hero.titleB': 'ingresos predecibles',
    'rde.hero.titleC': 'sin depender de su presencia constante',
    'rde.hero.subtitle':
      'Si ya tienes conocimiento, audiencia o producto pero tus ventas dependen de que tú estés activo cada día — esto es para ti.',
    'rde.hero.cta': 'Quiero aplicar con RDE Operators',
    'rde.hero.badge1': 'Sin compromiso',
    'rde.hero.badge2': 'Revisamos cada solicitud',
    'rde.hero.badge3': 'Respuesta en 48h',

    'rde.diag.label': 'Diagnóstico',
    'rde.diag.titleA': '¿Te suena',
    'rde.diag.titleB': 'familiar',
    'rde.diag.titleC': '?',
    'rde.diag.item1':
      'Publicas constantemente pero tus ventas dependen de que sigas publicando',
    'rde.diag.item2':
      'Tienes audiencia o lista pero no sabes convertirla en clientes de forma predecible',
    'rde.diag.item3':
      'Probaste funnels, email y ads por tu cuenta pero nada funciona de forma consistente',
    'rde.diag.item4': 'No tienes tiempo de aprender a automatizar y ejecutar a la vez',
    'rde.diag.outroA': 'El problema no eres tú. Es que nadie te enseñó a construir un sistema que',
    'rde.diag.outroB': 'venda mientras tú descansas',
    'rde.diag.outroC': '.',

    'rde.fit.label': 'Encaje',
    'rde.fit.titleA': '¿Es esto',
    'rde.fit.titleB': 'para ti',
    'rde.fit.titleC': '?',
    'rde.fit.yes': 'Es para ti si…',
    'rde.fit.yes1': 'Tienes un infoproducto, curso o servicio de conocimiento',
    'rde.fit.yes2': 'Ya generas ventas pero quieres que sean predecibles',
    'rde.fit.yes3': 'Estás dispuesto a construir un sistema a largo plazo',
    'rde.fit.yes4': 'Facturas al menos 2.000€/mes con tu negocio actual',
    'rde.fit.no': 'No es para ti si…',
    'rde.fit.no1': 'Buscas resultados de un día para otro',
    'rde.fit.no2': 'No tienes oferta ni audiencia definida',
    'rde.fit.no3': 'Quieres que lo hagamos todo sin tu implicación',
    'rde.fit.no4': 'Buscas el precio más bajo del mercado',

    'rde.method.label': 'Metodología',
    'rde.method.titleA': 'Cómo construimos tu',
    'rde.method.titleB': 'sistema',
    'rde.method.subtitle': '4 fases. Sin genéricos. Con implicación real.',
    'rde.method.s1.title': 'Diagnóstico',
    'rde.method.s1.text':
      'Analizamos tu oferta, audiencia y puntos de fuga. Identificamos dónde está el dinero que se escapa.',
    'rde.method.s2.title': 'Estrategia',
    'rde.method.s2.text':
      'Diseñamos el sistema completo: qué publicar, cómo captar leads, qué automatizar y cómo convertir.',
    'rde.method.s3.title': 'Ejecución',
    'rde.method.s3.text':
      'Implementamos funnels, secuencias, ads y CRM. Tú sigues vendiendo, nosotros construimos la máquina.',
    'rde.method.s4.title': 'Optimización',
    'rde.method.s4.text':
      'Medimos, ajustamos y escalamos. No entregamos un proyecto y desaparecemos. Somos tu equipo de crecimiento.',

    'rde.guarantee.label': 'Garantía',
    'rde.guarantee.titleA': 'Nuestra garantía de',
    'rde.guarantee.titleB': 'trabajo',
    'rde.guarantee.body':
      'Si en 90 días no tienes un sistema de captación y conversión funcionando que mejore tus resultados actuales, seguimos trabajando sin coste adicional hasta lograrlo.',
    'rde.guarantee.note':
      'No cobramos por consultorías. Cobramos por sistemas que funcionan.',

    'rde.team.label': 'Equipo',
    'rde.team.titleA': 'No somos una agencia',
    'rde.team.titleB': 'al uso',
    'rde.team.body':
      'Somos Rubén, Diego y Erik — Nos convertimos en el equipo de crecimiento de un número limitado de clientes, con implicación real en estrategia y ejecución.',
    'rde.team.alt': 'Equipo RDE Operators — Rubén, Diego y Erik',

    'rde.final.label': 'Solicitar plaza',
    'rde.final.titleA': 'Si estás listo para construir un sistema que',
    'rde.final.titleB': 'escale',
    'rde.final.titleC': 'tu negocio — hablemos',
    'rde.final.body':
      'Revisamos cada solicitud manualmente. Si vemos encaje, te contactamos en menos de 48h para una llamada de diagnóstico sin coste.',
    'rde.final.cta': 'Solicitar mi plaza ahora',
    'rde.final.note': 'Sin compromiso. Sin presión. Solo una conversación.',
    'rde.final.scarcity': 'Plazas limitadas a 3 clientes por mes',

    /* ===== Contact ===== */
    'contact.title': 'Contacta conmigo',
    'contact.subtitle': 'Siempre abierto a nuevas oportunidades y colaboraciones.',
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
    'contact.form.sending': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.form.successDesc': 'Te responderé lo antes posible',
    'contact.form.error': 'Error',
    'contact.form.errorGeneric': 'Error al enviar el mensaje',
    'contact.form.fillFields': 'Por favor completa todos los campos',
    'contact.form.savedTitle': 'Mensaje guardado',
    'contact.form.savedDesc': 'El mensaje fue guardado pero el email no se envió',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.emailPlaceholder': 'tu@email.com',
    'contact.form.messagePlaceholder': 'Escribe tu mensaje...',

    /* ===== Marketing (legacy) ===== */
    'marketing.hero.title': 'Marketing Digital',
    'marketing.hero.subtitle': 'Gestión profesional de redes sociales para pilotos',
    'marketing.hero.description':
      'Ayudo a pilotos a construir su marca personal, conectar con su audiencia y atraer patrocinadores con estrategias de contenido eficaces y diseño profesional.',
    'marketing.services.title': 'Servicios',
    'marketing.services.subtitle': 'Soluciones completas para tu presencia digital',
    'marketing.services.realimages': 'Imágenes reales de mis proyectos profesionales',
    'marketing.services.design.title': 'Diseño Gráfico',
    'marketing.services.design.p1':
      'Creación de contenido visual profesional adaptado a la identidad de cada piloto.',
    'marketing.services.design.p2':
      'Posts para redes sociales, banners, infografías y material promocional.',
    'marketing.services.social.title': 'Gestión de Redes Sociales',
    'marketing.services.social.p1':
      'Planificación y publicación de contenido estratégico en Instagram, TikTok y otras plataformas.',
    'marketing.services.social.p2':
      'Análisis de métricas y optimización continua para maximizar el alcance.',
    'marketing.services.ads.title': 'Campañas Publicitarias',
    'marketing.services.ads.p1':
      'Diseño y ejecución de campañas pagadas en redes sociales para aumentar visibilidad.',
    'marketing.services.ads.p2': 'Segmentación de audiencia y optimización del presupuesto publicitario.',
    'marketing.services.webdev.title': 'Desarrollo Web',
    'marketing.services.webdev.p1': 'Webs personalizadas para pilotos ganadores que quieren destacar.',
    'marketing.services.webdev.p2': 'Portfolios profesionales, modernos y optimizados como esta web.',
    'marketing.services.callAction': '¿Te interesa? Contáctame para agendar una llamada',
    'marketing.clients.title': '+50 clientes satisfechos',
    'marketing.clients.subtitle': 'Pilotos que confían en mi gestión de redes sociales',
    'marketing.process.title': 'Mi proceso',
    'marketing.process.step1.title': 'Análisis',
    'marketing.process.step1.desc':
      'Estudio tu marca, objetivos y audiencia para crear una estrategia personalizada.',
    'marketing.process.step2.title': 'Estrategia',
    'marketing.process.step2.desc':
      'Desarrollo un plan de contenido adaptado a tus necesidades y calendario de competiciones.',
    'marketing.process.step3.title': 'Ejecución',
    'marketing.process.step3.desc':
      'Creo y publico contenido de calidad, gestionando tus redes con profesionalidad.',
    'marketing.process.step4.title': 'Análisis y mejora',
    'marketing.process.step4.desc':
      'Monitorizo resultados y ajusto la estrategia para mejorar continuamente.',
    'marketing.cta.title': '¿Listo para potenciar tu marca?',
    'marketing.cta.description': 'Hablemos sobre cómo puedo ayudarte a destacar en redes sociales',
    'marketing.cta.button': 'Contactar ahora',
    'marketing.services.button': 'Servicios',
    'marketing.portfolio.title': 'Portfolio de Diseños',
    'marketing.portfolio.subtitle': 'Algunos de mis trabajos de diseño gráfico para redes sociales',

    /* ===== Blog ===== */
    'blog.title': 'Blog',
    'blog.subtitle': 'Novedades sobre mis carreras y proyectos.',
    'blog.featured': 'Destacado',
    'blog.archive': 'Archivo',
    'blog.readMore': 'Leer más',
    'blog.comingSoon': 'Más artículos próximamente...',
    'blog.locale': 'es-ES',

    'blog.category.karting': 'Karting',
    'blog.category.marketing': 'Marketing',
    'blog.category.personal': 'Desarrollo Personal',
    'blog.category.education': 'Educación',

    'blog.post1.title': 'Mi primer año en el karting: Aprendizajes y desafíos',
    'blog.post1.excerpt':
      'Un viaje de autodescubrimiento en el que cada carrera me enseñó más sobre disciplina, perseverancia y la importancia de mantener el enfoque en los objetivos.',
    'blog.post2.title': 'Estrategias de contenido para pilotos en redes sociales',
    'blog.post2.excerpt':
      'Cómo construir una marca personal sólida en el mundo del motorsport a través del marketing digital y la creación de contenido auténtico.',
    'blog.post3.title': 'El poder de la mentalidad: lecciones de la pista',
    'blog.post3.excerpt':
      'La mentalidad ganadora no se construye solo en la pista. Descubre cómo aplicar los principios del alto rendimiento deportivo a todos los aspectos de la vida.',

    'blog.cek.title': 'Gran última ronda del CEK en Zaragoza',
    'blog.cek.excerpt':
      'El pasado fin de semana, el 20 de septiembre, conseguimos clasificarnos para la final del domingo tras superar diversos contratiempos con el motor y el chasis durante el viernes.',
    'blog.backToBlog': 'Volver al blog',
    'blog.notFound': 'Artículo no encontrado',

    'blog.netspy.title': 'Grupo de Jóvenes Emprendedores Netspy ES 🇪🇸',
    'blog.netspy.excerpt':
      'Rubén Muñoz y Hugo Trébol han creado un grupo privado para jóvenes emprendedores. Si tienes menos de 25 años, ya puedes rodearte de gente que te inspire y te ayude a crecer.',
    'blog.netpro.title': 'Netpro Agency — diseño, marketing & consultoría',
    'blog.netpro.excerpt':
      'Netpro Agency es un estudio profesional de diseño y marketing digital. Nacimos enfocados al motorsport, pero hoy también trabajamos con empresas de distintos sectores.',
    'blog.albroksa.title':
      'Albroksa impulsa el talento joven con el patrocinio del piloto Rubén Muñoz en el CEK',
    'blog.albroksa.excerpt':
      'Albroksa, Correduría de Seguros, reafirma su apuesta por el deporte y las jóvenes promesas anunciando el patrocinio oficial con Rubén Muñoz Cruz.',
    'blog.testrecas.title': 'Primer test de 2026 en Recas, Toledo',
    'blog.testrecas.excerpt':
      'El pasado fin de semana 21-22 de febrero probamos el material para este año junto a DB Motorsport en el circuito Recas Correcaminos. Muy buenas primeras sensaciones tras 5 meses sin rodar.',
    'blog.portadaextremadura.title': 'Crónica CEK R1: primera cita en Campillos',
    'blog.portadaextremadura.excerpt':
      'El piloto extremeño Rubén Muñoz cerró su participación en la primera cita del campeonato en el Circuito de Campillos con una jornada de domingo marcada por la exigencia, las remontadas complicadas y los problemas mecánicos.',
    'blog.cajarural.title':
      'Caja Rural de Extremadura apoya el talento joven en el deporte y patrocina al piloto cacereño Rubén Muñoz',
    'blog.cajarural.excerpt':
      'La entidad apuesta por el deporte base y el talento emergente extremeño. Caja Rural de Extremadura ha formalizado un acuerdo de colaboración deportiva con el joven piloto cacereño de karting Rubén Muñoz.',
    'blog.webredesign.title': 'Rediseño completo de la web y acceso al "paddock".',
    'blog.webredesign.excerpt':
      'Estrenamos un rediseño íntegro de rubenmunoz.com con una identidad más editorial, una nueva sección 2026 con mapa interactivo del calendario CEK, acceso privado al paddock y nuevos proyectos en marcha.',
    'blog.ecomscrape.title': 'EcomScrape: Inteligencia e-commerce al alcance de un clic',
    'blog.ecomscrape.excerpt':
      'Rubén Muñoz, Anas Walton y soyrage.es lanzan EcomScrape, una herramienta profesional de extracción de catálogos e inteligencia competitiva para Shopify, WooCommerce y PrestaShop.',
    'blog.motorland.title': 'Segunda ronda del CEK: De vuelta en Motorland',
    'blog.motorland.excerpt':
      'Rubén Muñoz afronta la segunda prueba del Campeonato de España de Karting en MotorLand Aragón (15-17 mayo), precedida de tres días de entrenamientos completos en el mismo circuito.',
    'blog.vlog1.title': 'Primer Vlog en YouTube: tests del CEK en Motorland',
    'blog.vlog1.excerpt':
      'Estreno mi primer vlog en YouTube grabado durante los tres días de tests previos al CEK R2 en MotorLand Aragón. Se vienen muchos más vlogs y contenido nuevo en el canal.',
    'blog.motorlandrace.title': 'CEK R2 Motorland: remontada hasta el top-20 en una carrera caótica',
    'blog.motorlandrace.excerpt':
      'Fin de semana exigente en MotorLand Aragón: 18 adelantamientos en la final remontando desde el P34, P18 final tras un contacto que nos costó el top-15. Mucho aprendizaje de cara a Valencia en junio.',
    'blog.fuelextrem.title': 'Rubén Muñoz visita Fuel Extrem en el ecuador de su aventura en el karting nacional',
    'blog.fuelextrem.excerpt':
      'El piloto cacereño aprovecha el paréntesis entre la segunda y la tercera prueba del CEK Hyundai para visitar en persona a Fuel Extrem, uno de los patrocinadores que hacen posible su temporada nacional.',
    'blog.chiva.title': 'CEK R3 Valencia: tests previos complicados bajo un calor extremo en Chiva',
    'blog.chiva.excerpt':
      'Tres días de tests previos en el Kartódromo Lucas Guerrero de Chiva han supuesto un auténtico desafío: sin ritmo, problemas mecánicos y temperaturas brutales que han complicado poner todo a punto de cara a la carrera del 20-21 de junio.',

    /* ===== Sponsors ===== */
    'sponsors.hero.title': 'Patrocinio',
    'sponsors.tagline': 'Un patrocinio diferente, unos resultados diferentes',
    'sponsors.hero.description':
      'Mi segundo año en el Campeonato de España de Karting está a punto de comenzar. Únete a mi proyecto deportivo y forma parte de esta emocionante temporada 2026.',
    'sponsors.cta.contact': 'Contáctame',
    'sponsors.cta.dossier': 'Ver dossier',
    'sponsors.cta.viewSponsors': 'Ver patrocinadores',
    'sponsors.expertise.title': 'Experto en marketing digital',
    'sponsors.expertise.meta': 'Meta Ads',
    'sponsors.intro.title': 'Colabora con mi proyecto deportivo',
    'sponsors.intro.p1':
      'Tras un primer año lleno de aprendizajes y dedicación, me preparo para afrontar mi segunda temporada en el Campeonato de España de Karting con más experiencia, hambre de resultados y una visión clara hacia el futuro.',
    'sponsors.intro.p2':
      'Busco aliados que quieran formar parte de este viaje, que crean en el potencial de un piloto joven y comprometido, y que entiendan que un patrocinio no es solo visibilidad, sino una colaboración auténtica que genera valor para ambas partes.',
    'sponsors.intro.p3':
      'Si buscas algo diferente, un proyecto con proyección y un piloto que trabaja cada día para ser mejor, este es el momento de unirte.',
    'sponsors.netpro.badge': 'Gestionado por',
    'sponsors.netpro.strip':
      'Toda la estrategia de marketing, creación de contenido y gestión del patrocinio corre a cargo de Netpro Agency, mi propia agencia de marketing especializada en motorsport.',
    'sponsors.netpro.label': 'Marketing profesional',
    'sponsors.netpro.title': 'Motor de marketing Netpro Agency',
    'sponsors.netpro.description':
      'Detrás de cada campaña, pieza creativa y acción de patrocinio hay un equipo profesional: Netpro Agency. Mi propia agencia se encarga de diseñar la identidad de marca, producir contenido de calidad, gestionar redes sociales y ejecutar campañas publicitarias en Meta Ads para maximizar el retorno de cada patrocinador.',
    'sponsors.netpro.feat1': 'Estrategia 360º',
    'sponsors.netpro.feat1desc':
      'Branding, contenido, redes y publicidad trabajando en conjunto bajo un mismo objetivo.',
    'sponsors.netpro.feat2': 'Contenido de calidad',
    'sponsors.netpro.feat2desc':
      'Diseño gráfico, fotografía, vídeo y copy pensados para destacar tu marca en cada carrera.',
    'sponsors.netpro.feat3': 'Resultados medibles',
    'sponsors.netpro.feat3desc':
      'Campañas de marketing con seguimiento, optimización y reporting claro para cada patrocinador.',
    'sponsors.netpro.cta': 'Conocer Netpro Agency',
    'sponsors.netpro.cardQuote': 'Tu marca no se suma a un piloto. Se integra en un proyecto de marketing deportivo.',
    'sponsors.netpro.statValue': '100%',
    'sponsors.netpro.statLabel': 'Marketing gestionado por Netpro',
    'sponsors.valueAdd.title': 'Más que un piloto: un proyecto con marketing profesional',
    'sponsors.valueAdd.description':
      'A diferencia de otros pilotos, mi proyecto deportivo cuenta con el respaldo de Netpro Agency: mi propia agencia de marketing especializada en motorsport. Diseñamos campañas, contenido y estrategia digital para que tu patrocinio tenga visibilidad real, profesionalidad y resultados medibles.',
    'sponsors.valueAdd.lead': 'A diferencia de otros pilotos,',
    'sponsors.valueAdd.leadHi': 'mi proyecto tiene agencia propia.',
    'sponsors.valueAdd.pillar1.label': 'Marketing profesional en motorsport',
    'sponsors.valueAdd.pillar1.body':
      'Netpro Agency gestiona cada campaña y pieza creativa con conocimiento real del mundo del karting y el automovilismo.',
    'sponsors.valueAdd.pillar2.label': 'Creatividad + deporte',
    'sponsors.valueAdd.pillar2.body':
      'Unimos la narrativa visual con el rendimiento en pista para conectar con la audiencia adecuada.',
    'sponsors.valueAdd.pillar3.label': 'Estrategia digital eficaz',
    'sponsors.valueAdd.pillar3.body':
      'Tu marca representada con profesionalidad, contenido de calidad y resultados medibles.',
    'sponsors.valueAdd.signoff': 'Tu patrocinio, gestionado por Netpro Agency.',
    'sponsors.why.title': '¿Por qué patrocinarme?',
    'sponsors.why.card1.title': 'Visibilidad nacional',
    'sponsors.why.card1.desc':
      'Tu marca presente en cada carrera del Campeonato de España, con exposición ante miles de aficionados al motorsport.',
    'sponsors.why.card2.title': 'Contenido digital',
    'sponsors.why.card2.desc':
      'Presencia activa en redes sociales con contenido profesional que destaca tu marca de forma auténtica.',
    'sponsors.why.card3.title': 'Compromiso total',
    'sponsors.why.card3.desc':
      'Un piloto joven, dedicado y en constante evolución que representa tus valores con profesionalidad.',
    'sponsors.section.title': 'Patrocinadores',
    'sponsors.section.year': 'Patrocinadores 2026',
    'sponsors.section.click': 'Click para ampliar',
    'sponsors.cta.title': '¿Quieres formar parte del proyecto?',
    'sponsors.cta.description':
      'Hablemos sobre cómo crear juntos una colaboración que marque la diferencia en la temporada 2026.',
    'sponsors.cta.button': 'Contactar ahora',
    'sponsors.lightbox.reset': 'Restablecer',
    'sponsors.lightbox.fit': 'Ajustar',
    'sponsors.lightbox.download': 'Descargar',
    'sponsors.lightbox.alt': 'Patrocinadores 2026 - Rubén Muñoz',

    /* ===== Dossier access ===== */
    'dossier.access.label': 'Acceso restringido',
    'dossier.access.titleA': 'Dossier',
    'dossier.access.titleB': 'privado',
    'dossier.access.intro':
      'Documento confidencial con información de patrocinio. Introduce la contraseña que has recibido por correo para desbloquear la versión correspondiente.',
    'dossier.tier.regional': 'Regional',
    'dossier.tier.regional.desc': 'Patrocinadores locales',
    'dossier.tier.nacional': 'Nacional',
    'dossier.tier.nacional.desc': 'Patrocinadores nacionales',
    'dossier.tier.internacional': 'Internacional',
    'dossier.tier.internacional.desc': 'Patrocinadores internacionales',
    'dossier.tier.unlocked': 'Desbloqueado',
    'dossier.tier.locked': 'Bloqueado',
    'dossier.access.secure': 'Acceso seguro',
    'dossier.access.enter': 'Introduce tu contraseña',
    'dossier.access.password': 'Contraseña',
    'dossier.access.granted': 'Acceso concedido',
    'dossier.access.button': 'Acceder al dossier',
    'dossier.access.security': 'Verificación cifrada · 10 intentos / minuto',
    'dossier.access.noPassword': '¿No tienes contraseña? Escríbeme',
    'dossier.access.wrong': 'Contraseña incorrecta',
    'dossier.access.connError': 'Error de conexión',
  },

  en: {
    /* ===== Navigation ===== */
    'nav.home': 'Home',
    'nav.contact': 'Contact',
    'nav.business': 'Business',
    'nav.sponsors': 'Sponsors',
    'nav.blog': 'Journal',

    /* ===== Banner / Top bar ===== */
    'banner.season': 'CEK 2026',
    'banner.seasonNote': 'Season underway',
    'banner.learnMore': 'Learn more',

    /* ===== Footer ===== */
    'footer.rights': '© 2026 Rubén Muñoz. All rights reserved.',
    'footer.business': 'Business inquiries',
    'footer.sponsors': 'For sponsors',
    'footer.built': 'Built from scratch',

    /* ===== Home – Hero ===== */
    'home.hero.kicker': 'Driver · Entrepreneur · 2026',
    'home.hero.titleA': 'Building the',
    'home.hero.titleB': 'best',
    'home.hero.titleC': 'version of',
    'home.hero.titleD': 'myself',
    'home.hero.description':
      'Karting driver and entrepreneur. Since 2024, committed to personal growth and excellence at every turn of life.',
    'home.hero.placeholder': 'Want to know my story?',
    'home.hero.cta': 'Discover more',
    'home.hero.scroll': 'Scroll',
    'home.hero.season': '2026 Season',

    /* ===== Home – Social proof (sec. 02) ===== */
    'home.proof.headlineA': 'About',
    'home.proof.headlineB': 'my projects.',
    'home.proof.stat1.label': 'My marketing agency.',
    'home.proof.stat2.label': 'Spanish Karting Championship.',
    'home.proof.stat3.value': '3',
    'home.proof.stat3.label': 'Active entrepreneurship lines.',

    /* ===== Home – About (sec. 03) ===== */
    'home.about.title': 'About me',
    'home.about.headlineA': 'One',
    'home.about.headlineB': 'story',
    'home.about.headlineC': 'on two tracks.',
    'home.about.p1':
      'I am Rubén Muñoz, born on February 27, 2009 in Cáceres, Extremadura (Spain). Since 2024, I have committed myself to a path of personal growth and excellence — building the best version of myself, in sport and in business.',
    'home.about.p2':
      'On the sporting side, I race karts — one of the most demanding disciplines out there. I currently compete in the Spanish Karting Championship, attacking every corner with focus and determination.',
    'home.about.p3':
      'In parallel, I have built projects in the world of entrepreneurship. My story is just beginning, but I am set on leaving a mark.',
    'home.about.cta': 'Get in touch',
    'home.about.tag': 'Driver, creator',
    'home.about.tagAnd': '&',
    'home.about.tagRole': 'strategist.',
    'home.about.location': 'Cáceres · 2009 →',

    /* ===== Home – Areas (sec. 04) ===== */
    'home.areas.title': 'Focus areas',
    'home.areas.headlineA': 'Two',
    'home.areas.headlineB': 'worlds',
    'home.areas.headlineC': 'that demand excellence.',
    'home.areas.subtitle': 'Full dedication across two worlds that demand excellence.',
    'home.areas.karting.tag': '01 / Track',
    'home.areas.karting.title': 'Karting',
    'home.areas.karting.p1':
      'Competitor in the Spanish Karting Championship. Despite my short time on the grid, I have made notable progress through consistency and discipline.',
    'home.areas.karting.p2':
      'Every race is a chance to push further and prove that with focus and sacrifice, there are no limits.',
    'home.areas.marketing.tag': '02 / Entrepreneurship',
    'home.areas.marketing.title': 'Entrepreneurship',
    'home.areas.marketing.p1':
      'Entrepreneur since 2024. I have built projects in social media and marketing, scaling them through pure work.',
    'home.areas.marketing.p2':
      'I learn at every step and turn ideas into real action — applying the same discipline I bring to the track.',

    /* ===== Home – Blog (sec. 05) ===== */
    'home.blog.headlineA': 'Latest',
    'home.blog.headlineB': 'entries',
    'home.blog.viewAll': 'View all',

    /* ===== Home – Manifesto (sec. 06) ===== */
    'home.manifesto.label': 'Manifesto',

    /* ===== Home – Final CTA (sec. 07) ===== */
    'home.cta.label': 'Let\u2019s talk',
    'home.cta.headlineA': 'Got a',
    'home.cta.headlineB': 'proposal',
    'home.cta.headlineC': '? Let\u2019s talk.',
    'home.cta.description':
      'Always open to what makes sense — projects, collaborations, sponsorships.',
    'home.cta.contactNumber': 'N° 07 — CONTACT',

    /* ===== Home – Quote ===== */
    'home.quote':
      '"I work every day to be better, inspire others and prove that with focus and sacrifice, there are no limits."',
    'home.quote.author': '— Rubén Muñoz',

    /* ===== Home – Stats (legacy keys) ===== */
    'home.stats.year.label': 'Starting year in karting and media',
    'home.stats.growth.value': 'Growth',
    'home.stats.growth.label': 'Constant — personal and professional',
    'home.stats.location.label': 'Cáceres, Spain',
    'home.stats.growth': 'Growth',
    'home.stats.discipline': 'Discipline',
    'home.stats.ambition': 'Ambition',

    /* ===== Business page ===== */
    'business.label': 'Business · Lines',
    'business.headlineA': 'Business',
    'business.headlineB': 'lines',
    'business.hero.label': 'Digital Marketing',
    'business.hero.description':
      'Professional design and digital marketing agency. Pushing brands and drivers to the next level.',
    'business.contact': 'Get in touch',
    'business.schedule': 'Book a meeting',

    'business.about.p1':
      'Netpro Agency is a professional design and digital marketing agency. We were born focused on motorsport —drivers, teams and automotive projects— We work to create profitable brands for drivers and teams through social media. Visit the website and discover the agency.',
    'business.about.p2':
      'We build and run brand image: visual identity, full graphic content (posters, creatives, ads, corporate materials), websites, and end-to-end management of social channels and Meta advertising (Facebook & Instagram) — to grow visibility, build community and bring in customers or sponsors.',
    'business.about.p3':
      'On top of that, we manage sponsorships and dedicated campaigns to deliver real value to sponsors, plus complementary services tied to performance and the projection of the driver or brand.',

    'business.goal.title': 'My goal',
    'business.goal.description':
      'That every client and every project in my hands gets the best of me — and the highest possible satisfaction. Scale your business or your brand with me and my team.',

    'business.services.branding': 'Visual Identity',
    'business.services.branding.desc':
      'Corporate identity design, logos and professional graphic assets.',
    'business.services.social': 'Social Media',
    'business.services.social.desc':
      'Strategic community management and high-impact content creation.',
    'business.services.growth': 'Motorsport',
    'business.services.growth.desc':
      'Meta Ads campaigns (Facebook & Instagram) built around results.',
    'business.services.web': 'Motorsport marketing',
    'business.services.web.desc':
      'Modern, fast, optimized websites that turn visitors into customers.',

    /* RDE block on Business page */
    'business.rde.subtitle': 'Funnels & Lead Generation',
    'business.rde.description':
      'Sales funnel optimization and lead generation for Spanish-speaking knowledge entrepreneurs who want to turn their audience into predictable revenue.',
    'business.rde.extended':
      'We are Rubén, Diego and Erik — three operators who become the growth team for a small number of clients, with real involvement in strategy and execution.',
    'business.rde.cta': 'Discover RDE',
    'business.rde.feat1': 'Diagnosis',
    'business.rde.feat2': 'Strategy',
    'business.rde.feat3': 'Execution',
    'business.rde.feat4': 'Optimization',

    'business.netpro.subtitle': 'Motorsport',

    'business.netspy.title': 'Netspy: Entrepreneurs Community',
    'business.netspy.subtitle': 'Community & Networking',
    'business.netspy.description': 'An exclusive community for young visionaries.',
    'business.netspy.p1':
      'Rubén Muñoz and Hugo Trébol founded a private group for young entrepreneurs. If you are under 25, you can now surround yourself with people who inspire you and help you grow.',
    'business.netspy.p2':
      'At Netspy we drive networking, collaborative learning and the development of innovative projects. It is the place where ideas turn into reality, backed by a vibrant and ambitious community.',
    'business.netspy.cta': 'Follow on Instagram',
    'business.netspy.feat1': 'Community Building',
    'business.netspy.feat2': 'Exclusive Events',
    'business.netspy.feat3': 'Founder Networking',
    'business.netspy.feat4': 'Strategic Partnerships',

    'business.ecomscrape.title': 'EcomScrape',
    'business.ecomscrape.subtitle': 'E-commerce Intelligence',
    'business.ecomscrape.description':
      'Extract full catalogs from any e-commerce store in seconds. Professional extractors for Shopify, WooCommerce and PrestaShop with anti-bot bypass, CSV/JSON export and built-in traffic analytics.',
    'business.ecomscrape.extended':
      'A collaboration between Rubén Muñoz, Anas Walton (@anaswalton) and soyrage.es. Real competitive intelligence: pricing, bestsellers, tech stack, demographics and ad spend from any online store in a single click.',
    'business.ecomscrape.cta': 'ecomscrape.com',
    'business.ecomscrape.feat1': 'Catalog Extraction',
    'business.ecomscrape.feat2': 'Store Intelligence',
    'business.ecomscrape.feat3': 'Software',
    'business.ecomscrape.feat4': 'Traffic Analytics',

    /* ===== RDE landing ===== */
    'rde.bar.note': 'We only take on 3 new clients per month',
    'rde.bar.slots': '1 spot available',
    'rde.hero.audience': 'For Spanish-speaking knowledge entrepreneurs',
    'rde.hero.titleA':
      'We help knowledge entrepreneurs turn their audience into',
    'rde.hero.titleB': 'predictable revenue',
    'rde.hero.titleC': '— without depending on being constantly online',
    'rde.hero.subtitle':
      'If you already have knowledge, an audience or a product but your sales depend on you being active every day — this is for you.',
    'rde.hero.cta': 'Apply to work with RDE Operators',
    'rde.hero.badge1': 'No commitment',
    'rde.hero.badge2': 'Every application reviewed',
    'rde.hero.badge3': 'Reply within 48h',

    'rde.diag.label': 'Diagnosis',
    'rde.diag.titleA': 'Sound',
    'rde.diag.titleB': 'familiar',
    'rde.diag.titleC': '?',
    'rde.diag.item1':
      'You post constantly but your sales depend on you continuing to post',
    'rde.diag.item2':
      'You have an audience or a list but cannot turn it into clients in a predictable way',
    'rde.diag.item3':
      'You have tried funnels, email and ads on your own — nothing works consistently',
    'rde.diag.item4': 'You don\u2019t have time to learn how to automate and execute at once',
    'rde.diag.outroA':
      'The problem isn\u2019t you. No one ever taught you how to build a system that',
    'rde.diag.outroB': 'sells while you rest',
    'rde.diag.outroC': '.',

    'rde.fit.label': 'Fit',
    'rde.fit.titleA': 'Is this',
    'rde.fit.titleB': 'for you',
    'rde.fit.titleC': '?',
    'rde.fit.yes': 'It is for you if…',
    'rde.fit.yes1': 'You sell an info-product, course or knowledge service',
    'rde.fit.yes2': 'You already generate sales but want them predictable',
    'rde.fit.yes3': 'You are willing to build a long-term system',
    'rde.fit.yes4': 'You bill at least €2,000/month with your current business',
    'rde.fit.no': 'It is not for you if…',
    'rde.fit.no1': 'You\u2019re looking for overnight results',
    'rde.fit.no2': 'You don\u2019t have a defined offer or audience',
    'rde.fit.no3': 'You want us to do everything without your involvement',
    'rde.fit.no4': 'You\u2019re hunting for the cheapest price on the market',

    'rde.method.label': 'Methodology',
    'rde.method.titleA': 'How we build your',
    'rde.method.titleB': 'system',
    'rde.method.subtitle': '4 phases. No shortcuts. Real involvement.',
    'rde.method.s1.title': 'Diagnosis',
    'rde.method.s1.text':
      'We map your offer, audience and leak points. We pinpoint where the money is slipping away.',
    'rde.method.s2.title': 'Strategy',
    'rde.method.s2.text':
      'We design the full system: what to publish, how to capture leads, what to automate and how to convert.',
    'rde.method.s3.title': 'Execution',
    'rde.method.s3.text':
      'We implement funnels, sequences, ads and CRM. You keep selling — we build the machine.',
    'rde.method.s4.title': 'Optimization',
    'rde.method.s4.text':
      'We measure, adjust and scale. We don\u2019t deliver a project and disappear — we are your growth team.',

    'rde.guarantee.label': 'Guarantee',
    'rde.guarantee.titleA': 'Our work',
    'rde.guarantee.titleB': 'guarantee',
    'rde.guarantee.body':
      'If in 90 days you don\u2019t have a working acquisition and conversion system that beats your current results, we keep working at no extra cost until we get there.',
    'rde.guarantee.note':
      'We don\u2019t charge for consulting. We charge for systems that work.',

    'rde.team.label': 'Team',
    'rde.team.titleA': 'We are not a regular',
    'rde.team.titleB': 'agency',
    'rde.team.body':
      'We are Rubén, Diego and Erik — we become the growth team of a limited number of clients, with real involvement in strategy and execution.',
    'rde.team.alt': 'RDE Operators team — Rubén, Diego and Erik',

    'rde.final.label': 'Apply for a spot',
    'rde.final.titleA': 'If you are ready to build a system that',
    'rde.final.titleB': 'scales',
    'rde.final.titleC': 'your business — let\u2019s talk',
    'rde.final.body':
      'We review every application by hand. If we see a fit, we reach out within 48h for a free diagnosis call.',
    'rde.final.cta': 'Apply for my spot now',
    'rde.final.note': 'No commitment. No pressure. Just a conversation.',
    'rde.final.scarcity': 'Limited to 3 clients per month',

    /* ===== Contact ===== */
    'contact.title': 'Get in touch',
    'contact.subtitle': 'Always open to new opportunities and collaborations.',
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
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully',
    'contact.form.successDesc': 'I\u2019ll reply as soon as possible.',
    'contact.form.error': 'Error',
    'contact.form.errorGeneric': 'Failed to send the message',
    'contact.form.fillFields': 'Please fill in all fields',
    'contact.form.savedTitle': 'Message saved',
    'contact.form.savedDesc': 'Your message was saved but the email was not sent',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.emailPlaceholder': 'you@email.com',
    'contact.form.messagePlaceholder': 'Write your message...',

    /* ===== Marketing (legacy) ===== */
    'marketing.hero.title': 'Digital Marketing',
    'marketing.hero.subtitle': 'Professional social media management for drivers',
    'marketing.hero.description':
      'I help drivers build their personal brand, connect with their audience and attract sponsors with effective content strategies and professional design.',
    'marketing.services.title': 'Services',
    'marketing.services.subtitle': 'Complete solutions for your digital presence',
    'marketing.services.realimages': 'Real images from my professional projects',
    'marketing.services.design.title': 'Graphic Design',
    'marketing.services.design.p1':
      'Professional visual content tailored to each driver\u2019s identity.',
    'marketing.services.design.p2':
      'Social media posts, banners, infographics and promotional material.',
    'marketing.services.social.title': 'Social Media Management',
    'marketing.services.social.p1':
      'Strategic content planning and publishing on Instagram, TikTok and other platforms.',
    'marketing.services.social.p2':
      'Metrics analysis and continuous optimization to maximize reach.',
    'marketing.services.ads.title': 'Advertising Campaigns',
    'marketing.services.ads.p1':
      'Design and execution of paid campaigns on social media to grow visibility.',
    'marketing.services.ads.p2': 'Audience targeting and ad budget optimization.',
    'marketing.services.webdev.title': 'Web Development',
    'marketing.services.webdev.p1':
      'Custom websites for winning drivers who want to stand out.',
    'marketing.services.webdev.p2':
      'Professional, modern, optimized portfolios — just like this site.',
    'marketing.services.callAction': 'Interested? Reach out and let\u2019s book a call.',
    'marketing.clients.title': '+50 satisfied clients',
    'marketing.clients.subtitle': 'Drivers who trust my social media management',
    'marketing.process.title': 'My process',
    'marketing.process.step1.title': 'Analysis',
    'marketing.process.step1.desc':
      'I study your brand, goals and audience to create a custom strategy.',
    'marketing.process.step2.title': 'Strategy',
    'marketing.process.step2.desc':
      'I build a content plan tailored to your needs and race calendar.',
    'marketing.process.step3.title': 'Execution',
    'marketing.process.step3.desc':
      'I create and publish quality content, running your channels professionally.',
    'marketing.process.step4.title': 'Analysis & improvement',
    'marketing.process.step4.desc':
      'I track results and tune the strategy for continuous improvement.',
    'marketing.cta.title': 'Ready to elevate your brand?',
    'marketing.cta.description': 'Let\u2019s talk about how I can help you stand out on social media.',
    'marketing.cta.button': 'Get in touch',
    'marketing.services.button': 'Services',
    'marketing.portfolio.title': 'Design Portfolio',
    'marketing.portfolio.subtitle': 'A selection of my graphic design work for social media.',

    /* ===== Blog ===== */
    'blog.title': 'Journal',
    'blog.subtitle': 'Updates from my races and projects.',
    'blog.featured': 'Featured',
    'blog.archive': 'Archive',
    'blog.readMore': 'Read more',
    'blog.comingSoon': 'More articles coming soon...',
    'blog.locale': 'en-US',

    'blog.category.karting': 'Karting',
    'blog.category.marketing': 'Marketing',
    'blog.category.personal': 'Personal Development',
    'blog.category.education': 'Education',

    'blog.post1.title': 'My first year in karting: lessons and challenges',
    'blog.post1.excerpt':
      'A journey of self-discovery where every race taught me more about discipline, perseverance and the power of staying focused on the goal.',
    'blog.post2.title': 'Content strategies for drivers on social media',
    'blog.post2.excerpt':
      'How to build a solid personal brand in motorsport through digital marketing and authentic content.',
    'blog.post3.title': 'The power of mindset: lessons from the track',
    'blog.post3.excerpt':
      'A winning mindset isn\u2019t built only on the track. Discover how to apply high-performance principles to every part of life.',

    'blog.cek.title': 'Strong final round of the CEK in Zaragoza',
    'blog.cek.excerpt':
      'Last weekend, on September 20th, we made it into Sunday\u2019s final after pushing through engine and chassis setbacks on Friday.',
    'blog.backToBlog': 'Back to journal',
    'blog.notFound': 'Article not found',

    'blog.netspy.title': 'Young Entrepreneurs Group — Netspy ES 🇪🇸',
    'blog.netspy.excerpt':
      'Rubén Muñoz and Hugo Trébol founded a private group for young entrepreneurs. If you are under 25, you can finally surround yourself with people who inspire you to grow.',
    'blog.netpro.title': 'Netpro Agency — design, marketing & consulting',
    'blog.netpro.excerpt':
      'Netpro Agency is a professional design and digital marketing studio. Born inside motorsport, today we also work with companies across sectors.',
    'blog.albroksa.title': 'Albroksa backs young talent by sponsoring Rubén Muñoz in the CEK',
    'blog.albroksa.excerpt':
      'Albroksa, Insurance Brokerage, doubles down on its commitment to sport and emerging talent by announcing the official sponsorship of Rubén Muñoz Cruz.',
    'blog.testrecas.title': 'First test of 2026 in Recas, Toledo',
    'blog.testrecas.excerpt':
      'On February 21–22 we tested this year\u2019s package with DB Motorsport at the Recas Correcaminos circuit. Strong first impressions after 5 months off the kart.',
    'blog.portadaextremadura.title': 'CEK R1 chronicle: opening round in Campillos',
    'blog.portadaextremadura.excerpt':
      'Extremaduran driver Rubén Muñoz closed his run at the championship\u2019s opening round at Campillos with a Sunday marked by tough conditions, hard recoveries and mechanical issues.',
    'blog.cajarural.title':
      'Caja Rural de Extremadura backs young sporting talent and sponsors Cáceres karting driver Rubén Muñoz',
    'blog.cajarural.excerpt':
      'The institution doubles down on grassroots sport and emerging Extremaduran talent. Caja Rural de Extremadura has signed a sports collaboration agreement with young karting driver Rubén Muñoz from Cáceres.',
    'blog.webredesign.title': 'A new digital era: full website redesign and paddock access',
    'blog.webredesign.excerpt':
      'We are launching a complete redesign of rubenmunoz.com with a more editorial identity, a new 2026 section with an interactive CEK calendar map, private paddock access and several new projects under way.',
    'blog.ecomscrape.title': 'EcomScrape: e-commerce intelligence at the click of a button',
    'blog.ecomscrape.excerpt':
      'Rubén Muñoz, Anas Walton and soyrage.es launch EcomScrape, a professional catalog extraction and competitive intelligence tool for Shopify, WooCommerce and PrestaShop.',
    'blog.motorland.title': 'CEK Round 2: Back at Motorland',
    'blog.motorland.excerpt':
      'Rubén Muñoz takes on the second round of the Spanish Karting Championship at MotorLand Aragón (May 15-17), preceded by three full days of testing at the same circuit.',
    'blog.vlog1.title': 'First YouTube Vlog: CEK tests at Motorland',
    'blog.vlog1.excerpt':
      'I am launching my first YouTube vlog, recorded during the three days of testing ahead of CEK R2 at MotorLand Aragón. Many more vlogs and new content coming to the channel.',
    'blog.motorlandrace.title': 'CEK R2 Motorland: comeback into the top-20 in a chaotic race',
    'blog.motorlandrace.excerpt':
      'Demanding weekend at MotorLand Aragón: 18 overtakes in the final coming back from P34, finishing P18 after a contact that cost us the top-15. A lot of learning ahead of Valencia in June.',
    'blog.fuelextrem.title': 'Rubén Muñoz visits Fuel Extrem at the midpoint of his national karting season',
    'blog.fuelextrem.excerpt':
      'Between the second and third rounds of the CEK Hyundai, the Cáceres driver visits Fuel Extrem in person to thank one of the main sponsors making his national season possible.',
    'blog.chiva.title': 'CEK R3 Valencia: tough pre-race tests under extreme heat in Chiva',
    'blog.chiva.excerpt':
      'Three days of pre-race testing at the Kartódromo Lucas Guerrero in Chiva have been a real challenge: no pace, mechanical issues and brutal temperatures that made it difficult to get everything dialed in ahead of the race on June 20-21.',

    /* ===== Sponsors ===== */
    'sponsors.hero.title': 'Sponsorship',
    'sponsors.tagline': 'A different sponsorship — different results.',
    'sponsors.hero.description':
      'My second year in the Spanish Karting Championship is about to begin. Join my sporting project and be part of this exciting 2026 season.',
    'sponsors.cta.contact': 'Contact me',
    'sponsors.cta.dossier': 'View dossier',
    'sponsors.cta.viewSponsors': 'View sponsors',
    'sponsors.expertise.title': 'Digital marketing expertise',
    'sponsors.expertise.meta': 'Meta Ads',
    'sponsors.intro.title': 'Partner with my sporting project',
    'sponsors.intro.p1':
      'After a first year full of learning and dedication, I\u2019m gearing up for my second season in the Spanish Karting Championship — with more experience, hunger for results and a clear vision for what comes next.',
    'sponsors.intro.p2':
      'I\u2019m looking for partners who want to be part of this journey, who believe in the potential of a young, committed driver, and who understand that sponsorship isn\u2019t just visibility — it\u2019s a real collaboration that creates value for both sides.',
    'sponsors.intro.p3':
      'If you\u2019re after something different — a project with momentum and a driver who works every day to get better — this is the moment to join.',
    'sponsors.netpro.badge': 'Managed by',
    'sponsors.netpro.strip':
      'All marketing strategy, content creation and sponsorship management is handled by Netpro Agency, my own motorsport marketing agency.',
    'sponsors.netpro.label': 'Professional marketing',
    'sponsors.netpro.title': 'Netpro Agency marketing engine',
    'sponsors.netpro.description':
      'Behind every campaign, creative asset and sponsorship activation is a professional team: Netpro Agency. My own agency designs brand identity, produces quality content, manages social channels and runs Meta Ads campaigns to maximize return for every sponsor.',
    'sponsors.netpro.feat1': '360º strategy',
    'sponsors.netpro.feat1desc':
      'Branding, content, social media and advertising working together toward one goal.',
    'sponsors.netpro.feat2': 'Quality content',
    'sponsors.netpro.feat2desc':
      'Graphic design, photography, video and copy crafted to make your brand stand out at every race.',
    'sponsors.netpro.feat3': 'Measurable results',
    'sponsors.netpro.feat3desc':
      'Meta Ads campaigns with tracking, optimization and clear reporting for every sponsor.',
    'sponsors.netpro.cta': 'Discover Netpro Agency',
    'sponsors.netpro.cardQuote': 'Your brand doesn\u2019t just join a driver. It becomes part of a sports marketing project.',
    'sponsors.netpro.statValue': '100%',
    'sponsors.netpro.statLabel': 'Marketing managed by Netpro',
    'sponsors.valueAdd.title': 'More than a driver: a project with professional marketing',
    'sponsors.valueAdd.description':
      'Unlike most drivers, my sporting project is backed by Netpro Agency: my own motorsport marketing agency. We design campaigns, content and digital strategy so your sponsorship gets real visibility, professionalism and measurable results.',
    'sponsors.valueAdd.lead': 'Unlike most drivers,',
    'sponsors.valueAdd.leadHi': 'my project has its own agency.',
    'sponsors.valueAdd.pillar1.label': 'Professional motorsport marketing',
    'sponsors.valueAdd.pillar1.body':
      'Netpro Agency manages every campaign and creative asset with real knowledge of karting and motorsport.',
    'sponsors.valueAdd.pillar2.label': 'Creativity + sport',
    'sponsors.valueAdd.pillar2.body':
      'We merge visual storytelling with on-track performance to reach the right audience.',
    'sponsors.valueAdd.pillar3.label': 'Effective digital strategy',
    'sponsors.valueAdd.pillar3.body':
      'Your brand represented with professionalism, quality content and measurable results.',
    'sponsors.valueAdd.signoff': 'Your sponsorship, managed by Netpro Agency.',
    'sponsors.why.title': 'Why sponsor me?',
    'sponsors.why.card1.title': 'National visibility',
    'sponsors.why.card1.desc':
      'Your brand at every race of the Spanish Championship, in front of thousands of motorsport fans.',
    'sponsors.why.card2.title': 'Digital content',
    'sponsors.why.card2.desc':
      'Active social media presence with professional content that puts your brand forward authentically.',
    'sponsors.why.card3.title': 'Total commitment',
    'sponsors.why.card3.desc':
      'A young, dedicated driver in constant evolution who represents your values with professionalism.',
    'sponsors.section.title': 'Sponsors',
    'sponsors.section.year': 'Sponsors 2026',
    'sponsors.section.click': 'Click to enlarge',
    'sponsors.cta.title': 'Want to be part of the project?',
    'sponsors.cta.description':
      'Let\u2019s talk about how to build a collaboration that makes a difference in the 2026 season.',
    'sponsors.cta.button': 'Get in touch',
    'sponsors.lightbox.reset': 'Reset',
    'sponsors.lightbox.fit': 'Fit',
    'sponsors.lightbox.download': 'Download',
    'sponsors.lightbox.alt': 'Sponsors 2026 - Rubén Muñoz',

    /* ===== Dossier access ===== */
    'dossier.access.label': 'Restricted access',
    'dossier.access.titleA': 'Private',
    'dossier.access.titleB': 'dossier',
    'dossier.access.intro':
      'Confidential document with sponsorship information. Enter the password sent to you via email to unlock the matching version.',
    'dossier.tier.regional': 'Regional',
    'dossier.tier.regional.desc': 'Local sponsors',
    'dossier.tier.nacional': 'National',
    'dossier.tier.nacional.desc': 'National sponsors',
    'dossier.tier.internacional': 'International',
    'dossier.tier.internacional.desc': 'International sponsors',
    'dossier.tier.unlocked': 'Unlocked',
    'dossier.tier.locked': 'Locked',
    'dossier.access.secure': 'Secure access',
    'dossier.access.enter': 'Enter your password',
    'dossier.access.password': 'Password',
    'dossier.access.granted': 'Access granted',
    'dossier.access.button': 'Access dossier',
    'dossier.access.security': 'Encrypted verification · 10 attempts / minute',
    'dossier.access.noPassword': 'No password? Email me',
    'dossier.access.wrong': 'Incorrect password',
    'dossier.access.connError': 'Connection error',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
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
