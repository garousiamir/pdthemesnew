import type { BlogPostMeta } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/animations/reveal";

export function BlogPreview({ posts }: { posts: BlogPostMeta[] }) {
  const [first, ...rest] = posts;
  if (!first) return null;
  return (
    <section className="container-x section hairline-t" aria-labelledby="blog-title" id="blog">
      <SectionHeading
        eyebrow="Blog & resources"
        title={
          <span id="blog-title">
            Notes from the <em className="accent-italic">studio</em>.
          </span>
        }
        actions={
          <Button href="/blog" variant="secondary" arrow>
            All articles
          </Button>
        }
      />
      <Reveal className="mt-12 lg:mt-16" stagger={0.12}>
        <div data-reveal>
          <PostCard post={first} variant="feature" />
        </div>
        <div className="mt-12 grid gap-8 border-t border-stone-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((p) => (
            <div key={p.slug} data-reveal>
              <PostCard post={p} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
