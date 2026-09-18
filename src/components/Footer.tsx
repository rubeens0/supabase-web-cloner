import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border/10 bg-background py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">© 2026 Rubén Muñoz · Cáceres</p>
        <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/business" className="transition-colors hover:text-foreground">Negocio</Link>
          <Link to="/booking" className="transition-colors hover:text-foreground">Booking</Link>
          <Link to="/contacto" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
            Contacto <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
