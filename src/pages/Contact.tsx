import { ContactForm } from '../components/ContactForm';
import { Mail, MapPin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedLogo } from '../components/AnimatedLogo';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from 'figma:asset/0426a6d7e63179c8d1c84954c2b86e602965f70c.png';

export function Contact() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-black pt-20 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <AnimatedLogo size={60} className="mx-auto mb-4 sm:mb-6" />
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-white"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 max-w-2xl mx-auto px-4"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-full"
              >
                <h2 className="mb-6 sm:mb-8 text-white">{t('contact.info.title')}</h2>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-3 bg-white/5 rounded-xl flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 mb-1">{t('contact.info.email')}</p>
                      <a 
                        href="mailto:contacto@rubenmunoz.com" 
                        className="text-white hover:text-white/80 transition-colors break-all"
                      >
                        contacto@rubenmunoz.com
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-3 bg-white/5 rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 mb-1">{t('contact.info.location')}</p>
                      <p className="text-white">{t('contact.info.locationValue')}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-3 bg-white/5 rounded-xl flex-shrink-0">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 mb-1">{t('contact.info.instagram')}</p>
                      <a 
                        href="https://www.instagram.com/rubenmunooz._" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white/80 transition-colors break-all"
                      >
                        @rubenmunooz._
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-full"
              >
                <h2 className="mb-6 sm:mb-8 text-white">{t('contact.form.title')}</h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}