import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-6">
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
    </footer>
  );
}
