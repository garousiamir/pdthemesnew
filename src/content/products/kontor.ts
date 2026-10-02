import { defineProduct } from "@/lib/validation/product";
import { shots, themeCompat, themeTiers } from "./_shared";

const s = shots("kontor", "Kontor");

export default defineProduct({
  id: "pd-theme-kontor",
  slug: "kontor",
  name: "Kontor",
  type: "theme",
  category: "business-agency",
  tagline: "A business theme with an editorial spine.",
  description: "Agency and consultancy theme with case-study templates, a services system and a quietly confident typographic style.",
  longDescription:
    "Kontor is built for studios, consultancies and small firms that want to look established without looking corporate. Case studies get their own post type with a story template, services are patterns rather than plugins, and the team, pricing and contact sections are all native blocks you can rearrange. Everything ships in the block editor — no shortcodes, no page builder lock-in.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/kontor/",
  documentationUrl: "/documentation#kontor",
  features: [
    { title: "Case-study system", description: "A custom post type with cover, challenge, approach and outcome sections, plus an index that filters by industry.", icon: "briefcase" },
    { title: "Services patterns", description: "Nine service-section patterns, from a three-column overview to a long-form process page.", icon: "list-tree" },
    { title: "Team and careers", description: "Team grid, person pages and a careers list that can pull from a JSON feed.", icon: "users" },
    { title: "Pricing tables", description: "Native pricing blocks with monthly/yearly toggles and feature comparisons.", icon: "table" },
    { title: "Style variations", description: "Four complete style variations — Paper, Ink, Slate and Clay — switchable in the site editor.", icon: "palette" },
    { title: "Forms ready", description: "Styled for Formwerk and the core contact form patterns.", icon: "mail" },
  ],
  highlights: ["Block theme", "4 style variations", "Case studies", "9 service patterns"],
  story: [
    { layout: "statement", title: "Confidence, not noise.", body: "Kontor leans on typography and whitespace. The result reads like a well-set annual report, not a template." },
    { layout: "split", eyebrow: "Case studies", title: "Tell the whole story.", body: "A structured case-study template guides the narrative from challenge to outcome and keeps every project page consistent.", image: s.gallery[1], bullets: ["Custom post type", "Industry filtering", "Related projects"] },
    { layout: "split", eyebrow: "Style variations", title: "Four looks, one theme.", body: "Switch between Paper, Ink, Slate and Clay in the site editor. Fonts, colours and spacing update everywhere at once.", image: s.gallery[0], reverse: true },
    { layout: "sticky", eyebrow: "Responsive", title: "Composed for every screen.", body: "Service grids become stacked cards, the case-study hero keeps its ratio, and navigation collapses into a full-screen menu.", images: [s.gallery[0], s.gallery[2], s.gallery[3]] },
  ],
  version: "2.1.0",
  updatedAt: "2026-08-27",
  releasedAt: "2025-06-17",
  compatibility: themeCompat,
  requirements: ["PHP 8.1+", "WordPress 6.4+"],
  pricing: { currency: "USD", free: false, tiers: themeTiers(59, 109, 219), note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout." },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_KONTOR_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_KONTOR_PUBLIC_KEY,
  changelog: [
    { version: "2.1.0", date: "2026-08-27", changes: ["New: Clay style variation", "New: careers JSON feed block", "Fix: sticky header on iOS Safari"] },
    { version: "2.0.0", date: "2026-02-10", changes: ["Rebuilt as a block theme", "New: case-study post type", "New: pricing blocks"] },
  ],
  faqs: [
    { question: "Does Kontor require a page builder?", answer: "No. Everything is built with the block editor and the site editor. No page builder is required or bundled." },
    { question: "Can I migrate from the 1.x classic version?", answer: "Yes. A migration guide in the documentation covers templates, widgets and menus. Content is untouched." },
  ],
  relatedSlugs: ["aurum", "nordlicht", "formwerk"],
  status: "demo",
  featured: true,
  order: 20,
  seo: {
    title: "Kontor — Business & Agency WordPress Theme",
    description: "Kontor is a block-based business theme with a case-study system, services patterns and four style variations. Built by PDThemes.",
    keywords: ["agency WordPress theme", "business WordPress theme", "block theme"],
  },
});
