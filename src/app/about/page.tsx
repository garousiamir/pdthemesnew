import Image from "next/image";
import { createMetadata } from "@/lib/seo/metadata";
import { getProducts } from "@/lib/products";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/animations/reveal";
import { Marquee } from "@/components/animations/marquee";
import { Button } from "@/components/ui/button";
import { benefits } from "@/content/pages/home";
import { FinalCta } from "@/components/home/final-cta";

export const metadata = createMetadata({
  title: "About PDThemes — A WordPress Product Studio in Germany",
  description:
    "PDThemes is a small studio building block-based WordPress themes and plugins, sold directly, documented in detail and supported by the people who build them.",
  path: "/about",
});

const principles = [
  {
    title: "Fewer products, finished",
    body: "We would rather ship eight products we can stand behind for years than eighty we cannot. Every product gets the same review before release: performance budget, accessibility checklist, keyboard pass, nine-viewport screenshot review.",
  },
  {
    title: "Native first",
    body: "Block templates, theme.json, standard hooks. When WordPress gains a capability we remove our own version of it. The aim is code that a developer who has never met us can maintain.",
  },
  {
    title: "Direct, and honest",
    body: "We sell directly through Freemius so prices stay simple and support stays close. No marketplace exclusivity, no fake countdowns, no reviews we cannot verify.",
  },
  {
    title: "Documented as we go",
    body: "Documentation is written alongside the feature, not after launch. If a setting needs a paragraph to explain, we first ask whether the setting should exist.",
  },
];

export default function AboutPage() {
  const products = getProducts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About PDThemes"
        title={
          <>
            A small studio with <em className="accent-italic">long</em>{" "}
            intentions.
          </>
        }
        lead="PDThemes builds WordPress themes and plugins from Germany. We design them like editorial products, engineer them like software, and support them like we will still be here in five years — because we plan to be."
      />

      <section className="hairline-t hairline-b py-5" aria-label="Products">
        <Marquee duration={40} gap="0" className="mask-fade-x">
          {products.map((p) => (
            <span
              key={p.slug}
              className="flex items-center gap-10 px-5 font-display text-2xl text-stone-600"
            >
              {p.name}
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            </span>
          ))}
        </Marquee>
      </section>

      <section
        className="container-x section"
        aria-labelledby="principles-title"
      >
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">How we work</p>
            <h2 id="principles-title" className="display-md mt-4">
              Four principles, no slogans.
            </h2>
          </div>
          <ol className="divide-y divide-stone-200 border-y border-stone-200 lg:col-span-8">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6"
                data-reveal
              >
                <span className="font-mono text-xs text-stone-400 sm:pt-2">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-stone-600 sm:text-base">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section
        className="dark-surface section"
        aria-labelledby="standards-title"
      >
        <div className="container-x">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5" data-reveal>
              <p className="eyebrow text-stone-400">Development standards</p>
              <h2 id="standards-title" className="display-md mt-4">
                What every release passes.
              </h2>
              <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-stone-300">
                These are gates, not goals. A release that misses one waits.
              </p>
              <Button
                href="/blog/accessible-by-default"
                variant="inverse"
                className="mt-8"
                arrow
              >
                Read the checklist
              </Button>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:col-span-7">
              {benefits.map((b) => (
                <li key={b.n} className="bg-ink p-5" data-reveal>
                  <p className="font-mono text-xs text-stone-500">{b.n}</p>
                  <p className="mt-2 font-display text-xl">{b.title}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-x section" aria-labelledby="studio-title">
        <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">The studio</p>
            <h2 id="studio-title" className="display-md mt-4">
              Based in Germany, working everywhere WordPress runs.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-stone-600">
              PDThemes is independent and self-funded. We publish free products
              on WordPress.org, sell premium products directly through Freemius,
              and write about what we learn on the blog. Verified customer
              numbers and reviews will appear here once we have them to show;
              until then we would rather show the work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products" variant="primary" arrow>
                See the products
              </Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7" data-reveal>
            {products.slice(0, 4).map((p, i) => (
              <div
                key={p.slug}
                className={`frame relative ${i % 2 ? "aspect-[4/5] translate-y-8" : "aspect-[4/5]"}`}
              >
                <Image
                  src={i % 2 ? p.gallery[2].src : p.thumbnail.src}
                  alt={p.thumbnail.alt}
                  fill
                  sizes="(min-width:1024px) 30vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <FinalCta products={products} />
    </>
  );
}
