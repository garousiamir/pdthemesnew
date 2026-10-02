/**
 * Legal page content. Every page is DRAFT TEXT for structure and must be
 * reviewed by a qualified professional before launch. The pages render a
 * visible review notice while `reviewed` is false.
 */
export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};
export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  reviewed: boolean;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    summary:
      "What data this website processes, why, and your rights under the GDPR.",
    updated: "2026-10-02",
    reviewed: false,
    sections: [
      {
        heading: "Controller",
        paragraphs: [
          "PDThemes (legal entity and address to be inserted from the imprint) is the controller for data processed through pdthemes.de. Contact: privacy@pdthemes.de.",
        ],
      },
      {
        heading: "Hosting and server logs",
        paragraphs: [
          "The site is served by a hosting provider (to be named) that processes connection data such as IP address, user agent, requested URL and timestamp in server logs for security and operation. Legal basis: Art. 6(1)(f) GDPR. Logs are retained for a limited period and then deleted.",
        ],
      },
      {
        heading: "Purchases and licensing (Freemius)",
        paragraphs: [
          "Purchases, licensing, invoicing and the customer portal are operated by Freemius, Inc. When you open the checkout or the customer portal, Freemius processes the data needed to complete the purchase (name, email, billing address, VAT details, payment data handled by its payment providers) and to manage your licenses. PDThemes receives order and license information required to provide updates and support. Freemius' privacy policy applies to that processing; a link will be inserted here.",
        ],
      },
      {
        heading: "Contact form and newsletter",
        paragraphs: [
          "Messages sent through the contact form are used to answer your request (Art. 6(1)(b) and (f) GDPR). Newsletter subscriptions are based on your consent (Art. 6(1)(a) GDPR) and can be withdrawn at any time via the unsubscribe link. The newsletter provider, if any, will be named here.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "This site sets no tracking cookies of its own. If privacy-friendly analytics are enabled, they are configured without cookies and without cross-site identifiers; details are on the cookie policy page. Embedded third-party content (for example a live demo in a frame or the Freemius checkout) may set cookies governed by that provider.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You have the right of access, rectification, erasure, restriction, data portability and objection, and the right to lodge a complaint with a supervisory authority. Contact privacy@pdthemes.de to exercise them.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms and conditions",
    summary: "Terms for purchasing and using PDThemes products.",
    updated: "2026-10-02",
    reviewed: false,
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          "These terms apply to purchases of digital products (WordPress themes and plugins) from PDThemes through pdthemes.de. Purchases are processed by Freemius, Inc. as reseller / merchant of record; Freemius' purchase terms shown at checkout also apply.",
        ],
      },
      {
        heading: "Products and licensing",
        paragraphs: [
          "Products are licensed under the GNU General Public License v2 or later. A purchased license entitles you to product updates and support for the stated period and to the stated number of site activations. See the license information page for details.",
        ],
      },
      {
        heading: "Delivery",
        paragraphs: [
          "Products are delivered as downloads immediately after purchase, by email and through the Freemius customer portal.",
        ],
      },
      {
        heading: "Renewals and cancellation",
        paragraphs: [
          "Annual licenses renew automatically unless cancelled before the renewal date. Cancellation is possible at any time in the customer portal and takes effect at the end of the current period.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: ["Refunds are governed by the refund policy page."],
      },
      {
        heading: "Support",
        paragraphs: [
          "Support is provided for the licensed period within the scope described on the support page.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "Statutory liability provisions apply. Liability for slight negligence is limited to the breach of essential contractual obligations and to foreseeable, typical damage, to the extent permitted by law. [Clause to be reviewed by counsel.]",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "German law applies, excluding the UN Convention on Contracts for the International Sale of Goods. Mandatory consumer protection rules of your country of residence remain unaffected. [To be reviewed.]",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund policy",
    summary: "When and how you can get a refund for a paid product.",
    updated: "2026-10-02",
    reviewed: false,
    sections: [
      {
        heading: "Refund window",
        paragraphs: [
          "Paid products can be refunded within the refund period configured in Freemius for the product (to be set; commonly 14 or 30 days from purchase). The exact period is displayed in the checkout and on your invoice. No justification is required within this window.",
        ],
      },
      {
        heading: "How to request",
        paragraphs: [
          "Request a refund from the Freemius customer portal (Purchases → Refund) or by emailing support@pdthemes.de with your order number. Refunds are issued to the original payment method.",
        ],
      },
      {
        heading: "Renewals",
        paragraphs: [
          "Renewal charges can be refunded within the same window after the renewal date if the renewal was not intended. Cancel auto-renewal in the customer portal to avoid future charges.",
        ],
      },
      {
        heading: "After a refund",
        paragraphs: [
          "The license is cancelled and updates and support stop. The GPL-licensed software you downloaded remains yours to use.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    summary: "Which cookies and similar technologies this website uses.",
    updated: "2026-10-02",
    reviewed: false,
    sections: [
      {
        heading: "First-party cookies",
        paragraphs: [
          "pdthemes.de does not set tracking or advertising cookies. The site may store small, functional preferences in your browser (for example a dismissed notice) that are not transmitted to us.",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          "If analytics are enabled (configured via NEXT_PUBLIC_PLAUSIBLE_DOMAIN), they use a cookie-free, privacy-friendly service that aggregates page views without identifying individual visitors. The provider will be named here when enabled.",
        ],
      },
      {
        heading: "Third-party embeds",
        paragraphs: [
          "The Freemius checkout and customer portal, and live demos opened in the demo viewer, are provided by third parties and may set cookies necessary for their operation (for example session and fraud-prevention cookies). They are loaded only when you open them.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can delete or block cookies in your browser settings. Blocking cookies required by the checkout may prevent purchases.",
        ],
      },
    ],
  },
  {
    slug: "imprint",
    title: "Imprint (Impressum)",
    summary: "Provider identification under § 5 DDG (Germany).",
    updated: "2026-10-02",
    reviewed: false,
    sections: [
      {
        heading: "Provider",
        paragraphs: [
          "PDThemes",
          "[Legal form, owner name]",
          "[Street and number]",
          "[Postcode, city], Germany",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Email: hello@pdthemes.de",
          "[Telephone number, if applicable]",
        ],
      },
      {
        heading: "VAT",
        paragraphs: [
          "[VAT identification number under § 27a UStG, if applicable]",
        ],
      },
      {
        heading: "Responsible for content",
        paragraphs: ["[Name and address under § 18(2) MStV]"],
      },
      {
        heading: "Dispute resolution",
        paragraphs: [
          "The European Commission provides a platform for online dispute resolution: https://ec.europa.eu/consumers/odr. We are not obliged and not willing to participate in dispute resolution proceedings before a consumer arbitration board. [To be confirmed.]",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
