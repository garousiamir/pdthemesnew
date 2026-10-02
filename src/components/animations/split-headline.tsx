"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "mount" animates immediately after fonts are ready; "scroll" waits for the viewport. */
  trigger?: "mount" | "scroll";
  delay?: number;
  id?: string;
};

/**
 * Line-by-line headline reveal using GSAP SplitText. Each line is masked and
 * slides up from below with a slight rotation. Reverts cleanly on unmount.
 */
export function SplitHeadline({ children, className, as: Tag = "h2", trigger = "scroll", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, SplitText } = getGsap();
    const mm = gsap.matchMedia();
    let split: InstanceType<typeof SplitText> | null = null;
    let cancelled = false;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { opacity: 0 });
      const run = () => {
        if (cancelled) return;
        split = SplitText.create(el, { type: "lines", linesClass: "split-line", autoSplit: true, onSplit: (self) => {
          gsap.set(el, { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 110,
            rotate: 2,
            transformOrigin: "0% 100%",
            duration: 1.1,
            stagger: 0.08,
            delay,
            ease: "expo.out",
            scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
          });
        } });
      };
      document.fonts.ready.then(run);
      return () => {
        cancelled = true;
        split?.revert();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { clearProps: "opacity" });
    });
    return () => mm.revert();
  }, [delay, trigger]);

  return (
    <Tag ref={ref} className={cn(className)} id={id}>
      {children}
    </Tag>
  );
}
