"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { BlogPostMeta } from "@/types";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const params = useSearchParams();
  const fromUrl = params.get("category");
  const [cat, setCat] = useState(
    fromUrl && categories.includes(fromUrl) ? fromUrl : "All",
  );
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [first, ...rest] = list;
  return (
    <div>
      <div
        role="tablist"
        aria-label="Article categories"
        className="no-scrollbar -mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) pb-1"
      >
        <LayoutGroup id="blog-cats">
          {["All", ...categories].map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "relative h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors",
                  on ? "text-paper" : "text-stone-700 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="blog-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          transition={{ duration: 0.35, ease }}
          className="mt-10"
        >
          {first ? (
            <>
              <PostCard post={first} variant="feature" priority />
              {rest.length > 0 && (
                <div className="mt-12 grid gap-8 border-t border-stone-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="rounded-lg border border-dashed border-stone-300 p-10 text-center text-stone-500">
              No articles in this category yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
