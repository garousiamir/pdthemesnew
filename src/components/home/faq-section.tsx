import { faqs } from "@/content/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd, faqJsonLd } from "@/lib/seo/json-ld";

export function FaqSection({ limit = 10, withSchema = true }: { limit?: number; withSchema?: boolean }) {
  const items = faqs.slice(0, limit);
  return (
    <section className="container-x section hairline-t" aria-labelledby="faq-title" id="faq">
      {withSchema && <JsonLd data={faqJsonLd(items)} />}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              size="md"
              eyebrow="Questions"
              title={<span id="faq-title">Answers before you ask.</span>}
              lead="Purchases, licensing, installation, updates, renewals, support and refunds, in plain language."
            />
            <Button href="/faq" variant="link" className="mt-6">
              Read the full FAQ →
            </Button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items.map((f) => ({ question: f.question, answer: f.answer, category: f.category }))} />
        </div>
      </div>
    </section>
  );
}
