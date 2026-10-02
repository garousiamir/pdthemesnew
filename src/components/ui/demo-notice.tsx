import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shown wherever demonstration content could be mistaken for a real offer.
 * Remove by setting product `status` to "live" and `site.testimonialsVerified`.
 */
export function DemoNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-md border border-sun/60 bg-sun-soft px-3 py-2 text-[13px] leading-snug text-[#5d4408]",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
