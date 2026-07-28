import { Star } from "lucide-react";

/**
 * Reseñas verificadas del perfil de Google de
 * "Oeste Cáceres - Energía y Conectividad".
 *
 * Para añadir o actualizar reseñas: copia el texto tal cual aparece en Google
 * y añádelo a este array (nombre, iniciales, estrellas, fecha y texto).
 */
export type GoogleReview = {
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
};

export const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/rSwNNkDH61NxKa8QA";
export const GOOGLE_RATING = 4.4;

export const GOOGLE_REVIEWS: GoogleReview[] = [];

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-[#DCD5E2] text-[#DCD5E2]"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.46-9.9l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function GoogleReviews() {
  return (
    <section className="max-w-[660px] mx-auto px-5 my-11">
      <p
        className="uppercase tracking-[0.14em] text-[#702479] font-bold text-sm mb-2.5"
        style={{ fontFamily: '"Archivo"' }}
      >
        Reseñas verificadas
      </p>
      <h2
        className="font-extrabold mb-6"
        style={{ fontFamily: '"Archivo"', fontSize: "clamp(1.7rem,6.5vw,2.2rem)" }}
      >
        Lo que dicen los clientes en Google
      </h2>

      <div className="bg-white border-2 border-[#DCD5E2] rounded-xl p-5 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <GoogleG size={28} />
          <div>
            <p className="font-extrabold text-[22px] leading-none" style={{ fontFamily: '"Archivo"' }}>
              {GOOGLE_RATING.toString().replace(".", ",")}
              <span className="text-[#4A4353] font-normal text-base"> / 5</span>
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Stars rating={GOOGLE_RATING} />
              <span className="text-[#4A4353] text-sm">Oeste Cáceres</span>
            </div>
          </div>
        </div>
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-bold text-[15px] text-white"
          style={{ fontFamily: '"Archivo"', background: "linear-gradient(135deg,#BE2D70 0%,#702479 100%)" }}
        >
          Ver reseñas en Google
        </a>
      </div>

      {GOOGLE_REVIEWS.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {GOOGLE_REVIEWS.map((r) => (
            <article key={`${r.author}-${r.date}`} className="bg-white border-2 border-[#DCD5E2] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ fontFamily: '"Archivo"', background: "linear-gradient(135deg,#E37819 0%,#BE2D70 100%)" }}
                  aria-hidden="true"
                >
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate" style={{ fontFamily: '"Archivo"' }}>
                    {r.author}
                  </p>
                  <p className="text-[#4A4353] text-xs">{r.date}</p>
                </div>
                <span className="ml-auto shrink-0">
                  <GoogleG size={16} />
                </span>
              </div>
              <Stars rating={r.rating} size={14} />
              <p className="mt-2 text-[15px] text-[#2A2431] leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
