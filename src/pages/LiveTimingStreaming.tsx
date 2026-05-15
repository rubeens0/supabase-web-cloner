import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, Youtube, Maximize2, X, ExternalLink, RefreshCw, ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useState, useEffect, useRef } from 'react';

export function LiveTimingStreaming() {
  const { language } = useLanguage();
  const [expandedView, setExpandedView] = useState<'timing' | 'stream' | null>(null);
  const [timingOpen, setTimingOpen] = useState(true);
  const [streamOpen, setStreamOpen] = useState(true);
  const timingIframeRef = useRef<HTMLIFrameElement>(null);
  const streamIframeRef = useRef<HTMLIFrameElement>(null);
  const [timingKey, setTimingKey] = useState(0);
  const [streamKey, setStreamKey] = useState(0);

  // URLs configurables - actualizar cuando estén disponibles
  const liveTimingUrl = 'https://www.apex-timing.com/live-timing/rgmmc2/index.html'; // URL del live timing a integrar
  const youtubeStreamUrl = 'https://www.youtube.com/embed/moln-t94bwA'; // Stream CEK R2 Motorland
  const officialResultsUrl = 'https://www.apex-timing.com/goracing/results.php?path=/rgmmc/2026/cek_2_motorland/&group=6';

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedView) {
        setExpandedView(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedView]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (expandedView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedView]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-40 pb-12 px-4 md:px-10">
      <SEO 
        title={language === 'es' 
          ? 'Directo CEK - Live Timing y Streaming | Rubén Muñoz' 
          : 'CEK Live - Live Timing and Streaming | Rubén Muñoz'}
        description={language === 'es' 
          ? 'Sigue en directo las sesiones del Campeonato de España de Karting. Live timing y streaming en vivo de las carreras de Rubén Muñoz.'
          : 'Follow live sessions from the Spanish Karting Championship. Live timing and streaming of Rubén Muñoz races.'}
        keywords={language === 'es'
          ? 'directo CEK, live timing karting, streaming karting España, CEK en vivo, campeonato españa karting directo, tiempos en vivo karting'
          : 'CEK live, karting live timing, karting streaming Spain, CEK live stream, spanish karting championship live, live karting times'}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-14"
        >
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/40 mb-4 sm:mb-6">
            <span className="font-mono text-white">N° 01</span>
            <span className="h-px w-6 sm:w-8 bg-white/15" />
            <span>{language === 'es' ? 'Directo' : 'Live'}</span>
          </div>
          <h1 className="font-display leading-[0.92] text-[40px] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-white tracking-[-0.02em]">
            {language === 'es' ? 'Directo' : 'Live'} <span className="font-display-italic text-gradient-mono-italic">CEK 2026</span>
            <span className="text-white/40">.</span>
          </h1>
          <p className="mt-5 sm:mt-8 text-white/60 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            {language === 'es' 
              ? 'Ronda 2 — Motorland Aragón • 15-17 Mayo 2026'
              : 'Round 2 — Motorland Aragón • May 15-17, 2026'}
          </p>
        </motion.div>

        {/* Friday training schedule */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 md:mb-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <div className="p-4 md:p-5 border-b border-white/10 bg-gradient-to-r from-white/[0.07] to-transparent flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-bold leading-tight">
                {language === 'es' ? 'Entrenos del viernes' : 'Friday practice'}
              </h2>
              <p className="text-white/50 text-xs mt-0.5">
                {language === 'es' ? 'Rubén Muñoz · Grupo Par' : 'Rubén Muñoz · Even Group'}
              </p>
            </div>
          </div>
          <div className="p-3 md:p-6 flex md:grid md:grid-cols-5 gap-2.5 md:gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-1 px-1 md:mx-0 md:px-6">
            {['9:30', '11:15', '13:00', '15:15', '17:00'].map((time, i) => (
              <div
                key={time}
                className="snap-center shrink-0 w-[31%] md:w-auto flex flex-col items-center justify-center rounded-xl bg-black/40 border border-white/10 py-3.5 md:py-4 px-3 hover:border-white/25 transition-colors"
              >
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                  {language === 'es' ? `S${i + 1}` : `S${i + 1}`}
                </span>
                <span className="font-mono text-xl md:text-3xl font-bold text-white">{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Live Timing Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setTimingOpen((o) => !o)}
              aria-expanded={timingOpen}
              aria-controls="timing-panel"
              className="w-full p-4 md:p-5 border-b border-white/10 bg-gradient-to-r from-white/[0.07] to-transparent hover:from-white/[0.1] active:bg-white/[0.05] transition-colors text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg md:text-xl font-bold leading-tight">Live Timing</h2>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-[10px] font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <p className="text-white/50 text-xs mt-0.5 truncate">
                      {language === 'es' ? 'Tiempos en directo de la sesión' : 'Live session times'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  {liveTimingUrl && timingOpen && (
                    <>
                      <button
                        type="button"
                        onClick={() => setTimingKey((k) => k + 1)}
                        className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all text-xs font-medium"
                        aria-label={language === 'es' ? 'Recargar live timing' : 'Reload live timing'}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{language === 'es' ? 'Recargar' : 'Reload'}</span>
                      </button>
                      <a
                        href={liveTimingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all text-xs font-medium"
                        aria-label={language === 'es' ? 'Abrir en nueva pestaña' : 'Open in new tab'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{language === 'es' ? 'Abrir' : 'Open'}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setExpandedView('timing')}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-black hover:bg-white/90 active:scale-95 transition-all text-xs font-bold"
                        aria-label={language === 'es' ? 'Ampliar live timing' : 'Expand live timing'}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{language === 'es' ? 'Ampliar' : 'Expand'}</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setTimingOpen((o) => !o)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-95 transition-all"
                    aria-label={timingOpen ? (language === 'es' ? 'Cerrar' : 'Close') : (language === 'es' ? 'Abrir' : 'Open')}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${timingOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {timingOpen && (
                <motion.div
                  id="timing-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="h-[500px] md:h-[600px] lg:h-[680px] bg-black/50 flex items-center justify-center relative">
                    {liveTimingUrl ? (
                      <iframe
                        key={timingKey}
                        ref={timingIframeRef}
                        src={liveTimingUrl}
                        className="w-full h-full"
                        title={language === 'es' ? 'Live Timing CEK' : 'CEK Live Timing'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-center p-6 md:p-8">
                        <Clock className="w-12 h-12 md:w-16 md:h-16 text-white/20 mx-auto mb-3 md:mb-4" />
                        <p className="text-white/70 text-sm md:text-base">
                          {language === 'es' 
                            ? 'Live timing disponible durante las sesiones'
                            : 'Live timing available during sessions'}
                        </p>
                        <p className="text-white/60 text-xs md:text-sm mt-2">
                          {language === 'es' 
                            ? 'Próxima sesión: Por confirmar'
                            : 'Next session: To be confirmed'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* YouTube Stream Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setStreamOpen((o) => !o)}
              aria-expanded={streamOpen}
              aria-controls="stream-panel"
              className="w-full p-4 md:p-5 border-b border-white/10 bg-gradient-to-r from-white/[0.07] to-transparent hover:from-white/[0.1] active:bg-white/[0.05] transition-colors text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Youtube className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg md:text-xl font-bold leading-tight">
                        {language === 'es' ? 'Streaming' : 'Streaming'}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-[10px] font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <p className="text-white/50 text-xs mt-0.5 truncate">
                      {language === 'es' ? 'Directo de la carrera en YouTube' : 'Race live stream on YouTube'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  {youtubeStreamUrl && streamOpen && (
                    <>
                      <button
                        type="button"
                        onClick={() => setStreamKey((k) => k + 1)}
                        className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all text-xs font-medium"
                        aria-label={language === 'es' ? 'Recargar streaming' : 'Reload streaming'}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{language === 'es' ? 'Recargar' : 'Reload'}</span>
                      </button>
                      <a
                        href="https://www.youtube.com/live/moln-t94bwA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all text-xs font-medium"
                        aria-label={language === 'es' ? 'Ver en YouTube' : 'Watch on YouTube'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">YouTube</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setExpandedView('stream')}
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-black hover:bg-white/90 active:scale-95 transition-all text-xs font-bold"
                        aria-label={language === 'es' ? 'Ampliar streaming' : 'Expand streaming'}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">{language === 'es' ? 'Ampliar' : 'Expand'}</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setStreamOpen((o) => !o)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-95 transition-all"
                    aria-label={streamOpen ? (language === 'es' ? 'Cerrar' : 'Close') : (language === 'es' ? 'Abrir' : 'Open')}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${streamOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {streamOpen && (
                <motion.div
                  id="stream-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="h-[500px] md:h-[600px] lg:h-[680px] bg-black/50 flex items-center justify-center relative">
                    {youtubeStreamUrl ? (
                      <iframe
                        key={streamKey}
                        ref={streamIframeRef}
                        src={youtubeStreamUrl}
                        className="w-full h-full"
                        title={language === 'es' ? 'Stream CEK en YouTube' : 'CEK YouTube Stream'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-center p-6 md:p-8">
                        <Youtube className="w-12 h-12 md:w-16 md:h-16 text-white/20 mx-auto mb-3 md:mb-4" />
                        <p className="text-white/70 text-sm md:text-base">
                          {language === 'es' 
                            ? 'Streaming disponible durante las carreras'
                            : 'Streaming available during races'}
                        </p>
                        <p className="text-white/60 text-xs md:text-sm mt-2">
                          {language === 'es' 
                            ? 'El directo comenzará cuando inicie la sesión'
                            : 'Stream will start when the session begins'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 md:mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">
            {language === 'es' ? 'Información' : 'Information'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
            <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs md:text-sm mb-1">
                {language === 'es' ? 'Carrera' : 'Race'}
              </p>
              <p className="font-bold text-sm md:text-base">Motorland R2</p>
              <p className="text-white/60 text-xs md:text-sm">15-17 May</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs md:text-sm mb-1">
                {language === 'es' ? 'Circuito' : 'Circuit'}
              </p>
              <p className="font-bold text-sm md:text-base">Motorland Aragón</p>
              <p className="text-white/60 text-xs md:text-sm">1.699m</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs md:text-sm mb-1">
                {language === 'es' ? 'Categoría' : 'Category'}
              </p>
              <p className="font-bold text-sm md:text-base">Senior</p>
              <p className="text-white/60 text-xs md:text-sm">CEK</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/50 text-xs md:text-sm mb-1">
                {language === 'es' ? 'Equipo' : 'Team'}
              </p>
              <p className="font-bold text-sm md:text-base">DB Motorsport</p>
              <p className="text-white/60 text-xs md:text-sm">Parolin</p>
            </div>
          </div>
        </motion.div>

        {/* Results Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 md:mt-8 text-center"
        >
          <a
            href={officialResultsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-mono border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 text-black font-bold text-base md:text-lg shadow-lg shadow-black/50"
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>{language === 'es' ? 'Ver Resultados Oficiales' : 'View Official Results'}</span>
          </a>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 md:mt-8 text-center"
        >
          <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10">
            <span className="px-3 md:px-4 py-1.5 md:py-2 block text-xs md:text-sm text-white/50">
              {language === 'es' 
                ? 'Actualiza la página si el contenido no se carga'
                : 'Refresh if content doesn\'t load'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {expandedView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={() => setExpandedView(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full h-full max-w-[98vw] md:max-w-[95vw] max-h-[95vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedView(null)}
                className="absolute -top-2 right-0 md:-top-12 md:right-0 min-w-[44px] min-h-[44px] p-2 md:p-3 rounded-lg bg-white/20 border border-white/30 hover:bg-white/30 active:scale-95 transition-all z-10 flex items-center justify-center"
                title={language === 'es' ? 'Cerrar' : 'Close'}
                aria-label={language === 'es' ? 'Cerrar pantalla completa' : 'Close fullscreen'}
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Modal Header */}
              <div className="mb-2 md:mb-4 flex items-center gap-2 md:gap-3">
                {expandedView === 'timing' ? (
                  <>
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <h3 id="modal-title" className="text-lg md:text-2xl font-bold">
                      {language === 'es' ? 'Live Timing' : 'Live Timing'}
                    </h3>
                  </>
                ) : (
                  <>
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <h3 id="modal-title" className="text-lg md:text-2xl font-bold">
                      {language === 'es' ? 'Streaming en Vivo' : 'Live Streaming'}
                    </h3>
                  </>
                )}
              </div>

              {/* Expanded Content */}
              <div className="w-full h-[calc(100%-40px)] md:h-[calc(100%-60px)] bg-white/5 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden">
                {expandedView === 'timing' && liveTimingUrl && (
                  <iframe
                    src={liveTimingUrl}
                    className="w-full h-full"
                    title={language === 'es' ? 'Live Timing CEK - Pantalla Completa' : 'CEK Live Timing - Full Screen'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {expandedView === 'stream' && youtubeStreamUrl && (
                  <iframe
                    src={youtubeStreamUrl}
                    className="w-full h-full"
                    title={language === 'es' ? 'Stream CEK en YouTube - Pantalla Completa' : 'CEK YouTube Stream - Full Screen'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}