# Components

Props are listed only where they are not obvious from the name. All components are in `src/components/`.

## ui/

| Component | Purpose | Notes |
| --- | --- | --- |
| `Button` | Link or button with variants `primary`, `accent`, `secondary`, `ghost`, `inverse`, `link`; sizes `sm/md/lg`; `arrow` animates an icon on hover | Renders `<Link>` for internal `href`, `<a target=_blank>` for external, `<button>` otherwise. |
| `Badge` | Pill label with tones `neutral`, `accent`, `moss`, `sun`, `ink`, `outline` | |
| `SectionHeading` | Eyebrow + display headline + lead + optional actions, with reveal | `size`, `align`, `tone`. |
| `PageHeader` | Page intro with breadcrumbs, split headline, lead, actions | Used by listing and supporting pages. |
| `Breadcrumbs` | Visible breadcrumbs + `BreadcrumbList` JSON-LD | |
| `Logo` | PDThemes logotype, tones `ink`/`paper` | |
| `Price` | Formats amounts; `compareAt` strike-through; `Free` for 0 | |
| `Icon` | Lucide icon by name (`features[].icon`) | Falls back to `Sparkles`. |
| `Accordion` | Accessible accordion (one open), CSS grid height animation | `defaultOpen`, `tone`. |
| `DemoNotice` | Yellow note for demonstration / placeholder content | |

## animations/

| Component | Purpose |
| --- | --- |
| `SmoothScroll` | Lenis provider on GSAP's ticker; exports `useLenis()` and `useScrollLock()`. |
| `Reveal` | Scroll-triggered reveal of children marked `data-reveal` (or the wrapper). `delay`, `stagger`, `y`, `start`, `once`. |
| `SplitHeadline` | SplitText line reveal; `trigger="mount" | "scroll"`. |
| `Marquee` | Seamless CSS marquee; `duration`, `reverse`, `velocitySkew`, `gap`; static under reduced motion. |

## navigation/

| Component | Purpose |
| --- | --- |
| `Header` | Fixed header: compact + blurred after 24 px, hides on fast downward scroll, Cmd/Ctrl+K search, mega-menu hover/keyboard handling, mobile menu trigger. |
| `MegaMenu` | Product list + live preview panel for Themes / Plugins. |
| `MobileMenu` | Full-height sheet with sections, product chips, CTAs; scroll-locked; Escape closes. |
| `SearchOverlay` | Command-palette search over products and pages (`lib/search.ts`); arrow keys + Enter. |

## home/

`Hero`, `Credibility`, `FeaturedProducts`, `HowItWorks` (pinned sequence), `BrandStatement` (marquees), `CatalogSection`, `WhyPDThemes` (sticky editorial list), `CustomerExperience` (tabs with illustrative previews), `Testimonials` (Embla; placeholders labelled), `BlogPreview`, `FaqSection` (with FAQ JSON-LD), `FinalCta`. Each reads copy from `src/content/pages/home.ts`.

## products/

| Component | Purpose |
| --- | --- |
| `ProductCard` | Card with screenshot, badges (Free / Free + Pro / Sale / Demo), hover action bar (Live Demo, View Details), price, Buy Now or Download. `variant="large"` for the featured grid. |
| `Catalog` | Client-side filtering with animated layout, URL sync (`?filter=`), empty state; `CatalogSkeleton` for Suspense. |
| `BuyButton` | Freemius checkout entry point with demonstration, success and error dialogs. |

## product/

| Component | Purpose |
| --- | --- |
| `ProductHero` | Breadcrumbs, badges, name (split reveal), tagline, price, CTAs (Buy / Download / Demo), demo notice, version/updated/WP/PHP meta, parallax screenshot. |
| `ProductGallery` | Device tabs, Embla strip, lightbox with keyboard navigation. Frames keep fixed ratios; images are contained, never stretched. |
| `DemoViewer` | Live demo modal with desktop/tablet/mobile widths, 6 s load fallback and direct external link; respects `demoAllowsEmbedding`. |
| `ProductStory` | Renders `story[]`: `statement`, `split`, `sticky` (parallaxed device frames), `compare` (free vs Pro table), `full`. |
| `PricingTable` | Tiers from product data with `BuyButton` per tier; free products get a download panel; freemium products get a "start with the free version" row. |
| `ProductFeatures`, `ProductSpecs`, `ProductDocs`, `ProductChangelog`, `ProductFaq` | Detail sections. |
| `RelatedProducts` | Three related cards (`relatedSlugs`, then same type). |
| `StickyPurchaseBar` | Appears when the hero leaves the viewport. |

## blog/

`PostCard` (`compact` / `feature`), `BlogList` (category tabs, reads `?category=`), `ReadingProgress` (scrubbed hairline).

## forms/

`NewsletterForm` (Zod, posts to `/api/newsletter`, demo-mode message), `ContactForm` (Zod, honeypot, field errors, posts to `/api/contact`, reads `?topic=`).

## footer/, layout/, marketing/

`Footer` (columns from `site.ts`, newsletter, wordmark reveal, back-to-top via Lenis), `SiteShell` (server: gathers nav data, wraps in `SmoothScroll`), `PromoBanner` (disabled unless `site.promo.enabled`).

## Adding a section

1. Put copy in `src/content/pages/*.ts`.
2. Build the section as a server component where possible; make it `"use client"` only for GSAP/Motion/Embla.
3. Wrap animated groups in `<Reveal>` and mark children with `data-reveal`.
4. Give the section an `id` and `aria-labelledby`.
5. Add a test in `tests/e2e/homepage.spec.ts` if it is on the homepage.
