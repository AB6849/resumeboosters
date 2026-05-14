"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function TagInput({
  value,
  onChange,
  label,
  placeholder = "Type and press Enter",
  error,
  className,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-primary">{label}</label>
      )}
      <div
        className={cn(
          "min-h-[48px] w-full rounded-xl border border-border bg-white px-3 py-2",
          "flex flex-wrap gap-2 items-center",
          "focus-within:border-accent focus-within:ring focus-within:ring-accent/20",
          "transition-all duration-150",
          error && "border-red-400"
        )}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 bg-accent-light text-accent text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-accent/70 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={value.length === 0 ? placeholder : "Add more..."}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-primary placeholder:text-secondary/60 focus:outline-none"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">⚠ {error}</p>
      )}
      <p className="text-xs text-secondary">Press Enter or comma to add a skill</p>
    </div>
  );
}
