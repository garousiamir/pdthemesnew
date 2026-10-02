import type { ReactNode } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/footer/footer";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { getProductsByType } from "@/lib/products";
import { buildSearchIndex } from "@/lib/search";
import { PromoBanner } from "@/components/marketing/promo-banner";

/** Server component: gathers nav data once and hands it to the client header. */
export function SiteShell({ children }: { children: ReactNode }) {
  const themes = getProductsByType("theme");
  const plugins = getProductsByType("plugin");
  const searchItems = buildSearchIndex();
  return (
    <SmoothScroll>
      <PromoBanner />
      <Header themes={themes} plugins={plugins} searchItems={searchItems} />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
