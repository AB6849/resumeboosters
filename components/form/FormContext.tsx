"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type {
  ResumeFormData,
  PersonalDetails,
  ProfessionalSummary,
  Education,
  Experience,
  SkillsAndProjects,
  Certification,
} from "@/types";

interface FormContextType {
  formData: ResumeFormData;
  currentStep: number;
  totalSteps: number;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  updatePersonal: (data: PersonalDetails) => void;
  updateSummary: (data: ProfessionalSummary) => void;
  updateEducation: (data: Education[]) => void;
  updateExperience: (data: Experience[]) => void;
  updateSkillsProjects: (data: SkillsAndProjects) => void;
  updateCertifications: (data: Certification[]) => void;
  updateResumeFileUrl: (url: string) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const defaultFormData: ResumeFormData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    linkedinUrl: "",
    portfolioUrl: "",
    currentCompany: "",
    yearsOfExperience: "",
    desiredRole: "",
  },
  summary: {
    aboutYourself: "",
    careerGoals: "",
    targetCompanies: "",
  },
  education: [],
  experience: [],
  skillsProjects: {
    skills: [],
    projects: [],
  },
  certifications: [],
  resumeFileUrl: "",
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({
  children,
  initialPlan = "ats-resume",
}: {
  children: ReactNode;
  initialPlan?: string;
}) {
  const [formData, setFormData] = useState<ResumeFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const totalSteps = 8;

  const updatePersonal = useCallback((data: PersonalDetails) => {
    setFormData((prev) => ({ ...prev, personal: data }));
  }, []);

  const updateSummary = useCallback((data: ProfessionalSummary) => {
    setFormData((prev) => ({ ...prev, summary: data }));
  }, []);

  const updateEducation = useCallback((data: Education[]) => {
    setFormData((prev) => ({ ...prev, education: data }));
  }, []);

  const updateExperience = useCallback((data: Experience[]) => {
    setFormData((prev) => ({ ...prev, experience: data }));
  }, []);

  const updateSkillsProjects = useCallback((data: SkillsAndProjects) => {
    setFormData((prev) => ({ ...prev, skillsProjects: data }));
  }, []);

  const updateCertifications = useCallback((data: Certification[]) => {
    setFormData((prev) => ({ ...prev, certifications: data }));
  }, []);

  const updateResumeFileUrl = useCallback((url: string) => {
    setFormData((prev) => ({ ...prev, resumeFileUrl: url }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)));
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        totalSteps,
        selectedPlan,
        setSelectedPlan,
        updatePersonal,
        updateSummary,
        updateEducation,
        updateExperience,
        updateSkillsProjects,
        updateCertifications,
        updateResumeFileUrl,
        goToStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
}
