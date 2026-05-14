import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function generateUniqueFilename(originalName: string): string {
  const ext = originalName.split(".").pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `resume_${timestamp}_${random}.${ext}`;
}

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedTypes.includes(file.type);
}

export function validateFileSize(file: File, maxMB = 5): boolean {
  return file.size <= maxMB * 1024 * 1024;
}

export const PRICING_PLANS = [
  {
    id: "ats-resume",
    name: "ATS Resume",
    price: 299,
    description: "One professionally crafted, ATS-optimized resume for any role or career stage",
    deliveryTime: "48 hours",
    features: [
      "ATS-optimized formatting",
      "Professional summary writing",
      "Clean modern design",
      "PDF + DOCX delivery",
      "Tailored to your target role",
      "1 free revision",
    ],
  },
];

export const PLAN = PRICING_PLANS[0];
