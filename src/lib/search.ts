import { getProducts, typeLabels } from "@/lib/products";

export type SearchItem = {
  title: string;
  href: string;
  kind: "product" | "page" | "doc";
  description: string;
  keywords?: string[];
};

const staticPages: SearchItem[] = [
  { title: "All products", href: "/products", kind: "page", description: "Every theme and plugin in one catalog." },
  { title: "WordPress themes", href: "/themes", kind: "page", description: "Block themes for shops, studios, portfolios and publications." },
  { title: "WordPress plugins", href: "/plugins", kind: "page", description: "Forms, layout and performance plugins." },
  { title: "Free products", href: "/free", kind: "page", description: "Free themes and plugins, including WordPress.org listings." },
  { title: "Documentation", href: "/documentation", kind: "doc", description: "Installation, setup and customization guides." },
  { title: "Support", href: "/support", kind: "page", description: "How to get help, response times and account access." },
  { title: "FAQ", href: "/faq", kind: "page", description: "Purchases, licensing, updates, renewals and refunds." },
  { title: "Blog", href: "/blog", kind: "page", description: "Articles, release notes and studio notes." },
  { title: "About PDThemes", href: "/about", kind: "page", description: "Who we are and how we build." },
  { title: "Contact", href: "/contact", kind: "page", description: "Sales, support and press enquiries." },
  { title: "License information", href: "/license", kind: "page", description: "What a license includes, GPL and activations." },
  { title: "Refund policy", href: "/legal/refunds", kind: "page", description: "Refund window and conditions." },
  { title: "Privacy policy", href: "/legal/privacy", kind: "page", description: "How we handle data." },
  { title: "Terms & conditions", href: "/legal/terms", kind: "page", description: "Terms of purchase and use." },
];

export function buildSearchIndex(): SearchItem[] {
  const productItems: SearchItem[] = getProducts().map((p) => ({
    title: p.name,
    href: `/products/${p.slug}`,
    kind: "product",
    description: `${typeLabels[p.type]} — ${p.tagline}`,
    keywords: [p.category, ...p.secondaryCategories, ...p.highlights, p.type],
  }));
  return [...productItems, ...staticPages];
}

export function searchIndex(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.filter((i) => i.kind === "product").slice(0, 5);
  const terms = q.split(/\s+/);
  const score = (item: SearchItem) => {
    const hay = `${item.title} ${item.description} ${(item.keywords ?? []).join(" ")}`.toLowerCase();
    let s = 0;
    for (const t of terms) {
      if (item.title.toLowerCase().startsWith(t)) s += 6;
      else if (item.title.toLowerCase().includes(t)) s += 4;
      else if (hay.includes(t)) s += 1;
      else return 0;
    }
    return s;
  };
  return items
    .map((item) => ({ item, s: score(item) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.item);
}
