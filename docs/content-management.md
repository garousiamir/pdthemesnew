# Content management

The site has no CMS. All content is in version-controlled files, validated at build time. This is deliberate: a studio with a dozen products and a monthly blog post does not need a hosted CMS, and a static build is faster and cheaper to run.

## What lives where

| Content | File(s) | How to edit |
| --- | --- | --- |
| Products | `src/content/products/<slug>.ts`, `index.ts` | See `docs/products.md`. |
| Product screenshots | `public/images/products/<slug>/` | Drop in files with the documented names and sizes, or run `npm run images -- <slug>`. |
| Categories and filters | `src/lib/validation/product.ts` (`productCategorySchema`), `src/lib/products.ts` (`categoryLabels`, `catalogFilters`) | Add the enum value, a label and (optionally) a filter chip. |
| Pricing | `pricing` in each product file | Tiers, prices, renewal notes, plan ids. |
| Demo links | `demoUrl`, `demoAllowsEmbedding` | Per product. |
| Featured products | `featured: true` + `order` | The homepage shows the first four featured products. |
| Documentation links | `documentationUrl` | Per product; the documentation landing links to product-page anchors until external docs exist. |
| Blog posts | `src/content/blog/<slug>.mdx` | Frontmatter + MDX body; `draft: true` hides a post in production. Covers in `public/images/blog/`. |
| Homepage copy | `src/content/pages/home.ts` | Hero, credibility, steps, statements, benefits, customer experience tabs, final CTA. |
| FAQ | `src/content/faq.ts` | Also feeds FAQ JSON-LD. |
| Testimonials | `src/content/testimonials.ts` + `site.testimonialsVerified` | Placeholders are labelled until `verified: true` and the site flag is set. |
| Legal pages | `src/content/pages/legal.ts` | Set `reviewed: true` after legal review to remove the notice. |
| Navigation, footer, social, promo | `src/lib/site.ts` | |
| Search index pages | `src/lib/search.ts` (`staticPages`) | Products are indexed automatically. |

## Blog frontmatter

```yaml
---
title: "…"                     # required
excerpt: "…"                   # ≤ 240 chars, used in cards and meta
category: "Engineering"        # free text; becomes a filter
date: "2026-09-12"             # ISO
updated: "2026-09-20"          # optional
author: "PDThemes Studio"
image: { src: "/images/blog/x.jpg", alt: "…", width: 1600, height: 1000 }
tags: ["block themes"]
featured: false
draft: false
---
```

Reading time is computed. Links starting with `/` render through `next/link`; external links open in a new tab.

## Editorial workflow

1. Create a branch, edit content, run `npm run build` (validation) and `npm run shots -- /blog/<slug>` to eyeball the page.
2. Open a pull request; CI runs lint, typecheck, build and the Playwright suite.
3. Merge → deploy.

## Migrating to a headless CMS later

The content layer is isolated behind `src/lib/products.ts`, `src/lib/blog.ts` and the content files. To move to a CMS:

1. Keep the Zod schemas as the contract. Map CMS fields to `ProductInput` and the blog frontmatter type.
2. Replace the file reads in `lib/products.ts` / `lib/blog.ts` with CMS fetches (ideally inside `"use cache"` functions once Cache Components are enabled, or with ISR via `revalidateTag`).
3. Add a webhook route (pattern: `src/app/api/freemius/webhook`) for on-publish revalidation.
4. Nothing in `components/` or `app/` needs to change.
