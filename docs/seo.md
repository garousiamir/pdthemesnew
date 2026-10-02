# SEO

## Implemented

| Item | Where |
| --- | --- |
| Semantic HTML: one `h1` per page, ordered headings, `header`/`nav`/`main`/`footer` landmarks, lists for lists | all pages; verified by `tests/e2e/pages.spec.ts` |
| Unique `<title>` and description per page (`%s — PDThemes` template) | `createMetadata()` in `src/lib/seo/metadata.ts` |
| Canonical URL + `alternates.languages` (`en`, `x-default`) | same |
| Open Graph + Twitter cards, default OG image `public/images/brand/og-default.png` (1200×630) | `src/app/layout.tsx`, `createMetadata()` |
| XML sitemap with products, posts and static pages | `src/app/sitemap.ts` |
| `robots.txt` with sitemap reference, `/api/` disallowed | `src/app/robots.ts` |
| Breadcrumbs (visible + `BreadcrumbList` JSON-LD) | `src/components/ui/breadcrumbs.tsx` |
| `Organization` + `WebSite` JSON-LD | root layout |
| `SoftwareApplication` JSON-LD per product; offers only for `free` or `live` products | `productJsonLd()` |
| `Article` JSON-LD per post with published/modified dates | `articleJsonLd()` |
| `FAQPage` JSON-LD on homepage and `/faq` | `faqJsonLd()` |
| Responsive images via `next/image` with `sizes`, explicit dimensions everywhere, descriptive alt text from content | components |
| Internal linking: mega menu, related products, documentation landing, footer, blog "keep reading" | |
| SEO-friendly URLs: `/products/<slug>`, `/blog/<slug>`, `/legal/<slug>` | |
| No fabricated review schema, ratings or availability | enforced in `productJsonLd()`; tested |

## Not done on purpose

- No `AggregateRating` until verified reviews exist.
- No price schema for demonstration products.
- No hreflang pairs beyond `en`/`x-default` until German content exists.

## Launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://pdthemes.de`.
- [ ] Replace demonstration products or set them `retired`.
- [ ] Replace `public/images/brand/og-default.png` if the brand image changes.
- [ ] Submit `https://pdthemes.de/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- [ ] Verify structured data with the Rich Results test on a product page, a blog post and `/faq`.
- [ ] Confirm `robots.txt` is not blocking `/`.
- [ ] Run Lighthouse on `/`, `/products/<slug>` and a blog post; target ≥ 95 performance, 100 accessibility/SEO.
- [ ] Set up 301 redirects for any legacy URLs (`next.config.ts` → `redirects()`).

## Keywords

Product `seo.keywords` and page descriptions target the actual product categories ("WooCommerce theme", "block theme", "WordPress form plugin", "WordPress performance plugin", "portfolio WordPress theme", "magazine WordPress theme"). Update them with real search data once the products are live.

## Localisation

`site.locales` declares `en` and `de`. `createMetadata()` emits `alternates.languages`; extend it with the German URL once a `/de` tree exists. Fonts already include Latin Extended glyphs.
