"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalSummarySchema, type ProfessionalSummaryInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Step2Summary() {
  const { formData, updateSummary, nextStep, prevStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfessionalSummaryInput>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: formData.summary,
  });

  const onSubmit = (data: ProfessionalSummaryInput) => {
    updateSummary(data);
    nextStep();
  };

  return (
    <StepWrapper
      step={2}
      title="Professional Summary"
      description="Help us understand your professional background and career aspirations."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Textarea
          label="Tell us about yourself"
          placeholder="I'm a software engineer with 4 years of experience in full-stack development, specializing in React and Node.js. I've led teams of 3-5 developers and delivered products used by 100k+ users..."
          rows={5}
          required
          error={errors.aboutYourself?.message}
          hint="Write a detailed paragraph about your professional background, key skills, and what makes you stand out."
          {...register("aboutYourself")}
        />

        <Textarea
          label="Career Goals"
          placeholder="I'm looking to transition into a senior engineering role at a product-led company where I can contribute to building scalable systems and mentor junior developers..."
          rows={4}
          required
          error={errors.careerGoals?.message}
          hint="Where do you want to be in 2–3 years? What roles and companies are you targeting?"
          {...register("careerGoals")}
        />

        <Input
          label="Target Companies"
          placeholder="Google, Microsoft, Flipkart, Razorpay, CRED..."
          error={errors.targetCompanies?.message}
          hint="List the companies you're most excited about (optional but helpful)"
          {...register("targetCompanies")}
        />

        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={prevStep}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button type="submit" variant="secondary" size="lg" className="gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </StepWrapper>
  );
}
