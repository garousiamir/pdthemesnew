"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Download, ExternalLink } from "lucide-react";
import type { Product } from "@/types";
import { categoryLabels, startingPrice, typeLabels } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SplitHeadline } from "@/components/animations/split-headline";
import { BuyButton } from "@/components/products/buy-button";
import { DemoViewer } from "./demo-viewer";
import { DemoNotice } from "@/components/ui/demo-notice";
import { formatDate } from "@/lib/utils";
import { getGsap } from "@/lib/gsap";

export function ProductHero({ product: p }: { product: Product }) {
  const root = useRef<HTMLElement>(null);
  const price = startingPrice(p);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-ph-top] > *", { opacity: 0, y: 14, duration: 0.7, stagger: 0.06 }, 0.05)
        .from("[data-ph-copy] > :not(h1)", { opacity: 0, y: 20, duration: 0.8, stagger: 0.07 }, 0.45)
        .fromTo("[data-ph-frame]", { opacity: 0, scale: 1.06, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: "expo.out" }, 0.25)
        .from("[data-ph-meta] > *", { opacity: 0, y: 10, duration: 0.6, stagger: 0.05 }, 0.8);
      gsap.to("[data-ph-frame] img", { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="container-x pt-[calc(var(--header-h)+1.5rem)] lg:pt-[calc(var(--header-h)+3rem)]" aria-labelledby="product-title" data-testid="product-hero">
      <div className="flex flex-wrap items-center gap-3" data-ph-top>
        <Breadcrumbs items={[{ name: p.type === "theme" ? "Themes" : "Plugins", path: p.type === "theme" ? "/themes" : "/plugins" }, { name: p.name, path: `/products/${p.slug}` }]} />
        <span className="hidden text-stone-300 sm:inline" aria-hidden>·</span>
        <Badge tone="neutral">{typeLabels[p.type]}</Badge>
        <Badge tone="neutral">{categoryLabels[p.category]}</Badge>
        {p.pricing.free && <Badge tone="moss">Free</Badge>}
        {!p.pricing.free && p.wordpressOrgUrl && <Badge tone="moss">Free + Pro</Badge>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-ph-copy>
          <SplitHeadline as="h1" id="product-title" trigger="mount" delay={0.15} className="display-lg">
            {p.name}
          </SplitHeadline>
          <p className="mt-4 font-display text-2xl leading-snug text-stone-700 sm:text-3xl">{p.tagline}</p>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-stone-600">{p.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
            {p.pricing.free ? <Price amount={0} size="lg" /> : <Price amount={price} currency={p.pricing.currency} prefix="from" suffix={p.pricing.tiers[0]?.billingCycle === "annual" ? "/ year" : undefined} size="lg" />}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.pricing.free ? (
              <>
                {p.freeDownloadUrl && (
                  <Button href={p.freeDownloadUrl} external variant="accent" size="lg">
                    <Download className="size-4" aria-hidden /> Download Free
                  </Button>
                )}
                {p.wordpressOrgUrl && (
                  <Button href={p.wordpressOrgUrl} external variant="secondary" size="lg">
                    View on WordPress.org <ExternalLink className="size-4" aria-hidden />
                  </Button>
                )}
              </>
            ) : (
              <>
                <BuyButton product={p} size="lg" />
                {p.wordpressOrgUrl && (
                  <Button href={p.wordpressOrgUrl} external variant="secondary" size="lg">
                    <Download className="size-4" aria-hidden /> Download Free
                  </Button>
                )}
              </>
            )}
            {p.demoUrl ? (
              <DemoViewer url={p.demoUrl} name={p.name} allowsEmbedding={p.demoAllowsEmbedding} size="lg" variant={p.pricing.free ? "ghost" : "secondary"} />
            ) : (
              <span className="inline-flex h-13 items-center rounded-full border border-dashed border-stone-300 px-5 text-sm text-stone-500" title="This product works inside wp-admin; see the documentation walkthrough">
                No live demo — see docs
              </span>
            )}
          </div>
          {p.status === "demo" && (
            <DemoNotice className="mt-6 max-w-md">
              Demonstration product: imagery, version history and prices are placeholders used to build this site. See docs/products.md for how to replace them.
            </DemoNotice>
          )}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-stone-200 pt-6 text-sm sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" data-ph-meta>
            <div>
              <dt className="eyebrow">Version</dt>
              <dd className="mt-1 font-mono">{p.version}</dd>
            </div>
            <div>
              <dt className="eyebrow">Updated</dt>
              <dd className="mt-1 font-mono">{formatDate(p.updatedAt)}</dd>
            </div>
            <div>
              <dt className="eyebrow">WordPress</dt>
              <dd className="mt-1 font-mono">{p.compatibility.wordpress}</dd>
            </div>
            <div>
              <dt className="eyebrow">PHP</dt>
              <dd className="mt-1 font-mono">{p.compatibility.php}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7">
          <div className="frame relative aspect-[16/10] w-full" data-ph-frame>
            <Image src={p.thumbnail.src} alt={p.thumbnail.alt} fill priority sizes="(min-width:1024px) 58vw, 100vw" className="object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
