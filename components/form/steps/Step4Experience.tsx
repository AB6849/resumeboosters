"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type ExperienceInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
  achievements: "",
};

export default function Step4Experience() {
  const { formData, updateExperience, nextStep, prevStep } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience:
        formData.experience.length > 0 ? formData.experience : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data: ExperienceInput) => {
    updateExperience(data.experience);
    nextStep();
  };

  return (
    <StepWrapper
      step={4}
      title="Work Experience"
      description="Add your work history. List most recent first. Skip if you're a fresher."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-12 bg-background rounded-2xl border border-dashed border-border">
            <p className="text-sm text-secondary mb-4">
              No experience added yet. That&apos;s okay for freshers!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {fields.map((field, i) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, height: 0 }}
                transition={{ duration: 0.25 }}
                className="p-5 bg-background rounded-2xl border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-primary">
                    Experience {i + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-1.5 text-secondary hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Company"
                    placeholder="Google, Startup Inc..."
                    required
                    error={errors.experience?.[i]?.company?.message}
                    {...register(`experience.${i}.company`)}
                  />
                  <Input
                    label="Role / Title"
                    placeholder="Software Engineer, PM..."
                    required
                    error={errors.experience?.[i]?.role?.message}
                    {...register(`experience.${i}.role`)}
                  />
                  <Input
                    label="Start Date"
                    placeholder="Jan 2021"
                    required
                    error={errors.experience?.[i]?.startDate?.message}
                    {...register(`experience.${i}.startDate`)}
                  />
                  <Input
                    label="End Date"
                    placeholder="Dec 2023 or Present"
                    required
                    error={errors.experience?.[i]?.endDate?.message}
                    {...register(`experience.${i}.endDate`)}
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      label="Key Responsibilities"
                      placeholder="Describe what you did in this role. Use bullet-point style sentences. Example: Led development of microservices architecture serving 500k daily users..."
                      rows={4}
                      required
                      error={errors.experience?.[i]?.responsibilities?.message}
                      {...register(`experience.${i}.responsibilities`)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Textarea
                      label="Key Achievements"
                      placeholder="Reduced API response time by 40%, Increased conversion rate by 15%, Led a team of 5 engineers..."
                      rows={3}
                      error={errors.experience?.[i]?.achievements?.message}
                      hint="Quantify your impact wherever possible"
                      {...register(`experience.${i}.achievements`)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        <button
          type="button"
          onClick={() => append(emptyExperience)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 text-sm text-secondary hover:text-accent transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Work Experience
        </button>

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="ghost" size="md" onClick={prevStep} className="gap-2">
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
