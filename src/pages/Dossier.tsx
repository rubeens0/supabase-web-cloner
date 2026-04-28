import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DossierAccess } from '../components/DossierAccess';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FileText, 
  Trophy, 
  Users, 
  TrendingUp, 
  Target, 
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Download,
  ChevronRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import kartImage1 from '@/assets/figma/placeholder.svg';
import kartImage2 from '@/assets/figma/placeholder.svg';
import kartImage3 from '@/assets/figma/placeholder.svg';
import helmetExample from '@/assets/custom-helmet.jpg';

type DossierVersion = 'regional' | 'nacional' | 'internacional' | null;

export function Dossier() {
  const [version, setVersion] = useState<DossierVersion>(null);
  const { language, getRoute } = useLanguage();

  useEffect(() => {
    // Prevent search engine indexing of the dossier page
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
  const isInternacional = version === 'internacional';

  // Get version label and icon
  const getVersionInfo = () => {
    if (isRegional) {
      return {
        label: language === 'es' ? 'Dossier Regional 2026' : 'Regional Dossier 2026',
        icon: MapPin,
        location: 'Cáceres, Extremadura'
      };
    }
    if (isNacional) {
      return {
        label: language === 'es' ? 'Dossier Nacional 2026' : 'National Dossier 2026',
        icon: MapPin,
        location: 'España'
      };
    }
    return {
        label: language === 'es' ? 'Dossier Internacional 2026' : 'International Dossier 2026',
        icon: Globe,
        location: language === 'es' ? 'Internacional' : 'International'
      };
  };

  const versionInfo = getVersionInfo();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ============== 01 · HEADER ============== */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={kartImage2} alt="Karting background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-10 md:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40"
          >
            <span className="font-mono text-white">N° 01</span>
            <span className="h-px w-8 bg-white/15" />
            <versionInfo.icon className="w-3.5 h-3.5" />
            <span>{versionInfo.label}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-display leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
          >
            {language === 'es' ? (
              <>
                Dossier de <span className="font-display-italic text-gradient-mono-italic">Patrocinio</span>
                <span className="text-white/40">.</span>
              </>
            ) : (
              <>
                Sponsorship <span className="font-display-italic text-gradient-mono-italic">Dossier</span>
                <span className="text-white/40">.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {language === 'es'
              ? 'Rubén Muñoz - Piloto de Karting & Especialista en Marketing Digital'
              : 'Rubén Muñoz - Karting Driver & Digital Marketing Specialist'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link to={getRoute('/')}>
              <Button className="rounded-full h-12 px-7 bg-white text-black hover:bg-white/90 gap-2">
                <Globe className="w-4 h-4" />
                {language === 'es' ? 'Visitar Página Web' : 'Visit Website'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => {
                const aboutSection = document.querySelector('section.py-12');
                aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="rounded-full h-12 px-7 border-white/20 bg-transparent text-white hover:bg-white hover:text-black hover:border-white gap-2"
            >
              <FileText className="w-4 h-4" />
              {language === 'es' ? 'Seguir Viendo el Dossier' : 'Continue Viewing Dossier'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-white mb-4 text-center">
              {language === 'es' ? 'Sobre el Piloto' : 'About the Driver'}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-white/5 via-black to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-white/10 group-hover:to-white/10 rounded-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 mb-4 bg-gradient-to-br from-white/20 to-white/20 rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    {language === 'es' ? 'Trayectoria Deportiva' : 'Sports Career'}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {language === 'es' 
                      ? 'Piloto de karting desde 2023. En mi primer año gané la carrera de resistencia en las Karting Series de Extremadura, demostrando desde el inicio mi capacidad competitiva y velocidad.'
                      : 'Karting driver since 2023. In my first year I won the endurance race at the Karting Series of Extremadura, demonstrating from the beginning my competitive ability and speed.'}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'es' 
                      ? 'En 2024 me proclamé Campeón de Extremadura sin necesidad de correr todas las pruebas puntuables. En 2025 di el salto al Campeonato de España con muy buenas sensaciones y gran velocidad.'
                      : 'In 2024 I became Champion of Extremadura without needing to race all the scoring rounds. In 2025 I made the jump to the Spanish Championship with very good feelings and great speed.'}
                  </p>
                </div>
              </div>

              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-white/5 via-black to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(185,28,28,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-white/10 group-hover:to-white/10 rounded-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 mb-4 bg-gradient-to-br from-white/20 to-white/20 rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    {language === 'es' ? 'Objetivos 2026' : '2026 Goals'}
                  </h3>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>{language === 'es' ? 'Consolidar mi posición en el Campeonato de España' : 'Consolidate my position in the Spanish Championship'}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>{language === 'es' ? 'Conseguir mejores resultados y podios' : 'Achieve better results and podiums'}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>{language === 'es' ? 'Rendimiento y presencia' : 'Performance and presence'}</span>
                    </li>
                    {isRegional && (
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span>{language === 'es' ? 'Representar a Extremadura a nivel nacional' : 'Represent Extremadura at national level'}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-white/5 via-black to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-white/10 group-hover:to-white/10 rounded-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 mb-4 bg-gradient-to-br from-white/20 to-white/20 rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    {language === 'es' ? 'Valor Diferencial' : 'Unique Value'}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'es' 
                      ? 'Especialista en marketing digital con experiencia en gestión de redes sociales, diseño gráfico y publicidad en Meta Ads y TikTok Ads. Capacidad única de aportar visibilidad digital profesional a los patrocinadores.'
                      : 'Digital marketing specialist with experience in social media management, graphic design, and advertising on Meta Ads and TikTok Ads. Unique ability to provide professional digital visibility to sponsors.'}
                  </p>
                </div>
              </div>

              <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-white/5 via-black to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-white/10 group-hover:to-white/10 rounded-3xl transition-all duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 mb-4 bg-gradient-to-br from-white/20 to-white/20 rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    {language === 'es' ? 'Alcance Digital' : 'Digital Reach'}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'es' 
                      ? 'Presencia activa en redes sociales con contenido regular de carreras, entrenamientos y contenido técnico. Engagement creciente con la comunidad del motor.'
                      : 'Active social media presence with regular content from races, training, and technical content. Growing engagement with the motorsport community.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Regional Info (only for Extremadura version) */}
      {isRegional && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white mb-3">
                    {language === 'es' ? 'Referencia del Deporte del Motor en Extremadura' : 'Motorsport Reference in Extremadura'}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {language === 'es' 
                      ? 'Como la referencia del deporte del motor en Extremadura, represento a la región en competiciones nacionales. Mi trayectoria desde Cáceres demuestra que el talento extremeño puede competir al más alto nivel.'
                      : 'As the motorsport reference in Extremadura, I represent the region in national competitions. My trajectory from Cáceres demonstrates that Extremadura talent can compete at the highest level.'}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'es' 
                      ? 'Los patrocinadores regionales obtienen visibilidad especial en medios locales, eventos deportivos y una conexión directa con la comunidad extremeña del motor, además de formar parte del crecimiento de un piloto con proyección nacional e internacional.'
                      : 'Regional sponsors get special visibility in local media, sporting events, and direct connection with the Extremadura motorsport community, while being part of the growth of a driver with national and international projection.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {language === 'es' ? 'Campeón Regional 2024' : 'Regional Champion 2024'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {language === 'es' ? 'Piloto Extremeño #1' : 'Extremadura Driver #1'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* National Info (only for National version) */}
      {isNacional && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white mb-3">
                    {language === 'es' ? 'Proyecto de Representación Nacional' : 'National Representation Project'}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {language === 'es' 
                      ? 'Compitiendo en el Campeonato de España de Karting, represento los valores del deporte del motor español por todo el territorio nacional. Llevamos nuestra marca por toda España.'
                      : 'Competing in the Spanish Karting Championship, I represent the values of Spanish motorsport throughout the national territory. We take our brand all over Spain.'}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {language === 'es' 
                      ? 'Los patrocinadores nacionales obtienen visibilidad en cada ronda del campeonato, presencia en medios deportivos de todo el país, y la oportunidad de asociarse con un piloto joven que representa el futuro del automovilismo español. Además, gracias a las campañas de redes sociales que desarrollo personalmente, tu marca puede tener representación en cualquier parte de España y más allá, con pruebas del Campeonato de España en: Valencia, Andalucía, Aragón y toda la geografía nacional.'
                      : 'National sponsors get visibility at each championship round, presence in sports media across the country, and the opportunity to associate with a young driver who represents the future of Spanish motorsport. Additionally, thanks to the social media campaigns I personally develop, your brand can have representation anywhere in Spain and beyond, with Spanish Championship races in: Valencia, Andalusia, Aragon, and throughout the entire national territory.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                  <Trophy className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {language === 'es' ? 'Campeonato de España 2025-2026' : 'Spanish Championship 2025-2026'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {language === 'es' ? 'Visibilidad en Toda España' : 'Visibility Across Spain'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {language === 'es' ? 'Piloto Nacional Emergente' : 'Emerging National Driver'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Achievements Timeline (for Regional and National versions) */}
      {(isRegional || isNacional) && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={kartImage1} 
              alt="Karting action" 
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black" />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-white mb-4 text-center">
                {language === 'es' ? 'Historial de Logros' : 'Achievement History'}
              </h2>
              <p className="text-white/60 text-center max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Una trayectoria meteórica desde 2023 con resultados sobresalientes'
                  : 'A meteoric trajectory since 2023 with outstanding results'}
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* 2023 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 sm:p-8 bg-gradient-to-r from-white/10 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-white text-2xl font-bold">2023</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-white" />
                      {language === 'es' ? 'Primer Año - Victoria en Resistencia' : 'First Year - Endurance Victory'}
                    </h3>
                    <p className="text-white/70 mb-3">
                      {language === 'es' 
                        ? 'Inicio como piloto de karting. Victoria en la carrera de resistencia de las Karting Series de Extremadura en mi temporada debut.'
                        : 'Started as a karting driver. Victory in the endurance race at the Karting Series of Extremadura in my debut season.'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                      <Star className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {language === 'es' ? '1ª Victoria' : '1st Victory'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2024 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative p-6 sm:p-8 bg-gradient-to-r from-white/10 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl hover:border-white/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-white text-2xl font-bold">2024</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-white" />
                      {language === 'es' ? 'Campeón de Extremadura' : 'Extremadura Champion'}
                    </h3>
                    <p className="text-white/70 mb-3">
                      {language === 'es' 
                        ? 'Proclamado Campeón de Extremadura de Karting sin necesidad de correr todas las pruebas puntuables, demostrando dominio absoluto en la categoría regional.'
                        : 'Crowned Extremadura Karting Champion without needing to race all scoring rounds, demonstrating absolute dominance in the regional category.'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {language === 'es' ? 'Campeón Regional' : 'Regional Champion'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2025 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-6 sm:p-8 bg-gradient-to-r from-white/10 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl hover:border-white/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-white text-2xl font-bold">2025</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-white" />
                      {language === 'es' ? 'Salto al Campeonato de España' : 'Jump to Spanish Championship'}
                    </h3>
                    <p className="text-white/70 mb-3">
                      {language === 'es' 
                        ? 'Debut en el Campeonato de España de Karting con muy buenas sensaciones y demostrando gran velocidad. Adaptación exitosa al nivel nacional con rendimiento competitivo.'
                        : 'Debut in the Spanish Karting Championship with very good feelings and showing great speed. Successful adaptation to national level with competitive performance.'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {language === 'es' ? 'Nivel Nacional' : 'National Level'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2026 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative p-6 sm:p-8 bg-gradient-to-r from-white/10 to-black/10 backdrop-blur-xl border border-white/30 rounded-3xl hover:border-white/50 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                      <span className="text-white text-2xl font-bold">2026</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-white" />
                      {language === 'es' ? 'Temporada de Consolidación' : 'Consolidation Season'}
                    </h3>
                    <p className="text-white/70 mb-3">
                      {language === 'es' 
                        ? 'Esperaremos una temporada consolidándonos en el Campeonato de España y conseguir participar en alguna prueba internacional, en la disciplina más competitiva del deporte del motor: el karting. Con el aprendizaje de 2025 y el apoyo adecuado, esperamos una temporada llena de podios y victorias.'
                        : 'We will aim for a season consolidating ourselves in the Spanish Championship and participating in some international race, in the most competitive discipline of motorsport: karting. With the learning from 2025 and the right support, we expect a season full of podiums and victories.'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">
                          {language === 'es' ? 'Objetivo: Podios' : 'Goal: Podiums'}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                        <Globe className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">
                          {language === 'es' ? 'Prueba Internacional' : 'International Race'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsorship Packages */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">
              {language === 'es' ? 'Paquetes de Patrocinio' : 'Sponsorship Packages'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Opciones flexibles adaptadas a diferentes niveles de inversión'
                : 'Flexible options adapted to different investment levels'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: language === 'es' ? 'Colaborador' : 'Collaborator',
                color: 'from-white/20 to-white/20',
                borderColor: 'border-white/30',
                features: [
                  language === 'es' ? 'Mención en la página web' : 'Mention on website',
                  language === 'es' ? 'Contenido en redes sociales para resubir' : 'Social media content to repost',
                ]
              },
              {
                name: language === 'es' ? 'Sponsor' : 'Sponsor',
                color: 'from-gray-300/20 to-gray-500/20',
                borderColor: 'border-gray-400/30',
                featured: true,
                features: [
                  language === 'es' ? 'Todo lo incluido en Colaborador' : 'Everything in Collaborator',
                  language === 'es' ? 'Contenido en RRSS' : 'Social media content',
                  language === 'es' ? 'Logos en diseños de redes sociales' : 'Logos in social media designs',
                  language === 'es' ? 'Posibilidad de hacer anuncios en redes sociales' : 'Option to run social media ads',
                ]
              },
              {
                name: language === 'es' ? 'Patrocinador Principal' : 'Main Sponsor',
                color: 'from-white/20 to-white/20',
                borderColor: 'border-white/30',
                features: [
                  language === 'es' ? 'Todo lo incluido en Sponsor' : 'Everything in Sponsor',
                  language === 'es' ? 'Logo en el kart y Mono' : 'Logo on kart and Suit',
                  language === 'es' ? 'Campaña digital 360' : '360 digital campaign',
                  language === 'es' ? 'Presencia en eventos' : 'Presence at events',
                  language === 'es' ? 'Reconocimiento en el perfil de Instagram' : 'Recognition on Instagram profile',
                  language === 'es' ? 'Diseños gráficos personalizados' : 'Custom graphic designs',
                ]
              },
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative p-8 bg-white/5 backdrop-blur-xl border ${pkg.borderColor} rounded-3xl hover:bg-white/10 transition-all duration-300 ${pkg.featured ? 'md:scale-105' : ''}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-white to-white rounded-full">
                    <p className="text-white text-sm font-medium">
                      {language === 'es' ? 'Más Popular' : 'Most Popular'}
                    </p>
                  </div>
                )}
                
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center`}>
                  <Star className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-white mb-6">{pkg.name}</h3>

                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70">
                      <ChevronRight className="w-4 h-4 mt-1 text-white flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Helmet Design - Main Sponsor Benefit */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">
              {language === 'es' ? 'Diseño de Casco Personalizado' : 'Custom Helmet Design'}
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto leading-relaxed">
              {language === 'es' 
                ? 'Como Patrocinador Principal, tienes la posibilidad de colaborar con el diseño de un casco completamente personalizado como el siguiente ejemplo:'
                : 'As Main Sponsor, you have the opportunity to collaborate on the design of a completely custom helmet like the following example:'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden">
              <img 
                src={helmetExample} 
                alt="Custom helmet design example" 
                className="w-full h-auto rounded-2xl"
              />
              
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                <p className="text-white/50 text-sm text-center italic">
                  {language === 'es' 
                    ? '*Disclaimer: Foto de Benjamin Mañach, gran amigo de Rubén Muñoz'
                    : '*Disclaimer: Photo of Benjamin Mañach, great friend of Rubén Muñoz'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-black border-t border-white/10 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={kartImage3} 
            alt="Karting racing" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6">
              {language === 'es' ? '¿Quieres aparecer en mi página web y en mis redes sociales?' : 'Want to appear on my website and social media?'}
            </h2>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              {language === 'es' 
                ? '¡Trabaja conmigo!'
                : 'Work with me!'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={getRoute('contact')}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 px-8"
                  >
                    <Mail className="w-5 h-5" />
                    {language === 'es' ? 'Contactar' : 'Contact'}
                  </Button>
                </motion.div>
              </Link>

              <motion.a
                href="https://www.instagram.com/rubenmunooz._"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-transparent backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300 px-8"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 px-4 sm:px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-white/40 text-sm">
          <p>
            {language === 'es' 
              ? 'Contenido confidencial con acceso limitado'
              : 'Confidential content with limited access'}
          </p>
          <p className="mt-2">Rubén Muñoz © 2026</p>
        </div>
      </section>
    </div>
  );
}