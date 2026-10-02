"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Portal } from "@/components/ui/portal";
import {
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/components/animations/smooth-scroll";
import { cn } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";
const widths: Record<Device, string> = {
  desktop: "100%",
  tablet: "834px",
  mobile: "390px",
};
const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  url: string;
  name: string;
  allowsEmbedding?: boolean;
  label?: string;
  variant?: "secondary" | "primary" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Live-demo opener. Opens an in-page viewer with desktop / tablet / mobile
 * widths when the demo allows framing; otherwise, or when the frame fails to
 * load within 6 s, it shows a fallback with a direct external link. A direct
 * link is always present as well.
 */
export function DemoViewer({
  url,
  name,
  allowsEmbedding = true,
  label = "Live Demo",
  variant = "secondary",
  size = "md",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <>
      <div className={cn("inline-flex items-center gap-1", className)}>
        <Button
          variant={variant}
          size={size}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          data-testid="demo-open"
        >
          <Monitor className="size-4" aria-hidden /> {label}
        </Button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} demo in a new tab`}
          className="grid size-10 place-items-center rounded-full text-stone-600 hover:bg-ink/[0.06] hover:text-ink"
          title="Open in new tab"
        >
          <ExternalLink className="size-4" />
        </a>
      </div>
      <Portal>
        <AnimatePresence>
          {open && (
            <DemoPanel
              url={url}
              name={name}
              allowsEmbedding={allowsEmbedding}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

/** Mounted only while open so load state and the 6 s fallback timer start fresh. */
function DemoPanel({
  url,
  name,
  allowsEmbedding,
  onClose,
}: {
  url: string;
  name: string;
  allowsEmbedding: boolean;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const [state, setState] = useState<"loading" | "ready" | "blocked">(
    allowsEmbedding ? "loading" : "blocked",
  );
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (allowsEmbedding)
      timer.current = window.setTimeout(
        () => setState((s) => (s === "loading" ? "blocked" : s)),
        6000,
      );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [allowsEmbedding, onClose]);

  return (
    <div
      className="fixed inset-0 z-[85] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} live demo`}
      data-testid="demo-viewer"
    >
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative m-2 flex flex-1 flex-col overflow-hidden rounded-xl bg-paper shadow-float sm:m-4"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4, ease }}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate text-sm font-medium">
              {name} — live demo
            </span>
            <span className="hidden truncate font-mono text-[11px] text-stone-500 md:inline">
              {url}
            </span>
          </div>
          <div
            className="hidden items-center gap-1 rounded-full border border-stone-200 p-1 sm:flex"
            role="group"
            aria-label="Viewport"
          >
            {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
              const I =
                d === "desktop"
                  ? Monitor
                  : d === "tablet"
                    ? Tablet
                    : Smartphone;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  aria-pressed={device === d}
                  aria-label={d}
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition-colors",
                    device === d
                      ? "bg-ink text-paper"
                      : "text-stone-600 hover:bg-paper-2",
                  )}
                >
                  <I className="size-4" />
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium hover:bg-paper-2"
            >
              Open <ExternalLink className="size-3.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo"
              className="grid size-8 place-items-center rounded-full hover:bg-paper-2"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <div className="relative flex flex-1 justify-center overflow-hidden bg-paper-2 p-0 sm:p-4">
          {state === "blocked" ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="font-display text-2xl">
                This demo opens in a new tab.
              </p>
              <p className="mt-2 max-w-[44ch] text-sm text-stone-600">
                {allowsEmbedding
                  ? "The demo did not respond inside the viewer, which usually means the site blocks embedding."
                  : "The demo site does not allow embedding inside other pages."}{" "}
                Use the direct link instead.
              </p>
              <Button
                href={url}
                external
                variant="primary"
                className="mt-6"
                arrow
              >
                Open {name} demo
              </Button>
            </div>
          ) : (
            <motion.div
              animate={{ width: widths[device] }}
              transition={{ duration: 0.4, ease }}
              className="relative h-full max-w-full overflow-hidden bg-white shadow-frame sm:rounded-md"
              style={{ width: widths[device] }}
            >
              {state === "loading" && (
                <div className="absolute inset-0 grid place-items-center bg-paper">
                  <Loader2 className="size-6 animate-spin text-stone-400" />
                </div>
              )}
              <iframe
                title={`${name} live demo`}
                src={url}
                className="h-full w-full"
                onLoad={() => setState("ready")}
                loading="eager"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
