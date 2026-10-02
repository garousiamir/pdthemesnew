import { faqs } from "@/content/faq";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, faqJsonLd } from "@/lib/seo/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description: "How purchases, licensing, installation, updates, renewals, support and refunds work at PDThemes, plus compatibility and account access.",
  path: "/faq",
});

export default function FaqPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader crumbs={[{ name: "FAQ", path: "/faq" }]} eyebrow="Frequently asked questions" title={<>Answers, <em className="accent-italic">plainly</em>.</>} lead="Everything we are asked before and after a purchase. If your question is missing, the contact form is one click away." size="lg" />
      <section className="container-x pb-(--section)">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <Reveal className="lg:sticky lg:top-32">
              <p className="eyebrow" data-reveal>Topics</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1" data-reveal>
                {categories.map((c) => (
                  <li key={c}><a href={`#faq-${c?.toLowerCase().replace(/\W+/g, "-")}`} className="inline-flex rounded-full border border-stone-200 px-3 py-1.5 text-[13px] hover:border-ink lg:border-0 lg:px-0 lg:text-[15px] lg:link-underline">{c}</a></li>
                ))}
              </ul>
              <div className="mt-8 hidden lg:block" data-reveal>
                <Button href="/contact" variant="secondary" arrow>Ask a question</Button>
              </div>
            </Reveal>
          </aside>
          <div className="lg:col-span-9">
            {categories.map((c) => (
              <div key={c} id={`faq-${c?.toLowerCase().replace(/\W+/g, "-")}`} className="scroll-mt-32 [&+&]:mt-12">
                <h2 className="eyebrow mb-2">{c}</h2>
                <Accordion items={faqs.filter((f) => f.category === c).map((f) => ({ question: f.question, answer: f.answer }))} defaultOpen={null} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
