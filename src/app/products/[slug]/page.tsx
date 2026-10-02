import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, productJsonLd } from "@/lib/seo/json-ld";
import { ProductHero } from "@/components/product/product-hero";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductStory } from "@/components/product/product-story";
import { PricingTable } from "@/components/product/pricing-table";
import {
  ProductChangelog,
  ProductDocs,
  ProductFaq,
  ProductFeatures,
  ProductSpecs,
} from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";
import { StickyPurchaseBar } from "@/components/product/sticky-purchase-bar";
import { Reveal } from "@/components/animations/reveal";
import { FinalCta } from "@/components/home/final-cta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return createMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: `/products/${p.slug}`,
    image: p.seo.ogImage ?? p.thumbnail.src,
    keywords: p.seo.keywords,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p || p.status === "retired") notFound();
  const related = getRelatedProducts(p);

  return (
    <>
      <JsonLd data={productJsonLd(p)} />
      <ProductHero product={p} />
      <section className="container-x section-t" aria-label="Screenshots">
        <Reveal>
          <ProductGallery images={p.gallery} name={p.name} />
        </Reveal>
      </section>
      <div className="section-t">
        <ProductStory sections={p.story} name={p.name} />
      </div>
      <ProductFeatures product={p} />
      <PricingTable product={p} />
      <ProductSpecs product={p} />
      <ProductDocs product={p} />
      <ProductChangelog product={p} />
      <ProductFaq product={p} />
      <RelatedProducts products={related} />
      <div className="section-t">
        <FinalCta products={getProducts()} />
      </div>
      <StickyPurchaseBar product={p} />
    </>
  );
}
