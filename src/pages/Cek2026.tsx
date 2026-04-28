import { motion } from 'motion/react';
import { MapPin, Calendar, Flag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import campillosImage from '@/assets/figma/placeholder.svg';
import motorlandImage from '@/assets/figma/placeholder.svg';
import lucasGuerreroImage from '@/assets/figma/placeholder.svg';
import asparImage from '@/assets/figma/placeholder.svg';
import dbMotorsportLogo from '@/assets/figma/placeholder.svg';
import parolinLogo from '@/assets/figma/placeholder.svg';
import sponsorsImage from '@/assets/sponsors-2026.png';

// Placeholder data for the 4 circuits
const circuits = [
  {
    id: 1,
    name: "Circuito de Campillos",
    location: "Málaga, España",
    date: "20 - 22 Marzo 2026",
    image: campillosImage,
    length: "1.580 m",
    turns: "16"
  },
  {
    id: 2,
    name: "MotorLand Aragón",
    location: "Alcañiz, España",
    date: "15 - 17 Mayo 2026",
    image: motorlandImage,
    length: "1.671 m",
    turns: "19"
  },
  {
    id: 3,
    name: "Kartódromo Lucas Guerrero",
    location: "Chiva, Valencia",
    date: "19 - 21 Junio 2026",
    image: lucasGuerreroImage,
    length: "1.428 m",
    turns: "17",
    imageClass: "object-bottom"
  },
  {
    id: 4,
    name: "Aspar Circuit",
    location: "Guadassuar, Valencia",
    date: "25 - 27 Septiembre 2026",
    image: asparImage,
    length: "1.431 m",
    turns: "18"
  }
];

export function Cek2026() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-white/50 tracking-[0.2em] uppercase text-sm mb-4 block">
            {language === 'es' ? 'TEMPORADA' : 'SEASON'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            CEK 2026
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            {language === 'es' 
              ? 'Campeonato de España de Karting. Listos para comenzar nuestro segundo año...'
              : 'Spanish Karting Championship. Ready to start our second year...'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {circuits.map((circuit, index) => (
            <motion.div
              key={circuit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500"
            >
              {/* Circuit Image/Map Container */}
              <div className="aspect-[16/9] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                <motion.img 
                  src={circuit.image} 
                  alt={circuit.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${circuit.imageClass || ''}`}
                  whileHover={{ scale: 1.05 }}
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold mb-2">{circuit.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{circuit.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{circuit.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Longitud</span>
                    <span className="font-mono text-lg">{circuit.length}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Curvas</span>
                    <span className="font-mono text-lg">{circuit.turns}</span>
                  </div>
                </div>
                
                <div className="px-4 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="font-bold text-sm">RND {circuit.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 flex flex-col items-center gap-8"
        >
          <p className="text-xl md:text-2xl text-white/90 text-center font-light">
            {language === 'es' 
              ? 'Compitiendo de la mano de DB Motorsport, con su material Parolin'
              : 'Competing with DB Motorsport, using Parolin material'}
          </p>
          
          <div className="relative w-full max-w-3xl mx-auto py-12 flex justify-center items-center">
            <div className="relative z-10 flex items-center gap-8 md:gap-12">
              <a
                href="https://www.parolinspain.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={dbMotorsportLogo} 
                  alt="DB Motorsport" 
                  className="h-12 md:h-16 object-contain"
                />
              </a>
              <a 
                href="https://www.parolinspain.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={parolinLogo} 
                  alt="Parolin Spain" 
                  className="h-10 md:h-14 object-contain"
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Sponsors Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {language === 'es' ? 'Patrocinadores 2026' : 'Sponsors 2026'}
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all duration-300"
          >
            <img 
              src={sponsorsImage} 
              alt={language === 'es' ? 'Patrocinadores 2026 - Rubén Muñoz' : 'Sponsors 2026 - Rubén Muñoz'} 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10">
            <span className="px-4 py-2 block text-sm text-white/50">
              {language === 'es' 
                ? 'Calendario provisional sujeto a cambios por la RFEDA'
                : 'Provisional calendar subject to changes by RFEDA'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}