import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Loader2, CheckCircle2, Zap, Unlock, Wrench, HeartHandshake } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { initMetaPixel } from '@/lib/metaPixel';
import { sendMetaEvent } from '@/lib/metaCapi';
import rubenLogoAsset from '@/assets/ruben-x-white.png.asset.json';
import oesteLogoAsset from '@/assets/oeste-color.png.asset.json';
import rubenPhotoAsset from '@/assets/ruben-parolin-grid.webp.asset.json';

const OESTE_LOGO = oesteLogoAsset.url;
const RUBEN_LOGO = rubenLogoAsset.url;
const RUBEN_PHOTO = rubenPhotoAsset.url;

const MUNICIPIOS_CON_COBERTURA = [
  'Abadía', 'Ahigal', 'Aldeanueva del Camino', 'Baños de Montemayor', 'Barrado',
  'Cabezabellosa', 'Cabezuela del Valle', 'Cáceres', 'Casas del Castañar',
  'Casas del Monte', 'El Torno', 'Garrovillas de Alconétar', 'Hervás', 'Jerte',
  'Montánchez', 'Navaconcejo', 'Piornal', 'Rebollar', 'Sierra de Fuentes',
  'Torreorgaz', 'Torrequemada', 'Valdastillas', 'Zarza de Granadilla',
];
const MUNICIPIOS_SIN_COBERTURA: string[] = [];

type Tarifa = { id: string; nom: string; desc: string; precio: number; destacada?: boolean };
const TARIFAS_PRINCIPALES: Tarifa[] = [
  { id: 'f-1', nom: 'Fibra 1 Gb', desc: 'Solo internet, sin línea móvil', precio: 21 },
  { id: 'fm-2', nom: 'Fibra 1 Gb + móvil 70 GB', desc: 'Llamadas ilimitadas', precio: 29, destacada: true },
  { id: 'fm-4', nom: 'Fibra 1 Gb + móvil 200 GB', desc: 'Llamadas ilimitadas', precio: 32 },
];
const TARIFAS_EXTRA: Tarifa[] = [
  { id: 'fm-1', nom: 'Fibra 1 Gb + móvil 25 GB', desc: 'Llamadas ilimitadas', precio: 27 },
  { id: 'fm-3', nom: 'Fibra 1 Gb + móvil 120 GB', desc: 'Llamadas ilimitadas', precio: 31 },
  { id: 'fm-5', nom: 'Fibra 1 Gb + móvil 400 GB', desc: 'GB acumulables', precio: 34 },
  { id: 'f-2', nom: 'Fibra 2 Gb', desc: 'Solo internet', precio: 35 },
];

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre'),
  phone: z.string().trim().regex(/^(\+34)?[\s]?[6-9]\d{2}[\s]?\d{3}[\s]?\d{3}$/, 'Escribe un teléfono de 9 cifras'),
  email: z.string().trim().email('Email no válido'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Tienes que aceptarlo para continuar' }) }),
});
type LeadValues = z.infer<typeof leadSchema>;

