/**
 * Configuración del fin de semana de carrera en directo.
 *
 * Cómo usarlo:
 *  - Pon `isLive = true` durante el fin de semana de carrera para activar:
 *      · Banner superior en la Navigation
 *      · Enlace "Directo CEK" en el Hero de Home
 *      · Sección "LIVE CEK BANNER" en Home
 *      · Página /live-timing-streaming en modo directo (iframes activos)
 *  - Pon `isLive = false` entre carreras para mostrar el modo "próxima carrera"
 *    y ocultar todos los CTAs de directo.
 *
 * Las configuraciones de carreras pasadas se conservan abajo para reusar URLs,
 * títulos y formato cuando vuelva a tocar Aragón u otra ronda.
 */

export type RaceConfig = {
  round: string;
  circuit: string;
  city: string;
  datesEs: string;
  datesEn: string;
  liveTimingUrl: string;
  youtubeStreamUrl: string;
  officialResultsUrl: string;
};

// ============================================================
// ESTADO ACTUAL — cambiar isLive a true cuando arranque la carrera
// ============================================================
export const LIVE_RACE_ACTIVE = false;

// Próxima carrera: Valencia (Chiva / Kotarr Karting Valencia)
export const NEXT_RACE: RaceConfig = {
  round: 'R3',
  circuit: 'Circuito Internacional Lucas Guerrero',
  city: 'Chiva, Valencia',
  datesEs: 'Próximamente — Valencia 2026',
  datesEn: 'Coming soon — Valencia 2026',
  // Pendiente de confirmar por la organización (RGMMC / Apex Timing)
  liveTimingUrl: '',
  youtubeStreamUrl: '',
  officialResultsUrl: '',
};

// La carrera "activa" que consumen los componentes. Mientras LIVE_RACE_ACTIVE
// sea false, esto solo se usa como placeholder; los CTAs quedan ocultos.
export const CURRENT_RACE: RaceConfig = NEXT_RACE;

// ============================================================
// HISTÓRICO — preservado para reactivar rápidamente
// ============================================================
export const RACE_ARAGON_R2: RaceConfig = {
  round: 'R2',
  circuit: 'Motorland Aragón',
  city: 'Alcañiz, Teruel',
  datesEs: '15-17 Mayo 2026',
  datesEn: 'May 15-17, 2026',
  liveTimingUrl: 'https://www.apex-timing.com/live-timing/rgmmc2/index.html',
  youtubeStreamUrl: 'https://www.youtube.com/embed/NxQ09q278wo',
  officialResultsUrl:
    'https://www.apex-timing.com/goracing/results.php?path=/rgmmc/2026/cek_2_motorland/&group=6',
};
