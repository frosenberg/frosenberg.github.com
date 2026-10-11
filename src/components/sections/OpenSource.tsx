import { Entry, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openSourceProjects } from "@/data/open-source";

export function OpenSource() {
  return (
    <Section id="open-source">
      <SectionHeading title="Open source" />

      <div>
        {openSourceProjects.map((project) => (
          <Entry key={project.name} margin={project.role}>
            <h3 className="text-[1.3125rem] font-semibold leading-snug">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-1 decoration-line hover:decoration-ink"
              >
                {project.name}
              </a>
            </h3>
            <p className="mt-2 text-ink-muted max-w-[65ch]">{project.description}</p>
          </Entry>
        ))}
      </div>
    </Section>
  );
}
