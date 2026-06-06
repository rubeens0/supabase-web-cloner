import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Wifi, Smartphone, Signal } from 'lucide-react';

export type OfferCategory = 'fibra-movil' | 'fibra' | 'movil';

export type Offer = {
  id: string;
  category: OfferCategory;
  title: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
};

const OFFERS: Offer[] = [
  // Fibra + Móvil
  { id: 'fm-1', category: 'fibra-movil', title: 'Fibra 1G + Móvil 15GB', subtitle: 'Llamadas ilimitadas', price: '27', priceSuffix: '€/mes' },
  { id: 'fm-2', category: 'fibra-movil', title: 'Fibra 1G + Móvil 100GB', subtitle: 'Llamadas ilimitadas', price: '31', priceSuffix: '€/mes' },
  { id: 'fm-3', category: 'fibra-movil', title: 'Fibra 1G + 2 líneas · 30GB', subtitle: 'Llamadas ilimitadas', price: '34,95', priceSuffix: '€/mes' },
  { id: 'fm-4', category: 'fibra-movil', title: 'Fibra 1G + Móvil sin límites', subtitle: 'Datos y llamadas ilimitados', price: '35', priceSuffix: '€/mes' },
  // Fibra
  { id: 'f-1', category: 'fibra', title: 'Fibra 1 Gb', subtitle: 'Simétrica · sin permanencia', price: '27', priceSuffix: '€/mes' },
  { id: 'f-2', category: 'fibra', title: 'Fibra 2 Gb', subtitle: 'Simétrica · sin permanencia', price: '35', priceSuffix: '€/mes' },
  // Móvil
  { id: 'm-1', category: 'movil', title: 'Móvil 30 GB', subtitle: 'Llamadas ilimitadas', price: '6,95', priceSuffix: '€/mes' },
  { id: 'm-2', category: 'movil', title: 'Móvil 80 GB', subtitle: 'Llamadas ilimitadas', price: '8,95', priceSuffix: '€/mes' },
  { id: 'm-3', category: 'movil', title: 'Móvil 100 GB', subtitle: 'Llamadas ilimitadas', price: '9,95', priceSuffix: '€/mes' },
  { id: 'm-4', category: 'movil', title: 'Móvil 200 GB', subtitle: 'Llamadas ilimitadas', price: '10,95', priceSuffix: '€/mes' },
];

const CATEGORIES: { id: OfferCategory; label: string; icon: typeof Wifi }[] = [
  { id: 'fibra-movil', label: 'Fibra + Móvil', icon: Signal },
  { id: 'fibra', label: 'Fibra', icon: Wifi },
  { id: 'movil', label: 'Móvil', icon: Smartphone },
];

type Props = {
  selectedId?: string | null;
  onSelect?: (offer: Offer) => void;
};

export function OesteOffers({ selectedId, onSelect }: Props) {
  const initialCat = OFFERS.find((o) => o.id === selectedId)?.category ?? 'fibra-movil';
  const [active, setActive] = useState<OfferCategory>(initialCat);
  const visible = OFFERS.filter((o) => o.category === active);
  const selected = OFFERS.find((o) => o.id === selectedId) ?? null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl text-white border border-white/15"
      style={{
        background:
          'linear-gradient(160deg, hsl(28 80% 50% / 0.95) 0%, hsl(330 65% 46% / 0.95) 55%, hsl(289 55% 31% / 0.95) 100%)',
      }}
    >
      {/* Soft sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.25) 0%, transparent 60%), radial-gradient(80% 60% at 100% 100%, rgba(0,0,0,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative">
        {/* Calculator "screen" header — fixed height to avoid distortion */}
        <div className="px-5 sm:px-6 pt-5 pb-5 border-b border-white/15 bg-black/15 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/85">
              Calcula tu tarifa
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              En vivo
            </span>
          </div>

          {/* Fixed-height price display */}
          <div className="mt-3 h-[52px] sm:h-[76px] flex items-baseline gap-1.5 font-mono tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={selected?.id ?? 'empty'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, position: 'absolute' }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[42px] sm:text-[64px] leading-none font-black tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                {selected ? selected.price : '0,00'}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm sm:text-base font-semibold text-white/85">€/mes</span>
          </div>

          <p className="text-xs text-white/85 h-4 truncate">
            {selected ? selected.title : 'Desliza y elige tu tarifa'}
          </p>
        </div>

        {/* Category tabs */}
        <div className="px-3 sm:px-4 pt-3">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-black/25 border border-white/15 backdrop-blur-sm">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-white text-neutral-900 shadow-md'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable offer rows — fixed-height viewport prevents layout shift */}
        <div className="p-3 sm:p-4">
          <div className="relative">
            <div className="max-h-[260px] sm:max-h-[300px] overflow-y-auto pr-1 space-y-1.5 oeste-scroll snap-y snap-mandatory">
              {visible.map((o) => {
                const isSel = selected?.id === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => onSelect?.(o)}
                    className={`snap-start w-full text-left flex items-center gap-3 rounded-xl px-3.5 py-3 border transition ${
                      isSel
                        ? 'bg-white text-neutral-900 border-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]'
                        : 'bg-white/[0.08] border-white/15 hover:bg-white/[0.14] hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition ${
                        isSel ? 'bg-neutral-900 border-neutral-900' : 'border-white/50'
                      }`}
                    >
                      {isSel && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-bold leading-tight truncate ${isSel ? 'text-neutral-900' : 'text-white'}`}>
                        {o.title}
                      </p>
                      <p className={`text-[11px] truncate ${isSel ? 'text-neutral-600' : 'text-white/70'}`}>
                        {o.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0 font-mono tabular-nums">
                      <span className={`text-lg font-black tracking-tight ${isSel ? 'text-neutral-900' : 'text-white'}`}>
                        {o.price}
                      </span>
                      <span className={`text-[10px] font-semibold ml-0.5 ${isSel ? 'text-neutral-600' : 'text-white/70'}`}>
                        {o.priceSuffix}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Fade hint at bottom of scroll area */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-xl"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
