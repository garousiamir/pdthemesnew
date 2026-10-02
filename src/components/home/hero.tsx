"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import type { Product } from "@/types";
import { hero } from "@/content/pages/home";
import { Button } from "@/components/ui/button";
import { SplitHeadline } from "@/components/animations/split-headline";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Props = { products: Product[] };

/**
 * Hero: expressive headline on the left, a layered, continuously moving
 * showcase of product screenshots on the right. The showcase is two tilted
 * columns scrolling in opposite directions (CSS keyframes), with scroll
 * parallax and pointer tilt added by GSAP on fine-pointer devices.
 */
export function Hero({ products }: Props) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.8 }, 0.1)
        .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.9 }, 0.5)
        .from("[data-hero-cta] > *", { opacity: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.62)
        .fromTo(st, { clipPath: "inset(0 0 100% 0 round 24px)", opacity: 0.6 }, { clipPath: "inset(0 0 0% 0 round 24px)", opacity: 1, duration: 1.4, ease: "expo.inOut" }, 0.15)
        .from("[data-hero-scroll]", { opacity: 0, duration: 0.6 }, 1.2);

      // Scroll parallax on the stage and columns.
      gsap.to(st, { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 } });
      gsap.to("[data-hero-col='0']", { y: -120, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 } });
      gsap.to("[data-hero-col='1']", { y: 120, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 } });

      // Pointer tilt (fine pointer only).
      if (window.matchMedia("(pointer: fine)").matches) {
        const rx = gsap.quickTo(st, "rotateX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(st, "rotateY", { duration: 0.8, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(py * -4);
          ry(px * 6);
        };
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      }
    });
    return () => mm.revert();
  }, []);

  const colA = [products[0], products[2], products[4], products[6]].filter(Boolean);
  const colB = [products[1], products[3], products[5], products[7]].filter(Boolean);

  return (
    <section ref={root} className="relative overflow-hidden pt-(--header-h)" aria-labelledby="hero-title">
      <div className="container-x relative grid min-h-[calc(100svh-var(--header-h))] items-center gap-10 py-12 lg:grid-cols-12 lg:gap-6 lg:py-8">
        <div className="relative z-[2] lg:col-span-7 xl:col-span-6">
          <p className="eyebrow mb-6" data-hero-eyebrow>
            {hero.eyebrow}
          </p>
          <SplitHeadline as="h1" id="hero-title" trigger="mount" delay={0.2} className="display-xl max-w-[12ch] !text-[clamp(2.9rem,6.4vw,6.9rem)]">
            {hero.headline[0]} <em className="accent-italic">{hero.headline[1]}</em>
          </SplitHeadline>
          <p className="lead mt-7 max-w-[46ch]" data-hero-copy>
            {hero.lead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3" data-hero-cta>
            <Button href={hero.primary.href} variant="accent" size="lg" arrow>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </Button>
          </div>
          <p className="mt-10 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 lg:flex" data-hero-scroll>
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden /> Scroll to explore
          </p>
        </div>

        {/* Showcase */}
        <div className="relative lg:col-span-5 lg:self-stretch lg:min-h-[640px] xl:col-span-6" style={{ perspective: "1600px" }}>
          <div
            ref={stage}
            className={cn("relative mx-auto h-[60vw] max-h-[560px] w-full overflow-hidden rounded-xl bg-paper-2 shadow-frame lg:absolute lg:top-0 lg:bottom-[-12%] lg:left-0 lg:h-auto lg:max-h-none lg:w-[120%] xl:w-[112%]")}
            style={{ transformStyle: "preserve-3d" }}
            aria-hidden
          >
            <div className="grain absolute inset-0" />
            <div className={cn("absolute inset-[-12%] flex gap-4 sm:gap-6", reduced ? "" : "rotate-[-8deg]")}>
              {[colA, colB].map((col, ci) => (
                <div key={ci} className="flex-1" data-hero-col={ci}>
                  <div
                    className={cn("flex flex-col gap-4 sm:gap-6", !reduced && (ci === 0 ? "animate-scroll-y" : "animate-scroll-y-reverse"))}
                    style={{ ["--scroll-duration" as string]: ci === 0 ? "46s" : "54s" }}
                  >
                    {[...col, ...col].map((p, i) => (
                      <div key={`${p.slug}-${i}`} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200 shadow-card ring-1 ring-ink/5">
                        <Image src={i % 2 ? p.gallery[1].src : p.thumbnail.src} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" priority={i < 2} className="object-cover object-top" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink backdrop-blur">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-paper-2),transparent_18%,transparent_82%,var(--color-paper-2))] lg:bg-[linear-gradient(to_bottom,var(--color-paper),transparent_14%,transparent_86%,var(--color-paper))]" />
          </div>
        </div>
      </div>

      {/* Decorative detail */}
      <div className="pointer-events-none absolute -left-24 top-1/3 size-[420px] rounded-full bg-accent/[0.07] blur-3xl" aria-hidden />
    </section>
  );
}
