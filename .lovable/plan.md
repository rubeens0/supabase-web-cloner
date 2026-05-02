
## Changes

### 1. Home page — Add EcomScrape to recent posts (`src/pages/Home.tsx`)
- Import `ecomscrapeImg` from `@/assets/ecomscrape-post.jpg`
- Add the EcomScrape entry to `allPosts` array with `id: "ecomscrape-launch"`, date `2026-05-01`, category marketing
- Since `latestPosts` takes the 3 most recent, EcomScrape will now appear as the newest entry on the homepage

### 2. Business page — Add links to collaborators (`src/pages/Business.tsx`)
- Add `secondaryLink` to the EcomScrape `BusinessSection` pointing to Anas Walton's Instagram: `https://www.instagram.com/anaswalton/` with text "Anas Walton · Instagram"

### 3. Blog post — Render clickable links (`src/pages/BlogPost.tsx`)
- In the EcomScrape blog post content, add a dedicated links section at the bottom of the article content with clickable `<a>` tags for:
  - Anas Walton Instagram: `https://www.instagram.com/anaswalton/`
  - soyrage.es: `https://soyrage.es`
  - ecomscrape.com: `https://ecomscrape.com`
- Implement a small inline link renderer in the default content rendering block (the fallback at the bottom of BlogPost.tsx) that detects URLs (https://...) in text and converts them to clickable `<a>` tags, so ecomscrape.com and other URLs render as links

### 4. Translation text — Emphasize collaboration (`src/contexts/LanguageContext.tsx`)
- Update `business.ecomscrape.extended` (ES) to: `'Colaboración de Rubén Muñoz con Anas Walton (@anaswalton) y soyrage.es. Inteligencia competitiva real: precios, bestsellers, tech stack, demografía y gasto en ads de cualquier tienda online en un solo clic.'`
- Update `business.ecomscrape.extended` (EN) to: `'A collaboration between Rubén Muñoz, Anas Walton (@anaswalton) and soyrage.es. Real competitive intelligence: pricing, bestsellers, tech stack, demographics and ad spend from any online store in a single click.'`

### Files modified
- `src/pages/Home.tsx`
- `src/pages/Business.tsx`
- `src/pages/BlogPost.tsx`
- `src/contexts/LanguageContext.tsx`
