import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import logoWhite from '@/assets/figma/placeholder.svg';
import { getPerformanceSettings } from '../utils/performanceDetector';

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 100, className = '' }: AnimatedLogoProps) {
  const [isInverted, setIsInverted] = useState(false);
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
        className={`${className} cursor-pointer relative flex-shrink-0`}
        style={containerStyle}
        onClick={() => setIsInverted(!isInverted)}
      >
        <div
          className="absolute inset-0 rounded-full transition-colors duration-400"
          style={{ 
            margin: '-10%', 
            width: '120%', 
            height: '120%',
            backgroundColor: isInverted ? '#ffffff' : 'rgba(255, 255, 255, 0)'
          }}
        />
        <img
          src={logoWhite}
          alt="Rubén Muñoz Logo"
          className="w-full h-full object-contain drop-shadow-2xl relative z-10 transition-all duration-400"
          style={{ 
            filter: isInverted ? 'brightness(0) invert(0)' : 'brightness(0) invert(1)'
          }}
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
      className={`${className} cursor-pointer relative flex-shrink-0`}
      style={containerStyle}
      onClick={() => setIsInverted(!isInverted)}
    >
      <motion.div
        animate={{ 
          backgroundColor: isInverted ? '#ffffff' : 'rgba(255, 255, 255, 0)',
          scale: isInverted ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-full"
        style={{ margin: '-10%', width: '120%', height: '120%', willChange: 'transform, background-color' }}
      />
      <motion.img
        whileHover={{ 
          scale: 1.15,
          rotate: 360,
        }}
        animate={{
          filter: isInverted ? 'brightness(0) invert(0)' : 'brightness(0) invert(1)',
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