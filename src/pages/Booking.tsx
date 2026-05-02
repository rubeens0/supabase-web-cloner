import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Trophy, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function Booking() {
  const { language } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const links = [
    {
      to: '/business',
      icon: Briefcase,
      label: language === 'es' ? 'Business & Marketing' : 'Business & Marketing',
    },
    {
      to: language === 'es' ? '/patrocinadores' : '/sponsors',
      icon: Trophy,
      label: language === 'es' ? 'Patrocinio Deportivo' : 'Sports Sponsorship',
    },
    {
      to: '/blog',
      icon: BookOpen,
      label: 'Blog',
    },
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-10">
        {/* Header */}
        <motion.div {...fadeIn()} className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05] tracking-tight mb-4">
            {language === 'es' ? 'Agenda una llamada' : 'Book a call'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {language === 'es'
              ? 'Elige el horario que mejor te convenga y hablamos.'
              : 'Pick a time that works for you and let\'s talk.'}
          </p>
        </motion.div>

        {/* Calendly Embed */}
        <motion.div {...fadeIn(0.1)} className="mb-16">
          <div
            className="calendly-inline-widget rounded-2xl overflow-hidden border border-white/[0.08]"
            data-url="https://calendly.com/rubenmunooz/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div {...fadeIn(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button
                variant="outline"
                className="rounded-full h-12 px-6 border-white/20 bg-transparent text-foreground hover:bg-white hover:text-black hover:border-white gap-2 min-w-[200px]"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
