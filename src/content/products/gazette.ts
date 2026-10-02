import { defineProduct } from "@/lib/validation/product";
import { shots, themeCompat, themeTiers } from "./_shared";

const s = shots("gazette", "Gazette");

export default defineProduct({
  id: "pd-theme-gazette",
  slug: "gazette",
  name: "Gazette",
  type: "theme",
  category: "blog-magazine",
  tagline: "A magazine theme set like a newspaper.",
  description:
    "Multi-column magazine theme with editorial hierarchy, section fronts, and a reading experience tuned for long articles.",
  longDescription:
    "Gazette brings print discipline to the web: a strict grid, clear hierarchy between lead, secondary and brief stories, and section fronts that editors can arrange with query blocks. Articles get a reading-optimised measure, drop caps, pull quotes and footnotes. Ads and newsletter slots are patterns, so they can be placed and removed without a developer.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/gazette/",
  documentationUrl: "/documentation#gazette",
  features: [
    {
      title: "Section fronts",
      description:
        "Query-block layouts for lead, secondary and brief stories that editors can rearrange.",
      icon: "newspaper",
    },
    {
      title: "Reading experience",
      description:
        "A tuned measure, drop caps, pull quotes, footnotes and a progress indicator.",
      icon: "book-open",
    },
    {
      title: "Newsletter patterns",
      description:
        "Inline and end-of-article signup patterns, styled for common newsletter plugins.",
      icon: "mail-plus",
    },
    {
      title: "Author pages",
      description: "Author archives with bios, social links and a story list.",
      icon: "pen-line",
    },
    {
      title: "Ad slots",
      description:
        "Pattern-based ad positions that keep the grid intact when empty.",
      icon: "square-dashed",
    },
    {
      title: "Print-ready",
      description: "Print stylesheet for clean article printouts.",
      icon: "printer",
    },
  ],
  highlights: [
    "Block theme",
    "Section fronts",
    "Reading mode",
    "Newsletter ready",
  ],
  story: [
    {
      layout: "statement",
      title: "Hierarchy is the whole job.",
      body: "A magazine front page should tell the reader what matters most in a glance. Gazette's grid makes that decision visible.",
    },
    {
      layout: "split",
      eyebrow: "Articles",
      title: "Built for the long read.",
      body: "A comfortable measure, careful vertical rhythm and typographic details that make a 3,000-word article feel short.",
      image: s.gallery[1],
      bullets: ["Drop caps and pull quotes", "Footnotes", "Reading progress"],
    },
    {
      layout: "split",
      eyebrow: "Section fronts",
      title: "Arrange, don't code.",
      body: "Each section front is a set of query blocks. Editors swap the lead story, change the brief count or add a newsletter slot from the editor.",
      image: s.gallery[0],
      reverse: true,
    },
    {
      layout: "sticky",
      eyebrow: "Responsive",
      title: "Composed for every screen.",
      body: "Columns collapse in a defined order so the lead story is always first, and the brief list becomes a horizontal strip on phones.",
      images: [s.gallery[0], s.gallery[2], s.gallery[3]],
    },
  ],
  version: "1.0.4",
  updatedAt: "2026-09-25",
  releasedAt: "2026-05-08",
  compatibility: themeCompat,
  requirements: ["PHP 8.1+", "WordPress 6.4+"],
  pricing: {
    currency: "USD",
    free: false,
    tiers: themeTiers(49, 89, 189),
    note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout.",
  },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_GAZETTE_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_GAZETTE_PUBLIC_KEY,
  changelog: [
    {
      version: "1.0.4",
      date: "2026-09-25",
      changes: [
        "Fix: footnote anchors with smooth scrolling",
        "Improve: brief-list contrast",
      ],
    },
    { version: "1.0.0", date: "2026-05-08", changes: ["Initial release"] },
  ],
  faqs: [
    {
      question: "Does Gazette include a newsletter service?",
      answer:
        "No. It includes styled signup patterns that work with common newsletter plugins; the sending service is yours to choose.",
    },
  ],
  relatedSlugs: ["lumen", "nordlicht", "tempo"],
  status: "demo",
  featured: false,
  order: 40,
  seo: {
    title: "Gazette — Magazine WordPress Theme",
    description:
      "Gazette is a block-based magazine theme with editable section fronts, a tuned reading experience and newsletter patterns. Built by PDThemes.",
    keywords: [
      "magazine WordPress theme",
      "news WordPress theme",
      "blog theme",
    ],
  },
});
