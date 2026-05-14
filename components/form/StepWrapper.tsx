"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepWrapperProps {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function StepWrapper({
  step,
  title,
  description,
  children,
}: StepWrapperProps) {
  return (
    <motion.div
      key={`step-${step}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-secondary mt-1.5">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}
