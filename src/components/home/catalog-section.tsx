import { Suspense } from "react";
import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Catalog, CatalogSkeleton } from "@/components/products/catalog";

export function CatalogSection({ products }: { products: Product[] }) {
  return (
    <section
      className="container-x section"
      aria-labelledby="catalog-title"
      id="catalog"
    >
      <SectionHeading
        eyebrow="Complete catalog"
        title={
          <span id="catalog-title">
            Every product, <em className="accent-italic">one</em> place.
          </span>
        }
        lead="Filter by type or category. Free products and freemium plugins are marked, and every card links to a live demo where one exists."
      />
      <div className="mt-12 lg:mt-16">
        <Suspense fallback={<CatalogSkeleton />}>
          <Catalog products={products} />
        </Suspense>
      </div>
    </section>
  );
}
