"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Download, Palette, Search } from "lucide-react";
import { steps } from "@/content/pages/home";
import type { Product } from "@/types";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const icons = [Search, Download, Palette];

/**
 * Pinned, scroll-scrubbed storytelling section (desktop). The section pins
 * for 300vh; a GSAP timeline crossfades three "stage" illustrations and
 * highlights the active step. On small screens and for reduced motion it
 * renders as a stacked list with no pin.
 */
export function HowItWorks({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", el);
      const rail = el.querySelector<HTMLElement>("[data-rail]");
      gsap.set(stages, { autoAlpha: 0, yPercent: 6, scale: 0.98 });
      gsap.set(stages[0], { autoAlpha: 1, yPercent: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Stage crossfades are centred at timeline seconds 1 and 2.
            const t = self.progress * 3.6;
            const idx = t < 1 ? 0 : t < 2 ? 1 : 2;
            setActive((a) => (a === idx ? a : idx));
          },
        },
      });
      if (rail) tl.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 3 }, 0);
      stages.forEach((s, i) => {
        if (i === 0) return;
        tl.to(stages[i - 1], { autoAlpha: 0, yPercent: -6, scale: 0.98, duration: 0.5, ease: "power2.inOut" }, i - 0.25);
        tl.to(s, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.5, ease: "power2.inOut" }, i - 0.2);
      });
      // Hold at the end so the last step is readable.
      tl.to({}, { duration: 0.6 });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="dark-surface relative overflow-hidden" aria-labelledby="hiw-title" id="how-it-works">
      <div className="container-x grid min-h-screen gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-0">
        <div className="lg:col-span-5">
          <p className="eyebrow text-stone-400">How it works</p>
          <h2 id="hiw-title" className="display-md mt-5 max-w-[14ch]">
            From catalog to <em className="accent-italic">launch</em> in three moves.
          </h2>
          <ol className="relative mt-10 flex flex-col gap-8 lg:mt-14">
            <span className="absolute left-[11px] top-2 hidden h-[calc(100%-1rem)] w-px bg-paper/15 lg:block" aria-hidden>
              <span data-rail className="block h-full w-full origin-top bg-accent" />
            </span>
            {steps.map((s, i) => {
              const I = icons[i];
              const on = active === i;
              return (
                <li key={s.n} className="relative flex gap-5 lg:gap-6">
                  <span className={cn("relative z-[1] grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-mono transition-colors duration-slow", on ? "border-accent bg-accent text-white" : "border-paper/30 bg-ink text-stone-400")}>
                    {i + 1}
                  </span>
                  <div className={cn("transition-opacity duration-slow lg:opacity-40", on && "lg:opacity-100")}>
                    <h3 className="flex items-center gap-2.5 font-display text-2xl sm:text-[1.75rem]">
                      {s.title}
                      <I className="size-4 text-stone-500" aria-hidden />
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-stone-300">{s.body}</p>
                    <p className="mt-2 max-w-[44ch] text-[13px] leading-relaxed text-stone-500">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Stage */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[720px] lg:aspect-[4/3]">
            {/* Stage 1: catalog fan */}
            <div data-stage className="absolute inset-0 lg:[&:not(:first-child)]:opacity-0">
              <StageFrame label="01 · Explore">
                <div className="relative h-full w-full" style={{ perspective: "1200px" }}>
                  {products.slice(0, 3).map((p, i) => (
                    <div
                      key={p.slug}
                      className="absolute left-1/2 top-1/2 w-[62%] overflow-hidden rounded-md bg-stone-200 shadow-float ring-1 ring-paper/10"
                      style={{ transform: `translate(-50%, -50%) rotate(${(i - 1) * 7}deg) translate(${(i - 1) * 110}px, ${Math.abs(i - 1) * 18}px)`, zIndex: i === 1 ? 2 : 1 }}
                    >
                      <div className="relative aspect-[16/11]">
                        <Image src={p.thumbnail.src} alt="" fill sizes="400px" className="object-cover object-top" />
                      </div>
                      <div className="flex items-center justify-between bg-paper px-3 py-2 text-[11px] text-ink">
                        <span className="font-medium">{p.name}</span>
                        <span className="font-mono text-stone-500">Live demo ↗</span>
                      </div>
                    </div>
                  ))}
                </div>
              </StageFrame>
            </div>
            {/* Stage 2: install */}
            <div data-stage className="absolute inset-0 hidden lg:block">
              <StageFrame label="02 · Install">
                <div className="grid h-full grid-cols-[150px_1fr] overflow-hidden rounded-md bg-[#1d2327] text-[12px] text-stone-200">
                  <aside className="border-r border-white/10 p-4">
                    {["Dashboard", "Posts", "Media", "Appearance", "Plugins", "Settings"].map((m, i) => (
                      <p key={m} className={cn("rounded px-2 py-1.5", i === 3 && "bg-accent text-white")}>{m}</p>
                    ))}
                  </aside>
                  <div className="bg-[#f0f0f1] p-5 text-ink">
                    <p className="text-base font-semibold">Add Theme</p>
                    <div className="mt-4 rounded-md border border-dashed border-stone-400 bg-white p-5 text-center">
                      <p className="text-stone-600">kontor-2.1.0.zip</p>
                      <div className="mx-auto mt-3 h-2 w-3/4 overflow-hidden rounded-full bg-stone-200">
                        <span className="block h-full w-[86%] bg-accent" />
                      </div>
                      <p className="mt-2 font-mono text-[11px] text-stone-500">Unpacking the package…</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-md border border-moss/30 bg-moss-soft p-3 text-moss">
                      <Check className="size-4" /> License activated · updates enabled
                    </div>
                  </div>
                </div>
              </StageFrame>
            </div>
            {/* Stage 3: customize */}
            <div data-stage className="absolute inset-0 hidden lg:block">
              <StageFrame label="03 · Customize">
                <div className="grid h-full grid-cols-[1fr_190px] overflow-hidden rounded-md bg-paper text-ink">
                  <div className="relative">
                    <Image src={products[1]?.gallery[0].src ?? products[0].thumbnail.src} alt="" fill sizes="500px" className="object-cover object-top" />
                    <span className="absolute left-4 top-4 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper">Site editor</span>
                  </div>
                  <aside className="border-l border-stone-200 bg-white p-4 text-[12px]">
                    <p className="eyebrow">Styles</p>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {["#141311", "#e4572e", "#5b6b4a", "#2f4a7a", "#b5673a", "#f2c14e", "#9fd1c7", "#c0262c"].map((c) => (
                        <span key={c} className="aspect-square rounded-full ring-1 ring-ink/10" style={{ background: c }} />
                      ))}
                    </div>
                    <p className="eyebrow mt-5">Typography</p>
                    <p className="mt-2 rounded border border-stone-200 px-2 py-1.5">Fraunces / Geist</p>
                    <p className="eyebrow mt-5">Variation</p>
                    <p className="mt-2 rounded border border-stone-200 px-2 py-1.5">Paper · Ink · Slate · Clay</p>
                    <button type="button" tabIndex={-1} className="mt-6 w-full rounded-full bg-accent py-2 font-medium text-white">Launch site</button>
                  </aside>
                </div>
              </StageFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-paper/10 bg-ink-2 p-3 shadow-frame">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-paper/20" />
          <span className="size-2 rounded-full bg-paper/20" />
          <span className="size-2 rounded-full bg-paper/20" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500">{label}</span>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-md">{children}</div>
    </div>
  );
}
