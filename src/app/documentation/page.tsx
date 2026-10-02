import Link from "next/link";
import { ArrowUpRight, BookOpen, Download, Settings2, Sparkles, Wrench } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { getProducts, typeLabels } from "@/lib/products";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = createMetadata({
  title: "Documentation — Installation, Setup & Customization",
  description: "Guides for every PDThemes product: getting started, installation, demo content, license activation, customization and troubleshooting.",
  path: "/documentation",
});

const sections = [
  { icon: Download, title: "Getting started", body: "What is included in your download, how to install a theme or plugin, and how to activate a license so updates arrive in WordPress." },
  { icon: Sparkles, title: "Demo content", body: "Import starter content and patterns, then replace them with your own without breaking layouts." },
  { icon: Settings2, title: "Customization", body: "Style variations, theme.json settings, block patterns and the handful of theme options that exist." },
  { icon: Wrench, title: "Troubleshooting", body: "Common issues with hosting, caching, PHP versions and plugin conflicts, with the fix for each." },
];

export default function DocumentationPage() {
  const products = getProducts();
  return (
    <>
      <PageHeader crumbs={[{ name: "Documentation", path: "/documentation" }]} eyebrow="Documentation" title={<>Read it <em className="accent-italic">once</em>, keep it handy.</>} lead="Each product has its own guide with the same four sections, so once you know one you know them all. Product guides are being written alongside the products; the sections below describe their structure." size="lg" actions={<Button href="/support" variant="secondary" arrow>Need help instead?</Button>} />

      <section className="container-x pb-16" aria-labelledby="structure-title">
        <h2 id="structure-title" className="sr-only">Guide structure</h2>
        <Reveal className="grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {sections.map((s) => (
            <div key={s.title} className="bg-paper p-6" data-reveal>
              <s.icon className="size-5 text-accent" aria-hidden />
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="container-x pb-(--section)" aria-labelledby="guides-title">
        <Reveal>
          <p className="eyebrow" data-reveal>Product guides</p>
          <h2 id="guides-title" className="display-md mt-4" data-reveal>Pick your product.</h2>
        </Reveal>
        <Reveal className="mt-10 divide-y divide-stone-200 border-y border-stone-200" stagger={0.05}>
          {products.map((p) => (
            <div key={p.slug} id={p.slug} className="grid scroll-mt-32 gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-center" data-reveal>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <Badge tone="neutral">{typeLabels[p.type]}</Badge>
                  <span className="font-mono text-xs text-stone-500">v{p.version}</span>
                </div>
                <p className="mt-1 text-[15px] text-stone-600">{p.tagline}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-stone-600">
                  <li><Link href={`/products/${p.slug}#documentation`} className="link-underline">Installation</Link></li>
                  <li><Link href={`/products/${p.slug}#requirements`} className="link-underline">Requirements</Link></li>
                  <li><Link href={`/products/${p.slug}#changelog`} className="link-underline">Changelog</Link></li>
                  <li><Link href={`/products/${p.slug}#faq`} className="link-underline">FAQ</Link></li>
                  {p.wordpressOrgUrl && <li><a href={p.wordpressOrgUrl} target="_blank" rel="noopener noreferrer" className="link-underline">WordPress.org</a></li>}
                </ul>
              </div>
              <div className="flex gap-2">
                <Button href={`/products/${p.slug}`} variant="secondary" size="sm"><BookOpen className="size-4" aria-hidden /> Product page</Button>
                {p.demoUrl && <Button href={p.demoUrl} external variant="ghost" size="sm">Demo <ArrowUpRight className="size-4" aria-hidden /></Button>}
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-[13px] text-stone-500">Full per-product guides will be published at this address as each product reaches its live status. Until then, installation steps, requirements and changelogs live on the product pages.</p>
      </section>
    </>
  );
}
