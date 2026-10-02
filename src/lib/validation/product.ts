import { z } from "zod";

export const productTypeSchema = z.enum(["theme", "plugin", "bundle"]);

export const productCategorySchema = z.enum([
  "woocommerce",
  "business-agency",
  "blog-magazine",
  "portfolio",
  "utility",
  "performance",
  "marketing",
]);

export const productStatusSchema = z.enum([
  "live",
  "demo",
  "coming-soon",
  "retired",
]);

export const screenshotSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  device: z
    .enum(["desktop", "tablet", "mobile", "full-page"])
    .default("desktop"),
  caption: z.string().optional(),
});

export const billingCycleSchema = z.enum(["one-time", "annual", "monthly"]);

export const licenseTierSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sites: z.union([z.number().int().positive(), z.literal("unlimited")]),
  price: z.number().nonnegative(),
  /** Pre-discount price. Only set when a real promotion is configured in Freemius. */
  compareAtPrice: z.number().positive().optional(),
  billingCycle: billingCycleSchema,
  renewalNote: z.string().optional(),
  features: z.array(z.string()).default([]),
  highlighted: z.boolean().default(false),
  /** Freemius plan id this tier maps to (public, safe to ship to the client). */
  freemiusPlanId: z.string().optional(),
  /** Freemius pricing id for the exact site count (public). */
  freemiusPricingId: z.string().optional(),
});

export const pricingSchema = z.object({
  currency: z.string().length(3).default("USD"),
  free: z.boolean().default(false),
  tiers: z.array(licenseTierSchema).default([]),
  /** Optional note shown under the pricing table, e.g. VAT handling. */
  note: z.string().optional(),
});

export const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

export const storySectionSchema = z.object({
  layout: z.enum(["split", "full", "sticky", "compare", "statement"]),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  image: screenshotSchema.optional(),
  images: z.array(screenshotSchema).optional(),
  bullets: z.array(z.string()).optional(),
  reverse: z.boolean().optional(),
  compare: z
    .array(
      z.object({
        label: z.string(),
        free: z.union([z.boolean(), z.string()]),
        pro: z.union([z.boolean(), z.string()]),
      }),
    )
    .optional(),
});

export const changelogEntrySchema = z.object({
  version: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  changes: z.array(z.string().min(1)).min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const seoSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(170),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  name: z.string().min(1),
  type: productTypeSchema,
  category: productCategorySchema,
  secondaryCategories: z.array(productCategorySchema).default([]),
  tagline: z.string().min(1).max(90),
  description: z.string().min(1).max(220),
  longDescription: z.string().min(1),
  thumbnail: screenshotSchema,
  gallery: z.array(screenshotSchema).min(1),
  demoUrl: z.string().url().optional(),
  /** Set when the demo site sends X-Frame-Options / CSP that forbid embedding. */
  demoAllowsEmbedding: z.boolean().default(true),
  documentationUrl: z.string().min(1).optional(),
  features: z.array(featureSchema).min(1),
  highlights: z.array(z.string()).default([]),
  story: z.array(storySectionSchema).default([]),
  version: z.string().min(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  releasedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  compatibility: z.object({
    wordpress: z.string().min(1),
    php: z.string().min(1),
    woocommerce: z.string().optional(),
    builders: z.array(z.string()).default([]),
    browsers: z.array(z.string()).default([]),
  }),
  requirements: z.array(z.string()).default([]),
  pricing: pricingSchema,
  /** Freemius product id (public, used by the checkout SDK). */
  freemiusProductId: z.string().optional(),
  /** Freemius public key (public by definition). Never put the secret key in content. */
  freemiusPublicKey: z.string().optional(),
  freemiusPlanIds: z.array(z.string()).default([]),
  freemiusPricingIds: z.array(z.string()).default([]),
  freeDownloadUrl: z.string().url().optional(),
  wordpressOrgUrl: z.string().url().optional(),
  changelog: z.array(changelogEntrySchema).default([]),
  faqs: z.array(faqSchema).default([]),
  relatedSlugs: z.array(z.string()).default([]),
  status: productStatusSchema,
  featured: z.boolean().default(false),
  /** Sort weight for listings. Lower comes first. */
  order: z.number().int().default(100),
  seo: seoSchema,
});

export type ProductInput = z.input<typeof productSchema>;
export type Product = z.output<typeof productSchema>;
export type ProductType = z.output<typeof productTypeSchema>;
export type ProductCategory = z.output<typeof productCategorySchema>;
export type ProductStatus = z.output<typeof productStatusSchema>;
export type LicenseTier = z.output<typeof licenseTierSchema>;
export type Screenshot = z.output<typeof screenshotSchema>;
export type StorySection = z.output<typeof storySectionSchema>;
export type ChangelogEntry = z.output<typeof changelogEntrySchema>;

/**
 * Validates a product definition and returns a typed product. Throws a readable
 * error when content is invalid so that `next build` fails early.
 */
export function defineProduct(input: ProductInput): Product {
  const result = productSchema.safeParse(input);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid product "${input.slug ?? input.id ?? "unknown"}":\n${issues}`,
    );
  }
  return result.data;
}
