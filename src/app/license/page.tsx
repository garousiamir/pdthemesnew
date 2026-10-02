import { Check } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/ui/demo-notice";

export const metadata = createMetadata({
  title: "License Information — GPL, Activations & Renewals",
  description: "What a PDThemes license includes: GPL software, site activations, one year of updates and support, renewals, and what happens when a license expires.",
  path: "/license",
});

const rows = [
  { label: "Software license", value: "GNU General Public License v2 or later. Use, modify and redistribute under the same terms." },
  { label: "Activations", value: "1, 5 or unlimited sites depending on the tier. Staging and development sites on the same license can be deactivated to free a slot." },
  { label: "Updates", value: "12 months from purchase, delivered in your WordPress admin through Freemius. Every version is also downloadable from the customer portal." },
  { label: "Support", value: "12 months from purchase, from the product's developers. See the support page for scope." },
  { label: "Renewal", value: "Annual licenses renew automatically with an email reminder beforehand. Cancel any time in the customer portal." },
  { label: "After expiry", value: "The product keeps working. Updates and support stop until you renew." },
  { label: "Client sites", value: "Allowed on all tiers. The license holder is responsible for activations; clients may keep using the product after the engagement ends." },
  { label: "Refunds", value: "See the refund policy. Requests within the window need no justification." },
];

export default function LicensePage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "License information", path: "/license" }]} eyebrow="Licensing" title={<>GPL software, <em className="accent-italic">serviced</em>.</>} lead="Our products are open source. A license buys the services around them: updates, support and a set number of site activations. Here is exactly what that means." size="lg" />
      <section className="container-x pb-(--section)">
        <DemoNotice className="mb-10 max-w-3xl">Summary for orientation. The binding terms are the terms and conditions and the Freemius purchase terms shown at checkout. Legal text on this site is marked as requiring review before launch.</DemoNotice>
        <Reveal className="divide-y divide-stone-200 border-y border-stone-200" stagger={0.04}>
          {rows.map((r) => (
            <div key={r.label} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8" data-reveal>
              <dt className="font-medium">{r.label}</dt>
              <dd className="text-[15px] leading-relaxed text-stone-600">{r.value}</dd>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 p-6" data-reveal>
            <p className="eyebrow">Free products</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {["GPL, free, unlimited sites", "Distributed through WordPress.org where listed", "Updates through WordPress.org", "Community support in the plugin or theme forum"].map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-0.5 size-4 text-moss" aria-hidden /> {f}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-stone-200 p-6" data-reveal>
            <p className="eyebrow">Pro versions of freemium plugins</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {["Separate download that works alongside the free plugin", "Pro features keep working after expiry", "Updates and priority support for 12 months", "Compare free vs Pro on each product page"].map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-0.5 size-4 text-moss" aria-hidden /> {f}</li>)}
            </ul>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/legal/terms" variant="secondary">Terms & conditions</Button>
          <Button href="/legal/refunds" variant="secondary">Refund policy</Button>
          <Button href="/faq" variant="link">Licensing FAQ →</Button>
        </div>
      </section>
    </>
  );
}
