import { defineProduct } from "@/lib/validation/product";
import { pluginCompat, shots } from "./_shared";

const s = shots("tempo", "Tempo");

export default defineProduct({
  id: "pd-plugin-tempo",
  slug: "tempo",
  name: "Tempo",
  type: "plugin",
  category: "performance",
  secondaryCategories: ["utility"],
  tagline: "Performance tuning you can explain to a client.",
  description:
    "Performance plugin with page caching, critical CSS, image policies and a report that shows what changed and why.",
  longDescription:
    "Most performance plugins are a wall of toggles. Tempo starts from a measurement: it runs a page audit, proposes a small set of changes, applies them, and shows the before and after. Page caching, critical CSS, script deferral, image policies and font preloading are all present, but each one is explained in plain language and can be rolled back individually.",
  ...s,
  demoUrl: undefined,
  documentationUrl: "/documentation#tempo",
  features: [
    {
      title: "Audit first",
      description:
        "A built-in audit measures Core Web Vitals in the field and lab before anything is changed.",
      icon: "activity",
    },
    {
      title: "Page cache",
      description:
        "Disk-based page cache with smart purging on content updates and WooCommerce awareness.",
      icon: "hard-drive",
    },
    {
      title: "Critical CSS",
      description:
        "Per-template critical CSS generated locally, no external service.",
      icon: "scissors",
    },
    {
      title: "Script policies",
      description:
        "Defer, delay-until-interaction or exclude scripts with per-page overrides.",
      icon: "code",
    },
    {
      title: "Image policies",
      description: "Lazy loading rules, size hints and modern format delivery.",
      icon: "image",
    },
    {
      title: "Change report",
      description:
        "Every change is logged with its measured effect, so you can show a client what was done.",
      icon: "file-bar-chart",
    },
  ],
  highlights: [
    "Annual license",
    "No external service",
    "WooCommerce aware",
    "Rollback per change",
  ],
  story: [
    {
      layout: "statement",
      title: "Measure, change, measure again.",
      body: "Tempo does nothing it cannot show you the effect of.",
    },
    {
      layout: "split",
      eyebrow: "Change report",
      title: "Proof, not promises.",
      body: "Each applied optimisation records a before-and-after measurement. Export the report as a PDF for a client or a stakeholder.",
      image: s.gallery[1],
      bullets: ["Field and lab metrics", "Per-change rollback", "PDF export"],
    },
    {
      layout: "split",
      eyebrow: "Caching",
      title: "A cache that understands your site.",
      body: "Purges run on post updates, menu changes and WooCommerce stock events. Logged-in users and carts are never served cached pages.",
      image: s.gallery[0],
      reverse: true,
    },
  ],
  version: "1.6.3",
  updatedAt: "2026-09-10",
  releasedAt: "2025-03-03",
  compatibility: { ...pluginCompat, woocommerce: "8.0 or newer (optional)" },
  requirements: [
    "PHP 8.0+",
    "WordPress 6.2+",
    "Write access to wp-content/cache",
  ],
  pricing: {
    currency: "USD",
    free: false,
    tiers: [
      {
        id: "single",
        name: "Single site",
        sites: 1,
        price: 39,
        billingCycle: "annual",
        renewalNote:
          "Renews yearly. The plugin keeps working if you cancel; updates and support stop.",
        features: [
          "1 website",
          "All features",
          "1 year of updates",
          "1 year of support",
        ],
      },
      {
        id: "studio",
        name: "Studio",
        sites: 5,
        price: 89,
        billingCycle: "annual",
        renewalNote: "Renews yearly.",
        features: [
          "Up to 5 websites",
          "All features",
          "1 year of updates",
          "1 year of support",
        ],
        highlighted: true,
      },
      {
        id: "agency",
        name: "Agency",
        sites: "unlimited",
        price: 179,
        billingCycle: "annual",
        renewalNote: "Renews yearly.",
        features: [
          "Unlimited websites",
          "All features",
          "1 year of updates",
          "1 year of support",
          "White-label reports",
        ],
      },
    ],
    note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout.",
  },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_TEMPO_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_TEMPO_PUBLIC_KEY,
  changelog: [
    {
      version: "1.6.3",
      date: "2026-09-10",
      changes: [
        "Fix: critical CSS for templates with inline SVG",
        "Improve: purge on WooCommerce stock change",
      ],
    },
    {
      version: "1.6.0",
      date: "2026-06-01",
      changes: [
        "New: white-label reports (Agency)",
        "New: delay-until-interaction script policy",
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a live demo?",
      answer:
        "Not for Tempo; it works inside wp-admin. The documentation includes a walkthrough with screenshots.",
    },
    {
      question: "Does Tempo send data to a third-party service?",
      answer:
        "No. Audits, critical CSS and reports are generated on your server.",
    },
  ],
  relatedSlugs: ["aurum", "gazette", "formwerk"],
  status: "demo",
  featured: false,
  order: 70,
  seo: {
    title: "Tempo — WordPress Performance Plugin with Change Reports",
    description:
      "Tempo audits, optimises and reports: page cache, critical CSS, script and image policies, with per-change rollback and no external service.",
    keywords: [
      "WordPress performance plugin",
      "page cache plugin",
      "critical CSS WordPress",
    ],
  },
});
