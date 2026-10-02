import Image from "next/image";
import type { Product } from "@/types";
import { finalCta } from "@/content/pages/home";
import { Button } from "@/components/ui/button";
import { SplitHeadline } from "@/components/animations/split-headline";
import { Reveal } from "@/components/animations/reveal";
import { Marquee } from "@/components/animations/marquee";

export function FinalCta({ products }: { products: Product[] }) {
  return (
    <section
      className="relative overflow-hidden bg-accent text-paper"
      aria-labelledby="cta-title"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <div className="container-x relative section pb-0">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-paper/70" data-reveal>
            {finalCta.eyebrow}
          </p>
          <SplitHeadline
            as="h2"
            id="cta-title"
            className="display-xl mt-6 text-paper"
          >
            {finalCta.title[0]}{" "}
            <em className="font-normal italic text-ink">{finalCta.title[1]}</em>
          </SplitHeadline>
          <p
            className="lead mx-auto mt-6 max-w-[42ch] text-paper/85"
            data-reveal
          >
            {finalCta.lead}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
            <Button
              href={finalCta.primary.href}
              variant="inverse"
              size="lg"
              arrow
            >
              {finalCta.primary.label}
            </Button>
            <Button
              href={finalCta.secondary.href}
              size="lg"
              className="border-paper/60 bg-transparent text-paper hover:bg-paper/10 hover:border-paper"
            >
              {finalCta.secondary.label}
            </Button>
          </div>
        </Reveal>
        <div className="relative mt-16 pb-0 lg:mt-20" aria-hidden>
          <Marquee duration={44} gap="1.25rem" className="mask-fade-x">
            {products.map((p) => (
              <div
                key={p.slug}
                className="relative aspect-[16/11] w-[260px] overflow-hidden rounded-t-lg bg-paper-2 shadow-frame sm:w-[320px] lg:w-[380px]"
              >
                <Image
                  src={p.thumbnail.src}
                  alt=""
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
