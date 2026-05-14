interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dark rounded-square background */}
      <rect width="40" height="40" rx="10" fill="#1A1A1A" />

      {/* White page body — top-right corner clipped for the fold */}
      <path
        d="M10 6Q8 6 8 8L8 30Q8 32 10 32L28 32Q30 32 30 30L30 14L22 6Z"
        fill="white"
      />

      {/* Fold flap — slightly warm off-white */}
      <path d="M22 6L30 14L22 14Z" fill="#EAE5DC" />

      {/* Fold crease line */}
      <path d="M22 6L30 14" stroke="#D0CBC0" strokeWidth="0.75" />

      {/* Orange accent bar — the "name" line on the resume */}
      <rect x="11" y="17" width="12" height="2.2" rx="1.1" fill="#D97757" />

      {/* Three content lines in descending widths */}
      <rect x="11" y="21.5" width="10" height="1.6" rx="0.8" fill="#CBC9C6" />
      <rect x="11" y="25"   width="14" height="1.6" rx="0.8" fill="#CBC9C6" />
      <rect x="11" y="28.5" width="8"  height="1.6" rx="0.8" fill="#CBC9C6" />
    </svg>
  );
}
