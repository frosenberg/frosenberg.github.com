"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "mt-4 flex items-center gap-2 text-sm font-medium text-primary-light",
          "hover:text-primary transition-colors cursor-pointer"
        )}
      >
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
        {expanded
          ? "Show less"
          : `Show all ${children.length} ${totalLabel}`}
      </button>
    </div>
  );
}
