import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, className, tone = "light" }: { items: Crumb[]; className?: string; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={cn("font-mono text-[11px] uppercase tracking-[0.12em]", tone === "dark" ? "text-stone-400" : "text-stone-500", className)}>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${i}-${c.path}`} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={tone === "dark" ? "text-paper" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="link-underline hover:text-ink">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
