import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1).max(240),
  category: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  author: z.string().min(1).default("PDThemes Studio"),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().default(1600),
    height: z.number().default(1000),
  }),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type BlogPost = BlogPostMeta & { content: string };

function readPost(file: string): BlogPost | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${file}: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")}`,
    );
  }
  if (parsed.data.draft && process.env.NODE_ENV === "production") return null;
  const slug = file.replace(/\.mdx?$/, "");
  const { draft: _draft, ...meta } = parsed.data;
  void _draft;
  return { slug, ...meta, readingTime: readingTime(content).text, content };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category))).sort();
}

export function stripContent(post: BlogPost): BlogPostMeta {
  const { content: _c, ...meta } = post;
  void _c;
  return meta;
}
