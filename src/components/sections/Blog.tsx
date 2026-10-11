import Link from "next/link";
import { Entry, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/format";

export function Blog() {
  return (
    <Section id="blog">
      <SectionHeading title="Writing" />

      <div>
        {blogPosts.map((post) => (
          <Entry key={post.slug} margin={<time dateTime={post.date}>{formatDate(post.date)}</time>}>
            <h3 className="text-[1.3125rem] font-semibold leading-snug">
              <Link
                href={`/blog/${post.slug}/`}
                className="underline underline-offset-4 decoration-1 decoration-line hover:decoration-ink"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-ink-muted max-w-[65ch]">{post.excerpt}</p>
          </Entry>
        ))}
      </div>
    </Section>
  );
}
