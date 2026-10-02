import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Price({
  amount,
  currency = "USD",
  compareAt,
  prefix,
  suffix,
  className,
  size = "md",
}: {
  amount: number;
  currency?: string;
  compareAt?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-sm" : "text-lg";
  if (amount === 0) {
    return (
      <span
        className={cn("font-mono font-medium text-moss", sizeClass, className)}
      >
        Free
      </span>
    );
  }
  return (
    <span
      className={cn("inline-flex items-baseline gap-2 font-mono", className)}
    >
      {prefix && (
        <span className="text-xs uppercase tracking-[0.12em] text-stone-500">
          {prefix}
        </span>
      )}
      <span className={cn("font-medium tabular-nums", sizeClass)}>
        {formatPrice(amount, currency)}
      </span>
      {compareAt && compareAt > amount && (
        <span className="text-sm text-stone-400 line-through tabular-nums">
          {formatPrice(compareAt, currency)}
        </span>
      )}
      {suffix && <span className="text-xs text-stone-500">{suffix}</span>}
    </span>
  );
}
