import { Suspense } from "react";
import { getProductsByType } from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Catalog, CatalogSkeleton } from "@/components/products/catalog";
import { CustomerExperience } from "@/components/home/customer-experience";

export const metadata = createMetadata({
  title: "WordPress Plugins — Forms, Layout & Performance",
  description: "PDThemes plugins use native WordPress APIs and blocks: Formwerk forms, Gridwerk layout blocks and Tempo performance. Free versions on WordPress.org, Pro via Freemius.",
  path: "/plugins",
});

export default function PluginsPage() {
  const plugins = getProductsByType("plugin");
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Plugins", path: "/plugins" }]}
        eyebrow="WordPress plugins"
        title={<>Plugins that behave like <em className="accent-italic">core</em>.</>}
        lead="Native blocks, standard hooks, server-side validation, no tracking. Free versions live on WordPress.org; Pro adds the features teams need."
      />
      <section className="container-x pb-(--section)" aria-label="Plugin catalog">
        <Suspense fallback={<CatalogSkeleton />}>
          <Catalog products={plugins} initialFilter="plugins" filters={["plugins", "free"]} columns={3} />
        </Suspense>
      </section>
      <CustomerExperience />
    </>
  );
}
