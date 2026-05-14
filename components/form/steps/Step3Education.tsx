"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema, type EducationInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emptyEducation = {
  degree: "",
  college: "",
  startYear: "",
  endYear: "",
  cgpa: "",
};

export default function Step3Education() {
  const { formData, updateEducation, nextStep, prevStep } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education:
        formData.education.length > 0 ? formData.education : [emptyEducation],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data: EducationInput) => {
    updateEducation(data.education);
    nextStep();
  };

  return (
    <StepWrapper
      step={3}
      title="Education"
      description="Add your educational background. Include all relevant degrees and qualifications."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  Education {i + 1}
                </h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-1.5 text-secondary hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Degree / Qualification"
                  placeholder="B.Tech Computer Science"
                  required
                  error={errors.education?.[i]?.degree?.message}
                  {...register(`education.${i}.degree`)}
                />
                <Input
                  label="College / University"
                  placeholder="IIT Delhi, VIT Vellore..."
                  required
                  error={errors.education?.[i]?.college?.message}
                  {...register(`education.${i}.college`)}
                />
                <Input
                  label="Start Year"
                  placeholder="2018"
                  required
                  error={errors.education?.[i]?.startYear?.message}
                  {...register(`education.${i}.startYear`)}
                />
                <Input
                  label="End Year (or Expected)"
                  placeholder="2022"
                  required
                  error={errors.education?.[i]?.endYear?.message}
                  {...register(`education.${i}.endYear`)}
                />
                <div className="md:col-span-2">
                  <Input
                    label="CGPA / Percentage"
                    placeholder="8.5 CGPA or 85%"
                    error={errors.education?.[i]?.cgpa?.message}
                    {...register(`education.${i}.cgpa`)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {errors.education?.root && (
          <p className="text-xs text-red-500">
            ⚠ {errors.education.root.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => append(emptyEducation)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 text-sm text-secondary hover:text-accent transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Degree
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
