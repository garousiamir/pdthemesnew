import Link from "next/link";
import { Mail, Clock, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/animations/reveal";

export const metadata = createMetadata({
  title: "Contact PDThemes",
  description:
    "Pre-sales questions, support requests, licensing and press enquiries. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const products = getProducts().map((p) => ({ slug: p.slug, name: p.name }));
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title={
          <>
            Say <em className="accent-italic">hello</em>.
          </>
        }
        lead="Questions before buying, help with a product, or a licensing query: use the form and pick a topic so it reaches the right person."
        size="lg"
      />
      <section className="container-x pb-(--section)">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="order-2 flex flex-col gap-8 lg:order-1 lg:col-span-4">
            <div data-reveal>
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-2 inline-flex items-center gap-2 font-display text-2xl"
              >
                <Mail className="size-5 text-accent" aria-hidden /> {site.email}
              </a>
              <p className="mt-2 text-sm text-stone-600">
                Support:{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="link-underline"
                >
                  {site.supportEmail}
                </a>
              </p>
            </div>
            <div data-reveal>
              <p className="eyebrow">Response time</p>
              <p className="mt-2 flex items-start gap-2 text-[15px] text-stone-700">
                <Clock className="mt-0.5 size-4 text-accent" aria-hidden />{" "}
                Within one business day, Monday to Friday. Support requests with
                an active license key are answered first.
              </p>
            </div>
            <div data-reveal>
              <p className="eyebrow">Studio</p>
              <p className="mt-2 flex items-start gap-2 text-[15px] text-stone-700">
                <MapPin className="mt-0.5 size-4 text-accent" aria-hidden />{" "}
                {site.location}. Postal address on the{" "}
                <Link href="/legal/imprint" className="link-underline">
                  imprint
                </Link>{" "}
                page.
              </p>
            </div>
            <div
              className="rounded-xl border border-stone-200 p-5 text-[14px] text-stone-600"
              data-reveal
            >
              <p className="font-medium text-ink">Account, invoices, refunds</p>
              <p className="mt-1">
                These are handled in the{" "}
                <a
                  href="https://users.freemius.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Freemius customer portal
                </a>
                . You do not need to contact us to download invoices or manage
                renewals.
              </p>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-8">
            <>
              <ContactForm products={products} />
            </>
          </div>
        </div>
      </section>
    </>
  );
}
