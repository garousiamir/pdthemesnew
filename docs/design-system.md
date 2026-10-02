# Design system

All tokens are declared once in `src/app/globals.css` inside `@theme` and are available as Tailwind utilities (`bg-paper`, `text-accent`, `rounded-lg`, `ease-out-expo`, `duration-base`, …).

## Typography

| Token / utility | Family | Size | Use |
| --- | --- | --- | --- |
| `display-xl` | Fraunces (opsz 144) | `clamp(3.25rem, 8.5vw, 8.75rem)`, lh 0.92, ls -0.035em | Page and hero headlines |
| `display-lg` | Fraunces | `clamp(2.75rem, 6.2vw, 6rem)`, lh 0.95 | Section headlines |
| `display-md` | Fraunces (opsz 96) | `clamp(2.125rem, 4.2vw, 4rem)` | Sub-section headlines |
| `display-sm` | Fraunces (opsz 72) | `clamp(1.625rem, 2.6vw, 2.5rem)` | Card headlines |
| `lead` | Geist | `clamp(1.0625rem, 1.3vw, 1.3125rem)`, lh 1.55, stone-600 | Intro paragraphs |
| body | Geist | 15–16px, lh 1.6 | Copy |
| `eyebrow` | Geist Mono | 11px, 0.14em tracking, uppercase, stone-500 | Labels |
| `accent-italic` | Fraunces italic 400, accent colour | — | One emphasised word per headline |

Fonts are self-hosted in `public/fonts` (Latin + Latin Extended). The three above-the-fold files are preloaded in `layout.tsx`. Metric-compatible fallbacks (`Fraunces Fallback`, `Geist Fallback`) limit layout shift.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `paper` / `paper-2` / `paper-3` | #f5f2ec / #ece7de / #e3dccf | backgrounds, alternate sections, frames |
| `ink` / `ink-2` / `ink-3` | #141311 / #211f1c / #2d2a26 | text, dark sections, hover |
| `stone-100…700` | warm greys | borders (200), muted text (500/600) |
| `accent` / `accent-ink` / `accent-soft` | #e4572e / #b8401c / #fbe3da | CTAs, highlights, badges |
| `moss` / `moss-soft` | #5b6b4a / #e4e9dc | free products, success |
| `sun` / `sun-soft` | #f2c14e / #fbefcf | demo / placeholder notices |

Contrast (WCAG 2.2): ink on paper 15.6:1; stone-600 on paper 6.5:1; white on accent 4.5:1; accent-ink on accent-soft 6.1:1.

## Spacing and layout

| Token | Value |
| --- | --- |
| `--gutter` | `clamp(1rem, 4vw, 4rem)` |
| `--section` | `clamp(5rem, 10vw, 10rem)` |
| `--header-h` | 5rem (4rem when scrolled) |
| `container-site` | 90rem (1440px) |
| Grid | 12 columns ≥ lg, 2–3 columns md, 1 column below |

Utilities: `container-x`, `section`, `section-t`, `section-b`, `hairline`, `hairline-t/b`, `dark-surface`, `mask-fade-x/y`, `frame`, `grain`, `no-scrollbar`, `link-underline`.

## Radii, shadows

| Token | Value |
| --- | --- |
| `rounded-xs … 2xl` | 6 / 10 / 14 / 20 / 28 / 40px |
| `shadow-card` | subtle lift for cards and dropdown previews |
| `shadow-float` | dropdowns, modals, sticky bar |
| `shadow-frame` | product screenshots |

## Motion tokens

| Token | Value |
| --- | --- |
| `ease-out-expo` | cubic-bezier(0.22, 1, 0.36, 1) |
| `ease-in-out-quart` | cubic-bezier(0.76, 0, 0.24, 1) |
| `ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) |
| `duration-fast / base / slow / hero` | 160 / 320 / 640 / 1100 ms |
| `animate-marquee(-reverse)` | CSS marquee, duration via `--marquee-duration` |
| `animate-scroll-y(-reverse)` | hero column loops |

See `docs/motion-specification.md` for how each component uses them.

## Breakpoints

Tailwind defaults (sm 640, md 768, lg 1024, xl 1280, 2xl 1536) plus `xs` (480px) and `3xl` (1920px). Layout decisions are made at `lg` (desktop nav, pinned sections) and `md` (two-column grids).

## Component states

- Interactive elements: hover darkens / lifts (160–320ms), `:focus-visible` shows a 2px accent outline with 3px offset, `active:scale-[0.98]` on buttons, `disabled` at 50% opacity.
- Cards: border to `ink/40` and `shadow-card` on hover or focus-within; screenshot scales 1.04; action bar slides in. On touch devices the action bar is always visible.
- Badges: `neutral`, `accent` (sale), `moss` (free), `sun` (demo / placeholder), `ink`, `outline`.
