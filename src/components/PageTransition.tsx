import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { getPerformanceSettings, PREMIUM_ANIMATIONS } from '../utils/performanceDetector';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const perfSettings = getPerformanceSettings();
  
  // Use simpler animations for low-end devices
  if (perfSettings.simplifyAnimations) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: PREMIUM_ANIMATIONS.duration.instant }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: PREMIUM_ANIMATIONS.duration.normal,
        ease: PREMIUM_ANIMATIONS.ease.premium,
      }}
    >
      {children}
    </motion.div>
  );
}