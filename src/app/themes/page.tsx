import { getProductsByType } from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Catalog } from "@/components/products/catalog";
import { WhyPDThemes } from "@/components/home/why-pdthemes";

export const metadata = createMetadata({
  title: "WordPress Themes — Block Themes for Shops, Studios & Publications",
  description:
    "Premium block-based WordPress themes by PDThemes: WooCommerce, business and agency, portfolio and magazine themes with style variations, patterns and documentation.",
  path: "/themes",
});

export default function ThemesPage() {
  const themes = getProductsByType("theme");
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Themes", path: "/themes" }]}
        eyebrow="WordPress themes"
        title={
          <>
            Themes with an <em className="accent-italic">editorial</em> spine.
          </>
        }
        lead="Every theme is a block theme: templates in the site editor, styles in theme.json, no page builder lock-in. Pick by what you are building."
      />
      <section
        className="container-x pb-(--section)"
        aria-label="Theme catalog"
      >
        <>
          <Catalog
            products={themes}
            initialFilter="themes"
            filters={[
              "themes",
              "woocommerce",
              "business-agency",
              "blog-magazine",
              "portfolio",
              "free",
            ]}
            columns={3}
          />
        </>
      </section>
      <WhyPDThemes />
    </>
  );
}
