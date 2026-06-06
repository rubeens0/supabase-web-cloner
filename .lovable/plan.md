# Landing page /oeste-landing1 — Oeste × Rubén

Landing one-page para tráfico de Meta Ads, optimizado para conversión a lead, con el degradado de marca (#e37819 → #be2d70 → #702479) y co-branding visible Oeste + Rubén.

## Ruta y estructura

- Nueva ruta pública `/oeste-landing1` añadida en `src/App.tsx` (lazy load), sin pasar por la `Navigation` ni `Footer` globales para mantener un landing limpio enfocado a conversión (envuelvo el contenido condicionalmente o creo layout propio dentro de la página).
- Sin enlaces internos a esta ruta desde el resto del sitio (es solo para Meta Ads).
- Excluida de sitemap/llms y marcada `noindex, nofollow` para no canibalizar SEO de rubenmunoz.com ni de oeste.digital.

## Secciones del landing

```text
[ Hero a pantalla completa con degradado ]
  - Logos co-branding: Oeste  ×  Rubén (top-left)
  - H1: "La fibra más rápida del oeste en Cáceres"
  - Subtítulo corto
  - Formulario lead (col derecha en desktop, debajo en mobile)
  - Badge "Colaboración Oeste × Rubén Muñoz"

[ Beneficios fibra ]
  - 4 tarjetas con iconos (placeholders editables):
    · Hasta 1 Gb simétrico
    · Sin permanencia
    · Instalación gratis
    · Soporte local en Cáceres
  (texto final lo confirmas/editas — dejo placeholders fáciles de cambiar)

[ Bloque "Por qué Oeste" + foto Rubén ]
  - Frase de respaldo personal breve
  - Co-branding reforzado

[ CTA final ]
  - Botón "Quiero información" que hace scroll al formulario

[ Footer mínimo ]
  - Logos Oeste + Rubén, aviso legal corto, enlace a oeste.digital
```

## Formulario

- Campos: Nombre, Teléfono, Email, Dirección (Cáceres).
- Validación cliente con `zod` + react-hook-form (longitudes, email válido, teléfono ES 9 dígitos).
- Botón: **"Quiero información"**.
- Checkbox RGPD obligatorio con link a política.
- Estados: idle / enviando / éxito (mensaje + reset) / error.

## Envío al webhook de Oeste

Para no exponer el webhook en el cliente ni sufrir CORS, el envío va a través de una **edge function** propia que reenvía al webhook de Oeste:

- Nueva edge function `supabase/functions/oeste-lead/index.ts` (público, `verify_jwt = false`).
- Hace `POST` al webhook configurado en el secret `OESTE_WEBHOOK_URL` con payload JSON: `{ name, phone, email, address, source: "meta-ads", landing: "oeste-landing1", submitted_at }`.
- Re-valida los campos en servidor con zod antes de reenviar.
- Devuelve `{ ok: true }` o error con status apropiado.
- Sin logs de datos personales.

Pediré el secret **`OESTE_WEBHOOK_URL`** al usuario (puede dejarlo pendiente y pegarlo cuando lo tenga; mientras tanto la función responderá 503 con mensaje claro).

## Diseño visual

- Degradado de marca como background del hero y acentos:
  `linear-gradient(135deg, #e37819 0%, #be2d70 50%, #702479 100%)`.
- Tokens añadidos en `index.css` (`--oeste-1/2/3`) y clase utilitaria `.bg-oeste-gradient` + `.text-oeste-gradient` para no romper el design system global oscuro del resto del sitio (los tokens solo se usan dentro de esta landing).
- Tipografía: reutilizo `font-display` (Instrument Serif) para el H1 y `SF Pro Display` para body, coherente con el branding de Rubén pero con paleta Oeste.
- Animaciones suaves con `motion/react` (fade-in + slide) ya disponible en el proyecto.
- Totalmente responsive, optimizado para mobile (origen mayoritario de Meta Ads).

## Tracking (opcional, dejado preparado)

- Hooks vacíos para Meta Pixel `fbq('track','Lead')` tras envío exitoso. No instalo pixel sin tu confirmación; queda el `// TODO` señalado.

## Archivos a crear/editar

- `src/App.tsx` — añadir ruta lazy `/oeste-landing1` sin Navigation/Footer global.
- `src/pages/OesteLanding1.tsx` — landing completo (hero, beneficios, CTA, footer mini).
- `src/components/oeste/OesteLeadForm.tsx` — formulario con validación y submit.
- `src/index.css` — variables `--oeste-*` y utilidades de degradado scoped.
- `supabase/functions/oeste-lead/index.ts` — proxy seguro al webhook.
- `supabase/config.toml` — bloque `[functions.oeste-lead] verify_jwt = false`.
- Secret nuevo: `OESTE_WEBHOOK_URL` (te lo pediré al implementar).
- `public/robots.txt` — añadir `Disallow: /oeste-landing1`.

## Pendiente que necesito de ti (puedo arrancar igualmente con placeholders)

1. **URL del webhook** de Oeste (si no la tienes ahora, pongo placeholder y lo conectas luego).
2. **Logo de Oeste** en SVG/PNG para el co-branding (uso temporalmente el del CDN de oeste.digital).
3. **Texto definitivo de beneficios** (uso los 4 placeholders listados arriba y los cambias).
