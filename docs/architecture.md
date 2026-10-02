# Architecture

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) | Static generation for every marketing page, route handlers for the three API endpoints, image optimisation, metadata API. |
| Styling | Tailwind CSS 4 | Design tokens live in `@theme` (see `src/app/globals.css`); utilities for layout; a handful of custom utilities (`container-x`, `section`, `display-*`, `eyebrow`). |
| Scroll motion | GSAP 3 + ScrollTrigger + SplitText | Pinned storytelling, scrubbed reveals, line-split headlines. GSAP is free for commercial use since 3.13. |
| Smooth scroll | Lenis | Driven by GSAP's ticker so there is one RAF loop. Disabled on touch and for reduced motion. |
| UI transitions | Motion for React (`motion/react`) | Menus, modals, layout animation in the catalog filter, tab indicators. |
| Carousels | Embla | Testimonials and the product gallery. |
| Icons | Lucide | Mapped by name for product features in `src/components/ui/icon.tsx`. |
| Validation | Zod 4 | Product content schema, blog frontmatter, form payloads, webhook payloads. |
| Content | TypeScript files (products, copy, FAQ, legal) + MDX (blog) | No CMS; see `docs/content-management.md`. |
| Commerce | Freemius (`@freemius/checkout`) | Overlay checkout, licensing, customer portal, webhooks. |
| Testing | Playwright | E2E suite in `tests/e2e`, screenshot sweep in `scripts/screenshots.mjs`. |

## Directory layout

```
src/
  app/                    routes (App Router)
    page.tsx              homepage
    products/             catalog + [slug] product pages
    themes/ plugins/ free/
    blog/ [slug]
    about/ contact/ support/ documentation/ faq/ license/
    legal/[slug]          privacy, terms, refunds, cookies, imprint
    api/                  newsletter, contact, freemius/webhook
    sitemap.ts robots.ts not-found.tsx layout.tsx globals.css
  components/
    animations/           SmoothScroll, Reveal, SplitHeadline, Marquee
    navigation/           Header, MegaMenu, MobileMenu, SearchOverlay
    home/                 one component per homepage section
    products/             ProductCard, Catalog, BuyButton
    product/              product page sections (hero, gallery, story, pricing, …)
    blog/ forms/ footer/ marketing/ layout/ ui/
  content/
    products/*.ts         one file per product, validated with defineProduct()
    blog/*.mdx            articles with frontmatter
    pages/                home copy, legal text
    faq.ts testimonials.ts
  lib/
    products.ts           queries over the product content
    blog.ts               MDX loading
    search.ts             search index
    site.ts               global config and navigation
    freemius/             config (public ids), checkout wrapper, webhook helpers
    seo/                  metadata factory, JSON-LD builders
    validation/           Zod schemas
    gsap.ts utils.ts analytics/
  hooks/                  useReducedMotion, useMediaQuery
  types/                  shared types
public/
  fonts/ images/ icon.svg apple-icon.png
scripts/                  image generator, screenshot sweep
tests/                    e2e specs, reference inspection script
docs/
```

## Rendering model

- Every page is prerendered at build time (`○` or `●` in the build output). Product and blog pages use `generateStaticParams`.
- Pages that react to query strings (`/products?filter=`, `/blog?category=`, `/contact?topic=`) read them on the client with `useUrlParam()` (`useSyncExternalStore` over `location.search`), so the full content is in the prerendered HTML and no Suspense fallback replaces it.
- Only the three API routes are dynamic.
- Cache Components are not enabled; the default static model is sufficient because there is no per-request data.

## Data flow

```
content/products/*.ts ──defineProduct(zod)──▶ lib/products.ts ──▶ pages / components
content/blog/*.mdx    ──gray-matter + zod──▶ lib/blog.ts ─────▶ blog pages (compileMDX at build)
lib/site.ts ────────────────────────────────▶ header, footer, metadata
env (NEXT_PUBLIC_FREEMIUS_*) ──▶ content/products (ids) ──▶ lib/freemius/config ──▶ BuyButton ──▶ @freemius/checkout
```

Invalid content fails `next build` with a readable message, so a bad product file never reaches production.

## Client / server boundary

Server components gather data (`SiteShell`, pages, product sections) and pass plain objects to client components (`Header`, `Catalog`, `BuyButton`, animated sections). Client components never import `fs`, `gray-matter` or the product content directly.

## Animation architecture

- `getGsap()` registers plugins once on the client.
- Every GSAP effect lives inside `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference)` query and is reverted on unmount, which also kills its ScrollTriggers.
- `SmoothScroll` provides Lenis through context; modals call `useScrollLock` to stop it.
- `Marquee` is CSS keyframes; GSAP only adds a velocity skew on fine-pointer devices.
- Route changes reset scroll and refresh ScrollTrigger (see `SmoothScroll`).

## Localisation readiness

- All copy is in `src/content` or in page files, not in components.
- `site.locales` lists `en` and `de`; metadata emits `alternates.languages` with `x-default`.
- Fonts include the Latin Extended subset (umlauts, ß).
- To add German: introduce a `[locale]` segment (or `next-intl`), move `src/content/pages/*.ts` into per-locale files, and extend `createMetadata` to emit `hreflang` pairs. Product content already separates `seo` fields per product so translations can be added as `seo.de`.

## Known limitations

- The webhook's idempotency store is in-memory (`MemoryEventStore`). Fine for a single long-running Node process; replace with a KV/database implementation for serverless deployments (`EventStore` interface).
- No customer account UI: licenses are managed in the Freemius customer portal by design.
- Demonstration products and placeholder testimonials ship with the repository and are labelled in the UI; see `docs/products.md` for replacing them.
