
## Aclaración de stack

El proyecto usa **React + Vite + Framer Motion** (no Next.js). Todos los cambios respetan esta arquitectura. No se instalará GSAP; las animaciones avanzadas se implementan con Framer Motion (`useScroll`, `useTransform`, `useInView`, `whileInView`), que ya está en el proyecto.

---

## 1. CTA (BusinessButton) — Visibilidad y encaje

**Archivo:** `src/components/BusinessButton.tsx`

- Aumentar tamaño del botón: `px-8 py-4 text-[15px]`
- Cambiar fondo a color de acento del sitio (`bg-secondary` / gradient rojo-blanco) para máximo contraste sobre fondo negro
- Animación de entrada: `scale: 0.9 -> 1` + `opacity: 0 -> 1` con spring suave
- Añadir efecto pulso sutil con `animate` loop: un `box-shadow` que crece y desaparece cíclicamente (glow ring)
- Responsive: centrado con `inset-x-0 flex justify-center`, padding lateral `px-6` en mobile para evitar cortes
- El botón ya gestiona visibilidad por scroll; se mantiene esa lógica

---

## 2. Sección "Últimas Entradas" — Efecto cinematográfico

**Archivo:** `src/pages/Home.tsx` (sección 05 · BLOG, líneas ~361-420)

Rediseño completo del layout de las 3 tarjetas:

- **Layout full-width vertical**: cada tarjeta ocupa casi el ancho completo (~95vw), apiladas verticalmente
- **Imagen de fondo** con overlay gradiente oscuro (`bg-gradient-to-t from-black via-black/60 to-transparent`), altura ~60vh
- **Tipografía tipo póster**: título en `font-display text-4xl sm:text-6xl md:text-7xl` bold, blanco sobre la imagen
- **Animación de entrada por scroll**: cada tarjeta entra con `whileInView` usando `translateY: 80px -> 0` + `opacity: 0 -> 1`, duration 0.8s con easing premium
- **Parallax en imagen de fondo**: usar `useScroll` + `useTransform` para mover la imagen de fondo a velocidad diferente al scroll (translateY de -5% a 5%)
- Tag de categoría como badge flotante en esquina superior
- Fecha en la parte inferior con estilo mono
- Hover: ligero scale de la imagen (1.02)

---

## 3. Sección "Vídeos Recientes" — Sin cambios

Se mantiene exactamente como está. Se verificará que el nuevo layout de blog no afecte su spacing.

---

## 4. Animaciones de scroll avanzadas

**Archivos:** `src/pages/Home.tsx`, posible nuevo hook `src/hooks/useScrollReveal.ts`

Implementaciones con Framer Motion (sin librerías nuevas):

### a) Hero -> primera sección
- Línea decorativa SVG que se "dibuja" durante el scroll entre hero y social proof usando `useScroll` + `pathLength`

### b) Elementos con movimiento multidireccional
- Stats en sección 02: entran desde la izquierda, centro y derecha respectivamente
- Cards de áreas (sección 04): entrada alternada izquierda/derecha

### c) Texto que se revela palabra a palabra
- La quote del manifiesto (sección 07) se revela palabra por palabra usando `useScroll` + `useTransform` aplicado a la opacidad de cada palabra

### d) Efecto sticky narrativo
- Sección de dualidad (03 · Quién Soy): el headline queda sticky mientras el contenido de texto sube, usando `position: sticky` con CSS

### e) Footer reveal
- El footer aparece con un reveal desde abajo: `translateY: 40px -> 0` + `opacity` con `whileInView`

---

## 5. Sponsors — Solo legibilidad

**Archivo:** `src/pages/Sponsors.tsx`

Sin cambios de contenido:

- Sección 02 (Intro): aumentar `gap` de grid de `gap-5` a `gap-8`, padding interno de párrafos de `pt-6` a `pt-8`
- Sección 04 (Why): título de sección de `text-4xl` a `text-5xl sm:text-6xl md:text-7xl`, subtítulos de cards de `text-2xl` a `text-3xl`, body de `text-sm` a `text-[15px]`, padding de cards de `p-7` a `p-8 sm:p-10`
- Sección 03 (Value Add): aumentar padding vertical `py-20 sm:py-28` a `py-24 sm:py-32`
- Espaciado general entre secciones: incrementar `py-20 sm:py-28` a `py-24 sm:py-32` en las secciones principales

---

## Resumen técnico

| Cambio | Archivos |
|--------|----------|
| CTA rediseño | `BusinessButton.tsx` |
| Blog cinematográfico | `Home.tsx` (sección 05) |
| Animaciones scroll | `Home.tsx` (múltiples secciones) |
| Sponsors legibilidad | `Sponsors.tsx` |

- **0 librerías nuevas** — todo con Framer Motion existente + CSS
- **Mobile-first** en todos los cambios
- Paleta y tipografía actuales mantenidas
