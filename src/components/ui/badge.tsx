import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "moss" | "sun" | "ink" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-paper-2 text-stone-700",
  accent: "bg-accent-soft text-accent-ink",
  moss: "bg-moss-soft text-moss",
  sun: "bg-sun-soft text-[#7a5a0f]",
  ink: "bg-ink text-paper",
  outline: "border border-current/25 text-inherit",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] leading-none", tones[tone], className)}>
      {children}
    </span>
  );
}
