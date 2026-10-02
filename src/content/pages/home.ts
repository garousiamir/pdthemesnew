/**
 * Homepage copy. Edit text here; components only render it.
 */
export const hero = {
  eyebrow: "WordPress themes & plugins — a studio in Germany",
  headline: ["Premium WordPress Products.", "Built Beyond Expectations."],
  lead: "Thoughtfully designed themes and powerful plugins to help creators, businesses, and agencies build extraordinary websites.",
  primary: { label: "Explore Products", href: "/products" },
  secondary: { label: "Discover Our Studio", href: "/about" },
};

export const credibility = {
  eyebrow: "Built for the WordPress you actually run",
  platforms: ["WordPress 6.4+", "Block editor", "Site editor", "WooCommerce 9", "PHP 8.1", "GPL licensed", "Freemius checkout", "WordPress.org"],
  commitments: [
    { title: "Documented in detail", body: "Every product ships with installation, setup and customization guides, written by the people who built it." },
    { title: "Updated, not abandoned", body: "Themes and plugins are tested against each WordPress release. Updates arrive in your WordPress admin through Freemius." },
    { title: "Answered by the developer", body: "Support requests go to the engineers who wrote the code, with a clear response-time commitment on every plan." },
  ],
};

export const steps = [
  {
    n: "01",
    title: "Explore and choose",
    body: "Browse the catalog, open a live demo at any screen size, compare license tiers, and pick the product that fits the job.",
    detail: "Every product page shows version, update date, compatibility and a full changelog before you buy.",
  },
  {
    n: "02",
    title: "Download and install",
    body: "Checkout runs through Freemius. You receive the download and a license key immediately, then upload the zip in your WordPress admin.",
    detail: "Activate the license once and updates appear in the WordPress updates screen like any other plugin or theme.",
  },
  {
    n: "03",
    title: "Customize and launch",
    body: "Import the demo content if you like, adjust colours and typography in the site editor, and publish. No page builder required.",
    detail: "Need a hand? Documentation and developer support are included with every license.",
  },
];

export const statements = ["Designed with purpose.", "Built for creators.", "Made to perform."];

export const benefits = [
  { n: "01", title: "Thoughtful user experience", body: "Interfaces that explain themselves: sensible defaults, clear states, nothing hidden behind a wall of toggles." },
  { n: "02", title: "Maintainable code", body: "Native WordPress APIs, block templates and standard hooks. Nothing that fights the next core update." },
  { n: "03", title: "Responsive by design", body: "Layouts are recomposed for each screen, not just shrunk. Tested at nine viewports before every release." },
  { n: "04", title: "Accessible", body: "Keyboard navigation, visible focus, semantic markup and contrast checked against WCAG 2.2 AA." },
  { n: "05", title: "Clear documentation", body: "Written guides for installation, setup and customization, kept in step with each version." },
  { n: "06", title: "Product updates", body: "Compatibility updates for WordPress, WooCommerce and PHP releases, delivered in your admin." },
  { n: "07", title: "Developer support", body: "Questions are answered by the engineers who built the product, not a ticket queue." },
  { n: "08", title: "Easy customization", body: "Style variations, patterns and theme.json settings so you can make it yours without touching PHP." },
];

export const experience = {
  eyebrow: "Buying and licensing",
  title: "A purchase that stays simple after the purchase.",
  lead: "Checkout, licenses, downloads, updates and renewals are handled by Freemius, a licensing platform built for WordPress products. PDThemes does not run a separate account system — one login covers everything.",
  tabs: [
    {
      id: "purchase",
      label: "Purchase",
      title: "Secure overlay checkout",
      body: "The Freemius checkout opens on the product page. Pay by card or PayPal, in your currency, with VAT handled for you. The download and license key arrive by email within seconds.",
      ui: "checkout",
    },
    {
      id: "licenses",
      label: "License management",
      title: "Activate, move, or deactivate sites",
      body: "Your license shows every site it is active on. Deactivate a staging site to free a slot, or upgrade to a larger tier and keep the same key.",
      ui: "licenses",
    },
    {
      id: "downloads",
      label: "Downloads",
      title: "Every version, always available",
      body: "Download the current release or any previous version from the customer portal. Useful for rollbacks and for setting up a new site.",
      ui: "downloads",
    },
    {
      id: "updates",
      label: "Updates",
      title: "Updates in your WordPress admin",
      body: "Once the license is activated on a site, new versions appear in the WordPress updates screen. No manual uploads, no FTP.",
      ui: "updates",
    },
    {
      id: "renewals",
      label: "Renewals",
      title: "Renew, or don't",
      body: "Annual licenses renew automatically with a reminder beforehand. Cancel any time: the product keeps working, you just stop receiving updates and support.",
      ui: "renewals",
    },
    {
      id: "support",
      label: "Support",
      title: "Support tied to your license",
      body: "Open a request from the support page with your license key. Requests from active licenses are answered first.",
      ui: "support",
    },
  ],
  note: "Account, invoices and license management live in the Freemius customer portal (users.freemius.com). PDThemes does not store payment details.",
};

export const finalCta = {
  eyebrow: "Start building",
  title: ["Build something", "extraordinary."],
  lead: "Pick a theme, add a plugin or two, and launch a site that feels considered from the first scroll.",
  primary: { label: "Explore Products", href: "/products" },
  secondary: { label: "Talk to us", href: "/contact" },
};
