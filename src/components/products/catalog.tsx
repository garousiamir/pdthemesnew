"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { PackageOpen } from "lucide-react";
import type { CatalogFilter, Product } from "@/types";
import { catalogFilters, matchesFilter } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  initialFilter?: CatalogFilter;
  /** Filters to show. Defaults to all. */
  filters?: CatalogFilter[];
  syncUrl?: boolean;
  columns?: 3 | 4;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Client-side catalog with animated category switching. Filtering never
 * reloads the page; the active filter is mirrored into the URL (?filter=)
 * so results can be shared. Uses useTransition so a skeleton can show if the
 * re-render is slow on low-end devices.
 */
export function Catalog({ products, initialFilter = "all", filters, syncUrl = true, columns = 3 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const fromUrl = (params.get("filter") as CatalogFilter | null) ?? null;
  const [filter, setFilter] = useState<CatalogFilter>(fromUrl && catalogFilters.some((f) => f.id === fromUrl) ? fromUrl : initialFilter);
  const deferred = useDeferredValue(filter);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!syncUrl) return;
    const sp = new URLSearchParams(params.toString());
    if (filter === "all") sp.delete("filter");
    else sp.set("filter", filter);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const visibleFilters = useMemo(() => catalogFilters.filter((f) => !filters || filters.includes(f.id)), [filters]);
  const list = useMemo(() => products.filter((p) => matchesFilter(p, deferred)), [products, deferred]);

  return (
    <div data-testid="catalog">
      <div className="no-scrollbar -mx-(--gutter) overflow-x-auto px-(--gutter)">
        <div role="tablist" aria-label="Product categories" className="flex w-max gap-2 pb-1">
          <LayoutGroup id="catalog-filters">
            {visibleFilters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => startTransition(() => setFilter(f.id))}
                  className={cn("relative h-10 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors", on ? "text-paper" : "text-stone-700 hover:text-ink")}
                  data-filter={f.id}
                >
                  {on && <motion.span layoutId="catalog-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.35, ease }} />}
                  <span className="relative">{f.label}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[13px] text-stone-500" aria-live="polite">
        <span>
          {list.length} {list.length === 1 ? "product" : "products"}
          {pending && " · updating…"}
        </span>
      </div>

      <motion.div layout className={cn("mt-4 grid gap-5", columns === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3")} aria-busy={pending}>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease }}
            >
              <ProductCard product={p} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center rounded-lg border border-dashed border-stone-300 px-6 py-16 text-center" data-testid="catalog-empty">
          <PackageOpen className="size-8 text-stone-400" aria-hidden />
          <p className="mt-4 font-display text-2xl">Nothing in this category yet.</p>
          <p className="mt-2 max-w-[40ch] text-sm text-stone-500">We add products a few times a year. Browse everything, or get notified when something new lands.</p>
          <div className="mt-6 flex gap-2">
            <Button variant="primary" onClick={() => setFilter("all")}>
              Show all products
            </Button>
            <Button variant="secondary" href="/blog">
              Read the changelog
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function CatalogSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-stone-200 p-2">
          <div className="aspect-[16/11] animate-pulse rounded-md bg-paper-2" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-paper-2" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-paper-2" />
            <div className="h-3 w-full animate-pulse rounded bg-paper-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
