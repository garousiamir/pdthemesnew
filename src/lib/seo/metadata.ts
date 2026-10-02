import type { Metadata } from "next";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type Options = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

export const defaultOgImage = "/images/brand/og-default.png";

/** Builds consistent metadata (canonical, OG, Twitter, alternates) for a page. */
export function createMetadata({ title, description, path, image = defaultOgImage, type = "website", noIndex, keywords, publishedTime, modifiedTime }: Options): Metadata {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: img, width: 1200, height: 630, alt: `${title} — ${site.name}` }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
