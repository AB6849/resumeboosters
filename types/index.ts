// ─── Form Data Types ────────────────────────────────────────────────────────

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  currentCompany?: string;
  yearsOfExperience?: string;
  desiredRole: string;
}

export interface ProfessionalSummary {
  aboutYourself: string;
  careerGoals: string;
  targetCompanies?: string;
}

export interface Education {
  degree: string;
  college: string;
  startYear: string;
  endYear: string;
  cgpa?: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
  link?: string;
}

export interface SkillsAndProjects {
  skills: string[];
  projects: Project[];
}

export interface ResumeFormData {
  personal: PersonalDetails;
  summary: ProfessionalSummary;
  education: Education[];
  experience: Experience[];
  skillsProjects: SkillsAndProjects;
  certifications: Certification[];
  resumeFileUrl?: string;
}

// ─── Pricing Types ───────────────────────────────────────────────────────────

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  deliveryTime: string;
}

// ─── Submission Types ────────────────────────────────────────────────────────

export type SubmissionStatus = "pending" | "in_progress" | "delivered";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Submission {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  city?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  current_company?: string;
  years_experience?: string;
  desired_role: string;
  professional_summary?: string;
  career_goals?: string;
  target_companies?: string;
  education_json: Education[];
  experience_json?: Experience[];
  skills_json: string[];
  projects_json?: Project[];
  certifications_json?: Certification[];
  resume_file_url?: string;
  payment_id?: string;
  payment_status: PaymentStatus;
  order_id?: string;
  order_amount: number;
  status: SubmissionStatus;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface PaymentVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  formData: ResumeFormData;
  planId: string;
}

// ─── Razorpay Window Type ────────────────────────────────────────────────────

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}
