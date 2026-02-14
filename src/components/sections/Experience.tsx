import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="03"
            title="Experience"
            subtitle="Career journey across research and industry"
          />
        </AnimateOnScroll>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <AnimateOnScroll key={`${exp.company}-${exp.role}`} delay={0.1 * i}>
                <div className="md:grid md:grid-cols-[220px_1fr] gap-8">
                  {/* Date + dot */}
                  <div className="flex items-start gap-4 md:gap-0 mb-3 md:mb-0">
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-[15px] h-[15px] rounded-full border-2 border-primary bg-bg shrink-0" />
                    </div>
                    <div className="md:ml-3">
                      <span className="font-mono text-sm text-text-dim whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-heading">
                      {exp.role}
                    </h3>
                    <p className="text-primary-light font-medium mt-0.5">
                      {exp.company}{" "}
                      <span className="text-text-dim">
                        &middot; {exp.location}
                      </span>
                    </p>
                    <p className="text-text-muted mt-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-sm text-text-muted flex items-baseline gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0 translate-y-[-1px]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
