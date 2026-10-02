# Motion specification

## Status of the evidence

The reference site could not be loaded from the build environment (see `docs/reference-analysis.md`, section 1). **No reference animation was observed.** Every entry below is therefore a *proposed PDThemes motion*, designed from the brief's description of the reference ("fluid movement, distinctive transitions, continuous horizontal image movement, sticky and pinned sections, scroll-linked product motion"). The "Reference" column is kept so that the table can be completed from a machine that can reach the site; today it reads "not observed" everywhere.

## Principles

1. Transforms and opacity only. No animated `width`, `height`, `top`, `left`, box-shadow or filter on scroll.
2. One easing family: `cubic-bezier(0.22, 1, 0.36, 1)` ("out-expo-ish") for entrances, `power3.inOut` for pinned sequences, linear for marquees.
3. Durations: 160ms (hover), 320ms (UI), 640ms (reveal), 1000–1400ms (hero).
4. Every GSAP timeline lives in a `gsap.context()` scoped to the component and is reverted on unmount. ScrollTriggers are killed with the context.
5. `prefers-reduced-motion: reduce` disables marquees, pinned sequences, parallax, and reduces reveals to a 200ms fade. Checked via `useReducedMotion()` (Motion) on the React side and `gsap.matchMedia()` on the GSAP side.
6. Lenis is only active on pointer-fine devices and never on touch; it is paused while a modal (search, lightbox, mobile menu) is open.

## Catalogue

