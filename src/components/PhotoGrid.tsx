import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import image1 from '@/assets/figma/placeholder.svg';
import image2 from '@/assets/figma/placeholder.svg';
import image3 from '@/assets/figma/placeholder.svg';
import image4 from '@/assets/figma/placeholder.svg';
import image5 from '@/assets/figma/placeholder.svg';
import image6 from '@/assets/figma/placeholder.svg';

const defaultPhotos = [
  {
    id: 1,
    src: image1,
    alt: 'Rubén Muñoz en el kart',
    tall: true,
  },
  {
    id: 2,
    src: image2,
    alt: 'Karting en pista',
    tall: false,
  },
  {
    id: 3,
    src: image3,
    alt: 'Rubén en el garaje',
    tall: true,
  },
  {
    id: 4,
    src: image4,
    alt: 'Competición en pista',
    tall: false,
  },
  {
    id: 5,
    src: image5,
    alt: 'Preparación del kart',
    tall: true,
  },
  {
    id: 6,
    src: image6,
    alt: 'Kart número 50 en circuito',
    tall: false,
  },
];

type Photo = { id: number; src: string; alt: string; tall: boolean };

export function PhotoGrid({ photos: photosProp }: { photos?: Photo[] } = {}) {
  const photos: Photo[] = photosProp ?? defaultPhotos;
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setSelectedPhoto(photo.id)}
              onHoverEnd={() => setSelectedPhoto(null)}
              className="group relative aspect-square overflow-hidden bg-white/5 rounded-2xl cursor-pointer border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <motion.div
                animate={{
                  scale: selectedPhoto === photo.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedPhoto === photo.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white">{photo.alt}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}