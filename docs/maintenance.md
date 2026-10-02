# Maintenance

## Routine

| Cadence | Task |
| --- | --- |
| Each product release | Update `version`, `updatedAt`, `changelog` in the product file; regenerate or replace screenshots if the UI changed; publish a short post in `src/content/blog/` under the `Changelog` category. |
| Monthly | `npm outdated`; update patch/minor versions; run `npm run typecheck && npm run lint && npm run build && npm run test`. |
| Quarterly | Review `docs/motion-specification.md` performance budget against a Lighthouse run; re-run `npm run shots` and skim the mobile widths. |
| With each WordPress release | Update `compatibility.wordpress` where tested; mention in the changelog. |
| Yearly | Review legal pages with counsel; update `updated` dates and `reviewed` flags. |

## Updating dependencies

- Next.js majors: read `node_modules/next/dist/docs/01-app/01-getting-started/18-upgrading.md` first (the bundled docs are authoritative for the installed version). `params`/`searchParams` are promises; keep `"use client"` boundaries as they are.
- Tailwind 4: tokens are in `@theme`; custom utilities use `@utility`. No `tailwind.config.js`.
- GSAP: plugins are registered once in `src/lib/gsap.ts`.
- `@freemius/checkout`: check the changelog for renamed options; the wrapper in `src/lib/freemius/checkout.ts` is the only place that calls it.

## Replacing placeholder content

| Placeholder | Where | Switch |
| --- | --- | --- |
| Demonstration products | `src/content/products/*.ts` | `status: "live"` once real |
| Product screenshots | `public/images/products/<slug>/` | replace files, keep names |
| Testimonials | `src/content/testimonials.ts` | `verified: true` per entry, `site.testimonialsVerified = true` |
| Legal text | `src/content/pages/legal.ts` | `reviewed: true` after review |
| Freemius ids | `.env` | `NEXT_PUBLIC_FREEMIUS_<SLUG>_ID` |
| Contact / newsletter delivery | `.env` | `CONTACT_ENDPOINT`, `NEWSLETTER_ENDPOINT` |

## Monitoring

- Uptime check on `/` and `/products`.
- Log alerts on `[freemius:webhook]` and `[contact]` / `[newsletter]` error lines.
- Search Console coverage report after each content change that adds or removes URLs (the sitemap is regenerated on build).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Build fails with "Invalid product …" | content validation | the message names the field; fix the content file |
| Buy Now shows the demonstration dialog in production | missing `NEXT_PUBLIC_FREEMIUS_<SLUG>_ID` or `NEXT_PUBLIC_FREEMIUS_DEMO_MODE=true` | set the env var and redeploy (public env vars are inlined at build time) |
| Webhook returns 401 | wrong secret or body re-serialised by a proxy | compare the secret key; ensure the raw body reaches the route |
| Headline invisible | a parent tween animates the headline's opacity while `SplitHeadline` waits for fonts | exclude the `h1` from parent tweens (see `product-hero.tsx`) |
| Horizontal scroll on phones | a grid child with un-wrappable content | add `min-w-0` to the grid column; run `npm run shots -- <route> 375` |
| Scroll feels stuck after closing a modal | `useScrollLock` not released | ensure the modal unmounts (AnimatePresence) and `locked` becomes false |
