import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Catalog, CatalogSkeleton } from "@/components/products/catalog";
import { FaqSection } from "@/components/home/faq-section";

export const metadata = createMetadata({
  title: "All Products — WordPress Themes & Plugins",
  description: "Browse every PDThemes product: block-based WordPress themes for shops, studios, portfolios and publications, plus forms, layout and performance plugins.",
  path: "/products",
});

export default function ProductsPage() {
  const products = getProducts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "All products", path: "/products" }]}
        eyebrow="Catalog"
        title={<>All products, <em className="accent-italic">one</em> standard.</>}
        lead="Themes and plugins built on native WordPress blocks, documented in detail and supported by the people who wrote them. Filter by type or category."
      />
      <section className="container-x pb-(--section)" aria-label="Product catalog">
        <Suspense fallback={<CatalogSkeleton />}>
          <Catalog products={products} columns={3} />
        </Suspense>
      </section>
      <FaqSection limit={5} withSchema={false} />
    </>
  );
}
