import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, stripContent } from "@/lib/blog";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, articleJsonLd } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { SplitHeadline } from "@/components/animations/split-headline";
import { Reveal } from "@/components/animations/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return createMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image.src, type: "article", publishedTime: post.date, modifiedTime: post.updated, keywords: post.tags });
}

const components = {
  a: (props: React.ComponentProps<"a">) => (props.href?.startsWith("/") ? <Link href={props.href} {...props} /> : <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" />),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { content } = await compileMDX({ source: post.content, components });
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3).map(stripContent);

  return (
    <article className="pt-[calc(var(--header-h)+2rem)]">
      <JsonLd data={articleJsonLd(post)} />
      <ReadingProgress targetId="article-body" />
      <header className="container-x">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500">
            <span className="text-accent-ink">{post.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </p>
          <SplitHeadline as="h1" trigger="mount" delay={0.1} className="display-lg mt-5">
            {post.title}
          </SplitHeadline>
          <Reveal delay={0.4}>
            <p className="lead mt-6" data-reveal>{post.excerpt}</p>
            <p className="mt-6 text-sm text-stone-500" data-reveal>By {post.author}{post.updated ? ` · Updated ${formatDate(post.updated)}` : ""}</p>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-10 max-w-5xl" delay={0.5}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-paper-2" data-reveal>
            <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </header>
      <div id="article-body" className="container-x mt-14">
        <div className="prose-pd mx-auto">{content}</div>
        <div className="mx-auto mt-12 flex max-w-[44rem] flex-wrap gap-2">
          {post.tags.map((t) => <span key={t} className="rounded-full border border-stone-200 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-600">{t}</span>)}
        </div>
        <div className="mx-auto mt-14 max-w-[44rem] rounded-xl bg-paper-2 p-6 sm:p-8">
          <NewsletterForm tone="light" />
        </div>
      </div>
      <section className="container-x section" aria-labelledby="more-title">
        <Reveal>
          <p className="eyebrow" data-reveal>Keep reading</p>
          <h2 id="more-title" className="display-md mt-4" data-reveal>More from the studio.</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {more.map((p) => <div key={p.slug} data-reveal><PostCard post={p} /></div>)}
        </Reveal>
      </section>
    </article>
  );
}
