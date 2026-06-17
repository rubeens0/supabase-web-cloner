import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const STORAGE_KEY = "oeste:return-to";
const VALID_RETURNS: Record<string, string> = {
  "oeste-landing1": "/oeste-landing1",
};

export const hasOesteReturn = () => {
  try {
    return !!sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
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
      } else if (from) {
        sessionStorage.removeItem(STORAGE_KEY);
      }

      const stored = sessionStorage.getItem(STORAGE_KEY);
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
      aria-label="Volver al landing de Oeste"
      className="group fixed bottom-5 left-5 z-[60] inline-flex items-center gap-2 rounded-full p-[1.5px] shadow-[0_10px_40px_-10px_rgba(190,45,112,0.6)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #E37819 0%, #BE2D70 50%, #702479 100%)",
      }}
    >
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(227,120,25,0.95) 0%, rgba(190,45,112,0.95) 50%, rgba(112,36,121,0.95) 100%)",
        }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Volver a Oeste
      </span>
    </Link>
  );
};
