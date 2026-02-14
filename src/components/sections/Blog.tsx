import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog-posts";

export function Blog() {
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading number="07" title="Blog" subtitle="Writing and thoughts" />
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={0.1 * (i + 1)}>
              <a href={`/blog/${post.slug}/`}>
                <Card className="h-full flex flex-col group">
                  <div className="flex items-center gap-2 text-xs text-text-dim mb-3">
                    <Calendar size={12} />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-heading mb-2 group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary-light mt-4 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </div>
                </Card>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
