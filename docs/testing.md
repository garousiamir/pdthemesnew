# Testing

## Automated suite

`npm run test` runs Playwright against a production build (`next start`, started automatically unless `BASE_URL` is set). Two projects: `desktop` (1440×900 Chrome) and `mobile` (Pixel 7 emulation).

| Spec | Covers |
| --- | --- |
| `homepage.spec.ts` | section rendering, single `h1`, landmarks, no horizontal overflow, placeholder labelling of testimonials, FAQ accordion (mouse + keyboard), JSON-LD presence and absence of fabricated ratings |
| `catalog.spec.ts` | product listing, category filtering without reload, URL sync, type pages, free page, every card links to a 200 |
| `product.spec.ts` | hero + metadata + canonical, gallery tabs and lightbox keyboard navigation, demo viewer with viewport controls, embedding-blocked fallback, missing demo URL, free product downloads, freemium comparison, sticky purchase bar, 404 for unknown product |
| `checkout.spec.ts` | demo-mode Buy Now dialog, tier selection, no request to Freemius, SDK option mapping with a mocked SDK |
| `navigation.spec.ts` | header links, mega menu (hover + keyboard + Escape), mobile menu with scroll lock, search overlay with keyboard, empty search state, skip link + focus visibility, footer/sitemap/robots link integrity |
| `pages.spec.ts` | every route: 200, one `h1`, title, no overflow, no page errors; blog filtering and article rendering; legal review notice; 404 |
| `forms.spec.ts` | contact validation (client + API), newsletter validation and demo mode, webhook signature/secret handling |
| `motion.spec.ts` | reduced-motion: content visible, no marquee tracks, no pinning; with motion: headline revealed, pinned section present on desktop |

Freemius is never contacted: products run in demonstration mode in tests and one test asserts that no request to `freemius.com` is made.

Run in this environment with the pre-installed browser:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium npm run test
```

## Latest run

Production build, Chromium (pre-installed `/opt/pw-browsers/chromium`), desktop + mobile projects:

| Result | Count |
| --- | --- |
| Passed | 119 |
| Skipped (device-specific variants) | 3 |
| Failed | 0 |

## Screenshot sweep

`npm run shots` captures full-page screenshots of 18 routes at 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 / 320 px into `tests/screenshots/` (git-ignored) and reports horizontal overflow and console errors. `MOTION=on` captures with animations after scrolling through the page.

## Visual comparison with the reference (Phase 11)

**Not performed against the reference.** The reference host is blocked by the build environment's network policy (`docs/reference-analysis.md`, section 1), so no reference screenshot exists to compare against. `tests/reference/inspect-reference.mjs` is ready to run from a machine with normal access; once its output exists, compare it side by side with `tests/screenshots/` and record deviations in `docs/reference-analysis.md`.

What *was* done, in three passes over PDThemes itself:

### Pass 1 — layout fidelity
- Hero: showcase column collapsed because its only child was absolutely positioned → gave the column height; headline reduced from 8.5vw to 6.4vw to keep four lines inside the viewport at 1440.
- Showcase bled behind the transparent header → constrained to start below the header.
- Customer-experience tab strip and pricing table forced horizontal overflow at ≤ 768 px (grid items with `min-width: auto`) → `min-w-0` on grid columns, `flex-wrap` on the secondary button row. Sweep re-run: no overflow on any route at any width.

### Pass 2 — visual refinement
- Product name on product pages rendered invisible: a stagger tween captured the headline's opacity while SplitText waited for fonts → headline excluded from the stagger.
- Demo/placeholder notices standardised (`DemoNotice`), badge tones aligned (`sun` for demo, `moss` for free, `accent` for sale).
- Footer wordmark sized to bleed to the container edge; blog cover compositions generated in the brand palette.

### Pass 2b — hydration and modals
- Dialogs (checkout, demo viewer, lightbox, search, mobile menu) were positioned relative to GSAP-transformed ancestors (a `transform` makes them the containing block for `position: fixed`), which pushed them off-screen on phones → every modal now renders through `Portal` into `document.body`.
- `useSearchParams` forced a Suspense fallback into the prerendered HTML of the catalog, blog and contact pages (product cards missing from static HTML) → replaced with `useUrlParam()`, a `useSyncExternalStore` read of `location.search`.

### Pass 3 — motion and interaction
- "How it works" step highlight was out of sync with the stage crossfade → active index now derived from timeline time (crossfades centred at seconds 1 and 2).
- Search overlay and demo viewer refactored to mount-fresh panels (no state resets in effects); Lenis exposed through a ref so modals can stop it without re-rendering the tree.
- Marquee velocity skew limited to fine-pointer devices; all reveals verified to render instantly under `prefers-reduced-motion`.

## Manual checks performed

- Keyboard walk-through of header, mega menu, mobile menu, search, accordion, gallery lightbox, demo viewer and forms.
- Viewport review of home, catalog, product and blog pages at 1440 and 390 px with motion on, and all 18 routes × 9 widths with motion off (sweep).

## Not yet covered

- Real Freemius sandbox purchase (requires credentials).
- Cross-browser runs (Firefox / WebKit) — add projects to `playwright.config.ts` once those browsers are installed.
- Lighthouse / axe automation — recommended addition in CI (`@axe-core/playwright`).
