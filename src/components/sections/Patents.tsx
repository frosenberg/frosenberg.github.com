import { Entry, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExpandableList } from "@/components/ui/ExpandableList";
import { People } from "@/components/ui/People";
import { patents } from "@/data/patents";
import type { Patent } from "@/types";

function PatentItem({ patent }: { patent: Patent }) {
  return (
    <Entry margin={`US ${patent.number}`}>
      <h3 className="font-semibold leading-snug">
        <a
          href={patent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-1 decoration-line hover:decoration-ink"
        >
          {patent.title}
        </a>
      </h3>
      <p className="mt-1 figures text-[0.9375rem] font-medium text-ink-muted">
        Filed {patent.filed}, granted {patent.dateOfPatent}
      </p>
      <p className="mt-2 text-base text-ink-muted max-w-[65ch] line-clamp-2">
        {patent.abstract}
      </p>
      <p className="mt-2 text-[0.9375rem] text-ink-muted">
        <People names={patent.inventors} />
      </p>
    </Entry>
  );
}

export function Patents() {
  return (
    <Section id="work">
      <SectionHeading
        title="Patents"
        subtitle={`${patents.length} US patents in systems management, automation and testing.`}
      />

      <ExpandableList initialCount={3} totalLabel="patents">
        {patents.map((patent) => (
          <PatentItem key={patent.number} patent={patent} />
        ))}
      </ExpandableList>
    </Section>
  );
}
