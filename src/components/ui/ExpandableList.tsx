"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface ExpandableListProps {
  children: React.ReactNode[];
  initialCount: number;
  totalLabel: string;
  className?: string;
}

export function ExpandableList({
  children,
  initialCount,
  totalLabel,
  className,
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? children : children.slice(0, initialCount);
  const hiddenCount = children.length - initialCount;

  if (hiddenCount <= 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        {visibleItems.map((child, i) => (
          <motion.div
            key={i}
            initial={i >= initialCount ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className={cn(
          "mt-4 sm:ml-[10.5rem] text-base font-medium text-signal underline underline-offset-4 decoration-1",
          "hover:decoration-2 cursor-pointer"
        )}
      >
        {expanded ? "Show fewer" : `Show all ${children.length} ${totalLabel}`}
      </button>
    </div>
  );
}
