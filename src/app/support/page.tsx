import {
  Clock,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/home/faq-section";

export const metadata = createMetadata({
  title: "Support — Help from the People Who Build the Products",
  description:
    "How to get support for PDThemes products: what to include, response times, what is covered, and where to manage your account and licenses.",
  path: "/support",
});

const covered = [
  "Installation and license activation",
  "Bugs and unexpected behaviour",
  "Compatibility questions",
  "Using documented features",
  "Update problems",
];
const notCovered = [
  "Custom development or design work",
  "Third-party plugin conflicts beyond diagnosis",
  "Hosting configuration",
  "Products modified beyond the documented options",
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Support", path: "/support" }]}
        eyebrow="Support"
        title={
          <>
            Help, from the <em className="accent-italic">builders</em>.
          </>
        }
        lead="Support requests go to the engineers who wrote the product. Include your license key and site URL and you will usually hear back the same business day."
        size="lg"
        actions={
          <>
            <Button href="/contact?topic=support" variant="accent" arrow>
              Open a support request
            </Button>
            <Button href="/documentation" variant="secondary">
              Read the docs first
            </Button>
          </>
        }
      />

      <section className="container-x pb-16" aria-labelledby="how-title">
        <h2 id="how-title" className="sr-only">
          How support works
        </h2>
        <Reveal className="grid gap-5 md:grid-cols-3" stagger={0.08}>
          {[
            {
              icon: KeyRound,
              title: "1. Find your license key",
              body: "It is in your purchase email and in the Freemius customer portal under Licenses. Free products: mention the WordPress.org version instead.",
            },
            {
              icon: MessageSquare,
              title: "2. Describe the issue",
              body: "What you expected, what happened, and the steps to reproduce. A screenshot or the site URL helps enormously.",
            },
            {
              icon: Clock,
              title: "3. We reply",
              body: "Within one business day, Monday to Friday. Requests from active licenses are prioritised; free products are supported on the WordPress.org forums.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-stone-200 p-6"
              data-reveal
            >
              <s.icon className="size-5 text-accent" aria-hidden />
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="container-x pb-16" aria-labelledby="scope-title">
        <Reveal className="grid gap-8 rounded-xl bg-paper-2 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Scope</p>
            <h2 id="scope-title" className="display-sm mt-3">
              What support covers.
            </h2>
            <p className="mt-3 text-[15px] text-stone-600">
              Support is about making the product work as documented. For custom
              work we are happy to recommend developers.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8" data-reveal>
            <div>
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="size-4 text-moss" aria-hidden /> Covered
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-[15px] text-stone-700">
                {covered.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-2 font-medium">
                <LifeBuoy className="size-4 text-stone-500" aria-hidden /> Not
                covered
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-[15px] text-stone-700">
                {notCovered.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="container-x pb-(--section)"
        aria-labelledby="account-title"
        id="account"
      >
        <Reveal className="grid items-center gap-8 rounded-xl border border-stone-200 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-8" data-reveal>
            <p className="eyebrow">Account & licenses</p>
            <h2 id="account-title" className="display-sm mt-3">
              Your account lives in the Freemius customer portal.
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-stone-600">
              Licenses, site activations, downloads of every version, invoices,
              renewal settings and refund requests are all handled there, using
              the email you purchased with. PDThemes does not operate a separate
              account system and never stores your payment details.
            </p>
          </div>
          <div
            className="flex flex-col gap-2 lg:col-span-4 lg:items-end"
            data-reveal
          >
            <Button
              href="https://users.freemius.com/"
              external
              variant="primary"
            >
              <UserRound className="size-4" aria-hidden /> Open customer portal
            </Button>
            <a
              href={`mailto:${site.supportEmail}`}
              className="link-underline text-sm text-stone-600"
            >
              {site.supportEmail}
            </a>
          </div>
        </Reveal>
      </section>
      <FaqSection limit={6} withSchema={false} />
    </>
  );
}
