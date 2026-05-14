"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certificationsSchema, type CertificationsInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Plus, Trash2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emptyCert = { name: "", issuer: "", year: "", link: "" };

export default function Step6Certifications() {
  const { formData, updateCertifications, nextStep, prevStep } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificationsInput>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: {
      certifications: formData.certifications.length > 0 ? formData.certifications : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const onSubmit = (data: CertificationsInput) => {
    updateCertifications(data.certifications);
    nextStep();
  };

  return (
    <StepWrapper
      step={6}
      title="Certifications"
      description="Add any professional certifications, courses, or achievements. This section is optional."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.length === 0 ? (
          <div className="text-center py-12 bg-background rounded-2xl border border-dashed border-border">
            <Award className="w-8 h-8 text-secondary/40 mx-auto mb-3" />
            <p className="text-sm text-secondary mb-1">No certifications added</p>
            <p className="text-xs text-secondary/60">
              AWS, Google, Coursera, LinkedIn Learning, etc.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {fields.map((field, i) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="p-5 bg-background rounded-2xl border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-primary">Certification {i + 1}</h4>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-1.5 text-secondary hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Certification Name"
                      placeholder="AWS Certified Solutions Architect"
                      required
                      error={errors.certifications?.[i]?.name?.message}
                      {...register(`certifications.${i}.name`)}
                    />
                  </div>
                  <Input
                    label="Issuing Organization"
                    placeholder="Amazon Web Services"
                    error={errors.certifications?.[i]?.issuer?.message}
                    {...register(`certifications.${i}.issuer`)}
                  />
                  <Input
                    label="Year"
                    placeholder="2023"
                    error={errors.certifications?.[i]?.year?.message}
                    {...register(`certifications.${i}.year`)}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Certificate Link"
                      type="url"
                      placeholder="https://credential.url"
                      error={errors.certifications?.[i]?.link?.message}
                      {...register(`certifications.${i}.link`)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        <button
          type="button"
          onClick={() => append(emptyCert)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 text-sm text-secondary hover:text-accent transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Certification
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
