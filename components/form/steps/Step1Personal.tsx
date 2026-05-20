"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailsSchema, type PersonalDetailsInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Step1Personal() {
  const { formData, updatePersonal, nextStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsInput>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: formData.personal,
  });

  const onSubmit = (data: PersonalDetailsInput) => {
    updatePersonal(data);
    nextStep();
  };

  return (
    <StepWrapper
      step={1}
      title="Personal Details"
      description="Let's start with the basics. This information will appear at the top of your resume."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            placeholder="Priya Sharma"
            required
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="priya@example.com"
            required
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Phone Number"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="9876543210"
            required
            maxLength={10}
            error={errors.phone?.message}
            {...register("phone", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
              }
            })}
          />
          <Input
            label="City"
            placeholder="Mumbai, India"
            error={errors.city?.message}
            {...register("city")}
          />
        </div>

        <Input
          label="Desired Role"
          placeholder="Software Engineer, Product Manager, Data Analyst..."
          required
          error={errors.desiredRole?.message}
          hint="The specific role you're targeting"
          {...register("desiredRole")}
        />

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="LinkedIn URL"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            error={errors.linkedinUrl?.message}
            {...register("linkedinUrl")}
          />
          <Input
            label="Portfolio / Website"
            type="url"
            placeholder="https://yourportfolio.com"
            error={errors.portfolioUrl?.message}
            {...register("portfolioUrl")}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Current Company"
            placeholder="TCS, Infosys, Startup Inc..."
            error={errors.currentCompany?.message}
            {...register("currentCompany")}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-primary">
              Years of Experience
            </label>
            <select
              {...register("yearsOfExperience")}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent focus:ring focus:ring-accent/20 transition-all duration-150"
            >
              <option value="">Select experience</option>
              <option value="fresher">Fresher (0 years)</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6-8">6–8 years</option>
              <option value="9-12">9–12 years</option>
              <option value="12+">12+ years</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="secondary" size="lg" className="gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </StepWrapper>
  );
}
