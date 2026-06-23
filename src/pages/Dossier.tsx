import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DossierAccess } from '../components/DossierAccess';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  MapPin,
  Mail,
  Instagram,
  ChevronRight,
  Globe,
  Sparkles,
  ArrowUpRight,
  Megaphone,
  PenTool,
  BarChart3,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import helmetExample from '@/assets/custom-helmet.jpg';

type DossierVersion = 'regional' | 'nacional' | 'internacional' | null;

export function Dossier() {
  const [version, setVersion] = useState<DossierVersion>(null);
  const { language, getRoute } = useLanguage();
  const es = language === 'es';

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!version) {
    return <DossierAccess onAccess={setVersion} />;
  }

  const isRegional = version === 'regional';
  const isNacional = version === 'nacional';

  const versionLabel = isRegional
    ? es ? 'Edición Regional · Extremadura' : 'Regional Edition · Extremadura'
    : isNacional
    ? es ? 'Edición Nacional · España' : 'National Edition · Spain'
    : es ? 'Edición Internacional' : 'International Edition';

  // ───────────────────────── helpers ─────────────────────────
  const Chapter = ({
    n,
    kicker,
    title,
    intro,
    children,
  }: {
    n: string;
    kicker: string;
    title: React.ReactNode;
    intro?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <section className="relative px-5 sm:px-10 md:px-16 py-20 sm:py-28 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex lg:flex-col items-start gap-3"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">
                {kicker}
              </span>
              <span className="font-display text-6xl sm:text-7xl text-white/15 leading-none">
                {n}
              </span>
            </motion.div>
          </div>
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl text-white leading-[1.02] tracking-[-0.02em]"
            >
              {title}
            </motion.h2>
            {intro && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
              >
                {intro}
              </motion.p>
            )}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* ════════════════ 00 · COVER ════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-5 sm:px-10 md:px-16 overflow-hidden">
        {/* Grain / vignette */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="max-w-6xl mx-auto w-full">
          {/* meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-white/50 font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="text-white">Dossier — 2026</span>
              <span className="h-px w-6 bg-white/20" />
              <span>{versionLabel}</span>
            </div>
            <span className="text-white/30">Confidencial · v.2026.1</span>
          </motion.div>

          {/* monogram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16 sm:mt-24"
          >
            <span className="font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
              Rubén Muñoz · #82
            </span>
          </motion.div>

          {/* giant title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display leading-[0.88] tracking-[-0.04em] text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[180px] text-white"
          >
            {es ? 'Velocidad' : 'Speed'}
            <span className="text-white/25">,</span>
            <br />
            <span className="font-display-italic text-gradient-mono-italic">
              {es ? 'con marca.' : 'with a brand.'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 max-w-xl text-white/65 text-lg leading-relaxed"
          >
            {es
              ? 'Un piloto del Campeonato de España y una agencia de marketing detrás. Cada carrera es una campaña. Cada patrocinio, una historia que contamos.'
              : 'A driver in the Spanish Karting Championship with a marketing agency behind him. Every race is a campaign. Every sponsorship, a story we tell.'}
          </motion.p>
        </div>

        {/* bottom bar */}
        <div className="max-w-6xl mx-auto w-full mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 pt-8 border-t border-white/15"
          >
            <div className="grid grid-cols-3 gap-8 sm:gap-12">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-white">2023</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  {es ? 'Debut' : 'Debut'}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-white">2024</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  {es ? 'Campeón regional' : 'Regional champ'}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-white">2026</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">
                  CEK
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={getRoute('/')}>
                <Button className="rounded-none h-11 px-5 bg-white text-black hover:bg-white/85 gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
                  <Globe className="w-3.5 h-3.5" />
                  {es ? 'Web oficial' : 'Official site'}
                </Button>
              </Link>
              <a href="#chapter-01">
                <Button
                  variant="outline"
                  className="rounded-none h-11 px-5 border-white/25 bg-transparent text-white hover:bg-white hover:text-black gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
                >
                  {es ? 'Entrar al dossier' : 'Open dossier'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ 01 · PILOTO ════════════════ */}
      <div id="chapter-01" />
      <Chapter
        n="01"
        kicker={es ? 'El piloto' : 'The driver'}
        title={
          <>
            {es ? 'Tres años. ' : 'Three years. '}
            <span className="font-display-italic text-white/55">
              {es ? 'Una trayectoria sin atajos.' : 'A trajectory with no shortcuts.'}
            </span>
          </>
        }
        intro={
          es
            ? 'De Cáceres al Campeonato de España. Sin escuela federada de origen, sin recorrido prefabricado. Solo trabajo, datos y kilómetros.'
            : 'From Cáceres to the Spanish Championship. No federation school behind me, no pre-built path. Just work, data and laps.'
        }
      >
        <div className="grid lg:grid-cols-12 gap-px bg-white/10">
          {[
            {
              year: '2023',
              tag: es ? 'Debut' : 'Debut',
              text: es
                ? 'Estreno como piloto. Victoria en la carrera de resistencia de las Karting Series de Extremadura.'
                : 'First season. Win at the endurance race of the Extremadura Karting Series.',
            },
            {
              year: '2024',
              tag: es ? 'Campeón regional' : 'Regional champion',
              text: es
                ? 'Campeón de Extremadura sin necesidad de correr todas las pruebas puntuables.'
                : 'Extremadura Champion without needing to race every scoring round.',
            },
            {
              year: '2025',
              tag: es ? 'Salto nacional' : 'National jump',
              text: es
                ? 'Debut en el Campeonato de España con sensaciones de rookie veloz y adaptación inmediata.'
                : 'Debut in the Spanish Championship with fast-rookie pace and immediate adaptation.',
            },
            {
              year: '2026',
              tag: es ? 'Consolidación' : 'Consolidation',
              text: es
                ? 'Temporada para podios, top-10 y una prueba internacional. El año en que la marca personal se vuelve profesional.'
                : 'A season for podiums, top-10s and an international race. The year the personal brand turns professional.',
            },
          ].map((row, i) => (
            <motion.div
              key={row.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="lg:col-span-3 bg-black p-6 sm:p-8 group hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display text-5xl sm:text-6xl text-white tracking-tighter">
                  {row.year}
                </span>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 mb-3">
                {row.tag}
              </div>
              <p className="text-white/75 text-sm leading-relaxed">{row.text}</p>
            </motion.div>
          ))}
        </div>
      </Chapter>

      {/* ════════════════ 02 · NETPRO ════════════════ */}
      <section className="relative px-5 sm:px-10 md:px-16 py-24 sm:py-32 border-t border-white/[0.08] bg-white text-black overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,0,0,0.06),_transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-3">
              <span className="font-mono text-[11px] tracking-[0.25em] text-black/50 uppercase">
                {es ? 'Capítulo' : 'Chapter'}
              </span>
              <div className="font-display text-6xl sm:text-7xl text-black/15 leading-none mt-3">
                02
              </div>
            </div>
            <div className="lg:col-span-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-black/50 mb-4">
                {es ? 'Detrás del casco' : 'Behind the helmet'}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-0.02em]">
                {es ? 'Una agencia entera ' : 'An entire agency '}
                <span className="font-display-italic">
                  {es ? 'detrás de cada carrera.' : 'behind every race.'}
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-black/70 text-base sm:text-lg leading-relaxed">
                {es ? (
                  <>
                    Toda la marca, las redes, el contenido y la estrategia de patrocinio se gestionan
                    en conjunto con <strong>Netpro</strong>, mi propia agencia de marketing digital.
                    No es un piloto pidiendo logos: es un equipo trabajando para que cada euro
                    invertido devuelva visibilidad real, medible y bien contada.
                  </>
                ) : (
                  <>
                    The whole brand, social media, content and sponsorship strategy is handled
                    together with <strong>Netpro</strong>, my own digital marketing agency. It's not
                    a driver asking for logos: it's a team making sure every euro invested returns
                    real, measurable, well-told visibility.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black/15">
            {[
              {
                icon: PenTool,
                tag: es ? 'Identidad' : 'Identity',
                title: es ? 'Diseño de marca' : 'Brand design',
                text: es
                  ? 'Identidad visual del piloto, decoración del kart, diseño de equipación y kits gráficos para patrocinadores.'
                  : 'Driver visual identity, kart livery, race-suit design and sponsor graphic kits.',
              },
              {
                icon: Megaphone,
                tag: es ? 'Contenido' : 'Content',
                title: es ? 'Redes & storytelling' : 'Social & storytelling',
                text: es
                  ? 'Producción y publicación constante en Instagram, TikTok y YouTube Shorts. Antes, durante y después de cada GP.'
                  : 'Constant production and publishing on Instagram, TikTok and YouTube Shorts. Before, during and after each GP.',
              },
              {
                icon: BarChart3,
                tag: es ? 'Performance' : 'Performance',
                title: es ? 'Meta & TikTok Ads' : 'Meta & TikTok Ads',
                text: es
                  ? 'Campañas pagadas dirigidas al público de tu marca, no solo a la comunidad del motor. Reporting honesto.'
                  : 'Paid campaigns targeted at your brand audience, not just the motorsport community. Honest reporting.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 sm:p-10"
              >
                <s.icon className="w-8 h-8 mb-8 text-black" strokeWidth={1.25} />
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/45 mb-2">
                  {s.tag}
                </div>
                <h3 className="font-display text-2xl mb-3 leading-tight">{s.title}</h3>
                <p className="text-black/70 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-black/15"
          >
            <p className="font-display-italic text-xl sm:text-2xl max-w-xl leading-snug">
              “
              {es
                ? 'Patrocinar no es pegar un logo. Es entrar en una historia que ya está siendo contada bien.'
                : 'Sponsoring is not slapping a logo on. It is stepping into a story already being told well.'}
              ”
            </p>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/60">
              Netpro · {es ? 'agencia de marketing' : 'marketing agency'}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ 03 · TERRITORIO ════════════════ */}
      {(isRegional || isNacional) && (
        <Chapter
          n="03"
          kicker={es ? 'Territorio' : 'Territory'}
          title={
            isRegional ? (
              <>
                {es ? 'Desde Extremadura, ' : 'From Extremadura, '}
                <span className="font-display-italic text-white/55">
                  {es ? 'al circuito nacional.' : 'to the national circuit.'}
                </span>
              </>
            ) : (
              <>
                {es ? 'Una marca que viaja ' : 'A brand that travels '}
                <span className="font-display-italic text-white/55">
                  {es ? 'por toda España.' : 'across all of Spain.'}
                </span>
              </>
            )
          }
          intro={
            isRegional
              ? es
                ? 'La referencia del karting extremeño compitiendo a nivel nacional. Los patrocinadores regionales ganan visibilidad local exclusiva y, a la vez, suben a un escaparate de toda España.'
                : 'The reference of Extremadura karting competing at national level. Regional sponsors get exclusive local visibility while jumping onto a Spain-wide showcase.'
              : es
              ? 'Cada ronda del CEK es una ciudad nueva, un público nuevo y una pieza de contenido nueva. Valencia, Andalucía, Aragón, Castilla… tu marca llega antes que el camión.'
              : 'Every CEK round is a new city, a new audience and a new piece of content. Valencia, Andalusia, Aragón, Castilla… your brand arrives before the truck does.'
          }
        >
          <div className="flex flex-wrap gap-3">
            {(isRegional
              ? [
                  { i: Trophy, t: es ? 'Campeón Regional 2024' : 'Regional Champion 2024' },
                  { i: Star, t: es ? 'Piloto Extremeño #1' : 'Extremadura Driver #1' },
                  { i: MapPin, t: es ? 'Base en Cáceres' : 'Based in Cáceres' },
                ]
              : [
                  { i: Trophy, t: es ? 'CEK 2025–2026' : 'Spanish C’ship 2025–2026' },
                  { i: MapPin, t: es ? 'Visibilidad en toda España' : 'Visibility across Spain' },
                  { i: Star, t: es ? 'Piloto nacional emergente' : 'Emerging national driver' },
                ]
            ).map(({ i: Icon, t }) => (
              <div
                key={t}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-white/80"
              >
                <Icon className="w-3.5 h-3.5" />
                {t}
              </div>
            ))}
          </div>
        </Chapter>
      )}

      {/* ════════════════ 04 · OBJETIVOS ════════════════ */}
      <Chapter
        n={isRegional || isNacional ? '04' : '03'}
        kicker={es ? 'Hoja de ruta 2026' : 'Roadmap 2026'}
        title={
          <>
            {es ? 'Lo que vamos a hacer ' : 'What we are going to do '}
            <span className="font-display-italic text-white/55">
              {es ? 'esta temporada.' : 'this season.'}
            </span>
          </>
        }
      >
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {[
            { n: '01', t: es ? 'Consolidar la posición en el Campeonato de España' : 'Consolidate the position in the Spanish Championship' },
            { n: '02', t: es ? 'Pelear por podios y top-10 en cada cita' : 'Fight for podiums and top-10s at every round' },
            { n: '03', t: es ? 'Disputar al menos una prueba internacional' : 'Race at least one international event' },
            { n: '04', t: es ? 'Crecer x3 la audiencia digital con Netpro' : 'Grow the digital audience 3x with Netpro' },
            ...(isRegional
              ? [{ n: '05', t: es ? 'Representar a Extremadura a nivel nacional' : 'Represent Extremadura nationally' }]
              : []),
          ].map((g, i) => (
            <motion.li
              key={g.n}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-6 py-6 group hover:bg-white/[0.03] px-2 -mx-2 transition-colors"
            >
              <span className="font-mono text-xs text-white/40 w-8">{g.n}</span>
              <span className="flex-1 font-display text-xl sm:text-2xl text-white leading-snug">
                {g.t}
              </span>
              <ArrowUpRight className="w-5 h-5 text-white/25 group-hover:text-white transition-colors" />
            </motion.li>
          ))}
        </ul>
      </Chapter>

      {/* ════════════════ 05 · PAQUETES ════════════════ */}
      <Chapter
        n={isRegional || isNacional ? '05' : '04'}
        kicker={es ? 'Inversión' : 'Investment'}
        title={
          <>
            {es ? 'Tres formas de subir ' : 'Three ways to climb '}
            <span className="font-display-italic text-white/55">
              {es ? 'al kart.' : 'on board.'}
            </span>
          </>
        }
        intro={
          es
            ? 'Paquetes pensados para entrar a tu ritmo. Todos incluyen el trabajo de Netpro: diseño, contenido y campañas.'
            : 'Packages designed to start at your own pace. All of them include Netpro work: design, content and campaigns.'
        }
      >
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {[
            {
              name: es ? 'Colaborador' : 'Collaborator',
              tier: '01',
              features: [
                es ? 'Mención en la web oficial' : 'Mention on the official website',
                es ? 'Contenido en RRSS para resubir' : 'Social content to repost',
              ],
            },
            {
              name: 'Sponsor',
              tier: '02',
              featured: true,
              features: [
                es ? 'Todo lo del nivel anterior' : 'Everything from the previous tier',
                es ? 'Logo en piezas gráficas Netpro' : 'Logo in Netpro graphics',
                es ? 'Contenido propio en RRSS' : 'Own content on social',
                es ? 'Opción a campañas Meta / TikTok Ads' : 'Optional Meta / TikTok Ads campaigns',
              ],
            },
            {
              name: es ? 'Patrocinador Principal' : 'Main Sponsor',
              tier: '03',
              features: [
                es ? 'Todo lo del nivel Sponsor' : 'Everything from Sponsor tier',
                es ? 'Logo en kart y mono' : 'Logo on kart and race suit',
                es ? 'Campaña digital 360 con Netpro' : '360 digital campaign with Netpro',
                es ? 'Diseño gráfico personalizado' : 'Custom graphic design',
                es ? 'Presencia en eventos y reportajes' : 'Presence at events and features',
              ],
            },
          ].map((pkg, i) => (
            <motion.div
              key={pkg.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-black p-8 sm:p-10 flex flex-col ${
                pkg.featured ? 'lg:-translate-y-3' : ''
              }`}
            >
              {pkg.featured && (
                <span className="absolute top-0 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.3em] py-2 bg-white text-black">
                  {es ? 'Recomendado' : 'Recommended'}
                </span>
              )}
              <div className={`flex items-baseline justify-between ${pkg.featured ? 'mt-6' : ''}`}>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  {es ? 'Nivel' : 'Tier'} {pkg.tier}
                </span>
                <span className="font-display text-5xl text-white/10">{pkg.tier}</span>
              </div>
              <h3 className="font-display text-3xl text-white mt-4 mb-8 tracking-tight">
                {pkg.name}
              </h3>
              <ul className="space-y-3 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Chapter>

      {/* ════════════════ 06 · CASCO ════════════════ */}
      <Chapter
        n={isRegional || isNacional ? '06' : '05'}
        kicker={es ? 'Co-creación' : 'Co-creation'}
        title={
          <>
            {es ? 'Tu marca, ' : 'Your brand, '}
            <span className="font-display-italic text-white/55">
              {es ? 'en mi casco.' : 'on my helmet.'}
            </span>
          </>
        }
        intro={
          es
            ? 'Como Patrocinador Principal, diseñamos juntos un casco único. Lo dibuja Netpro contigo y se convierte en pieza de comunicación durante toda la temporada.'
            : 'As Main Sponsor, we design a unique helmet together. Netpro draws it with you and it becomes a communication asset all season long.'
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden">
              <img
                src={helmetExample}
                alt={es ? 'Ejemplo de casco personalizado' : 'Custom helmet example'}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {es ? 'Referencia visual' : 'Visual reference'}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="border-l-2 border-white pl-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-2">
                01
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {es
                  ? 'Brief inicial: colores, valores y posición visual de tu marca.'
                  : 'Initial brief: colors, values and visual position of your brand.'}
              </p>
            </div>
            <div className="border-l-2 border-white/40 pl-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-2">
                02
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {es
                  ? 'Diseño 3D por Netpro: 2 rondas de ajuste hasta el “sí”.'
                  : '3D design by Netpro: 2 rounds of tuning until the “yes”.'}
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-2">
                03
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {es
                  ? 'Producción, reveal en RRSS y uso en cada GP de la temporada.'
                  : 'Production, social reveal and use at every GP of the season.'}
              </p>
            </div>
            <p className="text-white/35 text-xs italic pt-2">
              {es
                ? '* Imagen de referencia: casco de Benjamin Mañach, amigo de Rubén.'
                : '* Reference image: helmet of Benjamin Mañach, friend of Rubén.'}
            </p>
          </div>
        </motion.div>
      </Chapter>

      {/* ════════════════ 07 · CONTACTO ════════════════ */}
      <section className="relative px-5 sm:px-10 md:px-16 py-24 sm:py-32 border-t border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">
                {isRegional || isNacional ? '07' : '06'} —{' '}
                {es ? 'Hablemos' : 'Let’s talk'}
              </span>
              <h2 className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.03em] text-white">
                {es ? '¿Lo subimos ' : 'Shall we put it '}
                <span className="font-display-italic text-gradient-mono-italic">
                  {es ? 'al kart?' : 'on the kart?'}
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-white/60 leading-relaxed">
                {es
                  ? 'Si ya estás pensando dónde encajaría tu marca, mejor lo hablamos. Cuéntame qué quieres conseguir y Netpro y yo te preparamos una propuesta a medida.'
                  : 'If you are already picturing where your brand would fit, let’s talk. Tell me what you want to achieve and Netpro and I will prepare a custom proposal.'}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:flex-col gap-3">
              <Link to={getRoute('contact')} className="flex-1">
                <Button className="w-full rounded-none h-14 bg-white text-black hover:bg-white/85 gap-2 font-mono text-[11px] uppercase tracking-[0.25em] justify-between px-6">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {es ? 'Contactar' : 'Contact'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://www.instagram.com/rubenmunooz._"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-none h-14 border-white/25 bg-transparent text-white hover:bg-white hover:text-black gap-2 font-mono text-[11px] uppercase tracking-[0.25em] justify-between px-6"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ COLOFÓN ════════════════ */}
      <footer className="px-5 sm:px-10 md:px-16 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
          <span>Rubén Muñoz © 2026 · {es ? 'Documento confidencial' : 'Confidential document'}</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            {es ? 'Diseñado y producido por Netpro' : 'Designed and produced by Netpro'}
          </span>
        </div>
      </footer>
    </div>
  );
}

// Keep references used by previous build
void Target;
void TrendingUp;
