"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Renders children into document.body. Modals must not stay inside animated
 * ancestors: a `transform` on any ancestor turns it into the containing block
 * for `position: fixed`, which pushes dialogs off-screen.
 */
export function Portal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return createPortal(children, document.body);
}
