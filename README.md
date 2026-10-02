# PDThemes — pdthemes.de

Commercial website for **PDThemes**, a studio selling premium WordPress themes and plugins. Built with Next.js 16, Tailwind CSS 4, GSAP, Lenis, Motion and Freemius.

> **Status:** complete site structure with demonstration content. Products, screenshots, testimonials and legal text are labelled placeholders until real data is supplied (see `docs/products.md`, `docs/maintenance.md`). The design reference (jkdevstudio.com) could not be inspected from the build environment; see `docs/reference-analysis.md`.

## Quick start

```bash
npm ci
cp .env.example .env.local        # optional; the site runs in demonstration mode without it
npm run dev                       # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js development, production build, production server |
| `npm run typecheck` / `lint` / `format` | TypeScript, ESLint, Prettier |
| `npm run test` | Playwright end-to-end suite (builds nothing; expects `npm run build` first, starts `next start` itself) |
| `npm run shots` | Full-page screenshots of 18 routes × 9 viewports with overflow detection |
| `npm run images` | Regenerates placeholder product screenshots, blog covers and the OG image |

In this cloud environment Playwright needs `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium`.

## What is in the box

- **Homepage**: animated hero with a continuously moving product showcase, credibility strip, featured products, pinned "how it works" sequence, brand marquees, filterable catalog, editorial "why" list, Freemius customer-experience tabs, testimonials (placeholders), blog preview, FAQ, final CTA, footer.
- **Product system**: Zod-validated product content, catalog pages (all / themes / plugins / free), product pages with hero, gallery + lightbox, live-demo viewer (desktop/tablet/mobile, embed fallback), storytelling sections, pricing tiers, specs, docs, changelog, FAQ, related products, sticky purchase bar.
- **Commerce**: Freemius overlay checkout via `@freemius/checkout`, demonstration mode when unconfigured, webhook endpoint with signature verification and idempotency, links to the Freemius customer portal (no custom account system).
- **Pages**: about, blog (MDX) + articles, documentation landing, support, contact (validated form + API), FAQ, license information, privacy / terms / refunds / cookies / imprint (draft, flagged for review), 404.
- **SEO**: metadata factory, canonical + OG, sitemap, robots, breadcrumbs, Organization / WebSite / SoftwareApplication / Article / FAQ JSON-LD (no fabricated ratings or prices).
- **Motion**: GSAP ScrollTrigger + SplitText, Lenis on GSAP's ticker, Motion for UI; every effect honours `prefers-reduced-motion`.
- **Tests**: 8 Playwright specs, desktop and mobile projects; screenshot sweep script.

## Documentation

| File | Contents |
| --- | --- |
| `docs/reference-analysis.md` | Reference research: what could be confirmed, what could not, and the PDThemes design system |
| `docs/motion-specification.md` | Every animation: trigger, duration, easing, reduced-motion behaviour |
| `docs/architecture.md` | Stack, directory layout, rendering model, data flow |
| `docs/design-system.md` | Tokens: type, colour, spacing, radii, shadows, motion, breakpoints, states |
| `docs/components.md` | Component inventory |
| `docs/products.md` | Product model and how to add / replace products |
| `docs/freemius-integration.md` | Checkout, licensing, freemium, webhooks, security |
| `docs/content-management.md` | Where content lives; CMS migration path |
| `docs/deployment.md` | Hosting, env vars, Docker, domain/SSL, Freemius setup, backups, rollback |
| `docs/seo.md` | Implemented SEO and launch checklist |
| `docs/testing.md` | Test suite, screenshot sweep, refinement passes |
| `docs/maintenance.md` | Routine tasks, updates, troubleshooting |

## Project structure

See `docs/architecture.md`. In short: `src/app` routes, `src/components` UI, `src/content` all editable content, `src/lib` data access / Freemius / SEO, `public/` fonts and images, `scripts/` tooling, `tests/` Playwright.

## License

Proprietary site code for PDThemes. Fonts: Fraunces, Geist and Geist Mono (SIL Open Font License). Product names Aurum, Kontor, Nordlicht, Gazette, Lumen, Formwerk, Tempo and Gridwerk are demonstration placeholders.
