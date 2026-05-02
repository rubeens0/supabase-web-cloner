import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-black border-t border-white/10 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center items-center">
        <motion.a
          href="https://www.instagram.com/rubenmunooz._"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors duration-300">
            <Instagram className="w-5 h-5" />
          </div>
          <span className="text-sm">@rubenmunooz._</span>
        </motion.a>
      </div>
    </motion.footer>
  );
}