| # | Element | Reference | PDThemes implementation | Trigger | Duration / delay | Easing | Mobile |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Hero headline | not observed | words split with GSAP SplitText, `y: 110% → 0`, `rotate 4deg → 0`, clip-path on each line | mount, after fonts ready | 1000ms, stagger 60ms, delay 120ms | expo.out | same, no rotate |
| 2 | Hero copy + CTAs | not observed | fade + `y: 24 → 0` | mount | 640ms, delay 500/620ms | expo.out | same |
| 3 | Hero product stacks | not observed | two vertical columns of screenshots translating continuously in opposite directions (`yPercent -50 → 0` loop); columns tilted `-6deg`; scroll adds `y` parallax; pointer adds ±6px tilt | mount + scroll | loop 40s / 48s; parallax scrubbed | linear / scrub 0.6 | single column, slower (56s), no pointer tilt |
| 4 | Header on scroll | not observed | after 24px: background to `paper/80` + blur, height 80 → 64, logo scale 1 → 0.9; hides on fast downward scroll, reveals on up | scroll | 320ms | out-expo | same |
| 5 | Mega menu | not observed | panel `opacity 0 → 1`, `y -8 → 0`, `scale 0.98 → 1`; items stagger 30ms; closes 160ms | hover / focus / Enter | 240ms open, 160ms close | out-expo | replaced by mobile menu |
| 6 | Mobile menu | not observed | full-screen sheet slides from right (`x 100% → 0`), links stagger `y 24 → 0`, backdrop fade; body scroll locked | tap | 420ms, stagger 40ms | out-expo | n/a |
| 7 | Search overlay | not observed | backdrop fade 200ms, panel `scale 0.96 → 1` + fade; results list layout-animated (Motion `layout`) | Cmd/Ctrl+K, click | 240ms | out-expo | panel becomes full-screen |
| 8 | Section reveals | not observed | `.reveal` elements: `y 32 → 0` + fade, stagger 80ms per group; once | ScrollTrigger `top 85%` | 720ms | expo.out | same |
| 9 | Marquee strips | not observed | duplicated track translating `xPercent 0 → -50` in a CSS keyframe; GSAP adds skew ±6deg proportional to scroll velocity (Lenis velocity) | mount | 28–36s loop | linear | shorter track, 40s |
| 10 | Featured product card hover | not observed | screenshot scale 1 → 1.04; action bar `y 12 → 0` + fade; card border ink | hover / focus-within | 480ms / 240ms | out-expo | actions always visible |
| 11 | "How it works" pinned sequence | not observed | section pinned for 300vh; three steps; left text swaps with crossfade+`y`, right stage morphs: step visuals crossfade, device frame rotates `-4 → 0 → 4deg`, progress rail fills | ScrollTrigger pin, scrub 0.8 | scrubbed | power2.inOut | unpinned, stacked steps with simple reveals |
| 12 | Catalog filter switch | not observed | Motion `AnimatePresence` + `layout`: leaving cards fade+scale 0.96, entering cards fade+`y 16`, remaining cards slide to new position | click | 320ms | out-expo | same |
| 13 | Why PDThemes list | not observed | left heading sticky; each benefit's text goes from `stone-400` to `ink` as it crosses the viewport centre (scrubbed colour via opacity of an overlay layer) | ScrollTrigger scrub | scrubbed | none | same |
| 14 | Customer experience tabs | not observed | tab indicator uses Motion `layoutId`; panel crossfade + `x 16 → 0` | click | 280ms | out-expo | tabs scroll horizontally |
| 15 | Testimonials carousel | not observed | Embla, drag + buttons, autoplay 6s paused on hover; slide opacity 0.4 → 1 when selected | drag / click / timer | 600ms | Embla default | same |
| 16 | FAQ accordion | not observed | `grid-template-rows 0fr → 1fr` CSS transition, chevron rotate 180deg; one open at a time | click / Enter / Space | 360ms | out-expo | same |
| 17 | Footer | not observed | big wordmark revealed `y 40% → 0` with clip; column links fade stagger | ScrollTrigger `top 90%` | 900ms | expo.out | same |
| 18 | Product page hero | not observed | title SplitText as #1; screenshot frame `scale 1.06 → 1` + fade; meta row stagger | mount | 1200ms | expo.out | same |
| 19 | Product gallery | not observed | Embla with device tabs; lightbox: backdrop fade, image `scale 0.92 → 1`; arrows, Escape, swipe | click | 320ms | out-expo | same |
| 20 | Demo viewer | not observed | modal with device-width toggle; iframe container width tweens between 100% / 834px / 390px; fallback card if iframe never fires `load` within 6s or site is known to block framing | click | 400ms | out-expo | opens demo in new tab instead |
| 21 | Sticky purchase bar | not observed | appears when hero price leaves viewport: `y 100% → 0` | ScrollTrigger | 320ms | out-expo | main use case |
| 22 | Scroll progress (article) | not observed | top hairline `scaleX 0 → 1` | scroll scrub | scrubbed | none | same |
| 23 | Page transitions | not observed | none implemented. Next.js App Router navigations are instant; a view-transition fade was prototyped and dropped because it fought Lenis' scroll restoration. | — | — | — | — |
| 24 | Floating promo | not observed | not implemented (no promotion exists). The `PromoBanner` component exists, disabled by `site.promo.enabled = false`. | — | — | — | — |

## Reduced-motion matrix

| Element | With `reduce` |
| --- | --- |
| 1, 2, 18 | single 200ms fade, no transform |
| 3, 9 | static; stacks render as a plain grid, marquees as a wrapped list |
| 11 | no pin; steps stacked, no scrub |
| 13 | all text full-contrast |
| 5, 6, 7, 12, 14, 16 | 120ms fade only |
| 15 | autoplay off |

## Performance budget

- Max 1 pinned ScrollTrigger per page (home: "How it works"; product: none).
- Marquees are CSS keyframes (compositor only); GSAP only writes the skew when velocity > 0.5.
- SplitText runs once per headline, after `document.fonts.ready`, and reverts on unmount.
- Lenis uses GSAP's ticker (`gsap.ticker.add`, `lagSmoothing(0)`) so there is one RAF loop.
- All images carry `width`/`height` or `aspect-*` wrappers, so reveals never cause layout shift.
