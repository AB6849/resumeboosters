import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ className, children, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl border border-border shadow-card",
        hover &&
          "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
