import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import type { Product } from "@/types";
import type { BlogPostMeta } from "@/types";
import { startingPrice } from "@/lib/products";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function organizationJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    email: site.email,
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

/**
 * SoftwareApplication schema for a product. Offers are included only for
 * products that are `live` (real prices) or free; demonstration products carry
 * no offer so that no fabricated price or availability reaches search engines.
 */
export function productJsonLd(p: Product): Json {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.description,
    url: absoluteUrl(`/products/${p.slug}`),
    image: absoluteUrl(p.thumbnail.src),
    applicationCategory: p.type === "theme" ? "DesignApplication" : "DeveloperApplication",
    applicationSubCategory: p.type === "theme" ? "WordPress theme" : "WordPress plugin",
    operatingSystem: "WordPress",
    softwareVersion: p.version,
    dateModified: p.updatedAt,
    author: { "@type": "Organization", name: site.name, url: site.url },
  };
  if (p.pricing.free) {
    data.offers = { "@type": "Offer", price: 0, priceCurrency: p.pricing.currency, availability: "https://schema.org/InStock" };
  } else if (p.status === "live" && p.pricing.tiers.length) {
    data.offers = {
      "@type": "AggregateOffer",
      lowPrice: startingPrice(p),
      highPrice: Math.max(...p.pricing.tiers.map((t) => t.price)),
      priceCurrency: p.pricing.currency,
      offerCount: p.pricing.tiers.length,
    };
  }
  return data;
}

export function articleJsonLd(post: BlogPostMeta): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image.src),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
