import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const products = getFeaturedProducts(3);
  return (
    <section
      className="container-x pt-[calc(var(--header-h)+3rem)] pb-(--section)"
      aria-labelledby="nf-title"
    >
      <p className="eyebrow">404</p>
      <h1 id="nf-title" className="display-xl mt-5 max-w-[12ch]">
        This page <em className="accent-italic">wandered</em> off.
      </h1>
      <p className="lead mt-6 max-w-[48ch]">
        The address may be mistyped, or the page was moved. Try the catalog,
        search, or go back to the start.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="primary">
          <ArrowLeft className="size-4" aria-hidden /> Back home
        </Button>
        <Button href="/products" variant="secondary" arrow>
          Browse products
        </Button>
        <Link
          href="/?search=1"
          className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-stone-700 hover:text-ink"
        >
          <Search className="size-4" aria-hidden /> Press ⌘K to search
        </Link>
      </div>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} className="h-full" />
        ))}
      </div>
    </section>
  );
}
