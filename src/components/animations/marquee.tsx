"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "./smooth-scroll";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  /** Skew the track with scroll velocity (desktop only). */
  velocitySkew?: boolean;
  gap?: string;
  ariaLabel?: string;
  /** Under reduced motion, render only this many children (content is static then). */
  reducedCount?: number;
};

/**
 * Seamless CSS marquee. The track is duplicated once and translated -50%,
 * so the loop never jumps. Reduced motion renders the content statically.
 */
export function Marquee({
  children,
  className,
  duration = 32,
  reverse = false,
  velocitySkew = false,
  gap = "3rem",
  ariaLabel,
  reducedCount,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { velocity } = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!velocitySkew || reduced) return;
    const el = trackRef.current;
    if (!el) return;
    const { gsap } = getGsap();
    const setSkew = gsap.quickTo(el, "skewX", {
      duration: 0.4,
      ease: "power3.out",
    });
    const tick = () => {
      const v = Math.max(-1, Math.min(1, velocity.current / 40));
      setSkew(v * -6);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [velocitySkew, reduced, velocity]);

  if (reduced) {
    return (
      <div
        className={cn("flex flex-wrap items-center justify-center", className)}
        style={{ gap }}
        aria-label={ariaLabel}
      >
        {reducedCount
          ? Children.toArray(children).slice(0, reducedCount)
          : children}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "marquee" : undefined}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex w-max will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s`, gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
