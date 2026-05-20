import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .refine(
      (val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        const allowed = [
          "gmail.com", "googlemail.com",
          "outlook.com", "hotmail.com", "live.com", "msn.com",
          "yahoo.com", "yahoo.in", "yahoo.co.in", "ymail.com",
          "icloud.com", "me.com", "mac.com",
          "protonmail.com", "proton.me",
          "rediffmail.com",
        ];
        return allowed.includes(domain);
      },
      { message: "Please use a valid email provider (Gmail, Outlook, Yahoo, etc.)" }
    ),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  city: z.string().optional(),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  currentCompany: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  desiredRole: z.string().min(2, "Please enter your desired role"),
});

export const professionalSummarySchema = z.object({
  aboutYourself: z
    .string()
    .min(50, "Please write at least 50 characters about yourself"),
  careerGoals: z.string().min(30, "Please describe your career goals"),
  targetCompanies: z.string().optional(),
});

export const educationItemSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  college: z.string().min(2, "College/University is required"),
  startYear: z.string().min(4, "Start year is required"),
  endYear: z.string().min(4, "End year is required"),
  cgpa: z.string().optional(),
}).refine(
  (d) => !d.startYear || !d.endYear || parseInt(d.endYear) >= parseInt(d.startYear),
  { message: "End year cannot be before start year", path: ["endYear"] }
);

export const educationSchema = z.object({
  education: z
    .array(educationItemSchema)
    .min(1, "Please add at least one education entry"),
});

export const experienceItemSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  startDate: z.string().min(4, "Start date is required"),
  endDate: z.string().min(4, "End date is required"),
  responsibilities: z
    .string()
    .min(20, "Please describe your responsibilities"),
  achievements: z.string().optional(),
}).refine(
  (d) => {
    if (d.endDate.toLowerCase().includes("present")) return true;
    const start = d.startDate.match(/\d{4}/)?.[0];
    const end = d.endDate.match(/\d{4}/)?.[0];
    if (!start || !end) return true;
    return parseInt(end) >= parseInt(start);
  },
  { message: "End date cannot be before start date", path: ["endDate"] }
);

export const experienceSchema = z.object({
  experience: z.array(experienceItemSchema),
});

export const projectItemSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().min(10, "Please describe the project"),
  technologies: z.string().min(2, "Please list technologies used"),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export const skillsProjectsSchema = z.object({
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  projects: z.array(projectItemSchema),
});

export const certificationItemSchema = z.object({
  name: z.string().min(2, "Certification name is required"),
  issuer: z.string().optional(),
  year: z.string().optional(),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export const certificationsSchema = z.object({
  certifications: z.array(certificationItemSchema),
});

export type PersonalDetailsInput = z.infer<typeof personalDetailsSchema>;
export type ProfessionalSummaryInput = z.infer<typeof professionalSummarySchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type SkillsProjectsInput = z.infer<typeof skillsProjectsSchema>;
export type CertificationsInput = z.infer<typeof certificationsSchema>;
