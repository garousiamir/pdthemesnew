"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { DemoNotice } from "@/components/ui/demo-notice";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const reduced = useReducedMotion();
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, reduced ? [] : [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const anyUnverified = testimonials.some((t) => !t.verified) || !site.testimonialsVerified;

  return (
    <section className="container-x section" aria-labelledby="testimonials-title" id="testimonials">
      <SectionHeading
        eyebrow="From customers"
        title={
          <span id="testimonials-title">
            What people say after <em className="accent-italic">launch</em>.
          </span>
        }
        actions={
          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label="Previous testimonial" className="grid size-11 place-items-center rounded-full border border-stone-300 hover:border-ink">
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" onClick={next} aria-label="Next testimonial" className="grid size-11 place-items-center rounded-full border border-stone-300 hover:border-ink">
              <ArrowRight className="size-4" />
            </button>
          </div>
        }
      />
      {anyUnverified && (
        <DemoNotice className="mt-8 max-w-2xl">
          Development placeholders. These cards are not customer reviews; they show how verified testimonials will be presented once real reviews are available.
        </DemoNotice>
      )}
      <div className="mt-10 overflow-hidden" ref={ref}>
        <div className="flex touch-pan-y gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              className={cn("flex min-w-0 shrink-0 grow-0 basis-full flex-col justify-between rounded-lg border border-stone-200 bg-paper p-6 transition-opacity duration-slow sm:basis-[70%] lg:basis-[46%] sm:p-8", selected === i ? "opacity-100" : "opacity-50")}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <div>
                <Quote className="size-6 text-accent" aria-hidden />
                <blockquote className="mt-5 font-display text-xl leading-snug sm:text-2xl">{t.quote}</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-stone-500">{t.role}</p>
                </div>
                <div className="text-right">
                  {t.product && <p className="font-mono text-xs text-stone-500">{t.product}</p>}
                  {!t.verified && <p className="mt-1 rounded-full bg-sun-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7a5a0f]">Placeholder</p>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-1.5" aria-hidden>
        {testimonials.map((t, i) => (
          <span key={t.id} className={cn("h-1 rounded-full transition-[width,background-color] duration-base", selected === i ? "w-8 bg-ink" : "w-3 bg-stone-300")} />
        ))}
      </div>
    </section>
  );
}
