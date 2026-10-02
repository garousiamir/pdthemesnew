import { defineProduct } from "@/lib/validation/product";
import { pluginCompat, shots } from "./_shared";

const s = shots("formwerk", "Formwerk");

export default defineProduct({
  id: "pd-plugin-formwerk",
  slug: "formwerk",
  name: "Formwerk",
  type: "plugin",
  category: "marketing",
  secondaryCategories: ["utility"],
  tagline: "Forms built in the block editor, not beside it.",
  description: "Form builder that uses native blocks for fields, validation and conditional logic. Free core, Pro adds integrations and multi-step forms.",
  longDescription:
    "Formwerk treats a form as a group of blocks. Fields are blocks, layouts are columns, and styling comes from your theme. Validation runs on the server and the client, submissions are stored with export and retention rules, and spam protection works without a third-party service. The free version covers contact and lead forms; Pro adds multi-step forms, conditional logic, file uploads, and integrations with mail and CRM services.",
  ...s,
  demoUrl: "https://demo.pdthemes.de/formwerk/",
  demoAllowsEmbedding: false,
  documentationUrl: "/documentation#formwerk",
  features: [
    { title: "Fields are blocks", description: "Text, email, select, checkbox, radio, date, number, phone and hidden fields, each a native block.", icon: "text-cursor-input" },
    { title: "Theme-native styling", description: "No form CSS to fight. Fields inherit your theme's typography, colours and spacing.", icon: "paintbrush" },
    { title: "Server-side validation", description: "Rules run on the server first; client validation is a convenience, never the gate.", icon: "shield-check" },
    { title: "Submissions and export", description: "Stored submissions with search, CSV export and retention policies for privacy compliance.", icon: "database" },
    { title: "Multi-step forms (Pro)", description: "Step blocks with progress, per-step validation and resume.", icon: "list-ordered" },
    { title: "Integrations (Pro)", description: "Mail services, CRMs and webhooks, each configured per form.", icon: "plug" },
  ],
  highlights: ["Free + Pro", "Native blocks", "No tracking", "GDPR tooling"],
  story: [
    { layout: "statement", title: "A form is just blocks.", body: "Formwerk does not open a separate builder. You add a form block, drop fields into it, and style them like everything else on the page." },
    { layout: "split", eyebrow: "Validation", title: "Honest validation.", body: "Every rule runs on the server. The client mirrors it for instant feedback, but a disabled script never means an unvalidated submission.", image: s.gallery[1], bullets: ["Required, pattern, min/max, email, URL", "Custom messages per field", "Honeypot and time-based spam checks"] },
    {
      layout: "compare",
      eyebrow: "Free vs Pro",
      title: "What Pro adds.",
      body: "The free version is complete for contact and lead forms. Pro is for teams that need steps, logic and integrations.",
      compare: [
        { label: "Field blocks", free: true, pro: true },
        { label: "Server-side validation", free: true, pro: true },
        { label: "Submissions and CSV export", free: true, pro: true },
        { label: "Spam protection", free: true, pro: true },
        { label: "Conditional logic", free: false, pro: true },
        { label: "Multi-step forms", free: false, pro: true },
        { label: "File uploads", free: false, pro: true },
        { label: "Mail, CRM and webhook integrations", free: false, pro: true },
        { label: "Priority support", free: "Community forum", pro: true },
      ],
    },
  ],
  version: "3.2.0",
  updatedAt: "2026-09-29",
  releasedAt: "2024-10-15",
  compatibility: pluginCompat,
  requirements: ["PHP 8.0+", "WordPress 6.2+"],
  pricing: {
    currency: "USD",
    free: false,
    tiers: [
      { id: "single", name: "Pro — single site", sites: 1, price: 49, billingCycle: "annual", renewalNote: "Renews yearly. Pro features keep working if you cancel; updates and support stop.", features: ["1 website", "All Pro features", "1 year of updates", "1 year of priority support"] },
      { id: "studio", name: "Pro — studio", sites: 5, price: 99, billingCycle: "annual", renewalNote: "Renews yearly.", features: ["Up to 5 websites", "All Pro features", "1 year of updates", "1 year of priority support"], highlighted: true },
      { id: "agency", name: "Pro — agency", sites: "unlimited", price: 199, billingCycle: "annual", renewalNote: "Renews yearly.", features: ["Unlimited websites", "All Pro features", "1 year of updates", "1 year of priority support"] },
    ],
    note: "Prices shown are demonstration values. Final prices, taxes and currency are set in Freemius at checkout.",
  },
  freemiusProductId: process.env.NEXT_PUBLIC_FREEMIUS_FORMWERK_ID,
  freemiusPublicKey: process.env.NEXT_PUBLIC_FREEMIUS_FORMWERK_PUBLIC_KEY,
  freeDownloadUrl: "https://downloads.wordpress.org/plugin/formwerk.latest-stable.zip",
  wordpressOrgUrl: "https://wordpress.org/plugins/formwerk/",
  changelog: [
    { version: "3.2.0", date: "2026-09-29", changes: ["New: phone field with country formats", "New: retention policies per form", "Fix: step resume after session expiry (Pro)"] },
    { version: "3.1.0", date: "2026-05-20", changes: ["New: webhook integration (Pro)", "Improve: CSV export performance for large tables"] },
  ],
  faqs: [
    { question: "Does the free version limit the number of forms or submissions?", answer: "No. There are no caps in the free version." },
    { question: "How is Pro delivered?", answer: "Pro is a separate plugin download from your Freemius account that works alongside the free plugin. Updates arrive in the WordPress updates screen once the license is activated." },
  ],
  relatedSlugs: ["kontor", "aurum", "gridwerk"],
  status: "demo",
  featured: true,
  order: 60,
  seo: {
    title: "Formwerk — Block-Native WordPress Form Builder",
    description: "Formwerk builds forms with native blocks: server-side validation, stored submissions, spam protection. Free core, Pro adds steps, logic and integrations.",
    keywords: ["WordPress form plugin", "block form builder", "contact form plugin"],
  },
});
