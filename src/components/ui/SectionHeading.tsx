import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <h2 className="flex items-center gap-3 text-[2.25rem] leading-tight font-semibold tracking-tight">
        <span
          aria-hidden="true"
          className="size-3.5 shrink-0 rounded-full border-[1.75px] border-ink"
        />
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 pl-[1.625rem] text-ink-muted max-w-[60ch]">{subtitle}</p>
      )}
    </div>
  );
}
