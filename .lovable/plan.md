
## 1. Robots: sobreescribir en vez de duplicar

En `src/pages/OesteLanding1.tsx`, reemplazar el bloque del `useEffect` que crea `<meta name="robots">` por lógica que:

- Busque `document.querySelector('meta[name="robots"]')`.
- Guarde su `content` original (si existe) o marque que la etiqueta se creó ad-hoc.
- Ponga `content = "noindex, nofollow"`.
- En cleanup: si existía, restaurar el `content` original (`"index, follow"`); si la creó el efecto, eliminarla.

Resultado: en todo momento hay una única `<meta name="robots">` en el `<head>`.

Aplicar el mismo patrón en `OesteLanding2.tsx` si tiene el mismo problema (verificar en implementación).

## 2. Canonical propio de la landing

En el mismo `useEffect`, gestionar `<link rel="canonical">` siguiendo el patrón de `src/components/SEO.tsx`:

- `document.querySelector('link[rel="canonical"]')`.
- Guardar `href` original (`https://rubenmunoz.com/`).
- Sobreescribir a `https://rubenmunoz.com/oeste-landing1` (y `/oeste-landing2` en la otra landing).
- Restaurar al desmontar.

## 3. PageView único deduplicado (Pixel + CAPI)

Objetivo: un solo `event_id` compartido entre el `fbq('track','PageView')` estático de `index.html` y el envío CAPI que ya hace la landing.

Cambios:

- **`index.html`**: antes del bloque del Pixel, añadir un script inline que genere un id y lo guarde en `window.__fbPageViewId`:
  ```html
  <script>
    window.__fbPageViewId = (crypto.randomUUID && crypto.randomUUID())
      || (Date.now() + '-' + Math.random().toString(36).slice(2));
  </script>
  ```
  Cambiar la llamada existente a:
  ```js
  fbq('track', 'PageView', {}, { eventID: window.__fbPageViewId });
  ```
- **`src/pages/OesteLanding1.tsx`** (y `OesteLanding2.tsx`): en el `sendMetaEvent({ eventName: 'PageView', capiOnly: true })`, pasar `eventId: (window as any).__fbPageViewId` para que CAPI use exactamente el mismo id que ya usó el Pixel del HTML. No añadir tipos globales invasivos: casting local o pequeña `declare global` en `src/vite-env.d.ts` con `__fbPageViewId?: string`.
- **`src/lib/metaPixel.ts` / `src/lib/metaCapi.ts`**: no requieren cambios de lógica; `sendMetaEvent` ya acepta `eventId`. Confirmar durante la implementación que el helper no vuelve a disparar un PageView del Pixel por su cuenta (ya está protegido por el guard de `initMetaPixel`).

Verificación manual (fuera del código): en Events Manager → Test Events, cada carga debe mostrar un único `PageView` marcado como *Deduplicado*.

## 4a. Preload del bundle en `index.html`

Junto al preload de `hero-home.webp` añadir:
```html
<link rel="modulepreload" href="/src/main.tsx" />
```
(usar `modulepreload` porque es un módulo ES; `as="script"` con `rel="preload"` no aplica bien a módulos y el navegador se queja).

## 4b. Estimación de prerender de `/oeste-landing1` (no implementar)

Situación actual: Vite 5 + React 18 SPA, `vite.config.ts` mínimo (react-swc + lovable-tagger). No hay SSR, ni framework meta (Next/Remix/TanStack Start). Toda la landing depende del bundle: en 4G el hero con el precio no existe hasta que React monta.

Opciones y esfuerzo:

- **A. `vite-plugin-ssg` / `vite-react-ssg`** — plugin que corre el árbol React en Node en build time y emite HTML por ruta.
  - Trabajo: añadir plugin, dividir `main.tsx` en `entry-client` y `entry-server`, envolver providers (QueryClient, Language, Router) para que funcionen en Node, configurar rutas a prerender (`['/oeste-landing1']`), y auditar dependencias que tocan `window`/`document` en el render inicial (`CustomCursor`, `PageTransition`, `motion`, `initMetaPixel`, el `useEffect` de robots/canonical ya son safe porque están en efectos). Assets con `.png.asset.json` deberían seguir funcionando porque se resuelven en build.
  - Riesgos: `motion/react` y algunos componentes shadcn pueden requerir guards `typeof window !== 'undefined'`; el `LanguageProvider` debe tener valor inicial estable; hidratación estricta puede fallar si hay diferencias cliente/servidor (fechas, random).
  - Esfuerzo estimado: **1 sesión de 3–5 h** para dejar `/oeste-landing1` (y `/oeste-landing2`) prerenderizadas con hidratación estable; +1 h de QA visual.

- **B. Migración a TanStack Start** (SSR real, primera pintura servida) — cambio estructural del template, útil si además se quiere SSR en más rutas y previews sociales por ruta.
  - Esfuerzo: **medio–alto**, varias horas de migración guiada. Sobredimensionado si el objetivo es solo la LCP de dos landings.

- **C. Rehacer solo `/oeste-landing1` como HTML estático en `public/oeste-landing1.html`** servido fuera del router, con su propio CSS y su propio `<script>` para el formulario.
  - Esfuerzo: **medio** (2–4 h), pero duplica mantenimiento del branding y del formulario.

Recomendación: **A** (`vite-react-ssg`) por mejor ratio esfuerzo/beneficio dado el objetivo (LCP de las landings de pago) y sin cambiar de stack.

## 5. Cómo medir LCP después (guía para el usuario)

Tras desplegar los cambios 1–4a:

1. Abrir https://pagespeed.web.dev/.
2. Introducir `https://rubenmunoz.com/oeste-landing1` (no localhost, no preview).
3. Pestaña **Mobile**, revisar sección *Diagnostics* → **Largest Contentful Paint**.
4. Objetivo: **LCP < 2,5 s** en la simulación 4G que hace Lighthouse (Moto G Power / Slow 4G).
5. Repetir 2–3 veces y usar la mediana; PSI varía por corrida.
6. Contrastar con Search Console → *Core Web Vitals* (datos de campo reales de usuarios) una vez pasen ~28 días con el fix.

## Criterio de aceptación

- Una sola `<meta name="robots">` en el `<head>` en todo momento, con `noindex, nofollow` mientras se está en la landing y `index, follow` fuera.
- `/oeste-landing1` tiene su propio `<link rel="canonical">` apuntando a sí misma.
- Cada carga produce un solo `PageView` deduplicado en Test Events de Meta.
- `npm run build` pasa sin errores.
- Entregada la estimación de esfuerzo de prerender sin implementarlo.

## Archivos a tocar

- `index.html` — inline script con `__fbPageViewId`, `eventID` en el `fbq PageView`, `modulepreload` del bundle.
- `src/pages/OesteLanding1.tsx` — robots + canonical con restore, `eventId` reutilizado en el `sendMetaEvent` PageView.
- `src/pages/OesteLanding2.tsx` — mismo patrón robots + canonical + PageView si aplica.
- `src/vite-env.d.ts` — `declare global { interface Window { __fbPageViewId?: string } }`.

Sin cambios en `src/lib/metaPixel.ts` ni `src/lib/metaCapi.ts` (la API ya soporta `eventId`).
