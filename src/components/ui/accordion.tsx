"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: React.ReactNode; category?: string };

export function Accordion({ items, className, defaultOpen = 0, tone = "light" }: { items: AccordionItem[]; className?: string; defaultOpen?: number | null; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const dark = tone === "dark";
  return (
    <div className={cn("divide-y", dark ? "divide-paper/15 border-y border-paper/15" : "divide-stone-200 border-y border-stone-200", className)} data-testid="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors sm:py-6", dark ? "hover:text-paper" : "hover:text-ink")}
              >
                <span className="flex items-baseline gap-4">
                  {item.category && <span className={cn("eyebrow hidden w-28 shrink-0 sm:block", dark && "text-stone-500")}>{item.category}</span>}
                  <span className="font-display text-xl leading-tight sm:text-2xl">{item.question}</span>
                </span>
                <span className={cn("mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-base ease-out-expo", dark ? "border-paper/25" : "border-stone-300", isOpen && "rotate-45")}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion-panel" data-open={isOpen} hidden={!isOpen ? undefined : undefined}>
              <div>
                <div className={cn("pb-6 pr-10 text-[15px] leading-relaxed sm:pl-32 sm:text-base", dark ? "text-stone-300" : "text-stone-600", !item.category && "sm:pl-0")}>{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
