"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { Portal } from "@/components/ui/portal";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Monitor,
  Smartphone,
  Tablet,
  X,
  ScrollText,
} from "lucide-react";
import type { Screenshot } from "@/types";
import { useScrollLock } from "@/components/animations/smooth-scroll";
import { cn } from "@/lib/utils";

const deviceIcon = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
  "full-page": ScrollText,
};
const deviceLabel = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
  "full-page": "Full page",
};
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Product gallery with device tabs, an Embla carousel and a lightbox.
 * Images are never stretched: each slide is a fixed-ratio frame and the
 * screenshot is contained within it (full-page screenshots scroll on hover).
 */
export function ProductGallery({
  images,
  name,
}: {
  images: Screenshot[];
  name: string;
}) {
  const devices = Array.from(new Set(images.map((i) => i.device)));
  const [device, setDevice] = useState<Screenshot["device"] | "all">("all");
  const visible =
    device === "all" ? images : images.filter((i) => i.device === device);
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useScrollLock(lightbox !== null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.reInit();
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api, device]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null ? i : (i - 1 + visible.length) % visible.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, visible.length]);

  return (
    <div data-testid="product-gallery">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Screenshot device"
          className="flex gap-1 rounded-full border border-stone-200 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={device === "all"}
            onClick={() => setDevice("all")}
            className={cn(
              "h-8 rounded-full px-3 text-[13px] font-medium transition-colors",
              device === "all"
                ? "bg-ink text-paper"
                : "text-stone-600 hover:text-ink",
            )}
          >
            All
          </button>
          {devices.map((d) => {
            const I = deviceIcon[d];
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-label={deviceLabel[d]}
                aria-selected={device === d}
                onClick={() => setDevice(d)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors",
                  device === d
                    ? "bg-ink text-paper"
                    : "text-stone-600 hover:text-ink",
                )}
              >
                <I className="size-3.5" aria-hidden />{" "}
                <span className="hidden sm:inline">{deviceLabel[d]}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-stone-500">
            {index + 1} / {visible.length}
          </span>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            className="grid size-10 place-items-center rounded-full border border-stone-300 hover:border-ink"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="grid size-10 place-items-center rounded-full border border-stone-300 hover:border-ink"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden" ref={ref}>
        <div className="flex touch-pan-y gap-4">
          {visible.map((img, i) => {
            const tall = img.device === "mobile" || img.device === "tablet";
            const full = img.device === "full-page";
            return (
              <figure
                key={img.src}
                className={cn(
                  "relative min-w-0 shrink-0 grow-0",
                  tall
                    ? "basis-[60%] sm:basis-[34%] lg:basis-[26%]"
                    : "basis-[92%] sm:basis-[80%] lg:basis-[66%]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-lg border border-stone-200 bg-paper-2 text-left shadow-card"
                  aria-label={`Open ${img.alt} in lightbox`}
                >
                  <div
                    className={cn(
                      "relative w-full",
                      tall ? "aspect-[3/4]" : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={
                        tall
                          ? "(min-width:1024px) 25vw, 60vw"
                          : "(min-width:1024px) 66vw, 92vw"
                      }
                      className={cn(
                        "object-cover object-top",
                        full &&
                          "transition-[object-position] duration-[6s] ease-linear group-hover:[object-position:bottom]",
                      )}
                    />
                  </div>
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-card backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" aria-hidden />
                  </span>
                </button>
                {img.caption && (
                  <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {lightbox !== null && visible[lightbox] && (
            <div
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={`${name} screenshot`}
              data-testid="lightbox"
              data-lenis-prevent
            >
              <motion.button
                type="button"
                aria-label="Close"
                className="absolute inset-0 bg-ink/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(null)}
              />
              <motion.figure
                key={visible[lightbox].src}
                className="relative max-h-full max-w-6xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  transition: { duration: 0.15 },
                }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="max-h-[82vh] overflow-auto rounded-md bg-paper shadow-float">
                  <Image
                    src={visible[lightbox].src}
                    alt={visible[lightbox].alt}
                    width={visible[lightbox].width}
                    height={visible[lightbox].height}
                    sizes="90vw"
                    className="h-auto w-auto max-w-[90vw]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-paper/80">
                  <span className="text-sm">
                    {visible[lightbox].caption ?? visible[lightbox].alt}
                  </span>
                  <span className="font-mono text-xs">
                    {lightbox + 1} / {visible.length}
                  </span>
                </figcaption>
              </motion.figure>
              <button
                type="button"
                onClick={() =>
                  setLightbox((i) =>
                    i === null ? i : (i - 1 + visible.length) % visible.length,
                  )
                }
                aria-label="Previous"
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper hover:bg-paper/30 sm:left-6"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightbox((i) =>
                    i === null ? i : (i + 1) % visible.length,
                  )
                }
                aria-label="Next"
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper hover:bg-paper/30 sm:right-6"
              >
                <ArrowRight className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-paper/15 text-paper hover:bg-paper/30 sm:right-6 sm:top-6"
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
