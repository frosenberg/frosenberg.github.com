import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "neutral";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "primary" && "bg-primary/15 text-primary-light",
        variant === "accent" && "bg-accent/15 text-accent-light",
        variant === "neutral" && "bg-border/50 text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
