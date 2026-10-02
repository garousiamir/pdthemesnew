"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Portal } from "@/components/ui/portal";
import { X, ArrowUpRight } from "lucide-react";
import { primaryNav, site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/components/animations/smooth-scroll";
import type { Product } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  themes: Product[];
  plugins: Product[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ open, onClose, themes, plugins }: Props) {
  useScrollLock(open);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[70] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
            />
            <motion.div
              ref={panelRef}
              className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper shadow-float"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.3, ease } }}
              transition={{ duration: 0.45, ease }}
              data-lenis-prevent
            >
              <div className="flex h-(--header-h) items-center justify-between px-5">
                <Logo />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-stone-200 hover:bg-paper-2"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 pb-8">
                <ul className="flex flex-col border-t border-stone-200">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      className="border-b border-stone-200"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.045,
                        duration: 0.5,
                        ease,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-4 font-display text-[2rem] leading-none tracking-[-0.02em]"
                      >
                        {item.label}
                        <ArrowUpRight
                          className="size-5 text-stone-400"
                          aria-hidden
                        />
                      </Link>
                      {item.menu && (
                        <ul className="-mt-1 mb-4 flex flex-wrap gap-2">
                          {(item.menu === "themes" ? themes : plugins).map(
                            (p) => (
                              <li key={p.slug}>
                                <Link
                                  href={`/products/${p.slug}`}
                                  onClick={onClose}
                                  className="inline-flex rounded-full border border-stone-200 px-3 py-1.5 text-[13px] hover:border-ink"
                                >
                                  {p.name}
                                </Link>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-6 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.5, ease }}
                >
                  <Button
                    href="/products"
                    variant="accent"
                    size="lg"
                    arrow
                    onClick={onClose}
                  >
                    Explore Products
                  </Button>
                  <Button
                    href="https://users.freemius.com/"
                    variant="secondary"
                    size="lg"
                    external
                  >
                    Account / My Licenses
                  </Button>
                  <p className="mt-2 text-center text-xs text-stone-500">
                    Licenses are managed in the Freemius customer portal. <br />
                    <a
                      href={`mailto:${site.supportEmail}`}
                      className="link-underline"
                    >
                      {site.supportEmail}
                    </a>
                  </p>
                </motion.div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
