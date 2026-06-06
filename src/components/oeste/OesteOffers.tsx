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
    <div className="rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-white/15 shadow-2xl overflow-hidden text-white">
      {/* Calculator "screen" header */}
      <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
            Calculadora de tarifa
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            En vivo
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-1.5 font-mono tabular-nums">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={selected?.id ?? 'empty'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-5xl sm:text-6xl font-black tracking-[-0.04em] text-white"
            >
              {selected ? selected.price : '0,00'}
            </motion.span>
          </AnimatePresence>
          <span className="text-base font-semibold text-white/70">€/mes</span>
        </div>
        <p className="mt-1 text-xs text-white/65 min-h-[16px]">
          {selected ? selected.title : 'Elige una tarifa para ver el precio'}
        </p>
      </div>

      {/* Category tabs */}
      <div className="px-3 sm:px-4 pt-3">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-white/[0.06] border border-white/10">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-white text-neutral-900'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">{c.label}</span>
                <span className="xs:hidden sm:hidden">
                  {c.id === 'fibra-movil' ? 'Combo' : c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Offer rows */}
      <div className="p-3 sm:p-4 space-y-1.5">
        {visible.map((o) => {
          const isSel = selected?.id === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onSelect?.(o)}
              className={`w-full text-left flex items-center gap-3 rounded-xl px-3.5 py-3 border transition ${
                isSel
                  ? 'bg-white text-neutral-900 border-white shadow-[0_8px_24px_-12px_rgba(255,255,255,0.5)]'
                  : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition ${
                  isSel ? 'bg-neutral-900 border-neutral-900' : 'border-white/40'
                }`}
              >
                {isSel && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>

              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold leading-tight truncate ${isSel ? 'text-neutral-900' : 'text-white'}`}>
                  {o.title}
                </p>
                <p className={`text-[11px] truncate ${isSel ? 'text-neutral-600' : 'text-white/60'}`}>
                  {o.subtitle}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono tabular-nums">
                  <span className={`text-lg font-black tracking-tight ${isSel ? 'text-neutral-900' : 'text-white'}`}>
                    {o.price}
                  </span>
                  <span className={`text-[10px] font-semibold ml-0.5 ${isSel ? 'text-neutral-600' : 'text-white/60'}`}>
                    {o.priceSuffix}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
