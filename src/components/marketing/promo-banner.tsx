import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Floating promotional strip. Disabled by default via `site.promo.enabled`.
 * Only enable it for a real, time-limited promotion configured in Freemius.
 */
export function PromoBanner() {
  if (!site.promo.enabled || !site.promo.message) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <Link
        href={site.promo.href || "/products"}
        className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper shadow-float hover:bg-ink-3"
      >
        {site.promo.message}
      </Link>
    </div>
  );
}
