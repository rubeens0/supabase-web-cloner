import { Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from '@/assets/contact-bg.jpg';

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-white">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

export function Contact() {
  const { t } = useLanguage();

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const channels = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'contacto@rubenmunoz.com',
      href: 'mailto:contacto@rubenmunoz.com',
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.info.locationValue'),
      href: undefined as string | undefined,
    },
    {
      icon: Instagram,
      label: t('contact.info.instagram'),
      value: '@rubenmunooz._',
      href: 'https://www.instagram.com/rubenmunooz._',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      <div className="relative z-10">
        {/* ============== 01 · HERO ============== */}
        <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-5 sm:px-10 md:px-16 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeIn(0.1)}>
              <SectionLabel index="N° 01">Contact</SectionLabel>
            </motion.div>
            <motion.h1
              {...fadeIn(0.2)}
              className="mt-8 font-display leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em] max-w-5xl"
            >
              {t('contact.title').split(' ').map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="font-display-italic text-gradient-mono-italic">
                    {word}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
              <span className="text-white/40">.</span>
            </motion.h1>
            <motion.p
              {...fadeIn(0.3)}
              className="mt-8 text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* ============== 02 · CHANNELS ============== */}
        <section className="px-5 sm:px-10 md:px-16 py-20 sm:py-28">
          <div className="max-w-5xl mx-auto">
            <SectionLabel index="02">{t('contact.info.title')}</SectionLabel>

            <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {channels.map((c, i) => {
                const idx = String(i + 1).padStart(2, '0');
                const inner = (
                  <div className="grid grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 items-center group">
                    <div className="col-span-2 sm:col-span-1 font-mono text-[11px] text-white/40">
                      {idx}
                    </div>
                    <div className="col-span-10 sm:col-span-3 flex items-center gap-3 text-white/60">
                      <c.icon className="w-4 h-4" />
                      <span className="text-[11px] uppercase tracking-[0.22em]">{c.label}</span>
                    </div>
                    <div className="col-span-12 sm:col-span-7 font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight break-all sm:break-normal group-hover:translate-x-1 transition-transform">
                      {c.value}
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex justify-end">
                      {c.href && (
                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
