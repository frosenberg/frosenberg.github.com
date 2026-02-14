import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { openSourceProjects } from "@/data/open-source";

export function OpenSource() {
  return (
    <section className="py-24 md:py-32 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="04"
            title="Open Source"
            subtitle="Projects I've originated and contributed to"
          />
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {openSourceProjects.map((project, i) => (
            <AnimateOnScroll key={project.name} delay={0.1 * (i + 1)}>
              <Card className="h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <Github size={20} className="text-text-muted shrink-0" />
                    <h3 className="font-display text-lg font-semibold text-text-heading">
                      {project.name}
                    </h3>
                  </div>
                  <Badge variant="accent">{project.role}</Badge>
                </div>
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-light hover:text-primary mt-4 transition-colors"
                >
                  View Project <ExternalLink size={14} />
                </a>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
