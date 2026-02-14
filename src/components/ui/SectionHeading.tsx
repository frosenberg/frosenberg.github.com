import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <span className="font-mono text-sm text-primary tracking-wider mb-3 block">
        {number} //
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-text-heading leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-muted max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-4 w-16 h-0.5 bg-primary" />
    </div>
  );
}
