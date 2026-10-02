"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

/** Hairline reading progress bar for articles; scrubbed with ScrollTrigger. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bar.current;
    const target = document.getElementById(targetId);
    if (!el || !target) return;
    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [targetId]);
  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
