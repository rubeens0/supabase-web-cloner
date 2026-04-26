/**
 * Performance Detector Utility
 * Detects device capabilities and returns optimization settings
 */

export interface PerformanceSettings {
  reducedMotion: boolean;
  disableBlur: boolean;
  simplifyAnimations: boolean;
  disableParallax: boolean;
  reducedQuality: boolean;
}

// Premium animation configurations
export const PREMIUM_ANIMATIONS = {
  // Easing curves - smooth and premium feel
  ease: {
    smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
    premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
    snappy: [0.4, 0, 0.2, 1] as [number, number, number, number],
    gentle: [0.33, 1, 0.68, 1] as [number, number, number, number],
  },
  // Durations - consistent timing
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.5,
    slow: 0.7,
    verySlow: 1.0,
  },
  // Stagger delays
  stagger: {
    tight: 0.05,
    normal: 0.1,
    relaxed: 0.15,
  },
};

export function detectPerformance(): PerformanceSettings {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Detect low-end device indicators
  const isLowEndDevice = detectLowEndDevice();
  
  // Detect problematic browsers
  const isEdgeLegacy = /Edge\/\d+/.test(navigator.userAgent);
  const isIE = /MSIE|Trident/.test(navigator.userAgent);
  
  // Check hardware concurrency (CPU cores)
  const lowCPU = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
  
  // Check device memory (if available)
  const lowMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false;
  
  const shouldOptimize = isLowEndDevice || isEdgeLegacy || isIE || lowCPU || lowMemory || prefersReducedMotion;
  
  return {
    reducedMotion: prefersReducedMotion,
    disableBlur: shouldOptimize,
    simplifyAnimations: shouldOptimize,
    disableParallax: shouldOptimize,
    reducedQuality: isLowEndDevice || lowMemory,
  };
}

function detectLowEndDevice(): boolean {
  // Check for low-end device indicators
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for common low-end device patterns
  const isLowEndMobile = /android.+mobile|windows phone/i.test(userAgent) && 
                         !/high|plus|pro|max|ultra/i.test(userAgent);
  
  // Check connection type (if available)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  // Check if GPU is software-rendered (WebGL test)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  let isSoftwareRendered = false;
  
  if (gl) {
    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      isSoftwareRendered = /software|llvmpipe|swiftshader/i.test(renderer);
    }
  }
  
  return isLowEndMobile || slowConnection || isSoftwareRendered;
}

export function setupPerformanceOptimizations(): PerformanceSettings {
  const settings = detectPerformance();
  
  // Apply global CSS optimizations for low-end devices
  if (settings.disableBlur) {
    document.documentElement.style.setProperty('--blur-amount', '0px');
    document.documentElement.style.setProperty('--saturate-amount', '100%');
  }
  
  // Disable transitions for reduced motion
  if (settings.reducedMotion) {
    document.documentElement.style.setProperty('--transition-duration', '0s');
  }
  
  // Add performance class to body for CSS targeting
  if (settings.simplifyAnimations) {
    document.body.classList.add('low-performance');
  }
  
  // Store settings in sessionStorage for quick access
  sessionStorage.setItem('performanceSettings', JSON.stringify(settings));
  
  // Log performance mode for debugging
  console.log('Performance mode:', settings.simplifyAnimations ? 'Optimized' : 'Full');
  
  return settings;
}

export function getPerformanceSettings(): PerformanceSettings {
  const stored = sessionStorage.getItem('performanceSettings');
  if (stored) {
    return JSON.parse(stored);
  }
  return setupPerformanceOptimizations();
}