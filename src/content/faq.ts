import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    category: "Purchases",
    question: "How does a purchase work?",
    answer:
      "Click Buy Now on a product page. The Freemius checkout opens in an overlay where you choose the number of sites, pay by card or PayPal, and receive the download link and license key by email. There is no separate PDThemes account to create.",
  },
  {
    category: "Licensing",
    question: "What does a license include?",
    answer:
      "A license covers a set number of site activations (1, 5, or unlimited depending on the tier), one year of updates and one year of support. The product itself is GPL-licensed, so your sites keep working after the license period ends.",
  },
  {
    category: "Installation",
    question: "How do I install a theme or plugin?",
    answer:
      "Download the zip from your purchase email or the Freemius customer portal. In WordPress, go to Appearance → Themes → Add New → Upload Theme (or Plugins → Add New → Upload Plugin), choose the zip and activate. Then enter your license key when prompted.",
  },
  {
    category: "Updates",
    question: "How do product updates work?",
    answer:
      "Once a license is activated on a site, updates appear in the WordPress updates screen just like products from WordPress.org. You can also download any version from the customer portal.",
  },
  {
    category: "Renewals",
    question: "What happens at renewal?",
    answer:
      "Annual licenses renew automatically; Freemius sends a reminder before charging. You can cancel the renewal from the customer portal at any time. After expiry the product keeps working, but updates and support stop until you renew.",
  },
  {
    category: "Support",
    question: "How do I get support?",
    answer:
      "Use the support page and include your license key and site URL. Requests from active licenses are prioritised. Free products are supported through their WordPress.org forums.",
  },
  {
    category: "Refunds",
    question: "What is the refund policy?",
    answer:
      "Paid products come with a refund window after purchase (see the refund policy page for the exact period, which is configured in Freemius). Request a refund from the customer portal or by email; no justification is required within the window.",
  },
  {
    category: "Free vs premium",
    question: "What is the difference between free and premium products?",
    answer:
      "Free products are complete and GPL-licensed, usually distributed through WordPress.org. Premium products (or Pro versions of freemium plugins) add features, priority support and guaranteed updates. Each product page lists exactly what each tier includes.",
  },
  {
    category: "Compatibility",
    question: "Which WordPress and PHP versions are supported?",
    answer:
      "Each product page lists its minimum WordPress and PHP versions. Current themes require WordPress 6.4+ and PHP 8.1+; plugins generally support WordPress 6.2+ and PHP 8.0+. Products are tested against each new WordPress release.",
  },
  {
    category: "Account",
    question: "Where do I manage my account and licenses?",
    answer:
      "In the Freemius customer portal (users.freemius.com), using the email you purchased with. It shows licenses, activations, invoices, downloads and renewal settings.",
  },
];
