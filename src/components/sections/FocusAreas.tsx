import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusAreas } from "@/data/focus-areas";

export function FocusAreas() {
  return (
    <Section id="focus">
      <SectionHeading title="Focus" subtitle="What I've spent two decades working on." />

      <dl className="grid md:grid-cols-2 gap-x-16">
        {focusAreas.map((area) => (
          <div key={area.title} className="py-6 border-t border-line/70">
            <dt className="text-[1.3125rem] font-semibold">{area.title}</dt>
            <dd className="mt-2 text-ink-muted max-w-[52ch]">{area.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
