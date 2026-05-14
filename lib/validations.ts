import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+\d\s\-()]{10,15}$/, "Please enter a valid phone number"),
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
});

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
});

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
