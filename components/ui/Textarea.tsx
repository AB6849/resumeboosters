"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-primary">
            {label}
            {props.required && (
              <span className="text-accent ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary/60",
            "transition-all duration-150 resize-none",
            "focus:outline-none focus:border-accent focus:ring focus:ring-accent/20",
            "disabled:bg-background disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className
          )}
          rows={props.rows || 4}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-secondary">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
