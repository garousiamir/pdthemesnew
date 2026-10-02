import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  variant = "compact",
  priority,
}: {
  post: BlogPostMeta;
  variant?: "compact" | "feature";
  priority?: boolean;
}) {
  const feature = variant === "feature";
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        feature && "md:grid md:grid-cols-2 md:gap-8 md:items-center",
      )}
      data-testid="post-card"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-paper-2",
          feature ? "aspect-[16/10]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority={priority}
          sizes={
            feature
              ? "(min-width:768px) 50vw, 100vw"
              : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn("flex flex-col gap-3 pt-5", feature && "md:pt-0")}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500">
          <span className="text-accent-ink">{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </p>
        <h3
          className={cn(
            "font-display leading-[1.05]",
            feature ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>
        <p
          className={cn(
            "text-stone-600",
            feature
              ? "max-w-[52ch] text-base leading-relaxed"
              : "text-sm leading-relaxed",
          )}
        >
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
