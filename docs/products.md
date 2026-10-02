# Products

## Where products live

One TypeScript file per product in `src/content/products/`, registered in `src/content/products/index.ts`. Each file calls `defineProduct({...})`, which validates the object against the Zod schema in `src/lib/validation/product.ts` and throws at build time if anything is missing or malformed.

## The product model

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable internal id, e.g. `pd-theme-aurum`. |
| `slug` | kebab-case string | URL: `/products/<slug>`. Also the image folder name. |
| `name`, `tagline`, `description`, `longDescription` | strings | `description` ≤ 220 chars (cards, meta). |
| `type` | `theme` · `plugin` · `bundle` | Drives listing pages and install instructions. |
| `category` + `secondaryCategories` | `woocommerce` · `business-agency` · `blog-magazine` · `portfolio` · `utility` · `performance` · `marketing` | Catalog filters match either. |
| `thumbnail`, `gallery[]` | `{ src, alt, width, height, device, caption }` | `device` is `desktop`, `tablet`, `mobile` or `full-page`; the gallery uses it for tabs and frame ratios. |
| `demoUrl`, `demoAllowsEmbedding` | url, boolean | Omit `demoUrl` for products without a demo (the UI says so). Set `demoAllowsEmbedding: false` when the demo sends `X-Frame-Options`/CSP that blocks framing; the viewer then goes straight to the external link. |
| `documentationUrl` | path or url | Linked from the product page and docs landing. |
| `features[]` | `{ title, description, icon }` | `icon` is a Lucide name from `src/components/ui/icon.tsx`. |
| `highlights[]` | strings | Short chips (not currently rendered on cards; available for future use). |
| `story[]` | sections | Layouts: `statement`, `split`, `sticky`, `compare`, `full`. See `src/components/product/product-story.tsx`. |
| `version`, `updatedAt`, `releasedAt` | semver, ISO dates | Shown in the hero, specs and JSON-LD. |
| `compatibility`, `requirements[]` | object, strings | WordPress/PHP/WooCommerce versions, editors, browsers. |
| `pricing` | `{ currency, free, tiers[], note }` | Tier: `id`, `name`, `sites` (number or `"unlimited"`), `price`, `compareAtPrice?`, `billingCycle`, `renewalNote`, `features[]`, `highlighted`, `freemiusPlanId?`, `freemiusPricingId?`. |
| `freemiusProductId`, `freemiusPublicKey`, `freemiusPlanIds[]`, `freemiusPricingIds[]` | strings | Public identifiers only. Read from `NEXT_PUBLIC_FREEMIUS_<SLUG>_ID` / `_PUBLIC_KEY` in the content files. |
| `freeDownloadUrl`, `wordpressOrgUrl` | urls | Free products and the free version of freemium plugins. |
| `changelog[]`, `faqs[]`, `relatedSlugs[]` | arrays | |
| `status` | `live` · `demo` · `coming-soon` · `retired` | `demo` shows notices and withholds price schema; `retired` hides the product. |
| `featured`, `order` | boolean, number | Homepage featured grid (max 4) and sort order. |
| `seo` | `{ title ≤ 70, description ≤ 170, keywords[], ogImage? }` | |

## Adding a product

1. Copy an existing file in `src/content/products/` and change every field. Keep `status: "demo"` until the real screenshots, prices and Freemius ids are in place.
2. Add screenshots to `public/images/products/<slug>/`:
   - `desktop.jpg` 1440×900, `desktop-2.jpg` 1440×900, `tablet.jpg` 834×1112, `mobile.jpg` 390×844, `full.jpg` 1440×≤2600.
   - Or run `npm run images -- <slug>` after adding a template to `scripts/generate-product-images.mjs` to generate placeholders.
   - Use JPEG quality ~82 or WebP; keep each file under 300 KB.
3. Register the product in `src/content/products/index.ts`.
4. Add the two env vars to `.env.example` and your deployment (`NEXT_PUBLIC_FREEMIUS_<SLUG>_ID`, `NEXT_PUBLIC_FREEMIUS_<SLUG>_PUBLIC_KEY`).
5. Run `npm run build`. Validation errors name the field.
6. Add the product to the mega menu automatically (it reads from the catalog) and to the search index (automatic).

## Replacing the demonstration products

The eight shipped products (Aurum, Kontor, Nordlicht, Gazette, Lumen, Formwerk, Tempo, Gridwerk) are **fictional** demonstration products. Their screenshots are generated mock-sites, their changelogs and prices are placeholders. For each real product:

- replace the content file and images,
- set real Freemius ids and plan ids,
- set `status: "live"` (this enables `AggregateOffer` price schema on the product page),
- delete the demo products you do not need and remove them from `index.ts` and `.env.example`.

The "Demo product" badge, the hero notice and the pricing notice all key off `status === "demo"` and disappear automatically.

## Pricing rules

- Prices come only from the product file; the UI never hardcodes an amount.
- `compareAtPrice` renders a strike-through and a "Sale" badge. Set it only when a matching coupon or price change exists in Freemius, otherwise the checkout will show a different total.
- The final price, VAT and currency are always determined by Freemius at checkout. The pricing note says so on every paid product.
