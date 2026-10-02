import type { Testimonial } from "@/types";

/**
 * DEVELOPMENT PLACEHOLDERS.
 * These are not customer reviews. They exist so the testimonial component can
 * be designed and tested. Replace with verified reviews (verified: true) and
 * set `site.testimonialsVerified = true` before launch. The UI labels every
 * entry with verified === false as a placeholder.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Placeholder quote. A real review will describe how the theme behaved during a client launch, and what support was like.",
    name: "Placeholder name",
    role: "Placeholder role, Placeholder studio",
    product: "Aurum",
    verified: false,
  },
  {
    id: "placeholder-2",
    quote:
      "Placeholder quote. A real review will mention a specific feature, such as the case-study templates or the update process.",
    name: "Placeholder name",
    role: "Placeholder role, Placeholder agency",
    product: "Kontor",
    verified: false,
  },
  {
    id: "placeholder-3",
    quote:
      "Placeholder quote. A real review will come from a verified purchase and include the reviewer's consent to be quoted.",
    name: "Placeholder name",
    role: "Placeholder role",
    product: "Formwerk",
    verified: false,
  },
];
