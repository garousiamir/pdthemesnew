"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

/**
 * Reads a query-string parameter without opting the page out of static
 * prerendering (unlike `useSearchParams`, which requires a Suspense boundary
 * and replaces the content with a fallback in the prerendered HTML).
 * Returns null during server rendering and hydration, then the live value.
 */
export function useUrlParam(name: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}
