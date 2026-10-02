import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/content/pages/legal";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DemoNotice } from "@/components/ui/demo-notice";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return { title: "Not found" };
  return createMetadata({ title: page.title, description: page.summary, path: `/legal/${page.slug}` });
}

export default async function LegalPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <article className="container-x pt-[calc(var(--header-h)+2.5rem)] pb-(--section)">
      <Breadcrumbs items={[{ name: "Legal", path: "/legal/terms" }, { name: page.title, path: `/legal/${page.slug}` }]} />
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {legalPages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/legal/${p.slug}`} className={cn("inline-flex rounded-full border px-3 py-1.5 text-[13px] lg:border-0 lg:px-0 lg:text-[15px]", p.slug === page.slug ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink lg:font-medium" : "border-stone-200 hover:border-ink lg:text-stone-600 lg:hover:text-ink")}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="lg:col-span-9">
          <h1 className="display-lg">{page.title}</h1>
          <p className="lead mt-5 max-w-[56ch]">{page.summary}</p>
          <p className="mt-3 font-mono text-xs text-stone-500">Last updated {formatDate(page.updated)}</p>
          {!page.reviewed && (
            <DemoNotice className="mt-6 max-w-2xl">Draft for structure only. This text has not been reviewed by a legal professional and must be reviewed and completed (bracketed items) before the site goes live. It is not legal advice.</DemoNotice>
          )}
          <div className="prose-pd mt-10">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className={p.startsWith("[") ? "text-stone-400" : undefined}>{p}</p>)}
                {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
