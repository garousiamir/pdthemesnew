import { products } from "@/content/products";
import type { CatalogFilter } from "@/types";
import type { Product, ProductCategory, ProductType } from "@/lib/validation/product";

export const categoryLabels: Record<ProductCategory, string> = {
  woocommerce: "WooCommerce",
  "business-agency": "Business & Agency",
  "blog-magazine": "Blog & Magazine",
  portfolio: "Portfolio",
  utility: "Utility",
  performance: "Performance",
  marketing: "Marketing",
};

export const typeLabels: Record<ProductType, string> = {
  theme: "WordPress Theme",
  plugin: "WordPress Plugin",
  bundle: "Bundle",
};

export const catalogFilters: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "themes", label: "WordPress Themes" },
  { id: "plugins", label: "WordPress Plugins" },
  { id: "woocommerce", label: "WooCommerce" },
  { id: "business-agency", label: "Business & Agency" },
  { id: "blog-magazine", label: "Blog & Magazine" },
  { id: "portfolio", label: "Portfolio" },
  { id: "free", label: "Free Products" },
];

export function getProducts(): Product[] {
  return products.filter((p) => p.status !== "retired");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return getProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProductsByType(type: ProductType): Product[] {
  return getProducts().filter((p) => p.type === type);
}

export function getFreeProducts(): Product[] {
  return getProducts().filter((p) => isFreeOrFreemium(p));
}

export function isFreeOrFreemium(p: Product) {
  return p.pricing.free || Boolean(p.wordpressOrgUrl) || Boolean(p.freeDownloadUrl);
}

export function matchesFilter(p: Product, filter: CatalogFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "themes":
      return p.type === "theme";
    case "plugins":
      return p.type === "plugin";
    case "free":
      return isFreeOrFreemium(p);
    default:
      return p.category === filter || p.secondaryCategories.includes(filter);
  }
}

export function filterProducts(filter: CatalogFilter): Product[] {
  return getProducts().filter((p) => matchesFilter(p, filter));
}

export function getRelatedProducts(p: Product, limit = 3): Product[] {
  const related = p.relatedSlugs.map((s) => getProductBySlug(s)).filter((x): x is Product => Boolean(x) && x!.slug !== p.slug);
  if (related.length >= limit) return related.slice(0, limit);
  const fill = getProducts().filter((x) => x.slug !== p.slug && !related.includes(x) && x.type === p.type);
  return [...related, ...fill].slice(0, limit);
}

/** Lowest price among tiers, or 0 for free products. */
export function startingPrice(p: Product): number {
  if (p.pricing.free || p.pricing.tiers.length === 0) return 0;
  return Math.min(...p.pricing.tiers.map((t) => t.price));
}

export function hasSale(p: Product): boolean {
  return p.pricing.tiers.some((t) => typeof t.compareAtPrice === "number" && t.compareAtPrice > t.price);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getProducts().filter((p) =>
    [p.name, p.tagline, p.description, categoryLabels[p.category], typeLabels[p.type], ...p.highlights]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
