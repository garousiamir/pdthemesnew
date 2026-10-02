import { credibility } from "@/content/pages/home";
import { Marquee } from "@/components/animations/marquee";
import { Reveal } from "@/components/animations/reveal";

export function Credibility() {
  return (
    <section
      className="hairline-t hairline-b"
      aria-labelledby="credibility-title"
    >
      <h2 id="credibility-title" className="sr-only">
        {credibility.eyebrow}
      </h2>
      <div className="hairline-b py-5">
        <Marquee
          duration={36}
          gap="0"
          ariaLabel="Supported platforms"
          className="mask-fade-x"
        >
          {credibility.platforms.map((p) => (
            <span
              key={p}
              className="flex items-center gap-10 px-5 font-mono text-[12px] uppercase tracking-[0.16em] text-stone-600"
            >
              {p}
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
      <Reveal className="container-x grid gap-8 py-12 md:grid-cols-3 md:gap-6 lg:py-16">
        {credibility.commitments.map((c, i) => (
          <div key={c.title} className="flex gap-4" data-reveal>
            <span className="font-mono text-xs text-stone-400">0{i + 1}</span>
            <div>
              <h3 className="font-display text-xl sm:text-2xl">{c.title}</h3>
              <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-stone-600">
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
