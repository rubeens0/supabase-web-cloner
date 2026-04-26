import { useState, useEffect } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DesignCarouselProps {
  works: { image: string; title: string }[];
}

export function DesignCarousel({ works }: DesignCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoRotating, works.length]);

  const goToPrevious = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? works.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === works.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      // Swipe right - go to previous
      goToPrevious();
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - go to next
      goToNext();
    }
    
    setIsDragging(false);
  };

  const getItemStyle = (index: number) => {
    let diff = index - currentIndex;
    
    if (diff > works.length / 2) {
      diff -= works.length;
    } else if (diff < -works.length / 2) {
      diff += works.length;
    }
    
    const angle = (diff * 360) / works.length;
    const isActive = index === currentIndex;
    
    return {
      transform: `rotateY(${angle}deg) translateZ(${isActive ? '320px' : '280px'}) scale(${isActive ? '1' : '0.85'})`,
      opacity: isActive ? 1 : 0.4,
      zIndex: isActive ? 10 : 1,
    };
  };

  return (
    <div className="relative w-full mx-auto py-8 sm:py-12 overflow-hidden">
      {/* 3D Carousel Container */}
      <motion.div 
        className="relative h-[240px] sm:h-[320px] md:h-[450px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {/* Inner 3D Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          {works.map((work, index) => (
            <motion.div
              key={index}
              className="absolute cursor-pointer pointer-events-auto"
              style={{
                transformStyle: 'preserve-3d',
                ...getItemStyle(index),
              }}
              animate={isDragging ? false : getItemStyle(index)}
              transition={{ duration: isDragging ? 0 : 1.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => goToSlide(index)}
            >
              <div className="w-[180px] sm:w-[280px] md:w-[360px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={work.image}
                  alt={work.title}
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
        {works.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white shadow-lg'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Current Title */}
      <div className="text-center mt-6 sm:mt-8 md:mt-12 px-4">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/70 text-sm sm:text-base"
        >
          {works[currentIndex].title}
        </motion.p>
      </div>
    </div>
  );
}