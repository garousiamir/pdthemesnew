import { BookOpen, Check, LifeBuoy, Mail } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/animations/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

/** Feature grid, requirements, docs/installation, changelog and FAQs. */
export function ProductFeatures({ product: p }: { product: Product }) {
  return (
    <section
      className="container-x section-t"
      aria-labelledby="features-title"
      id="features"
    >
      <Reveal>
        <p className="eyebrow" data-reveal>
          Features
        </p>
        <h2
          id="features-title"
          className="display-md mt-4 max-w-[16ch]"
          data-reveal
        >
          Everything in {p.name}, in detail.
        </h2>
      </Reveal>
      <Reveal
        className="mt-10 grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {p.features.map((f) => (
          <div key={f.title} className="bg-paper p-6 lg:p-7" data-reveal>
            <Icon name={f.icon} className="size-5 text-accent" />
            <h3 className="mt-4 font-display text-xl">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
              {f.description}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function ProductSpecs({ product: p }: { product: Product }) {
  const c = p.compatibility;
  return (
    <section
      className="container-x section-t"
      aria-labelledby="specs-title"
      id="requirements"
    >
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">Technical requirements</p>
          <h2 id="specs-title" className="display-md mt-4">
            What it needs.
          </h2>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-stone-600">
            Tested against each WordPress release. Older environments may work
            but are not supported.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8" data-reveal>
          <div className="rounded-xl border border-stone-200 p-6">
            <p className="eyebrow">Supported versions</p>
            <dl className="mt-4 divide-y divide-stone-200 text-[15px]">
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">WordPress</dt>
                <dd className="font-mono">{c.wordpress}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">PHP</dt>
                <dd className="font-mono">{c.php}</dd>
              </div>
              {c.woocommerce && (
                <div className="flex justify-between py-2.5">
                  <dt className="text-stone-500">WooCommerce</dt>
                  <dd className="font-mono">{c.woocommerce}</dd>
                </div>
              )}
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Current version</dt>
                <dd className="font-mono">{p.version}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Last updated</dt>
                <dd className="font-mono">{formatDate(p.updatedAt)}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-xl border border-stone-200 p-6">
            <p className="eyebrow">Requirements</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {p.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-moss"
                    aria-hidden
                  />{" "}
                  {r}
                </li>
              ))}
            </ul>
            {c.builders.length > 0 && (
              <>
                <p className="eyebrow mt-6">Editors</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.builders.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-stone-200 px-3 py-1 text-[13px]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {c.browsers.length > 0 && (
              <>
                <p className="eyebrow mt-6">Browsers</p>
                <p className="mt-2 text-[13px] text-stone-600">
                  {c.browsers.join(", ")}
                </p>
              </>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ProductDocs({ product: p }: { product: Product }) {
  const steps =
    p.type === "theme"
      ? [
          "Download the zip from your purchase email or the Freemius customer portal.",
          "In WordPress go to Appearance → Themes → Add New → Upload Theme and choose the zip.",
          "Activate the theme, then enter your license key when prompted to enable updates.",
          "Optionally import the demo content from Appearance → Demo Content.",
        ]
      : [
          "Download the zip from your purchase email or the Freemius customer portal (or install the free version from WordPress.org).",
          "In WordPress go to Plugins → Add New → Upload Plugin and choose the zip.",
          "Activate the plugin, then enter your license key under its settings page to enable updates.",
          "Follow the setup guide in the documentation for first configuration.",
        ];
  return (
    <section
      className="container-x section-t"
      aria-labelledby="docs-title"
      id="documentation"
    >
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">Documentation & installation</p>
          <h2 id="docs-title" className="display-md mt-4">
            Up and running in minutes.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              href={p.documentationUrl ?? "/documentation"}
              variant="primary"
            >
              <BookOpen className="size-4" aria-hidden /> Read the docs
            </Button>
            <Button href="/support" variant="secondary">
              <LifeBuoy className="size-4" aria-hidden /> Get support
            </Button>
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8" data-reveal>
          {steps.map((s, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-stone-200 p-5"
            >
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <p className="text-[15px] leading-relaxed text-stone-700">{s}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export function ProductChangelog({ product: p }: { product: Product }) {
  if (!p.changelog.length) return null;
  return (
    <section
      className="container-x section-t"
      aria-labelledby="changelog-title"
      id="changelog"
    >
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">Changelog</p>
          <h2 id="changelog-title" className="display-md mt-4">
            What changed, and when.
          </h2>
        </div>
        <ol
          className="divide-y divide-stone-200 border-y border-stone-200 lg:col-span-8"
          data-reveal
        >
          {p.changelog.map((e) => (
            <li
              key={e.version}
              className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr]"
            >
              <div>
                <p className="font-mono font-medium">v{e.version}</p>
                <p className="font-mono text-xs text-stone-500">
                  {formatDate(e.date)}
                </p>
              </div>
              <ul className="flex flex-col gap-1.5 text-[15px] text-stone-700">
                {e.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export function ProductFaq({ product: p }: { product: Product }) {
  const items = [
    ...p.faqs,
    {
      question: "What does the license include?",
      answer: p.pricing.free
        ? "The product is free and GPL-licensed. Use it on any number of sites; support runs through the WordPress.org forums."
        : "One year of updates and support for the number of sites in your tier. The software is GPL and keeps working after the license period.",
    },
    {
      question: "How do I get support?",
      answer: `Open a request on the support page with your license key and site URL, or email ${site.supportEmail}. Requests from active licenses are answered first.`,
    },
  ];
  return (
    <section
      className="container-x section-t"
      aria-labelledby="pfaq-title"
      id="faq"
    >
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="pfaq-title" className="display-md mt-4">
            About {p.name}.
          </h2>
          <p className="mt-5 text-base text-stone-600">
            Something else?{" "}
            <Link
              href="/contact"
              className="link-underline inline-flex items-center gap-1"
            >
              <Mail className="size-4" aria-hidden /> Ask us directly
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <Accordion items={items} defaultOpen={null} />
        </div>
      </Reveal>
    </section>
  );
}
