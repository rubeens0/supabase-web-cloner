# Clonar Rubenweb a este proyecto Lovable

## Resumen del repo analizado
- **Stack**: React 18 + Vite + Tailwind + TypeScript → **100% compatible** con Lovable.
- **Origen**: exportado desde Figma Make (`@figma/my-make-file`).
- **Páginas**: Home, Contact, Business, Sponsors, Cek2026, Blog, BlogPost, Dossier, LiveTimingStreaming.
- **Componentes propios**: Navigation, Footer, AnimatedLogo, BusinessButton, ContactForm, CustomCursor, DesignCarousel, DossierAccess, PageTransition, PhotoGrid, SEO, ScrollToTop + set completo de shadcn/ui.
- **Idiomas**: contexto de i18n (`LanguageContext`) con rutas en español e inglés.
- **Routing**: `react-router` v7 con rutas duplicadas ES/EN.
- **Backend Supabase**: una edge function Hono con solo un endpoint `/health` y un módulo KV no utilizado por el frontend. **No hay tablas reales, ni auth, ni storage en uso.**
- **Assets Figma**: el código usa imports tipo `figma:asset/...png` (ej. logo) que **no existen como archivos** en el repo. Habrá que sustituirlos por placeholders o tú me los subes.

## Pasos

1. **Configurar base del proyecto**
   - Instalar dependencias extra que usa el repo: `motion`, `react-router` v7, `react-dnd` + backend HTML5, `react-responsive-masonry`, `react-slick`, `@mui/material` + `@mui/icons-material` + `@emotion/*`, `@popperjs/core`, `react-popper`, `tw-animate-css`.
   - Mantener Tailwind v3 (Lovable estándar) y portar los estilos de `src/styles/globals.css` y `default_theme.css` al `src/index.css` con tokens HSL.
   - Reemplazar imports `sonner@2.0.3` → `sonner` (sin versión inline).

2. **Copiar el código fuente**
   - Copiar todas las páginas de `src/app/pages/` a `src/pages/`.
   - Copiar `src/app/components/*` (excepto los `ui/` que ya existen) a `src/components/`.
   - Copiar `src/app/contexts/LanguageContext.tsx` a `src/contexts/`.
   - Copiar `src/app/utils/performanceDetector.ts` y `sitemapGenerator.ts` a `src/utils/`.
   - Copiar `public/favicon.svg`, `robots.txt`, `sitemap.xml` a `/public`.
   - Reemplazar `App.tsx` por la versión del repo, adaptado para usar `react-router-dom` (que ya está en Lovable) en vez de `react-router` v7 — son API compatibles.
   - Eliminar `src/pages/Index.tsx` placeholder (Home pasa a ser la ruta `/`).

3. **Manejar assets `figma:asset/*`**
   - Detectar todos los `import ... from 'figma:asset/...'` en el código.
   - Sustituirlos por placeholders neutros o por imágenes que tú me proporciones después.
   - Te pasaré la lista exacta de assets faltantes para que los subas en una segunda iteración.

4. **Activar Lovable Cloud + recrear backend mínimo**
   - Habilitar Lovable Cloud.
   - Crear tabla `kv_store_012a3b25 (key text pk, value jsonb)` con RLS habilitado y políticas restrictivas (solo service role escribe, lectura cerrada por defecto), por compatibilidad con el código original aunque hoy no se use.
   - Crear edge function `make-server-012a3b25` con Hono, endpoint `/health` y CORS, equivalente a la del repo.
   - Generar `src/utils/supabase/info.tsx` apuntando al nuevo proyecto Cloud.

5. **Formulario de contacto (ContactForm)**
   - Revisar si envía datos a algún sitio. Si lo hace por email/API externa, te lo señalaré y decidimos: guardar en una tabla `contact_messages` de Lovable Cloud (con RLS: insert público, select solo admin) o conectar Resend para enviar emails.

6. **Verificación**
   - Ejecutar el security scan sobre el backend.
   - Probar navegación entre todas las rutas (ES e EN), idioma, animaciones, formulario y footer.
   - Reportarte qué funciona y qué requiere assets/secrets pendientes.

## Lo que NO incluye
- Imágenes y logos `figma:asset/*` (los subes tú después).
- Auth, storage o tablas de negocio: no existen en el repo.
- Datos del Supabase original (proyecto `bdphuxspjodtljfiwfkg`): el KV está vacío en el código y no migramos.

## Notas técnicas
- Convertimos `react-router` v7 → `react-router-dom` v6 (cambios mínimos: imports y nada más en este código).
- Tailwind v4 del repo → Tailwind v3 de Lovable: portar tokens al sistema HSL en `index.css` para mantener coherencia con shadcn.
- Eliminar `default_shadcn_theme.css` redundante; sus valores se integran en `index.css`.
