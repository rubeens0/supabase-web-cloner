import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Wifi, ShieldCheck, MapPin, ArrowRight, Star } from 'lucide-react';
import { OesteLeadForm } from '@/components/oeste/OesteLeadForm';
import { OesteOffers, type Offer } from '@/components/oeste/OesteOffers';
import { OesteStickyCTA } from '@/components/oeste/OesteStickyCTA';
import { initMetaPixel, parsePrice } from '@/lib/metaPixel';
import { sendMetaEvent } from '@/lib/metaCapi';
import rubenLogoAsset from '@/assets/ruben-x-white.png.asset.json';
import oesteLogoAsset from '@/assets/oeste-white.png.asset.json';
import kartBgAsset from '@/assets/kart-oeste.jpg.asset.json';
import maximaVelocidadAsset from '@/assets/maxima-velocidad.mp4.asset.json';


const OESTE_LOGO = oesteLogoAsset.url;
const RUBEN_LOGO = rubenLogoAsset.url;
const KART_BG = kartBgAsset.url;

function scrollToForm(source: string) {
  void sendMetaEvent({
    eventName: 'ClickCTA',
    customData: { source, destination: 'lead-form' },
  });
  const el = document.getElementById('lead-form');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const benefits = [
  {
    icon: Zap,
    title: 'Hasta 2 Gb simétrico',
    desc: 'Velocidad real de 1 y 2 Gb simétricos, sin cortes y con atención cercana. Así es conectarse de verdad.',
  },
  {
    icon: ShieldCheck,
    title: 'Sin permanencia',
    desc: 'Contrátalo con tranquilidad. Sin letra pequeña ni sorpresas.',
  },
  {
    icon: Wifi,
    title: 'Instalación rápida',
    desc: 'Te conectamos en pocos días con técnicos de la zona.',
  },
  {
    icon: MapPin,
    title: 'SOPORTE LOCAL EN EXTREMADURA',
    desc: 'Atención cercana, en persona y por teléfono cuando lo necesites.',
  },
];

export default function OesteLanding1() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const offersRef = useRef<HTMLDivElement | null>(null);
  const viewContentFiredRef = useRef(false);

  useEffect(() => {
    initMetaPixel('877944112021448');
    // Mirror PageView via CAPI (pixel already fired by initMetaPixel)
    void sendMetaEvent({ eventName: 'PageView', capiOnly: true });

    const prevTitle = document.title;
    document.title = 'Fibra Oeste en Cáceres · La más rápida del oeste';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, []);

  // Fire `ViewContent` once when the offers/form block becomes visible
  useEffect(() => {
    const node = offersRef.current;
    if (!node || viewContentFiredRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewContentFiredRef.current) {
            viewContentFiredRef.current = true;
            void sendMetaEvent({
              eventName: 'ViewContent',
              eventId: 'oeste-viewContent',
              customData: {
                content_name: 'Oeste Fibra Offers',
                content_category: 'oeste-landing',
                content_type: 'product_group',
              },
            });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    // Evento personalizado (no estándar) — se usa para audiencias / lookalikes,
    // sin interferir con la optimización por Lead de la campaña.
    void sendMetaEvent({
      eventName: 'SelectOffer',
      customData: {
        content_ids: [offer.id],
        content_name: offer.title,
        content_category: offer.category,
        content_type: 'product',
        value: parsePrice(offer.price),
        currency: 'EUR',
      },
    });
  };

  const videoPlayedRef = useRef(false);
  const handleVideoPlay = () => {
    if (videoPlayedRef.current) return;
    videoPlayedRef.current = true;
    void sendMetaEvent({
      eventName: 'VideoPlay',
      eventId: 'oeste-videoPlay-maxima-velocidad',
      customData: {
        content_name: 'Máxima velocidad',
        video_id: 'maxima-velocidad',
      },
    });
  };



  return (
    <div className="relative min-h-screen bg-oeste-gradient text-white antialiased oeste-landing overflow-hidden pb-24 lg:pb-0">
      {/* Stylized kart background with opacity fade */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${KART_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(0.15) contrast(1.05) saturate(0.9)',
          opacity: 0.45,
          mixBlendMode: 'luminosity',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
      {/* Color wash to keep brand gradient dominant */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(227,120,25,0.55) 0%, rgba(190,45,112,0.55) 50%, rgba(112,36,121,0.6) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div className="relative z-10">
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=877944112021448&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>





      {/* Top bar co-branding */}
      <header className="relative z-10 px-5 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={OESTE_LOGO} alt="Oeste" className="h-8 sm:h-10 w-auto" />
          <span className="text-white/60 text-lg">×</span>
          <a
            href="https://rubenmunoz.com/inicio?from=oeste-landing1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a rubenmunoz.com"
            className="inline-flex items-center hover:opacity-80 transition"
          >
            <img src={RUBEN_LOGO} alt="Rubén Muñoz" className="h-8 sm:h-10 w-auto" />
          </a>
        </div>
        <a
          href="https://rubenmunoz.com/inicio?from=oeste-landing1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/85 border border-white/30 rounded-full px-3 py-1.5 hover:bg-white hover:text-neutral-900 transition"
        >
          rubenmunoz.com <ArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Hero */}
      <section className="relative px-5 sm:px-10 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-black/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 min-w-0 lg:pt-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Disponible en Cáceres
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-300/15 border border-yellow-200/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-100">
                ⚡ Oferta hasta 15-sep · plazas limitadas
              </span>
            </div>

            <h1 className="mt-6 leading-[0.88] tracking-tight">
              <span className="block font-sans font-black uppercase tracking-[-0.02em] text-5xl sm:text-6xl lg:text-[6.5rem] xl:text-[7.5rem]">
                La fibra
              </span>
              <span className="block font-display-italic text-6xl sm:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] text-white/95 -mt-1 sm:-mt-2">
                más rápida
              </span>
              <span className="block font-sans font-black uppercase tracking-[-0.02em] text-5xl sm:text-6xl lg:text-[6.5rem] xl:text-[7.5rem] mt-1">
                del <span className="font-display-italic font-normal normal-case tracking-normal">oeste</span>
                <span className="block sm:inline"> en Cáceres.</span>
              </span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl lg:text-[1.35rem] text-white/85 max-w-2xl leading-relaxed">
              Velocidad real de 1 y 2 Gb simétricos, sin cortes y con atención cercana. <span className="font-semibold text-white">La fibra X de Oeste</span> en Cáceres.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                onClick={() => scrollToForm('hero')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-white/90 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition"
              >
                Ver ofertas
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="text-sm text-white/75">Respuesta en 24h · <span className="font-semibold text-white/95">Sin compromiso</span></span>
            </div>

            {/* Prueba social */}
            <div className="mt-5 flex items-center gap-3 text-sm text-white/85">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="inline-block w-7 h-7 rounded-full border-2 border-white/80"
                    style={{
                      background: `linear-gradient(135deg, hsl(${20 + i * 35} 70% 55%), hsl(${320 - i * 20} 60% 45%))`,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="flex items-center gap-1 text-white">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  ))}
                </span>
                <span className="text-white/80 text-xs">+500 hogares ya conectados en Cáceres</span>
              </div>
            </div>

            {/* Trust strip — visible en todos los breakpoints */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm">
              {benefits.map((b) => (
                <div key={b.title} className="bg-black/20 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-2">
                  <b.icon className="w-5 h-5 text-white/90" />
                  <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-tight leading-tight text-white">
                    {b.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="lead-form"
            ref={offersRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 min-w-0 w-full space-y-4 lg:sticky lg:top-6"
          >
            <div id="oeste-offers-section">
              <OesteOffers
                selectedId={selectedOffer?.id ?? null}
                onSelect={handleSelectOffer}
              />
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-xs text-white/70 leading-relaxed space-y-2">
              <p>
                <strong className="text-white/90">FibraX 1Gb</strong> tiene un coste de <strong className="text-white/90">21€/mes IVA incluido</strong> si no se añade una línea móvil.
              </p>
              <p>Disfruta de llamadas nacionales ilimitadas con una política de uso razonable de 6.000 minutos al mes.</p>
              <p className="text-white/60">* Oferta válida hasta el 15 de septiembre de 2026.</p>
            </div>
            <div id="oeste-form-section">
              <OesteLeadForm
                selectedOffer={selectedOffer ? {
                  id: selectedOffer.id,
                  title: selectedOffer.title,
                  price: selectedOffer.price,
                  priceSuffix: selectedOffer.priceSuffix,
                } : null}
                onClearOffer={() => setSelectedOffer(null)}
              />
            </div>

            {/* Video: Máxima velocidad */}
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/30 backdrop-blur-sm">
              <div className="px-5 pt-4 pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">— En acción</p>
                <h3 className="mt-1 font-display-italic text-2xl sm:text-3xl text-white leading-tight">
                  Máxima velocidad
                </h3>
              </div>
              <video
                src={`${maximaVelocidadAsset.url}#t=0.5`}
                className="w-full h-auto block bg-black"
                controls
                playsInline
                preload="auto"
                muted
                onPlay={handleVideoPlay}
              />

              <div className="px-5 py-4 border-t border-white/10">
                <button
                  onClick={() => scrollToForm('video-section')}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-bold uppercase tracking-wider text-sm px-7 py-4 hover:bg-white/90 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition"
                >
                  Ver ofertas!
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="relative bg-black/15 backdrop-blur-[2px] border-y border-white/10 py-16 sm:py-24 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">— Por qué Oeste</p>
            <h2 className="mt-4 leading-[0.95]">
              <span className="block font-sans font-black uppercase tracking-[-0.02em] text-4xl sm:text-5xl">
                Una fibra hecha
              </span>
              <span className="block font-display-italic text-5xl sm:text-6xl text-white/95 -mt-1">
                para tu zona.
              </span>
            </h2>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-6 hover:bg-white/15 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-white text-neutral-900 flex items-center justify-center">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-brand statement */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <img src={OESTE_LOGO} alt="Oeste" className="h-9 w-auto" />
              <span className="text-white/60 text-xl">×</span>
              <a href="https://rubenmunoz.com/inicio?from=oeste-landing1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src={RUBEN_LOGO} alt="Rubén Muñoz" className="h-9 w-auto" />
              </a>
            </div>
            <p className="font-display text-3xl sm:text-4xl leading-snug">
              “Apostar por lo de casa también está en cómo nos conectamos. Por eso confío en{' '}
              <em className="font-display-italic">Oeste</em>.”
            </p>
            <p className="mt-6 text-white/75 text-sm uppercase tracking-[0.2em]">— Rubén Muñoz</p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => scrollToForm('cobrand-statement')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-semibold px-7 py-4 hover:bg-white/90 transition"
              >
                Pedir mi oferta
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="https://rubenmunoz.com/inicio?from=oeste-landing1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 text-white font-semibold px-7 py-4 hover:bg-white/10 transition"
              >
                Conoce a Rubén Muñoz
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/15 py-10 px-5 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img src={OESTE_LOGO} alt="Oeste" className="h-6 w-auto opacity-90" />
              <span>×</span>
              <a href="https://rubenmunoz.com/inicio?from=oeste-landing1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src={RUBEN_LOGO} alt="Rubén Muñoz" className="h-6 w-auto opacity-90" />
              </a>
            </div>
            <div className="flex items-center gap-5 text-sm text-white/80">
              <a
                href="https://rubenmunoz.com/inicio?from=oeste-landing1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                rubenmunoz.com ↗
              </a>
              <a
                href="https://oeste.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                oeste.digital ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-xs text-white/70">
            <a href="https://oeste.digital/aviso-legal/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Aviso Legal
            </a>
            <a href="https://oeste.digital/PDF/Oeste-CondicionesGenerales.pdf?_t=1769595580" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Condiciones Generales
            </a>
            <a href="https://oeste.digital/condiciones-individuales/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Condiciones Individuales
            </a>
            <a href="https://oeste.digital/calidad-de-servicio/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Calidad del Servicio
            </a>
            <a href="https://oeste.digital/PDF/politica-de-uso.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Política de Uso
            </a>
            <a href="https://oeste.digital/politica-de-proteccion-de-datos/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Protección de Datos
            </a>
            <a href="https://oeste.digital/politica-de-proteccion-de-datos-oeste-soluciones-energeticas-s-l/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Protección de Datos Oeste Solar
            </a>
            <a href="https://oeste.digital/PDF/politica-de-cookies.pdf?_t=1769594865" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Política de Cookies
            </a>
          </div>
        </div>
      </footer>
      <OesteStickyCTA onCtaClick={() => scrollToForm('sticky-mobile')} />
      </div>
    </div>
  );
}
