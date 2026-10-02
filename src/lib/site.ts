/**
 * Global site configuration. Content that appears in more than one place
 * (navigation, footer, social links, legal entity) lives here so that it can be
 * edited without touching components.
 */
export const site = {
  name: "PDThemes",
  legalName: "PDThemes",
  tagline: "Premium WordPress Products. Built Beyond Expectations.",
  description:
    "Thoughtfully designed WordPress themes and powerful plugins to help creators, businesses, and agencies build extraordinary websites.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdthemes.de",
  locale: "en",
  locales: ["en", "de"] as const,
  email: "hello@pdthemes.de",
  supportEmail: "support@pdthemes.de",
  location: "Germany",
  social: {
    github: "https://github.com/pdthemes",
    x: "https://x.com/pdthemes",
    youtube: "https://www.youtube.com/@pdthemes",
    wordpress: "https://profiles.wordpress.org/pdthemes/",
  },
  promo: {
    enabled: false,
    message: "",
    href: "",
  },
  /** Set to true once real customer reviews exist and have been added to content/testimonials.ts */
  testimonialsVerified: false,
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const primaryNav: { label: string; href: string; menu?: "themes" | "plugins" }[] = [
  { label: "Themes", href: "/themes", menu: "themes" },
  { label: "Plugins", href: "/plugins", menu: "plugins" },
  { label: "All Products", href: "/products" },
  { label: "Documentation", href: "/documentation" },
  { label: "Support", href: "/support" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "All products", href: "/products" },
      { label: "WordPress themes", href: "/themes" },
      { label: "WordPress plugins", href: "/plugins" },
      { label: "Free products", href: "/free" },
      { label: "Licensing", href: "/license" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/blog?category=Changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About PDThemes", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Account & licenses", href: "/support#account" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms & conditions", href: "/legal/terms" },
      { label: "Refund policy", href: "/legal/refunds" },
      { label: "Cookie policy", href: "/legal/cookies" },
      { label: "Imprint", href: "/legal/imprint" },
    ],
  },
];
