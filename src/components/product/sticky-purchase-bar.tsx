"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import type { Product } from "@/types";
import { startingPrice } from "@/lib/products";
import { Price } from "@/components/ui/price";
import { BuyButton } from "@/components/products/buy-button";
import { Button } from "@/components/ui/button";

/** Appears once the product hero has scrolled out of view. */
export function StickyPurchaseBar({ product: p }: { product: Product }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-testid='product-hero']");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  const price = startingPrice(p);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:left-1/2 sm:w-[min(720px,calc(100vw-2rem))] sm:-translate-x-1/2"
          data-testid="sticky-bar"
        >
          <div className="flex items-center gap-3 rounded-full border border-stone-200 bg-paper/95 p-2 pl-3 shadow-float backdrop-blur">
            <span className="relative hidden size-10 shrink-0 overflow-hidden rounded-full bg-paper-2 sm:block">
              <Image
                src={p.thumbnail.src}
                alt=""
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <Price
                amount={price}
                currency={p.pricing.currency}
                prefix={price ? "from" : undefined}
                size="sm"
              />
            </div>
            {p.pricing.free ? (
              <Button href="#pricing" variant="primary" size="sm">
                Download
              </Button>
            ) : (
              <BuyButton product={p} size="sm" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
