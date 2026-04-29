import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, ArrowUpRight, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  isShort: boolean;
}

const CHANNEL_URL = "https://www.youtube.com/@rubenmunooz._";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
      <span className="font-mono text-secondary">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      <span>{children}</span>
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

export function YoutubeRecent() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Defer fetch until section is near viewport to keep it off the critical path
  useEffect(() => {
    if (shouldFetch) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldFetch(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldFetch(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldFetch]);

  useEffect(() => {
    if (!shouldFetch) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("youtube-recent", {
          body: null,
        });
        if (error) throw error;
        if (!cancelled && data?.videos) setVideos(data.videos.slice(0, 3));
      } catch (e) {
        console.error("YouTube fetch failed", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shouldFetch]);

  return (
    <section ref={sectionRef} className="border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <SectionLabel index="06">YouTube</SectionLabel>
            <h2 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl text-white leading-[1] tracking-tight">
              Vídeos <span className="font-display-italic text-gradient-mono-italic">recientes</span>.
            </h2>
            <p className="mt-5 text-white/55 text-[15px] leading-relaxed max-w-xl">
              Onboards desde dentro del kart. Y quizás, próximamente, vlogs.
            </p>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            Ver canal <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div
          className={`grid gap-5 ${
            !loading && videos.length === 1
              ? "md:grid-cols-1 md:max-w-xl"
              : !loading && videos.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }`}
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
              >
                <div className="aspect-video bg-white/[0.04] animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-20 bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-5 w-full bg-white/[0.06] rounded animate-pulse" />
                  <div className="h-5 w-2/3 bg-white/[0.06] rounded animate-pulse" />
                </div>
              </div>
            ))}

          {!loading &&
            videos.map((v) => (
              <motion.a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/25 transition-colors block"
              >
                <div className="relative aspect-video overflow-hidden border-b border-white/10">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-secondary border border-secondary/30 rounded-full px-2.5 py-1">
                      {v.isShort ? "Short" : "Vídeo"}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {formatDate(v.published)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl leading-tight text-white line-clamp-2">
                    {v.title}
                  </h3>
                </div>
              </motion.a>
            ))}

          {!loading && videos.length === 0 && (
            <div className="md:col-span-3 text-center py-12 text-white/50 text-sm">
              No se han podido cargar los vídeos.{" "}
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Ir al canal
              </a>
              .
            </div>
          )}
        </div>

        <div className="mt-8 sm:hidden">
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full rounded-full h-11 border-white/20 bg-transparent text-white hover:bg-white hover:text-black gap-2"
            >
              Ver canal <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
