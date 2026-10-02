import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/animations/reveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section
      className="container-x section"
      aria-labelledby="featured-title"
      id="featured"
    >
      <SectionHeading
        eyebrow="Featured products"
        title={
          <span id="featured-title">
            The current <em className="accent-italic">favourites</em>.
          </span>
        }
        lead="Four products our customers reach for first. Each one is built on native WordPress blocks and ships with documentation, demo content and support."
        actions={
          <Button href="/products" variant="secondary" arrow>
            All products
          </Button>
        }
      />
      <Reveal
        className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6"
        stagger={0.1}
      >
        {products.map((p, i) => (
          <div
            key={p.slug}
            data-reveal
            className={i % 3 === 0 ? "md:[&>article]:h-full" : ""}
          >
            <ProductCard
              product={p}
              variant="large"
              priority={i < 2}
              className="h-full"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
