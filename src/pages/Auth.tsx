import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Loader2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useLanguage } from '@/contexts/LanguageContext';

type Mode = 'signin' | 'signup';

export function Auth() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isES = language === 'es';
  const [mode, setMode] = useState<Mode>('signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/', { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/', { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(isES ? 'No se pudo iniciar sesión con Google' : 'Could not sign in with Google');
      setGoogleLoading(false);
      return;
    }
    if (result.redirected) return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!email || !password) return;

    if (mode === 'signup') {
      if (!firstName.trim() || !lastName.trim()) {
        toast.error(isES ? 'Introduce tu nombre y apellido' : 'Enter your first and last name');
        return;
      }
      if (password.length < 6) {
        toast.error(isES ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        toast.error(isES ? 'Las contraseñas no coinciden' : 'Passwords do not match');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: `${firstName.trim()} ${lastName.trim()}`,
            },
          },
        });
        if (error) throw error;
        toast.success(
          isES
            ? 'Revisa tu correo para confirmar tu cuenta.'
            : 'Check your inbox to confirm your account.',
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 sm:pt-32 pb-20 px-5 sm:px-10 md:px-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40 mb-8"
        >
          <span className="font-mono text-white">N° 00</span>
          <span className="h-px w-10 bg-white/20" />
          <span>{isES ? 'Acceso' : 'Access'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl leading-[1] tracking-tight mb-3"
        >
          {mode === 'signin' ? (
            isES ? <>Iniciar <span className="font-display-italic text-gradient-mono-italic">sesión</span>.</> : <>Sign <span className="font-display-italic text-gradient-mono-italic">in</span>.</>
          ) : (
            isES ? <>Crear <span className="font-display-italic text-gradient-mono-italic">cuenta</span>.</> : <>Create <span className="font-display-italic text-gradient-mono-italic">account</span>.</>
          )}
        </motion.h1>

        <p className="text-white/55 text-sm mb-10">
          {mode === 'signin'
            ? isES ? 'Bienvenido de nuevo. Accede con tu cuenta.' : 'Welcome back. Access your account.'
            : isES ? 'Crea una cuenta en menos de un minuto.' : 'Create an account in less than a minute.'}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent backdrop-blur-xl p-7 sm:p-9 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="relative w-full flex items-center justify-center gap-3 py-3.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            )}
            {isES ? 'Continuar con Google' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
              {isES ? 'o' : 'or'}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isES ? 'Correo electrónico' : 'Email'}
                required
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/15 rounded-full text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all disabled:opacity-60"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isES ? 'Contraseña' : 'Password'}
                required
                minLength={6}
                disabled={loading}
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/15 rounded-full text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={!email || !password || loading || googleLoading}
              className="group w-full flex items-center justify-center gap-2 py-3.5 bg-white/10 border border-white/20 text-white rounded-full font-medium text-sm hover:bg-white/15 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === 'signin'
                    ? isES ? 'Iniciar sesión' : 'Sign in'
                    : isES ? 'Crear cuenta' : 'Create account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-[12px] text-white/55 hover:text-white transition-colors"
            >
              {mode === 'signin'
                ? isES ? '¿No tienes cuenta? Crea una' : "Don't have an account? Sign up"
                : isES ? '¿Ya tienes cuenta? Inicia sesión' : 'Already have an account? Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
