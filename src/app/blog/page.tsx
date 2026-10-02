import { getAllPosts, getBlogCategories, stripContent } from "@/lib/blog";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { BlogList } from "@/components/blog/blog-list";

export const metadata = createMetadata({
  title: "Blog — Studio Notes, Guides & Release Notes",
  description: "Articles from the PDThemes studio: block theme engineering, licensing explained, performance budgets, accessibility checklists and release notes.",
  path: "/blog",
});

import { Suspense } from "react";

export default function BlogPage() {
  const posts = getAllPosts().map(stripContent);
  const categories = getBlogCategories();
  return (
    <>
      <PageHeader crumbs={[{ name: "Blog", path: "/blog" }]} eyebrow="Blog & resources" title={<>Notes from the <em className="accent-italic">studio</em>.</>} lead="How we build, what we learned, and what changed in each release. New articles roughly once a month." />
      <section className="container-x pb-(--section)" aria-label="Articles">
        <Suspense fallback={null}>
          <BlogList posts={posts} categories={categories} />
        </Suspense>
      </section>
    </>
  );
}
