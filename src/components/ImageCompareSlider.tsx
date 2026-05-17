import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoX from '@/assets/logo-x-black.png';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  initial?: number; // 0-100
  className?: string;
};

/**
 * Slider de comparación de imágenes estilo "antes/después".
 * Arrastra el divisor (o mueve el ratón / dedo) para revelar la segunda foto.
 */
export function ImageCompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = '',
  afterAlt = '',
  initial = 50,
  className = '',
}: Props) {
  const [pos, setPos] = useState(initial);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(next);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = '';
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [updateFromClientX]);

  const startDrag = (e: React.PointerEvent) => {
    draggingRef.current = true;
    document.body.style.userSelect = 'none';
    updateFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none touch-none ${className}`}
      onPointerDown={startDrag}
    >
      {/* Imagen base (después) */}
      <ImageWithFallback
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Imagen superior recortada (antes) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <ImageWithFallback
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Etiquetas */}
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 text-[10px] uppercase tracking-[0.22em] text-white/85 font-mono pointer-events-none">
        01
      </div>
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 text-[10px] uppercase tracking-[0.22em] text-white/85 font-mono pointer-events-none">
        02
      </div>

      {/* Línea divisoria */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_18px_rgba(255,255,255,0.45)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <motion.button
        type="button"
        aria-label="Arrastra para comparar"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.stopPropagation();
          startDrag(e);
        }}
        whileTap={{ scale: 0.92 }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-white/70"
        style={{ left: `${pos}%` }}
      >
        <img src={logoX} alt="" className="h-6 w-6 object-contain pointer-events-none" draggable={false} />
      </motion.button>
    </div>
  );
}
