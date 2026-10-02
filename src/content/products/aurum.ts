import { defineProduct } from "@/lib/validation/product";
import { shots, themeCompat, themeTiers } from "./_shared";

const s = shots("aurum", "Aurum");

export default defineProduct({
  id: "pd-theme-aurum",
  slug: "aurum",
  name: "Aurum",
  type: "theme",
  category: "woocommerce",
  secondaryCategories: ["business-agency"],
  tagline: "A storefront theme for considered brands.",
  description:
    "Editorial WooCommerce theme with large product photography, fast filtering and a checkout that stays out of the way.",
  longDescription:
    "Aurum treats every product page as a small magazine spread. Generous photography, measured typography and a restrained palette let the goods do the talking, while the shopping mechanics — variations, quick add, mini cart, filters — are built on native WooCommerce templates so they keep working after every update. The block-based templates can be rearranged in the site editor without touching code.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/aurum/",
  demoAllowsEmbedding: true,
  documentationUrl: "/documentation#aurum",
  features: [
    {
      title: "Native WooCommerce blocks",
      description:
        "Shop, category, cart and checkout templates use WooCommerce's own block templates, so compatibility is maintained by WooCommerce, not by overrides.",
      icon: "shopping-bag",
    },
    {
      title: "Editorial product layouts",
      description:
        "Three product page layouts: gallery-first, sticky summary and full-bleed story.",
      icon: "layout-template",
    },
    {
      title: "Instant filters",
      description:
        "Attribute, price and stock filters update the grid without a reload.",
      icon: "sliders-horizontal",
    },
    {
      title: "Lookbook patterns",
      description:
        "Twelve block patterns for campaigns, collections and seasonal landing pages.",
      icon: "images",
    },
    {
      title: "Performance budget",
      description:
        "No jQuery on the front end, system-font fallbacks and lazy-loaded galleries. Lighthouse performance 95+ on the demo content.",
      icon: "gauge",
    },
    {
      title: "Accessible by default",
      description:
        "Focus states, skip links, ARIA on the mini cart and colour contrast checked against WCAG 2.2 AA.",
      icon: "accessibility",
    },
  ],
  highlights: ["Block theme", "WooCommerce 9+", "12 patterns", "RTL ready"],
  story: [
    {
      layout: "statement",
      title: "Products deserve more than a grid.",
      body: "Aurum gives each product room: wide imagery, a sticky purchase summary and copy that reads like a catalogue, not a spreadsheet.",
    },
    {
      layout: "split",
      eyebrow: "Shop pages",
      title: "Filtering that feels immediate.",
      body: "Filters apply as you choose them, the URL updates so results can be shared, and nothing jumps while the grid refreshes.",
      image: s.gallery[1],
      bullets: [
        "Attribute, price and stock filters",
        "Shareable filter URLs",
        "Infinite or paginated loading",
      ],
    },
    {
      layout: "split",
      eyebrow: "Checkout",
      title: "A checkout that gets out of the way.",
      body: "The block checkout is styled, not replaced. Express payment buttons, order notes and coupon fields keep their native behaviour.",
      image: s.gallery[2],
      reverse: true,
    },
    {
      layout: "sticky",
      eyebrow: "Devices",
      title: "Composed for every screen.",
      body: "Layouts are recomposed, not just shrunk: product galleries become swipeable strips, filters move into a drawer, and the summary becomes a sticky purchase bar.",
      images: [s.gallery[0], s.gallery[2], s.gallery[3]],
    },
  ],
  version: "1.4.2",
  updatedAt: "2026-09-18",
  releasedAt: "2025-11-04",
  compatibility: { ...themeCompat, woocommerce: "9.0 or newer" },
  requirements: [
    "WooCommerce 9.0+",
    "PHP 8.1+",
    "A WordPress install with the block editor enabled",
  ],
  pricing: {
    currency: "USD",
    free: false,
    tiers: themeTiers(69, 129, 249),
    note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout.",
  },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_AURUM_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_AURUM_PUBLIC_KEY,
  changelog: [
    {
      version: "1.4.2",
      date: "2026-09-18",
      changes: [
        "Fix: mini cart focus trap on Safari 18",
        "Improve: filter drawer animation on low-end devices",
      ],
    },
    {
      version: "1.4.0",
      date: "2026-07-02",
      changes: [
        "New: full-bleed story product layout",
        "New: four campaign patterns",
        "Update: WooCommerce 9.x template parity",
      ],
    },
    {
      version: "1.3.0",
      date: "2026-03-11",
      changes: [
        "New: lookbook patterns",
        "Improve: product gallery keyboard navigation",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Aurum work with the classic WooCommerce shortcodes?",
      answer:
        "Yes. Block templates are the default, but the classic shortcode pages are styled too, so an existing store can switch without rebuilding its pages.",
    },
    {
      question: "Can I use Aurum without WooCommerce?",
      answer:
        "You can, but the shop-specific patterns will not appear. For a non-commerce business site, Kontor is the better fit.",
    },
  ],
  relatedSlugs: ["kontor", "tempo", "formwerk"],
  status: "demo",
  featured: true,
  order: 10,
  seo: {
    title: "Aurum — Editorial WooCommerce Theme",
    description:
      "Aurum is a block-based WooCommerce theme with editorial product layouts, instant filters and a native checkout. Built by PDThemes.",
    keywords: ["WooCommerce theme", "block theme", "WordPress shop theme"],
  },
});
