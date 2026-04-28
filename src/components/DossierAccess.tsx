import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, FileText, MapPin, Globe, Flag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface DossierAccessProps {
  onAccess: (version: 'regional' | 'nacional' | 'internacional') => void;
}

export function DossierAccess({ onAccess }: DossierAccessProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedVersion, setUnlockedVersion] = useState<null | 'regional' | 'nacional' | 'internacional'>(null);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || isLoading) return;
    setError('');
    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('verify-dossier', {
        body: { password },
      });

      // Edge function returns 401 (treated as fnError by SDK) for wrong password.
      // We rely on data?.success when present; otherwise fall back to error message.
      if (data?.success && data?.version) {
        const v = data.version as 'regional' | 'nacional' | 'internacional';
        setUnlockedVersion(v);
        // Brief celebratory pause before transitioning
        setTimeout(() => onAccess(v), 700);
        return;
      }

      setError(language === 'es' ? 'Contraseña incorrecta' : 'Incorrect password');
      setIsLoading(false);
    } catch {
      setError(language === 'es' ? 'Error de conexión' : 'Connection error');
      setIsLoading(false);
    }
  };

  const tiers = [
    {
      key: 'regional',
      icon: MapPin,
      label: language === 'es' ? 'Regional' : 'Regional',
      desc: language === 'es' ? 'Patrocinadores locales' : 'Local sponsors',
    },
    {
      key: 'nacional',
      icon: Flag,
      label: language === 'es' ? 'Nacional' : 'National',
      desc: language === 'es' ? 'Patrocinadores nacionales' : 'National sponsors',
    },
    {
      key: 'internacional',
      icon: Globe,
      label: language === 'es' ? 'Internacional' : 'International',
      desc: language === 'es' ? 'Patrocinadores internacionales' : 'International sponsors',
    },
  ] as const;

  return (
    <div className="min-h-screen bg-black text-white pt-28 sm:pt-32 pb-20 px-5 sm:px-10 md:px-16 relative overflow-hidden">
      {/* Editorial grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40 mb-8"
        >
          <span className="font-mono text-white">N° 00</span>
          <span className="h-px w-10 bg-white/20" />
          <span>{language === 'es' ? 'Acceso restringido' : 'Restricted access'}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left — Title + tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1] tracking-tight mb-6">
              {language === 'es' ? (
                <>
                  Dossier <span className="font-display-italic text-gradient-mono-italic">privado</span>.
                </>
              ) : (
                <>
                  Private <span className="font-display-italic text-gradient-mono-italic">dossier</span>.
                </>
              )}
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-12">
              {language === 'es'
                ? 'Documento confidencial con información de patrocinio. Introduce la contraseña que has recibido por correo para desbloquear la versión correspondiente.'
                : 'Confidential document with sponsorship information. Enter the password sent to you via email to unlock the matching version.'}
            </p>

            {/* Versions list */}
            <div className="border-t border-white/10">
              {tiers.map((tier, idx) => {
                const Icon = tier.icon;
                const active = unlockedVersion === tier.key;
                return (
                  <div
                    key={tier.key}
                    className={`flex items-center justify-between gap-4 py-5 border-b border-white/10 transition-colors ${
                      active ? 'bg-white/[0.03]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-[11px] text-white/40 w-8">
                        0{idx + 1}
                      </span>
                      <div className="p-2 rounded-full border border-white/15 bg-white/[0.04]">
                        <Icon className="w-4 h-4 text-white/80" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium tracking-tight">
                          {tier.label}
                        </p>
                        <p className="text-white/45 text-xs">{tier.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                        active
                          ? 'border-white/60 text-white bg-white/10'
                          : 'border-white/15 text-white/40'
                      }`}
                    >
                      {active
                        ? language === 'es' ? 'Desbloqueado' : 'Unlocked'
                        : language === 'es' ? 'Bloqueado' : 'Locked'}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Access card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-xl p-7 sm:p-9 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />

              <div className="relative flex items-center gap-3 mb-7">
                <div className="p-2.5 rounded-xl border border-white/15 bg-white/[0.05]">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
                    {language === 'es' ? 'Acceso seguro' : 'Secure access'}
                  </p>
                  <p className="text-white text-sm font-medium">
                    {language === 'es' ? 'Introduce tu contraseña' : 'Enter your password'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder={language === 'es' ? 'Contraseña' : 'Password'}
                    autoFocus
                    disabled={isLoading || !!unlockedVersion}
                    className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/15 rounded-full text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all disabled:opacity-60"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-center text-[12px] uppercase tracking-[0.18em] text-white/70 font-mono"
                    >
                      — {error} —
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!password || isLoading || !!unlockedVersion}
                  className="group w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                  ) : unlockedVersion ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      {language === 'es' ? 'Acceso concedido' : 'Access granted'}
                    </>
                  ) : (
                    <>
                      {language === 'es' ? 'Acceder al dossier' : 'Access dossier'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {language === 'es'
                    ? 'Verificación cifrada · 10 intentos / minuto'
                    : 'Encrypted verification · 10 attempts / minute'}
                </span>
              </div>
            </div>

            <p className="text-center text-white/35 text-[11px] mt-5 uppercase tracking-[0.18em] font-mono">
              {language === 'es' ? '¿No tienes contraseña? Escríbeme' : 'No password? Email me'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
