# Reference analysis — jkdevstudio.com

Status: **partial, secondhand**. Read the access note first.

## 1. Access note (read this before trusting anything below)

The build environment for this project runs behind an organisation egress proxy. Every attempt to reach the reference site was refused at the proxy with a `403` on `CONNECT`:

| Attempt | Result |
| --- | --- |
| `curl https://jkdevstudio.com` | `CONNECT tunnel failed, response 403` |
| Playwright / Chromium page load | blocked at the same proxy, never reached the host |
| `WebFetch` tool | `EGRESS_BLOCKED: Access to jkdevstudio.com is blocked by the network egress proxy` |
| Wayback Machine (`web.archive.org`) | blocked |
| Read-through proxies (`r.jina.ai`) | blocked |

Consequences:

- **No screenshots, DOM measurements, computed styles, or animation timings of the reference were captured.** None appear in this document or in `motion-specification.md`.
- Everything in section 2 comes from public search-engine snippets of the site and its subdomains (collected with the only web tool that worked, a search API). Snippets expose text, structure, pricing and product names. They expose nothing visual.
- Everything in sections 3 to 5 is a **proposed** PDThemes design system. It is informed by the brief's description of the reference ("editorial sophistication, large expressive typography, premium whitespace, marquees, sticky storytelling, fluid movement") but it is not a measurement of the reference, and it is not claimed to match it.
- The visual-comparison phase (Phase 11 in the brief) could therefore only compare PDThemes against itself across viewports. See `docs/testing.md` for what was actually captured.

To complete the audit as originally specified, re-run the inspection script in `tests/reference/` from a machine that can reach the site, or add `jkdevstudio.com`, `docs.jkdevstudio.com` and `hub.jkdevstudio.com` to the allowed domains of the cloud environment and re-run this session's research step.

## 2. Confirmed from public search snippets

These statements are supported by text that search engines index from the reference and its subdomains. They are facts about *content and information architecture*, not about design.

### 2.1 Site structure

| Area | Evidence |
| --- | --- |
| Home | `https://jkdevstudio.com/` — title "Premium WordPress Themes & Plugins". Headline copy indexed as: premium WordPress themes and plugins "on 3,000+ sites, documented in detail, still updated years later, and answered by the developer who wrote them". |
| Themes listing | `/themes/` — "WordPress Themes & Plugins". Lists theme products with "from" prices. |
| Plugins listing | `/plugins/` |
| Shop | `/shop/` |
| Announcements | `/announcements/` — "What's New" (changelog / news style page) |
| FAQ | `/faq/` — "FAQ - Answers to Your Questions" |
| Terms | `/terms-conditions/` |
| Documentation | separate subdomain `docs.jkdevstudio.com`, organised per product → sections such as *Getting started → What's included*, *Installation → Demo import* |
| Customer hub | separate subdomain `hub.jkdevstudio.com` with a knowledge base and license management ("customer portal for license management and support") |
| Product pages | `/themes/<slug>/` e.g. `/themes/fabula/`, `/themes/qreatix/` |
| Theme demos | per-product subdomains, e.g. `elisen-theme.jkdevstudio.com`, `fabula-theme.jkdevstudio.com/home-5/` (multiple demo homepages per theme) |
| Checkout | the store appears on `creem.io/stores/jkdevstudio`, i.e. the reference uses a third-party merchant-of-record checkout, **not** Freemius. PDThemes uses Freemius by requirement, so the purchase flow is intentionally different. |

### 2.2 Products (names and prices as indexed, October 2026)

| Product | Type | Indexed pricing |
| --- | --- | --- |
| Elisen | Blog & magazine theme | ThemeForest listing exists; also sold directly |
| Fabula | News & magazine theme | Regular $69 · Premium $39 · Agency $199 |
| Monogram | Personal portfolio theme | from $69 |
| Norto | Creative portfolio theme | from $29 |
| Qreatix | Interactive portfolio theme | Regular $49 · Premium $19 · Agency $39 |
| Grafton, Melady, Enardo, Exquil, Maniel, Klamath | themes | from $29–$69 |
| Cronix | plugin | from $29 |
| Nitrol | plugin | from $50 |
| Lazyline | plugin | from $50 |
| JKD Theme Companion | free plugin | listed on WordPress.org |

