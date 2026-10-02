import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { SplitHeadline } from "@/components/animations/split-headline";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  className?: string;
  size?: "lg" | "xl";
  align?: "left" | "center";
};

/** Standard page intro used by listing and supporting pages. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  className,
  size = "xl",
  align = "left",
}: Props) {
  return (
    <header
      className={cn(
        "container-x pt-[calc(var(--header-h)+2.5rem)] pb-12 lg:pt-[calc(var(--header-h)+4rem)] lg:pb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      {crumbs && (
        <Breadcrumbs
          items={crumbs}
          className={cn(
            "mb-8",
            align === "center" && "justify-center [&_ol]:justify-center",
          )}
        />
      )}
      <Reveal>
        {eyebrow && (
          <p className="eyebrow mb-5" data-reveal>
            {eyebrow}
          </p>
        )}
      </Reveal>
      <SplitHeadline
        as="h1"
        trigger="mount"
        delay={0.1}
        className={cn(
          size === "xl" ? "display-xl" : "display-lg",
          "max-w-[14ch]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </SplitHeadline>
      <Reveal delay={0.4}>
        {lead && (
          <p
            className={cn(
              "lead mt-7 max-w-[58ch]",
              align === "center" && "mx-auto",
            )}
            data-reveal
          >
            {lead}
          </p>
        )}
        {actions && (
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-3",
              align === "center" && "justify-center",
            )}
            data-reveal
          >
            {actions}
          </div>
        )}
      </Reveal>
    </header>
  );
}
