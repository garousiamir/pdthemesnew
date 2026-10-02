import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "accent" | "inverse" | "link";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-3 border border-ink",
  accent: "bg-accent text-white hover:bg-accent-ink border border-accent hover:border-accent-ink",
  secondary: "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink/[0.04]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.06] border border-transparent",
  inverse: "bg-paper text-ink hover:bg-white border border-paper",
  link: "bg-transparent text-ink p-0 h-auto border-0 link-underline rounded-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2.5",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { href?: undefined };
type LinkProps = BaseProps & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> & { href: string; external?: boolean };

export type ButtonLikeProps = ButtonProps | LinkProps;

const baseClass =
  "group/btn inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-base ease-out-expo active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

function Arrow() {
  return (
    <span className="relative inline-grid size-4 overflow-hidden place-items-center" aria-hidden>
      <ArrowUpRight className="col-start-1 row-start-1 size-4 transition-transform duration-base ease-out-expo group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
      <ArrowUpRight className="col-start-1 row-start-1 size-4 -translate-x-4 translate-y-4 transition-transform duration-base ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
    </span>
  );
}

export function Button(props: ButtonLikeProps) {
  const { variant = "primary", size = "md", arrow = false, className, children } = props;
  const classes = cn(baseClass, variants[variant], variant !== "link" && sizes[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, external, variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _a; void _c; void _ch;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
          {arrow && <Arrow />}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, href: _h, ...rest } = props as ButtonProps;
  void _v; void _s; void _a; void _c; void _ch; void _h;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