Observations that shaped PDThemes:

- Three license tiers per product (**Regular / Premium / Agency**) with "unlimited sites" on the top tier, one-time payment, lifetime updates, 12 months support on the mid tier. PDThemes mirrors the *shape* (three tiers, a site-count ladder) but prices and terms are placeholders until real Freemius plans exist.
- Products are sold both on a marketplace (ThemeForest) and directly, with direct purchase pitched as cheaper and with automatic updates in the WordPress admin "once the site is activated". PDThemes adopts the same argument in the "Customer experience" section, phrased around Freemius.
- "Live Preview" and "Buy" are the two primary product actions. PDThemes uses "Live Demo" / "Buy Now" plus "View Details".
- Social proof is quantified on the reference ("3,400+ happy customers", "4.9/5 from 240 reviews"). Those are the reference's numbers; **none of them are reused**. PDThemes shows no numbers it cannot verify.
- Documentation is separated per product with a consistent section tree (Getting started, Installation, Demo import, …). PDThemes' `documentationUrl` field and the Documentation landing page follow that tree.

### 2.3 Copy tone

Indexed sentences are short, confident and specific ("still updated years later", "answered by the developer who wrote them", "dependable and built to last"). PDThemes copy follows the same register but is original.

## 3. PDThemes design system (proposed, original)

Nothing here is a measurement of the reference.

### 3.1 Layout

| Token | Value | Notes |
| --- | --- | --- |
| Max container | 1440px | `.container-x` = `max-w-[1440px]` with fluid gutters |
| Gutter | `clamp(16px, 4vw, 64px)` | 16px at 320px, 64px from ~1600px |
| Section rhythm | `clamp(80px, 10vw, 160px)` vertical | `.section` utility |
| Grid | 12 columns on `lg`, 6 on `md`, 4 on mobile | Tailwind grid utilities |
| Corner radii | 6 / 12 / 20 / 28px + pill | cards use 20px, screenshots 12px |

### 3.2 Typography

| Role | Family | Settings |
| --- | --- | --- |
| Display | Fraunces (variable, opsz 9–144, wght 300–900, italic) | headlines at `clamp(2.75rem, 7.5vw, 7.5rem)`, tracking -0.03em, leading 0.95; italic used for one emphasised word per headline |
| Body / UI | Geist (variable 300–800) | 16–18px body, 1.6 leading; labels 11–13px uppercase with 0.12em tracking |
| Meta / code | Geist Mono (400–600) | version numbers, dates, prices in tables |

Fonts are self-hosted from `public/fonts` (Latin + Latin Extended subsets, which cover German).

### 3.3 Colour

| Token | Light value | Role |
| --- | --- | --- |
| `--color-paper` | `#F5F2EC` | page background |
| `--color-paper-2` | `#ECE7DE` | alternate section background |
| `--color-ink` | `#141311` | primary text, dark sections |
| `--color-ink-2` | `#2A2824` | dark section surface |
| `--color-stone-*` | 100–700 warm greys | borders, muted text |
| `--color-accent` | `#E4572E` (persimmon) | primary CTA, highlights |
| `--color-accent-ink` | `#B8401C` | hover state |
| `--color-moss` | `#5B6B4A` | secondary accent (free products, success) |

Contrast: body text on paper 15.6:1; accent on paper 4.6:1 (AA for large text and UI); white on accent 4.5:1.

### 3.4 Elevation and borders

Hairline borders (`1px` `stone-200`) are preferred to shadows. Only floating elements (dropdowns, lightbox, sticky purchase bar) use shadows: `0 24px 64px -24px rgb(20 19 17 / 0.35)`.

### 3.5 Product imagery

All product screenshots are **generated placeholders**: small HTML mock-sites rendered with Playwright at desktop (1440×900), tablet (834×1112), mobile (390×844) and full-page sizes. They are labelled in the product data (`status: "demo"`) and on the product page. They must be replaced by real screenshots before launch (`docs/products.md`).

## 4. Component inventory

See `docs/components.md`. Each component lists its props and which page uses it.

## 5. Responsive behaviour

Breakpoints: 320 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920. Screens are captured by `npm run shots` into `tests/screenshots/` (git-ignored). Findings per pass are in `docs/testing.md`.
