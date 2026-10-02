"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Delay before the first child starts (seconds). */
  delay?: number;
  /** Stagger between children marked with data-reveal (seconds). */
  stagger?: number;
  /** Distance in px. */
  y?: number;
  /** ScrollTrigger start. */
  start?: string;
  once?: boolean;
  id?: string;
};

/**
 * Scroll-triggered reveal. Animates children marked `data-reveal`; if none are
 * marked, animates the wrapper itself. Honors reduced motion via gsap.matchMedia.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0, stagger = 0.08, y = 32, start = "top 85%", once = true, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
      const items = targets.length ? Array.from(targets) : [el];
      gsap.set(items, { opacity: 0, y, willChange: "transform, opacity" });
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        stagger,
        ease: "expo.out",
        clearProps: "willChange",
        scrollTrigger: { trigger: el, start, once, toggleActions: once ? "play none none none" : "play none none reverse" },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el.querySelectorAll("[data-reveal]"), { clearProps: "all" });
    });
    return () => mm.revert();
  }, [delay, stagger, y, start, once]);

  return (
    <Tag ref={ref} className={cn(className)} id={id}>
      {children}
    </Tag>
  );
}
