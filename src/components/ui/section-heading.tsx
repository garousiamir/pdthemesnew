import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  className?: string;
  actions?: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "lg",
  className,
  actions,
  as = "h2",
  tone = "light",
}: Props) {
  const Tag = as;
  const sizeClass =
    size === "xl" ? "display-xl" : size === "lg" ? "display-lg" : "display-md";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn("eyebrow", tone === "dark" && "text-stone-400")}
          data-reveal
        >
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          "flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
          align === "center" && "lg:flex-col lg:items-center",
        )}
      >
        <Tag
          className={cn(
            sizeClass,
            "max-w-[14ch]",
            align === "center" && "mx-auto",
          )}
          data-reveal
        >
          {title}
        </Tag>
        {actions && (
          <div className="shrink-0" data-reveal>
            {actions}
          </div>
        )}
      </div>
      {lead && (
        <p
          className={cn(
            "lead max-w-[56ch]",
            tone === "dark" && "text-stone-300",
            align === "center" && "mx-auto",
          )}
          data-reveal
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
