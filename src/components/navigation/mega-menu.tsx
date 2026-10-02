"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/types";
import { categoryLabels, startingPrice } from "@/lib/products";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  kind: "themes" | "plugins";
  products: Product[];
  onNavigate: () => void;
};

export function MegaMenu({ id, kind, products, onNavigate }: Props) {
  const [active, setActive] = useState(products[0]);
  const title = kind === "themes" ? "WordPress Themes" : "WordPress Plugins";
  const href = `/${kind}`;

  return (
    <motion.div
      id={id}
      role="region"
      aria-label={`${title} menu`}
      initial={{ opacity: 0, y: -8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.16 } }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-40 mt-2 w-[min(880px,calc(100vw-2rem))] -translate-x-1/2 origin-top"
    >
      <div className="grid overflow-hidden rounded-lg border border-stone-200 bg-paper shadow-float md:grid-cols-[1.1fr_1fr]">
        <div className="p-3">
          <div className="flex items-center justify-between px-3 pb-2 pt-2">
            <p className="eyebrow">{title}</p>
            <Link
              href={href}
              onClick={onNavigate}
              className="link-underline text-xs font-medium text-stone-600 hover:text-ink"
            >
              View all
            </Link>
          </div>
          <ul className="flex flex-col">
            {products.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.04 + i * 0.03,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  onClick={onNavigate}
                  onMouseEnter={() => setActive(p)}
                  onFocus={() => setActive(p)}
                  className={cn(
                    "group flex items-start justify-between gap-4 rounded-md px-3 py-2.5 transition-colors",
                    active?.slug === p.slug
                      ? "bg-paper-2"
                      : "hover:bg-paper-2/70",
                  )}
                >
                  <span>
                    <span className="flex items-center gap-2 font-medium text-ink">
                      {p.name}
                      {p.pricing.free && <Badge tone="moss">Free</Badge>}
                      {p.status === "coming-soon" && (
                        <Badge tone="sun">Soon</Badge>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-stone-500">
                      {p.tagline}
                    </span>
                  </span>
                  <span className="shrink-0 pt-0.5 font-mono text-[12px] text-stone-500">
                    {categoryLabels[p.category]}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative hidden border-l border-stone-200 bg-paper-2 p-5 md:block">
          {active && (
            <Link
              href={`/products/${active.slug}`}
              onClick={onNavigate}
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-stone-200 shadow-card">
                <Image
                  key={active.slug}
                  src={active.thumbnail.src}
                  alt={active.thumbnail.alt}
                  fill
                  sizes="420px"
                  className="object-cover object-top transition-transform duration-slow ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl">{active.name}</p>
                  <p className="mt-0.5 text-[13px] text-stone-500">
                    {active.description}
                  </p>
                </div>
                <Price
                  amount={startingPrice(active)}
                  currency={active.pricing.currency}
                  prefix={startingPrice(active) ? "from" : undefined}
                  size="sm"
                  className="shrink-0"
                />
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                View details
                <ArrowRight
                  className="size-4 transition-transform duration-base ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
