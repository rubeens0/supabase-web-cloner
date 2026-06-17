import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const STORAGE_KEY = "oeste:return-to";
const VALID_RETURNS: Record<string, string> = {
  "oeste-landing1": "/oeste-landing1",
};

export const OesteReturnButton = () => {
  const location = useLocation();
  const [returnTo, setReturnTo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const from = params.get("from");
      if (from && VALID_RETURNS[from]) {
        sessionStorage.setItem(STORAGE_KEY, VALID_RETURNS[from]);
      }
      const stored = sessionStorage.getItem(STORAGE_KEY);
      // Hide if we're already on the landing
      if (stored && location.pathname !== stored) {
        setReturnTo(stored);
      } else {
        setReturnTo(null);
      }
    } catch {
      setReturnTo(null);
    }
  }, [location.pathname, location.search]);

  if (!returnTo) return null;

  return (
    <Link
      to={returnTo}
      onClick={() => {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* noop */
        }
      }}
      className="fixed bottom-5 left-5 z-[60] inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 font-semibold text-sm px-4 py-2.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-black/10 hover:bg-white/90 transition"
      aria-label="Volver al landing de Oeste"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver a Oeste
    </Link>
  );
};
