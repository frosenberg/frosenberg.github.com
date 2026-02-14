import { Brain, Cloud, GitBranch, Network } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { focusAreas } from "@/data/focus-areas";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  cloud: Cloud,
  "git-branch": GitBranch,
  network: Network,
};

export function FocusAreas() {
  return (
    <section id="focus" className="py-24 md:py-32 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="02"
            title="Focus Areas"
            subtitle="What I've spent decades working on"
          />
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 gap-6">
          {focusAreas.map((area, i) => {
            const Icon = iconMap[area.icon];
            return (
              <AnimateOnScroll key={area.title} delay={0.1 * (i + 1)}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                      {Icon && <Icon size={22} />}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text-heading mb-2">
                        {area.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
