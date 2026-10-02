import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * PDThemes logotype. Set in Geist with a Fraunces italic "P" ligature
 * treatment to keep it original and unmistakable at every size.
 */
export function Logo({ className, href = "/", tone = "ink" }: { className?: string; href?: string; tone?: "ink" | "paper" }) {
  return (
    <Link
      href={href}
      aria-label="PDThemes — home"
      className={cn("group inline-flex items-center gap-2 font-sans text-[20px] font-semibold tracking-[-0.02em]", tone === "paper" ? "text-paper" : "text-ink", className)}
    >
      <span className="relative grid size-7 place-items-center overflow-hidden rounded-[8px] bg-accent text-paper" aria-hidden>
        <svg viewBox="0 0 28 28" className="size-7" fill="none">
          <path d="M8 21V7h6.2c3.4 0 5.6 2 5.6 5s-2.2 5-5.6 5H11v4H8Zm3-6.6h3c1.7 0 2.7-.9 2.7-2.4S15.7 9.6 14 9.6h-3v4.8Z" fill="currentColor" />
          <circle cx="21" cy="21" r="2" fill="currentColor" className="transition-transform duration-slow ease-out-expo group-hover:-translate-y-[14px]" />
        </svg>
      </span>
      <span>
        PDThemes<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
