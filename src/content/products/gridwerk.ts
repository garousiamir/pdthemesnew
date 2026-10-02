import { defineProduct } from "@/lib/validation/product";
import { pluginCompat, shots } from "./_shared";

const s = shots("gridwerk", "Gridwerk");

export default defineProduct({
  id: "pd-plugin-gridwerk",
  slug: "gridwerk",
  name: "Gridwerk",
  type: "plugin",
  category: "utility",
  secondaryCategories: ["portfolio"],
  tagline: "Layout blocks for people who care about grids.",
  description: "A small set of layout blocks — masonry, strip, bento, sticky — that work with any block theme. Free, with a Pro pack of presets.",
  longDescription:
    "Gridwerk adds the layout primitives the block editor is missing: a masonry grid that respects image ratios, a horizontal strip with snap points, a bento grid with named areas, and a sticky-column block for storytelling sections. Each block exposes only the controls that matter and inherits spacing from your theme. The free version includes all four blocks; Pro adds a library of presets and query-loop variants.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/gridwerk/",
  documentationUrl: "/documentation#gridwerk",
  features: [
    { title: "Masonry", description: "Ratio-aware masonry without JavaScript layout thrash.", icon: "layout-dashboard" },
    { title: "Strip", description: "Horizontal strips with scroll snapping and optional drag.", icon: "gallery-horizontal" },
    { title: "Bento", description: "Named-area grids with per-breakpoint arrangement.", icon: "grid-3x3" },
    { title: "Sticky column", description: "Pin one column while the other scrolls — the classic storytelling layout.", icon: "pin" },
    { title: "Query variants (Pro)", description: "Use every layout as a query loop for posts, projects or products.", icon: "repeat" },
    { title: "Preset library (Pro)", description: "Forty presets to drop in and adapt.", icon: "library" },
  ],
  highlights: ["Free + Pro", "4 blocks", "Theme-agnostic", "No layout JS"],
  story: [
    { layout: "statement", title: "Four blocks, most layouts.", body: "Gridwerk is deliberately small. Each block does one thing well and composes with core blocks." },
    {
      layout: "compare",
      eyebrow: "Free vs Pro",
      title: "What Pro adds.",
      body: "All four blocks are free. Pro adds query-loop variants and a preset library.",
      compare: [
        { label: "Masonry, Strip, Bento, Sticky blocks", free: true, pro: true },
        { label: "Per-breakpoint controls", free: true, pro: true },
        { label: "Query-loop variants", free: false, pro: true },
        { label: "Preset library (40)", free: false, pro: true },
        { label: "Priority support", free: "Community forum", pro: true },
      ],
    },
  ],
  version: "2.0.1",
  updatedAt: "2026-09-21",
  releasedAt: "2025-01-28",
  compatibility: pluginCompat,
  requirements: ["PHP 8.0+", "WordPress 6.2+", "A block theme (recommended)"],
  pricing: {
    currency: "USD",
    free: false,
    tiers: [
      { id: "single", name: "Pro — single site", sites: 1, price: 29, billingCycle: "annual", renewalNote: "Renews yearly.", features: ["1 website", "Query variants and presets", "1 year of updates", "1 year of support"] },
      { id: "agency", name: "Pro — agency", sites: "unlimited", price: 99, billingCycle: "annual", renewalNote: "Renews yearly.", features: ["Unlimited websites", "Query variants and presets", "1 year of updates", "1 year of support"], highlighted: true },
    ],
    note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout.",
  },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_GRIDWERK_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_GRIDWERK_PUBLIC_KEY,
  freeDownloadUrl: "https://downloads.wordpress.org/plugin/gridwerk.latest-stable.zip",
  wordpressOrgUrl: "https://wordpress.org/plugins/gridwerk/",
  changelog: [
    { version: "2.0.1", date: "2026-09-21", changes: ["Fix: bento area names with special characters", "Improve: strip drag on trackpads"] },
    { version: "2.0.0", date: "2026-04-14", changes: ["New: sticky column block", "New: query-loop variants (Pro)"] },
  ],
  faqs: [
    { question: "Does Gridwerk work with classic themes?", answer: "It works, but spacing and colour inheritance are best with block themes." },
  ],
  relatedSlugs: ["nordlicht", "lumen", "formwerk"],
  status: "demo",
  featured: false,
  order: 80,
  seo: {
    title: "Gridwerk — Layout Blocks for WordPress",
    description: "Gridwerk adds masonry, strip, bento and sticky-column blocks to the WordPress editor. Free, with Pro presets and query variants. By PDThemes.",
    keywords: ["WordPress layout blocks", "masonry block", "bento grid WordPress"],
  },
});
