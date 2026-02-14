import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog-posts";

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
    <div className="pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-heading transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-text-dim mb-4">
            <Calendar size={14} />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text-heading leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        <div
          className="prose prose-invert prose-blog max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
