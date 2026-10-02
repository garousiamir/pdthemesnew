"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Registers GSAP plugins once, on the client only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    gsap.defaults({ ease: "expo.out", duration: 0.8 });
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
} as const;
