import { Entry, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        title="Experience"
        subtitle="From distributed-systems research to running engineering organisations."
      />

      <div>
        {experiences.map((exp, i) => (
          <Entry
            key={exp.id}
            id={`exp-${exp.id}`}
            margin={exp.period.replace(" — Present", "–today").replace(" — ", "–")}
            className="scroll-mt-20"
          >
            <h3 className="text-[1.3125rem] font-semibold leading-snug">
              {exp.role}
            </h3>
            <p className={cn("mt-0.5 font-medium", i === 0 ? "text-signal" : "text-ink")}>
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-1 decoration-line hover:decoration-current"
              >
                {exp.company}
              </a>
              <span className="text-ink-muted font-normal">, {exp.location}</span>
            </p>
            <p className="mt-3 text-ink-muted max-w-[65ch]">{exp.description}</p>
            <ul className="mt-3 space-y-1.5 max-w-[65ch] text-base">
              {exp.highlights.map((h) => (
                <li key={h} className="grid grid-cols-[1rem_1fr]">
                  <span aria-hidden="true" className="text-line">–</span>
                  {h}
                </li>
              ))}
            </ul>
          </Entry>
        ))}
      </div>
    </Section>
  );
}
