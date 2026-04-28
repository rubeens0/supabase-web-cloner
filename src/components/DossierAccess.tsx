import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, FileText, MapPin, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import logoImage from '@/assets/figma/placeholder.svg';

interface DossierAccessProps {
  onAccess: (version: 'regional' | 'nacional' | 'internacional') => void;
}

export function DossierAccess({ onAccess }: DossierAccessProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('verify-dossier', {
        body: { password },
      });

      if (fnError || !data?.success) {
        setError(language === 'es' ? 'Contraseña incorrecta' : 'Incorrect password');
        setIsLoading(false);
        return;
      }

      onAccess(data.version as 'regional' | 'nacional' | 'internacional');
    } catch {
      setError(language === 'es' ? 'Error de conexión' : 'Connection error');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Logo Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img 
          src={logoImage} 
          alt="Logo" 
          className="w-[600px] h-auto opacity-5"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-red-800/20 to-black/20 blur-2xl" />
              <div className="relative p-4 bg-white/10 rounded-2xl border border-white/20">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-white mb-2">
              {language === 'es' ? 'Acceso al Dossier' : 'Dossier Access'}
            </h2>
            <p className="text-white/60">
              {language === 'es' 
                ? 'Introduce la contraseña para acceder al dossier de patrocinio. Para obtener la contraseña, contacta directamente por correo electrónico.'
                : 'Enter the password to access the sponsorship dossier. To obtain the password, contact directly via email.'}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Lock className="w-5 h-5 text-white/40" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder={language === 'es' ? 'Contraseña' : 'Password'}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!password || isLoading}
              className="w-full py-6 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                language === 'es' ? 'Acceder al Dossier' : 'Access Dossier'
              )}
            </Button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  {language === 'es' 
                    ? 'Versión Regional: Información específica para patrocinadores regionales'
                    : 'Regional Version: Specific information for regional sponsors'}
                </p>
              </div>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  {language === 'es' 
                    ? 'Versión Nacional: Información para patrocinadores a nivel nacional'
                    : 'National Version: Information for national sponsors'}
                </p>
              </div>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  {language === 'es' 
                    ? 'Versión Internacional: Información para patrocinadores a nivel internacional'
                    : 'International Version: Information for international sponsors'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Privacy Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          {language === 'es' 
            ? 'Contenido confidencial con acceso limitado'
            : 'Confidential content with limited access'}
        </motion.p>
      </motion.div>
    </div>
  );
}