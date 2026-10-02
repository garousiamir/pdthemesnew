import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/products", priority: 0.9, freq: "weekly" },
    { path: "/themes", priority: 0.9, freq: "weekly" },
    { path: "/plugins", priority: 0.9, freq: "weekly" },
    { path: "/free", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/about", priority: 0.5, freq: "yearly" },
    { path: "/documentation", priority: 0.6, freq: "monthly" },
    { path: "/support", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/license", priority: 0.5, freq: "yearly" },
    { path: "/legal/privacy", priority: 0.2, freq: "yearly" },
    { path: "/legal/terms", priority: 0.2, freq: "yearly" },
    { path: "/legal/refunds", priority: 0.2, freq: "yearly" },
    { path: "/legal/cookies", priority: 0.2, freq: "yearly" },
    { path: "/legal/imprint", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...statics.map((s) => ({ url: absoluteUrl(s.path), lastModified: now, changeFrequency: s.freq, priority: s.priority })),
    ...getProducts().map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
