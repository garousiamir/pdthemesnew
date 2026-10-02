import { Check, Download, ExternalLink } from "lucide-react";
import type { Product } from "@/types";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BuyButton } from "@/components/products/buy-button";
import { Reveal } from "@/components/animations/reveal";
import { DemoNotice } from "@/components/ui/demo-notice";
import { cn } from "@/lib/utils";

/**
 * Reusable pricing component. Tiers, prices and renewal terms come from the
 * product definition; nothing here is hardcoded. Free products render a
 * download panel instead of tiers.
 */
export function PricingTable({ product: p }: { product: Product }) {
  const { pricing } = p;

  return (
    <section
      className="container-x section-t"
      aria-labelledby="pricing-title"
      id="pricing"
      data-testid="pricing"
    >
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-4" data-reveal>
          <p className="eyebrow">Pricing & licensing</p>
          <h2 id="pricing-title" className="display-md mt-4">
            {pricing.free
              ? "Free, and complete."
              : "Pick the license that fits."}
          </h2>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-stone-600">
            {pricing.free
              ? "GPL-licensed and free to use on any number of sites. Support runs through the WordPress.org forums."
              : "Every tier includes the full product, one year of updates and one year of support. The software is GPL and keeps working after the license period ends."}
          </p>
          {p.status === "demo" && !pricing.free && (
            <DemoNotice className="mt-6">
              Demonstration prices. Real prices, currencies and taxes come from
              the Freemius plan configuration at checkout.
            </DemoNotice>
          )}
          {pricing.note && (
            <p className="mt-5 text-[13px] leading-relaxed text-stone-500">
              {pricing.note}
            </p>
          )}
        </div>

        <div className="min-w-0 lg:col-span-8" data-reveal>
          {pricing.free ? (
            <div className="rounded-xl border border-stone-200 bg-paper p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-3xl">{p.name}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    Current version {p.version}
                  </p>
                </div>
                <Price amount={0} size="lg" />
              </div>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Unlimited sites",
                  "GPL license",
                  "Updates via WordPress.org",
                  "Community support",
                  "All features included",
                  "Use on client sites",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[15px]">
                    <Check className="size-4 text-moss" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                {p.freeDownloadUrl && (
                  <Button
                    href={p.freeDownloadUrl}
                    external
                    variant="accent"
                    size="lg"
                  >
                    <Download className="size-4" aria-hidden /> Download Free
                  </Button>
                )}
                {p.wordpressOrgUrl && (
                  <Button
                    href={p.wordpressOrgUrl}
                    external
                    variant="secondary"
                    size="lg"
                  >
                    View on WordPress.org{" "}
                    <ExternalLink className="size-4" aria-hidden />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4",
                pricing.tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2",
              )}
            >
              {pricing.tiers.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    "relative flex flex-col rounded-xl border bg-paper p-6",
                    t.highlighted
                      ? "border-ink shadow-card"
                      : "border-stone-200",
                  )}
                  data-testid={`tier-${t.id}`}
                >
                  {t.highlighted && (
                    <Badge tone="ink" className="absolute -top-3 left-6">
                      Most chosen
                    </Badge>
                  )}
                  <p className="font-medium">{t.name}</p>
                  <p className="mt-1 text-[13px] text-stone-500">
                    {t.sites === "unlimited"
                      ? "Unlimited sites"
                      : `${t.sites} site${t.sites > 1 ? "s" : ""}`}
                  </p>
                  <div className="mt-5">
                    <Price
                      amount={t.price}
                      currency={pricing.currency}
                      compareAt={t.compareAtPrice}
                      size="lg"
                      suffix={
                        t.billingCycle === "annual"
                          ? "/ year"
                          : t.billingCycle === "monthly"
                            ? "/ month"
                            : "one-time"
                      }
                    />
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-2 text-[14px]">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-moss"
                          aria-hidden
                        />{" "}
                        {f}
                      </li>
                    ))}
                  </ul>
                  <BuyButton
                    product={p}
                    tierId={t.id}
                    variant={t.highlighted ? "accent" : "primary"}
                    className="mt-7 w-full"
                    label={`Buy ${t.name}`}
                  />
                  {t.renewalNote && (
                    <p className="mt-3 text-[12px] leading-relaxed text-stone-500">
                      {t.renewalNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          {p.wordpressOrgUrl && !pricing.free && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-stone-300 p-5">
              <div>
                <p className="font-medium">
                  Not sure yet? Start with the free version.
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  The free version is complete for most sites.{" "}
                  <a href="#compare" className="link-underline">
                    Compare free vs Pro
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href={p.wordpressOrgUrl} external variant="secondary">
                  View on WordPress.org
                </Button>
                {p.freeDownloadUrl && (
                  <Button href={p.freeDownloadUrl} external variant="ghost">
                    <Download className="size-4" aria-hidden /> Download
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
