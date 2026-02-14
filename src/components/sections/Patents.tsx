import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ExpandableList } from "@/components/ui/ExpandableList";
import { patents } from "@/data/patents";

function PatentItem({ patent }: { patent: (typeof patents)[0] }) {
  return (
    <div className="border-b border-border py-5 last:border-0">
      <h4 className="font-display font-semibold text-text-heading leading-snug">
        {patent.title}
      </h4>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
        <span className="font-mono text-xs text-primary">
          US {patent.number}
        </span>
        <span className="text-xs text-text-dim">
          Filed: {patent.filed}
        </span>
        <span className="text-xs text-text-dim">
          Granted: {patent.dateOfPatent}
        </span>
      </div>
      <p className="text-sm text-text-muted mt-2 leading-relaxed line-clamp-2">
        {patent.abstract}
      </p>
      <p className="text-xs text-text-dim mt-2">
        {patent.inventors.join(", ")}
      </p>
    </div>
  );
}

export function Patents() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            number="05"
            title="Patents"
            subtitle={`${patents.length} patents in systems management, automation, and testing`}
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-surface border border-border rounded-lg px-6">
            <ExpandableList initialCount={3} totalLabel="patents">
              {patents.map((patent) => (
                <PatentItem key={patent.number} patent={patent} />
              ))}
            </ExpandableList>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
