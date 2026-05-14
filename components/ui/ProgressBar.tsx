"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  labels?: string[];
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  labels,
  className,
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-primary">
          Step {current} of {total}
        </span>
        <span className="text-sm text-secondary">{percentage}% complete</span>
      </div>
      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
      {labels && (
        <div className="mt-3 hidden md:flex items-center justify-between">
          {labels.map((label, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-1",
                i + 1 <= current ? "text-accent" : "text-secondary/50"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200",
                  i + 1 < current
                    ? "bg-accent text-white"
                    : i + 1 === current
                    ? "bg-accent text-white ring-4 ring-accent/20"
                    : "bg-border text-secondary"
                )}
              >
                {i + 1 < current ? "✓" : i + 1}
              </div>
              <span className="text-[10px] font-medium text-center max-w-[60px] leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
