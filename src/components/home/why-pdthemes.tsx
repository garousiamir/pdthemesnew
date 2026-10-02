"use client";

import { useLayoutEffect, useRef } from "react";
import { benefits } from "@/content/pages/home";
import { getGsap } from "@/lib/gsap";
import { Reveal } from "@/components/animations/reveal";

/**
 * Editorial list with a sticky heading. Each benefit's title is dimmed and
 * brightens as it crosses the viewport centre (scrubbed opacity), giving a
 * reading-rhythm rather than a card grid.
 */
export function WhyPDThemes() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-benefit]", el);
      const tweens = items.map((item) =>
        gsap.fromTo(
          item,
          { opacity: 0.28 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 40%",
              scrub: true,
            },
          },
        ),
      );
      return () =>
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="container-x section"
      aria-labelledby="why-title"
      id="why"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow" data-reveal>
                Why PDThemes
              </p>
              <h2
                id="why-title"
                className="display-lg mt-5 max-w-[10ch]"
                data-reveal
              >
                Built the way we would want to{" "}
                <em className="accent-italic">inherit</em> it.
              </h2>
              <p className="lead mt-6 max-w-[40ch]" data-reveal>
                Every product is something we would be happy to take over from
                another developer a year later. That standard shapes everything
                below.
              </p>
            </Reveal>
          </div>
        </div>
        <ol className="lg:col-span-7 lg:pt-4">
          {benefits.map((b) => (
            <li
              key={b.n}
              data-benefit
              className="grid gap-3 border-t border-stone-200 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6 lg:py-9"
            >
              <span className="font-mono text-xs text-stone-400 sm:pt-2">
                {b.n}
              </span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-[1.05] sm:text-4xl">
                  {b.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-stone-600 sm:text-base">
                  {b.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
