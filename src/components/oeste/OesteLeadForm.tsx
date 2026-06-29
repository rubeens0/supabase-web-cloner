import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { trackMetaEventOnce, parsePrice } from '@/lib/metaPixel';
import { sendMetaEvent } from '@/lib/metaCapi';


const schema = z.object({
  name: z.string().trim().min(2, 'Mínimo 2 caracteres').max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s]{9,20}$/, 'Teléfono no válido'),
  email: z.string().trim().email('Email no válido').max(255),
  address: z.string().trim().min(5, 'Indica tu dirección').max(255),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política' }),
  }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  selectedOffer?: { id: string; title: string; price: string; priceSuffix: string } | null;
  onClearOffer?: () => void;
};

export function OesteLeadForm({ selectedOffer, onClearOffer }: Props = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const checkoutStartedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', address: '', consent: false as unknown as true },
  });

  const handleFirstInteraction = () => {
    if (checkoutStartedRef.current) return;
    checkoutStartedRef.current = true;
    const key = `oeste-initiateCheckout-${selectedOffer?.id ?? 'none'}`;
    // Keep the once-guard on pixel side, mirror via CAPI with same event_id
    trackMetaEventOnce(key, 'InitiateCheckout', { eventID: key });
    void sendMetaEvent({
      eventName: 'InitiateCheckout',
      eventId: key,
      capiOnly: true, // pixel already fired above with eventID=key
      customData: {
        content_name: selectedOffer?.title ?? 'Sin oferta',
        content_category: 'oeste-lead-form',
        value: parsePrice(selectedOffer?.price),
        currency: 'EUR',
      },
    });
  };

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const { data, error } = await supabase.functions.invoke('oeste-lead', {
        body: {
          ...values,
          offer: selectedOffer
            ? `${selectedOffer.title} (${selectedOffer.price}${selectedOffer.priceSuffix})`
            : undefined,
        },
      });
      if (error) throw error;
      if (data?.ok) {
        setSubmitted(true);
        const [firstName, ...rest] = values.name.trim().split(/\s+/);
        const lastName = rest.join(' ') || undefined;
        const offerValue = parsePrice(selectedOffer?.price);
        const sharedUserData = {
          email: values.email,
          phone: values.phone,
          first_name: firstName,
          last_name: lastName,
          city: 'Cáceres',
          country: 'ES',
        };
        const sharedCustom = {
          content_name: selectedOffer?.title ?? 'Sin oferta',
          content_category: selectedOffer?.id ?? 'no-offer',
          value: offerValue,
          currency: 'EUR',
        };
        void sendMetaEvent({
          eventName: 'Lead',
          customData: sharedCustom,
          userData: sharedUserData,
        });
        void sendMetaEvent({
          eventName: 'Purchase',
          customData: { ...sharedCustom, contents: selectedOffer ? [{ id: selectedOffer.id, quantity: 1, item_price: offerValue }] : undefined },
          userData: sharedUserData,
        });
        reset();
      } else {

        throw new Error('Respuesta inesperada');
      }
    } catch (e) {
      setServerError('No se pudo enviar. Inténtalo de nuevo en unos minutos.');
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center text-white"
      >
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-white" />
        <h3 className="text-2xl font-semibold mb-2">¡Gracias!</h3>
        <p className="text-white/80">
          Hemos recibido tus datos. Un asesor de Oeste te contactará en breve con la mejor oferta para tu zona.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    'w-full rounded-xl bg-white/95 text-neutral-900 placeholder:text-neutral-500 px-4 py-3 outline-none focus:ring-2 focus:ring-white/80 transition';
  const errCls = 'mt-1 text-xs text-white/90 font-medium';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFirstInteraction}
      className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 space-y-4 shadow-2xl"
      noValidate
    >
      {selectedOffer && (
        <div className="flex items-start justify-between gap-3 rounded-xl bg-white text-neutral-900 px-4 py-3 border border-white/40">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Oferta elegida</p>
            <p className="mt-0.5 text-sm font-bold truncate">
              {selectedOffer.title}{' '}
              <span className="text-neutral-600 font-semibold">· {selectedOffer.price}{selectedOffer.priceSuffix}</span>
            </p>
          </div>
          {onClearOffer && (
            <button
              type="button"
              onClick={onClearOffer}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-2 shrink-0"
            >
              Cambiar
            </button>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white mb-1.5">Nombre y apellidos</label>
        <input type="text" autoComplete="name" placeholder="Tu nombre" className={inputCls} {...register('name')} />
        {errors.name && <p className={errCls}>{errors.name.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Teléfono</label>
          <input type="tel" autoComplete="tel" placeholder="600 000 000" className={inputCls} {...register('phone')} />
          {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Email</label>
          <input type="email" autoComplete="email" placeholder="tu@email.com" className={inputCls} {...register('email')} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1.5">Dirección (Cáceres)</label>
        <input
          type="text"
          autoComplete="street-address"
          placeholder="Calle, número, localidad"
          className={inputCls}
          {...register('address')}
        />
        {errors.address && <p className={errCls}>{errors.address.message}</p>}
      </div>

      <label className="flex items-start gap-3 text-sm text-white/90 cursor-pointer">
        <input type="checkbox" className="mt-1 w-4 h-4 accent-white" {...register('consent')} />
        <span>
          Acepto que mis datos sean tratados por <strong>Oeste</strong> para enviarme información sobre las ofertas de
          fibra y telecomunicaciones disponibles en mi zona, conforme a la{' '}
          <a
            href="https://oeste.digital/politica-de-proteccion-de-datos/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Política de Protección de Datos
          </a>{' '}
          y la{' '}
          <a
            href="https://oeste.digital/PDF/politica-de-cookies.pdf?_t=1769594865"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Política de Cookies
          </a>.
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent.message as string}</p>}

      {serverError && (
        <p className="text-sm text-white bg-black/30 border border-white/20 rounded-lg px-3 py-2">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-neutral-900 font-semibold px-6 py-3.5 hover:bg-white/90 transition disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Enviando…
          </>
        ) : (
          <>
            Enviar solicitud
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-[11px] text-white/70 text-center">
        Respuesta en menos de 24h. Sin compromiso.
      </p>
    </form>
  );
}
