import { motion } from 'motion/react';
import { useMemo } from 'react';
import logoWhite from '@/assets/logo-white-optimized.png';
import { getPerformanceSettings } from '../utils/performanceDetector';

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 100, className = '' }: AnimatedLogoProps) {
  const perfSettings = getPerformanceSettings();

  // Memoize style to prevent recalculations
  const containerStyle = useMemo(() => ({ 
    width: size, 
    height: size,
    minWidth: size,
    minHeight: size
  }), [size]);

  // Simplified animations for low-end devices
  if (perfSettings.simplifyAnimations) {
    return (
      <div
        className={`${className} relative flex-shrink-0`}
        style={containerStyle}
      >
        <img
          src={logoWhite}
          alt="Rubén Muñoz Logo"
          className="w-full h-full object-contain drop-shadow-2xl relative z-10 transition-all duration-400"
          style={{ filter: 'brightness(0) invert(1)' }}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${className} relative flex-shrink-0`}
      style={containerStyle}
    >
      <motion.img
        whileHover={{ 
          scale: 1.15,
          rotate: 360,
        }}
        animate={{
          filter: 'brightness(0) invert(1)',
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        src={logoWhite}
        alt="Rubén Muñoz Logo"
        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
        style={{ willChange: 'transform, filter' }}
        loading="eager"
      />
    </motion.div>
  );
}
