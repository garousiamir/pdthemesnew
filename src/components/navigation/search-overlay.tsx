"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  X,
  CornerDownLeft,
  Package,
  FileText,
  BookOpen,
} from "lucide-react";
import { searchIndex, type SearchItem } from "@/lib/search";
import { useScrollLock } from "@/components/animations/smooth-scroll";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void; items: SearchItem[] };

const ease = [0.22, 1, 0.36, 1] as const;
const icons = { product: Package, page: FileText, doc: BookOpen };

export function SearchOverlay({ open, onClose, items }: Props) {
  useScrollLock(open);
  return (
    <AnimatePresence>
      {open && <SearchPanel onClose={onClose} items={items} />}
    </AnimatePresence>
  );
}

/** Mounted only while open, so query and cursor start fresh every time. */
function SearchPanel({ onClose, items }: Omit<Props, "open">) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => searchIndex(items, query), [items, query]);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(results.length - 1, c + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(0, c - 1));
      }
      if (e.key === "Enter" && results[cursor]) {
        e.preventDefault();
        router.push(results[cursor].href);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, cursor, router, onClose]);

  const go = (item: SearchItem) => {
    router.push(item.href);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <motion.button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className="absolute inset-x-0 top-0 mx-auto flex h-full w-full flex-col bg-paper sm:inset-x-4 sm:top-[8vh] sm:h-auto sm:max-h-[78vh] sm:max-w-2xl sm:rounded-xl sm:border sm:border-stone-200 sm:shadow-float"
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 6, transition: { duration: 0.15 } }}
        transition={{ duration: 0.26, ease }}
        data-lenis-prevent
      >
        <div className="flex items-center gap-3 border-b border-stone-200 px-4 sm:px-5">
          <Search className="size-5 shrink-0 text-stone-500" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Search products, docs and pages…"
            aria-label="Search"
            aria-controls="search-results"
            aria-activedescendant={
              results[cursor] ? `search-result-${cursor}` : undefined
            }
            className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-stone-400"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-paper-2"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul
          id="search-results"
          role="listbox"
          className="flex-1 overflow-y-auto p-2"
        >
          {!query && <li className="eyebrow px-3 pb-2 pt-3">Products</li>}
          {results.length === 0 && (
            <li className="px-3 py-10 text-center text-stone-500">
              No results for{" "}
              <span className="font-medium text-ink">“{query}”</span>. Try a
              product name, “docs”, or “refund”.
            </li>
          )}
          {results.map((item, i) => {
            const I = icons[item.kind];
            return (
              <li
                key={item.href}
                id={`search-result-${i}`}
                role="option"
                aria-selected={i === cursor}
              >
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors",
                    i === cursor ? "bg-paper-2" : "hover:bg-paper-2/60",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md border border-stone-200 bg-paper">
                    <I className="size-4 text-stone-600" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">
                      {item.title}
                    </span>
                    <span className="block truncate text-[13px] text-stone-500">
                      {item.description}
                    </span>
                  </span>
                  {i === cursor && (
                    <CornerDownLeft
                      className="size-4 shrink-0 text-stone-400"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center justify-between border-t border-stone-200 px-5 py-2.5 font-mono text-[11px] text-stone-500 sm:flex">
          <span>↑↓ to navigate · ↵ to open · esc to close</span>
          <span>⌘K</span>
        </div>
      </motion.div>
    </div>
  );
}
