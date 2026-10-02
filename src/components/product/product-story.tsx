"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import type { StorySection } from "@/types";
import { SplitHeadline } from "@/components/animations/split-headline";
import { Reveal } from "@/components/animations/reveal";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Renders the product's story sections. Layouts:
 *  - statement: large centred typographic claim on a dark band
 *  - split: text + screenshot, optionally reversed
 *  - sticky: text pinned on the left while device screenshots scroll by
 *  - compare: free vs pro table
 *  - full: full-width screenshot
 */
export function ProductStory({
  sections,
  name,
}: {
  sections: StorySection[];
  name: string;
}) {
  if (!sections.length) return null;
  return (
    <div className="flex flex-col" data-testid="product-story">
      {sections.map((s, i) => {
        switch (s.layout) {
          case "statement":
            return <Statement key={i} s={s} />;
          case "split":
            return <Split key={i} s={s} />;
          case "sticky":
            return <Sticky key={i} s={s} />;
          case "compare":
            return <Compare key={i} s={s} name={name} />;
          case "full":
            return <Full key={i} s={s} />;
        }
      })}
    </div>
  );
}

function Statement({ s }: { s: StorySection }) {
  return (
    <section className="dark-surface section" aria-label={s.title}>
      <div className="container-x mx-auto max-w-4xl text-center">
        {s.eyebrow && <p className="eyebrow text-stone-400">{s.eyebrow}</p>}
        <SplitHeadline as="h2" className="display-lg mt-5 text-paper">
          {s.title}
        </SplitHeadline>
        <Reveal>
          <p
            className="lead mx-auto mt-6 max-w-[48ch] text-stone-300"
            data-reveal
          >
            {s.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Split({ s }: { s: StorySection }) {
  return (
    <section className="container-x section-t" aria-label={s.title}>
      <Reveal
        className={cn(
          "grid items-center gap-10 lg:grid-cols-12 lg:gap-12",
          s.reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="lg:col-span-5" data-reveal>
          {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
          <h2 className="display-md mt-4">{s.title}</h2>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-stone-600">
            {s.body}
          </p>
          {s.bullets && (
            <ul className="mt-6 flex flex-col gap-2.5">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px]">
                  <Check
                    className="mt-1 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-7" data-reveal>
          {s.image && (
            <div className="frame relative aspect-[16/10]">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Sticky({ s }: { s: StorySection }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const frames = gsap.utils.toArray<HTMLElement>(
          "[data-sticky-frame]",
          el,
        );
        const tweens = frames.map((f, i) =>
          gsap.fromTo(
            f,
            { y: 60 * (i + 1), rotate: (i - 1) * 2 },
            {
              y: -40 * (i + 1),
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          ),
        );
        return () =>
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
      },
    );
    return () => mm.revert();
  }, []);
  const imgs = s.images ?? [];
  return (
    <section ref={root} className="container-x section-t" aria-label={s.title}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            {s.eyebrow && (
              <p className="eyebrow" data-reveal>
                {s.eyebrow}
              </p>
            )}
            <h2 className="display-md mt-4" data-reveal>
              {s.title}
            </h2>
            <p
              className="mt-5 max-w-[46ch] text-base leading-relaxed text-stone-600"
              data-reveal
            >
              {s.body}
            </p>
          </Reveal>
        </div>
        <div className="relative grid grid-cols-6 gap-4 lg:col-span-7 lg:min-h-[120vh] lg:items-start">
          {imgs.map((img, i) => {
            const tall = img.device === "mobile" || img.device === "tablet";
            return (
              <div
                key={img.src}
                data-sticky-frame
                className={cn(
                  "frame relative",
                  tall
                    ? "col-span-3 aspect-[3/4] lg:col-span-2"
                    : "col-span-6 aspect-[16/10] lg:col-span-4",
                  i === 1 && "lg:col-start-5",
                  i === 2 && "lg:col-start-2",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Compare({ s, name }: { s: StorySection; name: string }) {
  const rows = s.compare ?? [];
  const cell = (v: boolean | string) =>
    typeof v === "string" ? (
      <span className="text-[13px] text-stone-600">{v}</span>
    ) : v ? (
      <Check className="size-4 text-moss" aria-label="Included" />
    ) : (
      <Minus className="size-4 text-stone-300" aria-label="Not included" />
    );
  return (
    <section
      className="container-x section-t"
      aria-label={s.title}
      id="compare"
    >
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
          <h2 className="display-md mt-4">{s.title}</h2>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-stone-600">
            {s.body}
          </p>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <table className="w-full border-collapse text-[15px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th scope="col" className="py-3 text-left eyebrow">
                  Feature
                </th>
                <th scope="col" className="w-28 py-3 text-left eyebrow">
                  Free
                </th>
                <th
                  scope="col"
                  className="w-28 py-3 text-left eyebrow text-accent-ink"
                >
                  {name} Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-stone-200">
                  <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                    {r.label}
                  </th>
                  <td className="py-3.5">{cell(r.free)}</td>
                  <td className="py-3.5">{cell(r.pro)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

function Full({ s }: { s: StorySection }) {
  return (
    <section className="container-x section-t" aria-label={s.title}>
      <Reveal>
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          {s.eyebrow && <p className="eyebrow">{s.eyebrow}</p>}
          <h2 className="display-md mt-4">{s.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-stone-600">
            {s.body}
          </p>
        </div>
        {s.image && (
          <div className="frame relative mt-10 aspect-[16/9]" data-reveal>
            <Image
              src={s.image.src}
              alt={s.image.alt}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        )}
      </Reveal>
    </section>
  );
}
