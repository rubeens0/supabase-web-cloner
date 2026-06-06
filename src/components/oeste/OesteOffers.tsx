import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Wifi, Smartphone, Signal } from 'lucide-react';

export type OfferCategory = 'fibra-movil' | 'fibra' | 'movil';

export type Offer = {
  id: string;
  category: OfferCategory;
  title: string;
  features: string[];
  price: string;
  priceSuffix: string;
  highlight?: boolean;
};

const OFFERS: Offer[] = [
  // Fibra + Móvil
  {
    id: 'fm-1',
    category: 'fibra-movil',
    title: 'Fibra 1G + Móvil 15GB',
    features: ['Fibra 1Gb simétrica', '15 GB de datos', 'Llamadas ilimitadas'],
    price: '27',
    priceSuffix: '€/mes',
  },
  {
    id: 'fm-2',
    category: 'fibra-movil',
    title: 'Fibra 1G + Móvil 100GB',
    features: ['Fibra 1Gb simétrica', '100 GB de datos', 'Llamadas ilimitadas'],
    price: '31',
    priceSuffix: '€/mes',
    highlight: true,
  },
  {
    id: 'fm-3',
    category: 'fibra-movil',
    title: 'Fibra 1G + 2 líneas 30GB',
    features: ['Fibra 1Gb simétrica', '2 líneas móviles · 30 GB c/u', 'Llamadas ilimitadas'],
    price: '34,95',
    priceSuffix: '€/mes',
  },
  {
    id: 'fm-4',
    category: 'fibra-movil',
    title: 'Fibra 1G + Móvil sin límites',
    features: ['Fibra 1Gb simétrica', 'Datos móviles ilimitados', 'Llamadas ilimitadas'],
    price: '35',
    priceSuffix: '€/mes',
  },

  // Fibra
  {
    id: 'f-1',
    category: 'fibra',
    title: 'Fibra 1 Gb',
    features: ['1 Gb simétrico', 'Sin permanencia', 'Instalación rápida'],
    price: '27',
    priceSuffix: '€/mes',
  },
  {
    id: 'f-2',
    category: 'fibra',
    title: 'Fibra 2 Gb',
    features: ['2 Gb simétrico', 'Sin permanencia', 'Ideal para hogares conectados'],
    price: '35',
    priceSuffix: '€/mes',
    highlight: true,
  },

  // Móvil
  {
    id: 'm-1',
    category: 'movil',
    title: 'Móvil 30 GB',
    features: ['30 GB de datos', 'Llamadas ilimitadas', '5G donde haya cobertura'],
    price: '6,95',
    priceSuffix: '€/mes',
  },
  {
    id: 'm-2',
    category: 'movil',
    title: 'Móvil 80 GB',
    features: ['80 GB de datos', 'Llamadas ilimitadas', '5G donde haya cobertura'],
    price: '8,95',
    priceSuffix: '€/mes',
  },
  {
    id: 'm-3',
    category: 'movil',
    title: 'Móvil 100 GB',
    features: ['100 GB de datos', 'Llamadas ilimitadas', '5G donde haya cobertura'],
    price: '9,95',
    priceSuffix: '€/mes',
    highlight: true,
  },
  {
    id: 'm-4',
    category: 'movil',
    title: 'Móvil 200 GB',
    features: ['200 GB de datos', 'Llamadas ilimitadas', '5G donde haya cobertura'],
    price: '10,95',
    priceSuffix: '€/mes',
  },
];

const CATEGORIES: { id: OfferCategory; label: string; icon: typeof Wifi }[] = [
  { id: 'fibra-movil', label: 'Fibra + Móvil', icon: Signal },
  { id: 'fibra', label: 'Fibra', icon: Wifi },
  { id: 'movil', label: 'Móvil', icon: Smartphone },
];

type Props = {
  onSelect?: (offer: Offer) => void;
};

export function OesteOffers({ onSelect }: Props) {
  const [active, setActive] = useState<OfferCategory>('fibra-movil');
  const visible = OFFERS.filter((o) => o.category === active);

  return (
    <section className="relative py-16 sm:py-24 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">— Elige tu oferta</p>
          <h2 className="mt-4 leading-[0.95]">
            <span className="block font-sans font-black uppercase tracking-[-0.02em] text-4xl sm:text-5xl">
              Tarifas claras,
            </span>
            <span className="block font-display-italic text-5xl sm:text-6xl text-white/95 -mt-1">
              sin sorpresas.
            </span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="mt-10 inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-[0_8px_24px_-12px_rgba(255,255,255,0.6)]'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Offer cards */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`relative rounded-2xl p-6 flex flex-col border backdrop-blur-md transition ${
                o.highlight
                  ? 'bg-white text-neutral-900 border-white shadow-[0_20px_60px_-20px_rgba(255,255,255,0.45)]'
                  : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
              }`}
            >
              {o.highlight && (
                <span className="absolute -top-3 left-6 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] bg-neutral-900 text-white px-3 py-1 rounded-full">
                  Recomendada
                </span>
              )}

              <h3 className={`text-lg font-bold uppercase tracking-tight ${o.highlight ? 'text-neutral-900' : 'text-white'}`}>
                {o.title}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className={`font-sans font-black tracking-[-0.03em] text-5xl ${o.highlight ? 'text-neutral-900' : 'text-white'}`}>
                  {o.price}
                </span>
                <span className={`text-sm font-semibold ${o.highlight ? 'text-neutral-700' : 'text-white/80'}`}>
                  {o.priceSuffix}
                </span>
              </div>

              <ul className={`mt-5 space-y-2 text-sm ${o.highlight ? 'text-neutral-700' : 'text-white/85'}`}>
                {o.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${o.highlight ? 'text-neutral-900' : 'text-white'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelect?.(o)}
                className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase tracking-wider text-sm px-5 py-3 transition ${
                  o.highlight
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'bg-white text-neutral-900 hover:bg-white/90'
                }`}
              >
                La quiero
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/60">
          Precios orientativos. Disponibilidad y condiciones finales sujetas a tu dirección.
        </p>
      </div>
    </section>
  );
}