export default function OesteLanding2() {
  const [municipio, setMunicipio] = useState('');
  const [municipioConfirmado, setMunicipioConfirmado] = useState<string | null>(null);
  const [tieneCobertura, setTieneCobertura] = useState<boolean | null>(null);
  const [tarifa, setTarifa] = useState<Tarifa>(TARIFAS_PRINCIPALES.find(t => t.destacada) ?? TARIFAS_PRINCIPALES[0]);
  const [mostrarExtra, setMostrarExtra] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errorMunicipio, setErrorMunicipio] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const todosMunicipios = useMemo(
    () => [...MUNICIPIOS_CON_COBERTURA, ...MUNICIPIOS_SIN_COBERTURA].sort((a, b) => a.localeCompare(b, 'es')),
    [],
  );

  const normalizar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const sugerencias = useMemo(() => {
    const q = normalizar(busqueda.trim());
    if (!q) return todosMunicipios.slice(0, 8);
    return todosMunicipios.filter((m) => normalizar(m).includes(q)).slice(0, 8);
  }, [busqueda, todosMunicipios]);

  useEffect(() => {
    initMetaPixel('877944112021448');
    void sendMetaEvent({ eventName: 'PageView', capiOnly: true });
    const prev = document.title;
    document.title = 'Fibra y móvil de Oeste en Extremadura · 27 € al mes';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.title = prev; meta.remove(); };
  }, []);

  const comprobarCobertura = () => {
    if (!municipio) { setErrorMunicipio(true); return; }
    setErrorMunicipio(false);
    const cubierto = MUNICIPIOS_CON_COBERTURA.includes(municipio);
    setTieneCobertura(cubierto);
    setMunicipioConfirmado(municipio);
    void sendMetaEvent({ eventName: 'CheckCoverage', customData: { municipality: municipio, covered: cubierto } });
    if (cubierto) {
      void sendMetaEvent({
        eventName: 'ViewContent',
        customData: { content_name: 'Tarifas Oeste', content_category: 'oeste-landing2', content_type: 'product_group' },
      });
    }
    setTimeout(() => {
      document.getElementById('resultado-cobertura')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const volverAPaso1 = () => {
    setTieneCobertura(null);
    setMunicipioConfirmado(null);
    setTimeout(() => document.getElementById('paso1')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  };

  const seleccionarTarifa = (t: Tarifa) => {
    setTarifa(t);
    void sendMetaEvent({
      eventName: 'SelectOffer',
      customData: {
        content_ids: [t.id],
        content_name: t.nom,
        content_category: 'oeste-landing2',
        content_type: 'product',
        value: t.precio,
        currency: 'EUR',
      },
    });
  };

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', phone: '', email: '', consent: false as unknown as true },
  });

  const [checkoutFired, setCheckoutFired] = useState(false);
  const onFirstFocus = () => {
    if (checkoutFired) return;
    setCheckoutFired(true);
    void sendMetaEvent({
      eventName: 'InitiateCheckout',
      customData: { content_name: tarifa.nom, value: tarifa.precio, currency: 'EUR' },
    });
  };

  const onSubmit = async (values: LeadValues) => {
    setServerError(null);
    try {
      const { data, error } = await supabase.functions.invoke('oeste-lead', {
        body: {
          ...values,
          address: municipioConfirmado ?? '',
          offer: `${tarifa.nom} (${tarifa.precio}€/mes)`,
          landing: 'oeste-landing2',
        },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error('Respuesta inesperada');
      setEnviado(true);
      const [firstName, ...rest] = values.name.trim().split(/\s+/);
      const userData = {
        email: values.email, phone: values.phone,
        first_name: firstName, last_name: rest.join(' ') || undefined,
        city: municipioConfirmado ?? undefined, country: 'ES',
      };
      const customData = {
        content_name: tarifa.nom, content_category: tarifa.id,
        value: tarifa.precio, currency: 'EUR', predicted_ltv: tarifa.precio,
        lead_event_source: 'oeste-landing2', municipality: municipioConfirmado ?? undefined,
      };
      void sendMetaEvent({ eventName: 'Lead', customData, userData });
      void sendMetaEvent({ eventName: 'CompleteRegistration', customData: { ...customData, registration_method: 'lead-form' }, userData });
      reset();
      setTimeout(() => document.getElementById('exito')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
    } catch {
      setServerError('No se pudo enviar. Inténtalo de nuevo en unos minutos.');
    }
  };

  return (
    <div className="oeste-landing min-h-screen text-[#181320]" style={{ background: '#F3F0F5', fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif', fontSize: 19, lineHeight: 1.6 }}>
      {/* Sticky top bar — sin llamar */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-[#DCD5E2]">
        <div className="max-w-[660px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={OESTE_LOGO} alt="Oeste" className="h-7 w-auto" />
            <span className="text-[#DCD5E2] text-base">×</span>
            <a href="https://rubenmunoz.com/inicio?from=oeste-landing2" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <img src={RUBEN_LOGO} alt="Rubén Muñoz" className="h-6 w-auto" style={{ filter: 'invert(1)' }} />
            </a>
          </div>
          <a
            href="#paso1"
            onClick={(e) => { e.preventDefault(); document.getElementById(municipioConfirmado ? 'paso23' : 'paso1')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
            className="inline-flex items-center gap-2 text-white font-bold text-sm px-4 py-2.5 rounded-[10px]"
            style={{ background: 'linear-gradient(135deg,#BE2D70 0%,#702479 100%)', minHeight: 44 }}
          >
            Ver oferta <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="pt-8 pb-2">
        <div className="max-w-[660px] mx-auto px-5">
          <p className="inline-block bg-[#E37819] text-[#181320] font-bold text-[15px] px-3.5 py-2 rounded-lg mb-5">Oferta hasta el 15 de septiembre</p>
          <h1 className="font-extrabold" style={{ fontFamily: '"Archivo",system-ui,sans-serif', letterSpacing: '-0.02em', lineHeight: 1.05, fontSize: 'clamp(2.3rem,8.5vw,3.6rem)' }}>
            La fibra más rapida de<br />
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg,#E37819 0%,#BE2D70 55%,#702479 100%)', fontSize: 'clamp(3rem,13vw,5.2rem)' }}>Extremadura...</span>
          </h1>
          <p className="mt-4 text-[20px] text-[#4A4353] max-w-[34ch]">
            Sin permanencia. Instalación en 3 a 7 días. <strong className="text-[#181320]">Te atiende gente de aquí</strong>, no un locutorio a mil kilómetros.
          </p>
        </div>
      </header>

      {/* Proceso 3 pasos */}
      <div className="max-w-[660px] mx-auto px-5">
        <div className="bg-white border-2 border-[#DCD5E2] rounded-[14px] my-6 overflow-visible">
          {municipioConfirmado && tieneCobertura && (
            <div id="resultado-cobertura" className="flex items-start gap-3.5 px-5 py-5 bg-[#E4F3EA] border-b-2 border-[#BFE0CD]">
              <div className="w-11 h-11 rounded-full bg-[#1A6E45] text-white flex items-center justify-center text-xl font-bold shrink-0">✓</div>
              <div>
                <div className="uppercase tracking-widest text-[#1A6E45] font-bold text-[17px]" style={{ fontFamily: '"Archivo"' }}>Sí, tenemos cobertura en</div>
                <div className="font-extrabold text-[#181320] mt-0.5" style={{ fontFamily: '"Archivo"', fontSize: 'clamp(1.7rem,7vw,2.3rem)', lineHeight: 1.05 }}>{municipioConfirmado}</div>
                <button onClick={volverAPaso1} className="text-[#702479] underline underline-offset-2 text-base mt-2">Cambiar de municipio</button>
              </div>
            </div>
          )}

          {/* Paso 1 */}
          {!(municipioConfirmado && tieneCobertura) && !(municipioConfirmado && tieneCobertura === false) && (
            <div id="paso1">
              <div className="px-5 pt-6">
                <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm" style={{ fontFamily: '"Archivo"' }}>Paso 1 de 3</p>
                <h2 className="text-[26px] font-extrabold mt-2" style={{ fontFamily: '"Archivo"', letterSpacing: '-0.02em' }}>¿Llega a tu casa?</h2>
                <p className="text-[17px] text-[#4A4353] mt-1.5 mb-4">Elige tu pueblo o ciudad y lo comprobamos al momento. No te pedimos ningún dato.</p>
              </div>
              <div className="px-5 pb-6">
                <label className="block font-bold text-[17px] mb-2" htmlFor="municipio">Tu municipio</label>
                <div className="relative">
                  <input
                    id="municipio"
                    type="text"
                    autoComplete="off"
                    value={busqueda}
                    onChange={(e) => {
                      setBusqueda(e.target.value);
                      setMunicipio('');
                      setMostrarSugerencias(true);
                    }}
                    onFocus={() => setMostrarSugerencias(true)}
                    onBlur={() => setTimeout(() => setMostrarSugerencias(false), 150)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && sugerencias[0]) {
                        e.preventDefault();
                        setMunicipio(sugerencias[0]);
                        setBusqueda(sugerencias[0]);
                        setMostrarSugerencias(false);
                      }
                    }}
                    placeholder="Escribe tu pueblo o ciudad…"
                    className="w-full bg-white border-2 border-[#4A4353] rounded-[10px] px-4 pr-12 text-[19px] text-[#181320] placeholder:text-[#8A8394] focus:outline-none focus:ring-4 focus:ring-[#702479]/30"
                    style={{ minHeight: 60 }}
                  />
                  <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#181320]" strokeWidth={3} />
                  {mostrarSugerencias && sugerencias.length > 0 && (
                    <ul className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-[#4A4353] rounded-[10px] shadow-lg z-20 max-h-64 overflow-y-auto">
                      {sugerencias.map((m) => (
                        <li key={m}>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setMunicipio(m);
                              setBusqueda(m);
                              setMostrarSugerencias(false);
                              setErrorMunicipio(false);
                            }}
                            className="w-full text-left px-4 py-3 text-[17px] text-[#181320] hover:bg-[#F3F0F5]"
                          >
                            {m}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {mostrarSugerencias && busqueda.trim() && sugerencias.length === 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border-2 border-[#4A4353] rounded-[10px] shadow-lg z-20 px-4 py-3 text-[17px] text-[#4A4353]">
                      No encontramos ese municipio.
                    </div>
                  )}
                </div>
                {errorMunicipio && <p className="text-[#A61B1B] font-bold text-base mt-1.5">Elige tu municipio para continuar.</p>}
                <button
                  onClick={comprobarCobertura}
                  className="mt-4 w-full flex items-center justify-center gap-2 text-white font-bold text-xl rounded-[10px]"
                  style={{ background: 'linear-gradient(135deg,#BE2D70 0%,#702479 100%)', minHeight: 60, fontFamily: '"Archivo"' }}
                >
                  Comprobar cobertura
                </button>
              </div>
            </div>
          )}

          {/* Fuera de cobertura */}
          {municipioConfirmado && tieneCobertura === false && (
            <div>
              <div className="px-5 pt-6">
                <p className="uppercase tracking-[0.14em] text-[#E37819] font-bold text-sm" style={{ fontFamily: '"Archivo"' }}>Todavía no llegamos</p>
                <h2 className="text-[26px] font-extrabold mt-2" style={{ fontFamily: '"Archivo"' }}>Aún no tenemos cobertura en {municipioConfirmado}</h2>
                <p className="text-[17px] text-[#4A4353] mt-1.5 mb-4">Estamos ampliando la red cada mes. Vuelve a comprobarlo con otro municipio.</p>
              </div>
              <div className="px-5 pb-6">
                <button onClick={volverAPaso1} className="w-full flex items-center justify-center gap-2 rounded-[10px] font-bold text-xl border-2 border-[#702479] text-[#702479] bg-white" style={{ minHeight: 60, fontFamily: '"Archivo"' }}>
                  Elegir otro municipio
                </button>
              </div>
            </div>
          )}

          {/* Paso 2 + 3 */}
          {municipioConfirmado && tieneCobertura && !enviado && (
            <div id="paso23">
              <div className="px-5 pt-6">
                <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm" style={{ fontFamily: '"Archivo"' }}>Paso 2 de 3</p>
                <h2 className="text-[26px] font-extrabold mt-2" style={{ fontFamily: '"Archivo"' }}>Elige tu tarifa</h2>
                <p className="text-[17px] text-[#4A4353] mt-1.5 mb-4">Todas incluyen router, instalación y llamadas ilimitadas.</p>
              </div>
              <div className="px-5 pb-4">
                {TARIFAS_PRINCIPALES.map((t) => <TarifaBtn key={t.id} t={t} selected={tarifa.id === t.id} onClick={() => seleccionarTarifa(t)} />)}

                <button
                  type="button"
                  onClick={() => setMostrarExtra((v) => !v)}
                  className="flex items-center gap-2 py-3.5 font-bold text-[17px] text-[#702479]"
                >
                  <span className="font-extrabold text-[22px] leading-none" style={{ fontFamily: '"Archivo"' }}>{mostrarExtra ? '−' : '+'}</span>
                  Ver todas las tarifas
                </button>
                {mostrarExtra && (
                  <div className="pt-2">
                    {TARIFAS_EXTRA.map((t) => <TarifaBtn key={t.id} t={t} selected={tarifa.id === t.id} onClick={() => seleccionarTarifa(t)} />)}
                  </div>
                )}
              </div>

              <div className="px-5 pt-6 border-t-2 border-[#DCD5E2]">
                <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm" style={{ fontFamily: '"Archivo"' }}>Paso 3 de 3</p>
                <h2 className="text-[26px] font-extrabold mt-2" style={{ fontFamily: '"Archivo"' }}>Te contactaremos tras su solicitud.</h2>
                <p className="text-[17px] text-[#4A4353] mt-1.5 mb-4">Recibimos tu solicitud y te contactamos en menos de 24 h en horario de atención.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} onFocus={onFirstFocus} noValidate className="px-5 pb-6 space-y-5">
                <FormField label="Tu nombre" error={errors.name?.message}>
                  <input type="text" autoComplete="name" placeholder="María García" className={inputCls} {...register('name')} />
                </FormField>
                <FormField label="Tu teléfono" error={errors.phone?.message}>
                  <input type="tel" inputMode="tel" autoComplete="tel" placeholder="600 00 00 00" className={inputCls} {...register('phone')} />
                </FormField>
                <FormField label="Tu email" error={errors.email?.message}>
                  <input type="email" inputMode="email" autoComplete="email" autoCapitalize="off" placeholder="tu@email.com" className={inputCls} {...register('email')} />
                </FormField>
                <label className="flex items-start gap-3 text-base text-[#4A4353] cursor-pointer">
                  <input type="checkbox" className="w-6 h-6 mt-0.5 accent-[#702479] shrink-0" {...register('consent')} />
                  <span>
                    Acepto que <strong>Oeste</strong> me contacte para informarme de sus ofertas, según su{' '}
                    <a href="https://oeste.digital/politica-de-proteccion-de-datos/" target="_blank" rel="noopener noreferrer" className="text-[#702479] underline">política de protección de datos</a>.
                  </span>
                </label>
                {errors.consent && <p className="text-[#A61B1B] font-bold text-base">{errors.consent.message as string}</p>}
                {serverError && <p className="text-[#A61B1B] font-bold text-base bg-[#FCECEC] border-2 border-[#F5C6C6] rounded-lg px-3 py-2">{serverError}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 text-white font-bold text-xl rounded-[10px] disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#BE2D70 0%,#702479 100%)', minHeight: 60, fontFamily: '"Archivo"' }}>
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando…</> : <>Enviar solicitud <ArrowRight className="w-5 h-5" /></>}
                </button>
                <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-base text-[#4A4353]">
                  <span>✓ Sin compromiso</span>
                  <span>✓ Sin permanencia</span>
                  <span>✓ Atención local</span>
                </div>
              </form>
            </div>
          )}

          {/* Éxito */}
          {enviado && (
            <div id="exito" className="px-5 py-9 text-center">
              <div className="w-[60px] h-[60px] rounded-full bg-[#1A6E45] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">✓</div>
              <h3 className="text-[28px] font-extrabold mb-2.5" style={{ fontFamily: '"Archivo"' }}>Recibido, ¡gracias!</h3>
              <p className="text-[#4A4353] mb-5">Te contactamos por email o teléfono en menos de 24 h dentro del horario de atención.</p>
            </div>
          )}
        </div>
      </div>

      {/* Ventajas */}
      <section className="max-w-[660px] mx-auto px-5 my-11">
        <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm mb-2.5" style={{ fontFamily: '"Archivo"' }}>Por qué Oeste</p>
        <h2 className="font-extrabold mb-6" style={{ fontFamily: '"Archivo"', fontSize: 'clamp(1.7rem,6.5vw,2.2rem)', letterSpacing: '-0.02em' }}>Una fibra hecha para tu zona</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { t: 'Velocidad de verdad', d: '1 Gb o 2 Gb reales, tanto para bajar como para subir. Sin cortes cuando toda la casa está conectada.', icon: Zap },
            { t: 'Sin permanencia', d: 'Te vas cuando quieras. Sin penalización y sin letra pequeña.', icon: Unlock },
            { t: 'Instalación rápida', d: 'Entre 3 y 7 días. Te lo monta un técnico de la zona y te explica cómo funciona.', icon: Wrench },
            { t: 'Atención cercana', d: 'Si hay una avería, hablas con alguien de aquí y viene alguien de aquí.', icon: HeartHandshake },
          ].map((v) => (
            <div key={v.t} className="bg-white border-2 border-[#DCD5E2] rounded-xl p-4.5" style={{ padding: 18 }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg,#E37819 0%,#BE2D70 55%,#702479 100%)' }}>
                <v.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-[19px] font-bold mb-1">{v.t}</h3>
              <p className="text-base text-[#4A4353]">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparativa */}
      <section className="max-w-[660px] mx-auto px-5 my-11">
        <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm mb-2.5" style={{ fontFamily: '"Archivo"' }}>Comparado</p>
        <h2 className="font-extrabold mb-6" style={{ fontFamily: '"Archivo"', fontSize: 'clamp(1.7rem,6.5vw,2.2rem)' }}>Oeste frente a las grandes</h2>
        <table className="w-full border-collapse bg-white border-2 border-[#DCD5E2] rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className="p-3.5 text-left font-bold text-[15px] bg-[#EDE7F0]" style={{ fontFamily: '"Archivo"' }}></th>
              <th className="p-3.5 text-left font-bold text-[15px] bg-[#EDE7F0]" style={{ fontFamily: '"Archivo"' }}>Oeste</th>
              <th className="p-3.5 text-left font-bold text-[15px] bg-[#EDE7F0]" style={{ fontFamily: '"Archivo"' }}>Las grandes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Permanencia', 'Ninguna', '12 a 24 meses'],
              ['Quién te atiende', 'Personas de aquí', 'Centro de llamadas'],
              ['Subida de precio', 'Precio cerrado', 'Sube al año'],
              ['Instalación', '3 a 7 días', '2 a 4 semanas'],
            ].map(([k, a, b]) => (
              <tr key={k} className="border-b border-[#DCD5E2] last:border-b-0">
                <td className="p-3.5 font-bold text-[17px]">{k}</td>
                <td className="p-3.5 text-[17px] text-[#1A6E45] font-bold">{a}</td>
                <td className="p-3.5 text-[17px] text-[#4A4353]">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Cita Rubén */}
      <div className="my-11 py-10 text-white" style={{ background: 'linear-gradient(135deg,#E37819 0%,#BE2D70 55%,#702479 100%)' }}>
        <div className="max-w-[660px] mx-auto px-5 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
          <div className="mx-auto sm:mx-0 w-[160px] h-[200px] rounded-xl overflow-hidden border-2 border-white/30 shadow-xl shrink-0">
            <img src={RUBEN_PHOTO} alt="Rubén Muñoz en la parrilla con su kart Parolin" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <blockquote className="font-extrabold mb-4" style={{ fontFamily: '"Archivo"', fontSize: 'clamp(1.35rem,5vw,1.85rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              «Apostar por lo de casa también está en cómo nos conectamos. Por eso confío en Oeste.»
            </blockquote>
            <p className="font-bold text-[17px]">
              Rubén Muñoz
              <span className="block font-normal opacity-90 text-base" style={{ fontFamily: '"Atkinson Hyperlegible"' }}>Piloto de karting · Campeonato de España</span>
            </p>
          </div>
        </div>
      </div>


      {/* FAQ */}
      <section className="max-w-[660px] mx-auto px-5 my-11">
        <p className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm mb-2.5" style={{ fontFamily: '"Archivo"' }}>Dudas frecuentes</p>
        <h2 className="font-extrabold mb-6" style={{ fontFamily: '"Archivo"', fontSize: 'clamp(1.7rem,6.5vw,2.2rem)' }}>Lo que más nos preguntan</h2>
        {[
          ['¿Cuánto tarda la instalación?', 'Entre 3 y 7 días desde que hablamos contigo. Acordamos día y franja horaria contigo, y el técnico te avisa antes de ir.'],
          ['¿Tiene permanencia?', 'No. Puedes darte de baja cuando quieras sin pagar penalización.'],
          ['¿Puedo quedarme con mi número de móvil?', 'Sí. Nos encargamos nosotros de la portabilidad y no te quedas sin línea en ningún momento.'],
          ['¿La velocidad es real o es «hasta»?', 'Es real y simétrica: 1 Gb de bajada y 1 Gb de subida. La fibra llega hasta tu casa, no hasta la esquina.'],
          ['¿Y si me mudo?', 'Si tu nueva casa está en zona con cobertura, te llevamos el servicio sin coste de alta.'],
        ].map(([q, a]) => (
          <details key={q} className="bg-white border-2 border-[#DCD5E2] rounded-xl mb-2.5 group">
            <summary className="cursor-pointer font-bold text-[18px] p-5 flex justify-between items-center gap-3.5 list-none">
              <span>{q}</span>
              <span className="text-[26px] text-[#702479] font-normal leading-none group-open:hidden" style={{ fontFamily: '"Archivo"' }}>+</span>
              <span className="text-[26px] text-[#702479] font-normal leading-none hidden group-open:inline" style={{ fontFamily: '"Archivo"' }}>−</span>
            </summary>
            <p className="px-5 pb-5 text-[#4A4353] text-[17px]">{a}</p>
          </details>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#DCD5E2] py-8 mt-11">
        <div className="max-w-[660px] mx-auto px-5">
          <div className="flex items-center gap-2.5 mb-2 font-bold text-base">
            <img src={OESTE_LOGO} alt="Oeste" className="h-6 w-auto" />
            <span className="text-[#DCD5E2]">×</span>
            <a href="https://rubenmunoz.com/inicio?from=oeste-landing2" target="_blank" rel="noopener noreferrer">
              <img src={RUBEN_LOGO} alt="Rubén Muñoz" className="h-5 w-auto" style={{ filter: 'invert(1)' }} />
            </a>
          </div>
          <p className="text-base text-[#4A4353]">
            Fibra 1 Gb sin línea móvil: 21 €/mes con IVA. Llamadas nacionales ilimitadas con uso razonable de 6.000 minutos al mes. Oferta válida hasta el 15 de septiembre de 2026.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-sm">
            {[
              ['Aviso legal', 'https://oeste.digital/aviso-legal/'],
              ['Condiciones generales', 'https://oeste.digital/PDF/Oeste-CondicionesGenerales.pdf'],
              ['Condiciones individuales', 'https://oeste.digital/condiciones-individuales/'],
              ['Calidad del servicio', 'https://oeste.digital/calidad-de-servicio/'],
              ['Protección de datos', 'https://oeste.digital/politica-de-proteccion-de-datos/'],
              ['Cookies', 'https://oeste.digital/PDF/politica-de-cookies.pdf'],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-[#4A4353] hover:text-[#181320] underline underline-offset-2">{label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Meta Pixel noscript */}
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=877944112021448&ev=PageView&noscript=1" alt="" />
      </noscript>
    </div>
  );
}

const inputCls = 'w-full h-[60px] bg-white border-2 border-[#4A4353] rounded-[10px] px-4 text-[19px] text-[#181320] placeholder:text-[#8A8394] focus:outline-none focus:ring-4 focus:ring-[#702479]/30';

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-bold text-[17px] mb-2">{label}</label>
      {children}
      {error && <p className="text-[#A61B1B] font-bold text-base mt-1.5">{error}</p>}
    </div>
  );
}

function TarifaBtn({ t, selected, onClick }: { t: Tarifa; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3.5 w-full bg-white rounded-xl p-4 mb-3 text-left transition ${
        selected ? 'border-[3px] border-[#702479] bg-[#FBF6FD]' : 'border-2 border-[#DCD5E2] hover:border-[#4A4353]'
      }`}
      style={{ minHeight: 60 }}
    >
      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-[3px] ${selected ? 'border-[#702479]' : 'border-[#4A4353]'}`}>
        {selected && <span className="w-3.5 h-3.5 rounded-full bg-[#702479]" />}
      </span>
      <span className="flex-1 min-w-0">
        {t.destacada && <span className="inline-block bg-[#E37819] text-[#181320] font-bold text-[13px] px-2.5 py-0.5 rounded-md mb-1">La más contratada</span>}
        <span className="block font-bold text-[18px] leading-tight">{t.nom}</span>
        <span className="block text-base text-[#4A4353] mt-0.5">{t.desc}</span>
      </span>
      <span className="text-right shrink-0">
        <span className="block font-extrabold text-[30px] leading-none" style={{ fontFamily: '"Archivo"' }}>{t.precio} €</span>
        <span className="block text-sm text-[#4A4353]">al mes</span>
      </span>
    </button>
  );
}
