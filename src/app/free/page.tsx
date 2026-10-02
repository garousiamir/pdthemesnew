import { Download, ExternalLink } from "lucide-react";
import { getFreeProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Free WordPress Themes & Plugins",
  description: "Free, GPL-licensed products by PDThemes, including WordPress.org listings and the free versions of freemium plugins. Download, use on any site, upgrade when you need more.",
  path: "/free",
});

export default function FreePage() {
  const products = getFreeProducts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Free products", path: "/free" }]}
        eyebrow="Free products"
        title={<>Free, and <em className="accent-italic">finished</em>.</>}
        lead="Everything here is GPL-licensed and complete. Free products are distributed on WordPress.org where possible; freemium plugins have a Pro version when you need more."
      />
      <section className="container-x pb-(--section)" aria-label="Free products">
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {products.map((p) => (
            <div key={p.slug} data-reveal>
              <ProductCard product={p} className="h-full" />
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-16 grid gap-6 rounded-xl border border-stone-200 p-6 sm:grid-cols-2 sm:p-8">
          <div data-reveal>
            <p className="eyebrow">WordPress.org</p>
            <h2 className="mt-3 font-display text-2xl">Install from your WordPress admin.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-600">Products listed on WordPress.org can be installed from Plugins → Add New or Appearance → Themes → Add New by searching for “PDThemes”. Updates arrive automatically.</p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:items-end" data-reveal>
            <Button href="https://wordpress.org/plugins/search/pdthemes/" external variant="secondary"><ExternalLink className="size-4" aria-hidden /> PDThemes on WordPress.org</Button>
            <Button href="/license" variant="link"><Download className="size-4" aria-hidden /> How free vs Pro licensing works</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
