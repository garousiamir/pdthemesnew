export type {
  Product,
  ProductInput,
  ProductType,
  ProductCategory,
  ProductStatus,
  LicenseTier,
  Screenshot,
  StorySection,
  ChangelogEntry,
} from "@/lib/validation/product";

export type CatalogFilter =
  | "all"
  | "themes"
  | "plugins"
  | "woocommerce"
  | "business-agency"
  | "blog-magazine"
  | "portfolio"
  | "free";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  updated?: string;
  author: string;
  image: { src: string; alt: string; width: number; height: number };
  readingTime: string;
  tags: string[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  product?: string;
  /** true only for reviews that have been verified. Placeholders are false. */
  verified: boolean;
};

export type FaqItem = { question: string; answer: string; category?: string };
