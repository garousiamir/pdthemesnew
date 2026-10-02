import { defineProduct } from "@/lib/validation/product";
import { shots, themeCompat } from "./_shared";

const s = shots("lumen", "Lumen");

export default defineProduct({
  id: "pd-theme-lumen",
  slug: "lumen",
  name: "Lumen",
  type: "theme",
  category: "blog-magazine",
  secondaryCategories: ["portfolio"],
  tagline: "A free, quiet theme for writing.",
  description: "Free single-column blog theme with excellent typography, a dark scheme and nothing you do not need.",
  longDescription:
    "Lumen is the theme we use for our own notes. One column, a careful type scale, a dark scheme, and block patterns for the handful of things a writing site needs: an about block, a post list, a newsletter slot. It is free, GPL-licensed and intended for the WordPress.org directory. The PDThemes studio uses it to test block editor changes early, so it tends to support new WordPress features quickly.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/lumen/",
  documentationUrl: "/documentation#lumen",
  features: [
    { title: "One column, done well", description: "A reading measure, consistent rhythm and headings that stay in proportion at every size.", icon: "align-left" },
    { title: "Dark scheme", description: "A complete dark style variation, switchable in the site editor.", icon: "moon" },
    { title: "Six patterns", description: "About, post list, newsletter slot, quote, gallery row and footer.", icon: "layout-list" },
    { title: "Tiny footprint", description: "Under 40 KB of CSS, no JavaScript on the front end.", icon: "feather" },
  ],
  highlights: ["Free", "GPL", "Block theme", "No JS"],
  story: [
    { layout: "statement", title: "Writing first.", body: "Lumen removes decisions. Pick a colour, write, publish." },
    { layout: "split", eyebrow: "Typography", title: "A scale that holds.", body: "Heading, body and caption sizes are set on a modular scale and clamp between phone and desktop, so nothing looks oversized or cramped.", image: s.gallery[1] },
  ],
  version: "1.1.0",
  updatedAt: "2026-08-12",
  releasedAt: "2025-09-30",
  compatibility: themeCompat,
  requirements: ["PHP 8.0+", "WordPress 6.4+"],
  pricing: { currency: "USD", free: true, tiers: [] },
  freeDownloadUrl: "https://downloads.pdthemes.de/lumen/latest.zip",
  wordpressOrgUrl: "https://wordpress.org/themes/lumen-pd/",
  changelog: [
    { version: "1.1.0", date: "2026-08-12", changes: ["New: gallery row pattern", "Improve: dark scheme contrast"] },
    { version: "1.0.0", date: "2025-09-30", changes: ["Initial release"] },
  ],
  faqs: [
    { question: "Is there a Pro version of Lumen?", answer: "No. Lumen is complete as it is. If you need a magazine layout, look at Gazette." },
    { question: "Can I use Lumen on client sites?", answer: "Yes. It is GPL-licensed; use it anywhere." },
  ],
  relatedSlugs: ["gazette", "gridwerk", "tempo"],
  status: "demo",
  featured: false,
  order: 50,
  seo: {
    title: "Lumen — Free Minimal Blog WordPress Theme",
    description: "Lumen is a free, GPL-licensed single-column block theme for writers, with a dark scheme and no front-end JavaScript. By PDThemes.",
    keywords: ["free WordPress theme", "minimal blog theme", "block theme"],
  },
});
