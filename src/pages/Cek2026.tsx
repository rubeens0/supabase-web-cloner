import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import campillosImage from '@/assets/circuito-campillos.jpg';
import motorlandImage from '@/assets/motorland-aragon.png';
import lucasGuerreroImage from '@/assets/lucas-guerrero.jpg';
import asparImage from '@/assets/aspar-circuit.jpg';
import dbMotorsportLogo from '@/assets/db-motorsport-logo.png';
import parolinLogo from '@/assets/parolin-logo.png';
import sponsorsImage from '@/assets/sponsors-2026.png';

const circuits = [
  {
    id: 1,
    name: 'Circuito de Campillos',
    location: 'Málaga, España',
    date: '20 - 22 Marzo 2026',
    image: campillosImage,
    length: '1.580 m',
    turns: '16',
  },
  {
    id: 2,
    name: 'MotorLand Aragón',
    location: 'Alcañiz, España',
    date: '15 - 17 Mayo 2026',
    image: motorlandImage,
    length: '1.671 m',
    turns: '19',
  },
  {
    id: 3,
    name: 'Kartódromo Lucas Guerrero',
    location: 'Chiva, Valencia',
    date: '19 - 21 Junio 2026',
    image: lucasGuerreroImage,
    length: '1.428 m',
    turns: '17',
    imageClass: 'object-bottom',
  },
  {
    id: 4,
    name: 'Aspar Circuit',
    location: 'Guadassuar, Valencia',
    date: '25 - 27 Septiembre 2026',
    image: asparImage,
    length: '1.431 m',
    turns: '18',
  },
];

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-white">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Cek2026() {
  const { language } = useLanguage();

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HERO ============== */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-10 md:px-16 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn(0.1)}>
            <SectionLabel index="N° 01">{language === 'es' ? 'Temporada' : 'Season'}</SectionLabel>
          </motion.div>
          <motion.h1
            {...fadeIn(0.2)}
            className="mt-8 font-display leading-[0.95] text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] text-white tracking-[-0.03em]"
          >
            CEK <span className="font-display-italic text-gradient-mono-italic">2026</span>
            <span className="text-white/40">.</span>
          </motion.h1>
          <motion.p
            {...fadeIn(0.3)}
            className="mt-8 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {language === 'es'
              ? 'Campeonato de España de Karting. Listos para comenzar nuestro segundo año...'
              : 'Spanish Karting Championship. Ready to start our second year...'}
          </motion.p>
        </div>
      </section>

      {/* ============== 02 · ROUNDS ============== */}
      <section className="px-5 sm:px-10 md:px-16 py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02">{language === 'es' ? 'Calendario' : 'Calendar'}</SectionLabel>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {circuits.map((circuit, index) => (
              <motion.article
                key={circuit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                  <img
                    src={circuit.image}
                    alt={circuit.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${circuit.imageClass || ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                    RND {String(circuit.id).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
                    {circuit.name}
                  </h3>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{circuit.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{circuit.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pt-4 border-t border-white/[0.08]">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">
                        {language === 'es' ? 'Longitud' : 'Length'}
                      </div>
                      <div className="font-display text-2xl text-white">{circuit.length}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">
                        {language === 'es' ? 'Curvas' : 'Turns'}
                      </div>
                      <div className="font-display text-2xl text-white">{circuit.turns}</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div {...fadeIn(0.2)} className="mt-10 text-center">
            <div className="inline-block px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03]">
              <span className="text-xs sm:text-sm text-white/55">
                {language === 'es'
                  ? 'Calendario provisional sujeto a cambios por la RFEDA'
                  : 'Provisional calendar subject to changes by RFEDA'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== 03 · TEAM ============== */}
      <section className="px-5 sm:px-10 md:px-16 py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="03">Team</SectionLabel>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight max-w-3xl">
            {language === 'es' ? (
              <>
                Compitiendo de la mano de{' '}
                <span className="font-display-italic text-gradient-mono-italic">DB Motorsport</span>, con material{' '}
                <span className="font-display-italic text-gradient-mono-italic">Parolin</span>.
              </>
            ) : (
              <>
                Competing with{' '}
                <span className="font-display-italic text-gradient-mono-italic">DB Motorsport</span>, using{' '}
                <span className="font-display-italic text-gradient-mono-italic">Parolin</span> material.
              </>
            )}
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-10 sm:gap-16 justify-center sm:justify-start">
            <a
              href="https://www.parolinspain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={dbMotorsportLogo} alt="DB Motorsport" className="h-12 md:h-16 object-contain" />
            </a>
            <a
              href="https://www.parolinspain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={parolinLogo} alt="Parolin Spain" className="h-10 md:h-14 object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* ============== 04 · SPONSORS ============== */}
      <section className="px-5 sm:px-10 md:px-16 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel index="04">{language === 'es' ? 'Patrocinadores' : 'Sponsors'}</SectionLabel>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                {language === 'es' ? (
                  <>
                    Patrocinadores <span className="font-display-italic text-gradient-mono-italic">2026</span>
                  </>
                ) : (
                  <>
                    Sponsors <span className="font-display-italic text-gradient-mono-italic">2026</span>
                  </>
                )}
              </h2>
            </div>
            <a
              href="/patrocinadores"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {language === 'es' ? 'Ver todos' : 'View all'} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <motion.div
            {...fadeIn(0.1)}
            className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 transition-colors"
          >
            <img
              src={sponsorsImage}
              alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
