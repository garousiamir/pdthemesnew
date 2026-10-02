import type { Product } from "@/types";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="container-x section-t" aria-labelledby="related-title">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div data-reveal>
          <p className="eyebrow">Related products</p>
          <h2 id="related-title" className="display-md mt-4">
            Pairs well with.
          </h2>
        </div>
        <Button href="/products" variant="secondary" arrow data-reveal>
          All products
        </Button>
      </Reveal>
      <Reveal
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.1}
      >
        {products.map((p) => (
          <div key={p.slug} data-reveal>
            <ProductCard product={p} className="h-full" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
