import { statements } from "@/content/pages/home";
import { Marquee } from "@/components/animations/marquee";

export function BrandStatement() {
  return (
    <section className="dark-surface overflow-hidden border-t border-paper/10 py-16 lg:py-24" aria-label="Brand statement">
      <div className="flex flex-col gap-3 lg:gap-5">
        {statements.map((s, i) => (
          <Marquee key={s} duration={30 + i * 6} reverse={i % 2 === 1} velocitySkew gap="0" reducedCount={1}>
            {[0, 1, 2].map((k) => (
              <span key={k} className="flex items-center whitespace-nowrap px-6 font-display text-[clamp(3rem,9vw,8.5rem)] leading-none tracking-[-0.04em]">
                <span className={i % 2 === 1 ? "italic font-normal text-stone-400" : "text-paper"}>{s}</span>
                <span className="mx-8 size-3 rounded-full bg-accent lg:mx-12 lg:size-5" aria-hidden />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
