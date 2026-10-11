import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-line", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">{children}</div>
    </section>
  );
}

interface EntryProps {
  /** Left margin: a year, a date or a short marker. */
  margin: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/** The year-margin row used by every list on the page. */
export function Entry({ margin, children, id, className }: EntryProps) {
  return (
    <div
      id={id}
      className={cn(
        "grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] gap-x-8 gap-y-1 py-6 border-b border-line/70 last:border-b-0",
        className
      )}
    >
      <div className="figures text-[0.9375rem] font-medium text-ink-muted sm:pt-0.5">
        {margin}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
