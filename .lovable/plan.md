## Rediseño general — Fase 1: Home

Mantenemos **toda la copia actual** (traducciones intactas en `LanguageContext.tsx`) y la **tipografía actual** (`Inter / SF Pro Display / system-ui`). Solo cambia la **estructura, composición y personalidad visual** de la Home, inspirada en tu propuesta HTML.

Si te gusta cómo queda, replicamos el lenguaje en Business, Blog, Contact, etc. en fases siguientes.

---

### Lenguaje visual nuevo (sistema compartido)

- **Acento**: rojo `#CC2200` (sustituye al rojo brillante actual; más editorial, menos "sport").
- **Bordes**: `0.5px solid white/10` en todos los bloques (línea fina = personalidad editorial).
- **Cards**: fondo `white/[0.02]`, radius medio (`rounded-xl`), sin sombras.
- **Section labels**: pequeñas, en mayúsculas, `tracking-[0.12em]`, color `white/40` ("SECCIÓN 01", "PRUEBA SOCIAL"…).
- **Badges**: pill rojo translúcido (`bg-red/12 border-red/35`) para tags como "Built from scratch".
- **Headline hero**: corto, partido en líneas, palabra clave en rojo.
- **Botones**: pill `rounded-full`, primario rojo sólido, secundarios outline fino.
- **Sin** `backdrop-blur` pesado en cards (solo en nav).

---

### Nueva estructura de la Home

```text
┌───────────────────────────────────────────────┐
│ NAV (sin cambios estructurales, solo color)   │
├───────────────────────────────────────────────┤
│ 1. HERO                                       │
│   [badge] Piloto · Fundador · 2026           │
│   Headline corto en 3 líneas, "condiciones"  │
│   en rojo. Sub corta. 3 CTAs en fila.        │
│   Fondo: home-hero-bg.webp + overlay negro.  │
├───────────────────────────────────────────────┤
│ 2. PRUEBA SOCIAL — franja ~120px              │
│   Dos stat-cards: "2024." año inicio /        │
│   "2 frentes" karting + digital.              │
├───────────────────────────────────────────────┤
│ 3. QUIÉN SOY — split dualidad                 │
│   Izq: "En la pista" — Piloto de karting.    │
│   Der: "Fuera de la pista" — Emprendedor.    │
│   Debajo: párrafos t('home.about.p1/2/3')    │
│   y CTA "Conóceme" → /contacto.              │
│   (Conserva imagen about-image.png a la dcha)│
├───────────────────────────────────────────────┤
│ 4. ÁREAS (Karting + Marketing)                │
│   Mismas 2 cards actuales pero con el        │
│   nuevo lenguaje (border 0.5px, label num.)  │
├───────────────────────────────────────────────┤
│ 5. BLOG EN HOME — 3 últimas entradas          │
│   Grid 3 cards horizontales con tag + título │
│   Link a /blog. Lee posts desde mismos       │
│   datos que /blog (sin contenido nuevo).     │
├───────────────────────────────────────────────┤
│ 6. QUOTE — sección actual con AnimatedLogo   │
│   Adaptada al nuevo border style.             │
├───────────────────────────────────────────────┤
│ 7. CTA FINAL — "Hablemos"                     │
│   Bloque oscuro con borde rojo sutil.        │
│   "¿Tienes una propuesta? Hablemos. Siempre  │
│   abierto a lo que tiene sentido."           │
│   3 botones: Contacto / Business /            │
│   Patrocinadores. Reemplaza el CTA suelto.   │
└───────────────────────────────────────────────┘
```

---

### Cambios concretos por sección (sin tocar copia)

1. **Hero**: el headline largo (`t('home.hero.title')` con HTML) se renderiza tal cual pero envuelto en un layout más editorial: badge arriba, headline grande con line-height ajustado, sub más corta visualmente con `max-w-md`, los 3 botones existentes (Ver historia / Business / Patrocinadores) pasan a pills rojos+outline. **Cero cambios de texto.**
2. **Stats**: nueva sección puramente visual (sin texto traducido nuevo — usamos "2024" y "2 frentes" como literales que ya están en la propuesta). Si prefieres que sean traducibles, añadimos 4 keys nuevas en `LanguageContext`.
3. **Dualidad**: reorganización del actual "About". El texto `home.about.p1/p2/p3` y la imagen `aboutImage` se conservan; arriba se añade el split visual de las dos caras con sub-labels `t('home.areas.karting.title')` y `t('home.areas.marketing.title')` reusados.
4. **Áreas**: mismas cards, restyle (border fino, número de sección, tag rojo).
5. **Blog en home**: nuevo. Lee los mismos posts que `/blog` (importando del mismo origen). 3 más recientes. Si el blog no expone una API simple, lo dejamos como placeholders maquetados y cableamos en una mini-iteración.
6. **Quote**: igual contenido, restyle de borde y label "06 · MANIFIESTO".
7. **CTA final**: usa textos existentes (`home.about.cta`, `nav.business`, `footer.sponsors`).

---

### Detalles técnicos

- Editamos solo `src/pages/Home.tsx` (reescritura completa de la composición).
- Añadimos **una sola variable CSS** `--accent-red: 204 100% 40%` (HSL de #CC2200) en `src/index.css` y la usamos vía `text-[hsl(var(--accent-red))]` y `bg-[hsl(var(--accent-red))]`. No tocamos los tokens existentes para no romper otras páginas.
- Reusamos `Button`, `ImageWithFallback`, `motion/react`, `AnimatedLogo` ya presentes.
- Animaciones: respetamos `getPerformanceSettings()` igual que ahora (entradas suaves, sin nuevos efectos pesados).
- Imágenes existentes reutilizadas: `home-hero-bg.webp`, `about-image.png`, `karting-image.webp`, `marketing-image.webp`. Sin assets nuevos.
- Para el bloque "Blog en home": leeremos los posts del mismo módulo que usa `src/pages/Blog.tsx` (lo inspecciono al implementar). Si requiere fetch async, fallback a 3 cards estáticas con los títulos actuales para no romper el render.
- **Nada** se modifica en: `Navigation`, `Footer`, `App.tsx`, rutas, traducciones, otras páginas.

---

### Fuera de alcance de esta fase

- Business, Blog, Contact, Cek2026, Sponsors, Dossier — se rediseñan en fases posteriores **una vez apruebes la Home** para mantener consistencia.
- Cambios de copia, idioma o rutas.
- Cambios de fuente.

---

### Resultado esperado

Una Home con la misma información pero con personalidad editorial clara: bloques numerados con bordes finos, headline más rotundo, dualidad piloto/emprendedor explícita, blog visible sin navegar, y un CTA final concreto en lugar de botones flotantes sueltos.
