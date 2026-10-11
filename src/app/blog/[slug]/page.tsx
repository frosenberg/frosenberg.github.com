import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/format";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <article className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link
          href="/#blog"
          className="font-cond font-medium text-ink-muted hover:text-ink underline underline-offset-4 decoration-1"
        >
          All writing
        </Link>

        <header className="mt-8 mb-12">
          <h1 className="max-w-[22ch] text-[2.25rem] md:text-[3rem] font-semibold leading-[1.05] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 figures font-medium text-ink-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="font-sans">, filed under {post.tags.join(", ")}</span>
          </p>
        </header>

        <div
          className="prose prose-blog max-w-[65ch]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
