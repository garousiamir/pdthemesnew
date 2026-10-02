"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { getGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Ctx = { lenisRef: React.RefObject<Lenis | null>; velocity: React.RefObject<number> };
const SmoothScrollContext = createContext<Ctx>({ lenisRef: { current: null }, velocity: { current: 0 } });

export function useLenis() {
  return useContext(SmoothScrollContext);
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one RAF loop. Disabled on touch devices and for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const velocity = useRef(0);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const { gsap, ScrollTrigger } = getGsap();
    const instance = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      smoothWheel: true,
      anchors: true,
    });
    instance.on("scroll", (e: { velocity: number }) => {
      velocity.current = e.velocity;
      ScrollTrigger.update();
    });
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Reset scroll position + refresh triggers on route change.
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <SmoothScrollContext.Provider value={{ lenisRef, velocity }}>{children}</SmoothScrollContext.Provider>;
}

/** Locks page scroll while modals/menus are open. */
export function useScrollLock(locked: boolean) {
  const { lenisRef } = useLenis();
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    const lenis = lenisRef.current;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [locked, lenisRef]);
}
