"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/animations/reveal";
import { useLenis } from "@/components/animations/smooth-scroll";

const social = [
  { label: "GitHub", href: site.social.github },
  { label: "X", href: site.social.x },
  { label: "YouTube", href: site.social.youtube },
  { label: "WordPress.org", href: site.social.wordpress },
];

export function Footer() {
  const { lenis } = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dark-surface relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-x section-t pb-10">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <Logo tone="paper" />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-stone-400">{site.description}</p>
            <NewsletterForm className="mt-8 max-w-sm" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((group) => (
              <div key={group.heading} data-reveal>
                <p className="eyebrow mb-4 text-stone-500">{group.heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline text-[15px] text-stone-300 hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 overflow-hidden border-t border-paper/10 pt-6 sm:mt-24">
          <p
            aria-hidden
            data-reveal
            className="font-display text-[clamp(4.5rem,19vw,19rem)] font-medium leading-[0.85] tracking-[-0.05em] text-paper/95 select-none"
          >
            PDThemes<span className="text-accent">.</span>
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/10 pt-6 text-[13px] text-stone-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Made in {site.location}. All product names are trademarks of their respective owners.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">
                {s.label}
              </a>
            ))}
            <button type="button" onClick={toTop} className="group ml-auto inline-flex items-center gap-1.5 rounded-full border border-paper/15 px-3 py-1.5 hover:border-paper/50 hover:text-paper md:ml-2">
              Top
              <ArrowUp className="size-3.5 transition-transform duration-base ease-out-expo group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
