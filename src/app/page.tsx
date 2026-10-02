import { getAllPosts, stripContent } from "@/lib/blog";
import { getFeaturedProducts, getProducts } from "@/lib/products";
import { createMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { Credibility } from "@/components/home/credibility";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HowItWorks } from "@/components/home/how-it-works";
import { BrandStatement } from "@/components/home/brand-statement";
import { CatalogSection } from "@/components/home/catalog-section";
import { WhyPDThemes } from "@/components/home/why-pdthemes";
import { CustomerExperience } from "@/components/home/customer-experience";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata = createMetadata({
  title: `${site.name} — Premium WordPress Themes & Plugins`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const products = getProducts();
  const featured = getFeaturedProducts(4);
  const posts = getAllPosts().map(stripContent);

  return (
    <>
      <Hero products={products} />
      <Credibility />
      <FeaturedProducts products={featured} />
      <HowItWorks products={featured} />
      <BrandStatement />
      <CatalogSection products={products} />
      <WhyPDThemes />
      <CustomerExperience />
      <Testimonials />
      <BlogPreview posts={posts} />
      <FaqSection />
      <FinalCta products={products} />
    </>
  );
}
