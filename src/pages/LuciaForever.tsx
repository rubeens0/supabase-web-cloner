import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function LuciaForever() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(meta);

    const prevTitle = document.title;
    document.title = '·';

    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400/30 pointer-events-none"
          initial={{ y: '110vh', x: `${10 + i * 11}%`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 12 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.8,
            ease: 'linear',
          }}
        >
          <Heart className="w-5 h-5" fill="currentColor" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="p-5 rounded-full border border-rose-300/30 bg-rose-500/10 backdrop-blur-sm"
          >
            <Heart className="w-8 h-8 text-rose-300" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/40 mb-8"
        >
          — Para Lucía, de Rubén —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-10"
        >
          Lucía, <span className="font-display-italic text-gradient-mono-italic">te quiero</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/75 text-lg sm:text-xl md:text-2xl leading-relaxed font-light max-w-2xl mx-auto"
        >
          Y si puedes confiar en algo, es en{' '}
          <span className="font-display-italic text-white">el proceso</span> que nos une
          y nos va a llevar a cualquier sitio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-14 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
        >
          R · &nbsp;∞&nbsp; · L
        </motion.p>
      </div>
    </div>
  );
}
