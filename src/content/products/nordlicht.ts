import { defineProduct } from "@/lib/validation/product";
import { shots, themeCompat, themeTiers } from "./_shared";

const s = shots("nordlicht", "Nordlicht");

export default defineProduct({
  id: "pd-theme-nordlicht",
  slug: "nordlicht",
  name: "Nordlicht",
  type: "theme",
  category: "portfolio",
  tagline: "A portfolio theme that moves with intent.",
  description: "Portfolio theme for designers, photographers and studios with cinematic project pages and restrained scroll motion.",
  longDescription:
    "Nordlicht is for work that needs space. Project pages open with a full-bleed cover, media sits edge to edge, and captions stay small. Motion is deliberate: reveals on scroll, a horizontal project strip on the home page and a hover-preview index. All of it respects reduced-motion settings and degrades to a clean static layout.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/nordlicht/",
  documentationUrl: "/documentation#nordlicht",
  features: [
    { title: "Project post type", description: "Projects with cover media, credits, year and client fields, and a filterable index.", icon: "image" },
    { title: "Three index styles", description: "Grid, list with hover previews, and a horizontal strip.", icon: "layout-grid" },
    { title: "Native lightbox", description: "Keyboard- and swipe-friendly lightbox for galleries without an extra plugin.", icon: "maximize" },
    { title: "Video covers", description: "Self-hosted or embedded video covers with poster fallbacks.", icon: "video" },
    { title: "Motion settings", description: "Reveal, parallax and strip motion can be toggled per site and automatically respect reduced motion.", icon: "move" },
    { title: "Dark and light", description: "Two complete colour schemes with a visitor toggle.", icon: "moon" },
  ],
  highlights: ["Block theme", "Project post type", "Lightbox", "Dark mode"],
  story: [
    { layout: "statement", title: "Let the work set the pace.", body: "Nordlicht's motion is restrained on purpose: it directs attention to the project, never to itself." },
    { layout: "split", eyebrow: "Project pages", title: "Cinematic, then quiet.", body: "A full-bleed cover opens each project. Below it, media runs edge to edge with small captions and generous rhythm.", image: s.gallery[1], bullets: ["Full-bleed covers", "Video or image", "Credits and metadata"] },
    { layout: "split", eyebrow: "Index", title: "Hover to preview.", body: "The list index shows a floating preview of each project as you move across titles — a small detail that makes browsing a long list enjoyable.", image: s.gallery[0], reverse: true },
    { layout: "sticky", eyebrow: "Responsive", title: "Composed for every screen.", body: "The horizontal strip becomes a swipeable carousel, hover previews become inline thumbnails, and covers keep a safe ratio.", images: [s.gallery[0], s.gallery[2], s.gallery[3]] },
  ],
  version: "1.2.1",
  updatedAt: "2026-09-02",
  releasedAt: "2026-01-20",
  compatibility: themeCompat,
  requirements: ["PHP 8.1+", "WordPress 6.4+"],
  pricing: { currency: "USD", free: false, tiers: themeTiers(49, 89, 189), note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout." },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_NORDLICHT_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_NORDLICHT_PUBLIC_KEY,
  changelog: [
    { version: "1.2.1", date: "2026-09-02", changes: ["Fix: lightbox swipe threshold on Android", "Improve: strip performance on long indexes"] },
    { version: "1.2.0", date: "2026-06-15", changes: ["New: video covers", "New: visitor dark-mode toggle"] },
  ],
  faqs: [
    { question: "Can I disable all the motion?", answer: "Yes. A single theme setting turns off reveals, parallax and the strip. The theme also honours the visitor's reduced-motion preference automatically." },
  ],
  relatedSlugs: ["kontor", "gridwerk", "gazette"],
  status: "demo",
  featured: true,
  order: 30,
  seo: {
    title: "Nordlicht — Portfolio WordPress Theme",
    description: "Nordlicht is a block-based portfolio theme with cinematic project pages, a native lightbox and restrained scroll motion. Built by PDThemes.",
    keywords: ["portfolio WordPress theme", "photography WordPress theme", "block theme"],
  },
});
