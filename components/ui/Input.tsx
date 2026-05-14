"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-primary"
          >
            {label}
            {props.required && (
              <span className="text-accent ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary/60",
              "transition-all duration-150",
              "focus:outline-none focus:border-accent focus:ring focus:ring-accent/20",
              "disabled:bg-background disabled:cursor-not-allowed disabled:opacity-60",
              error && "border-red-400 focus:border-red-400 focus:ring-red-100",
              leftIcon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
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

Input.displayName = "Input";
export default Input;
