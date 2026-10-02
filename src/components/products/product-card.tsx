import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Product } from "@/types";
import {
  categoryLabels,
  hasSale,
  startingPrice,
  typeLabels,
} from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { BuyButton } from "./buy-button";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  variant?: "large" | "compact";
  priority?: boolean;
  className?: string;
};

/**
 * Product card used by featured sections, catalog and related products.
 * Screenshots keep their own aspect ratio inside a fixed-ratio frame with
 * `object-top` so tall full-page images never distort.
 */
export function ProductCard({
  product: p,
  variant = "compact",
  priority,
  className,
}: Props) {
  const price = startingPrice(p);
  const large = variant === "large";
  const detailHref = `/products/${p.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-lg border border-stone-200 bg-paper transition-[border-color,box-shadow] duration-base ease-out-expo hover:border-ink/40 focus-within:border-ink/40 hover:shadow-card",
        className,
      )}
      data-testid="product-card"
      data-product={p.slug}
    >
      <div
        className={cn(
          "relative m-2 overflow-hidden rounded-md bg-paper-2",
          large ? "aspect-[16/11]" : "aspect-[16/11]",
        )}
      >
        <Link
          href={detailHref}
          className="absolute inset-0 z-[1]"
          aria-label={`${p.name} — view details`}
          tabIndex={-1}
        />
        <Image
          src={p.thumbnail.src}
          alt={p.thumbnail.alt}
          fill
          priority={priority}
          sizes={
            large
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          }
          className="object-cover object-top transition-transform duration-slow ease-out-expo group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 z-[2] flex gap-1.5">
          {p.pricing.free && <Badge tone="moss">Free</Badge>}
          {!p.pricing.free && p.wordpressOrgUrl && (
            <Badge tone="moss">Free + Pro</Badge>
          )}
          {hasSale(p) && <Badge tone="accent">Sale</Badge>}
          {p.status === "demo" && <Badge tone="sun">Demo product</Badge>}
        </div>
        {/* Hover action bar (always visible on touch) */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[2] flex translate-y-3 gap-2 opacity-0 transition-[transform,opacity] duration-base ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          {p.demoUrl ? (
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-paper/95 px-3.5 text-[13px] font-medium text-ink shadow-card backdrop-blur hover:bg-white"
            >
              Live Demo
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : (
            <span
              className="pointer-events-auto inline-flex h-9 items-center rounded-full bg-paper/80 px-3.5 text-[13px] text-stone-500 backdrop-blur"
              title="This product has no live demo"
            >
              No live demo
            </span>
          )}
          <Link
            href={detailHref}
            className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-paper/95 px-3.5 text-[13px] font-medium text-ink shadow-card backdrop-blur hover:bg-white"
          >
            View Details
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-3 px-5 pb-5 pt-3",
          large && "sm:px-6 sm:pb-6",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow">
              {typeLabels[p.type]} · {categoryLabels[p.category]}
            </p>
            <h3
              className={cn(
                "mt-1.5 font-display leading-none",
                large ? "text-3xl sm:text-4xl" : "text-2xl",
              )}
            >
              <Link
                href={detailHref}
                className="after:absolute after:inset-0 after:z-0 after:content-['']"
              >
                {p.name}
              </Link>
            </h3>
          </div>
          <Price
            amount={price}
            currency={p.pricing.currency}
            prefix={price ? "from" : undefined}
            className="shrink-0 pt-1"
          />
        </div>
        <p
          className={cn(
            "text-stone-600",
            large ? "text-[15px] leading-relaxed" : "text-sm leading-relaxed",
          )}
        >
          {p.description}
        </p>
        <div className="relative z-[1] mt-auto flex flex-wrap items-center gap-2 pt-2">
          {p.pricing.free ? (
            <Link
              href={detailHref}
              className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper hover:bg-ink-3"
            >
              Download Free
            </Link>
          ) : (
            <BuyButton product={p} size="sm" />
          )}
          <Link
            href={detailHref}
            className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-stone-700 hover:text-ink"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
