"use client";

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsProjectsSchema, type SkillsProjectsInput } from "@/lib/validations";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import TagInput from "@/components/ui/TagInput";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emptyProject = {
  name: "",
  description: "",
  technologies: "",
  link: "",
};

export default function Step5Skills() {
  const { formData, updateSkillsProjects, nextStep, prevStep } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillsProjectsInput>({
    resolver: zodResolver(skillsProjectsSchema),
    defaultValues: {
      skills: formData.skillsProjects.skills,
      projects: formData.skillsProjects.projects,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit = (data: SkillsProjectsInput) => {
    updateSkillsProjects(data);
    nextStep();
  };

  return (
    <StepWrapper
      step={5}
      title="Skills & Projects"
      description="Highlight your technical skills and showcase your best projects."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Skills */}
        <div>
          <h3 className="text-base font-bold text-primary mb-4">Technical Skills</h3>
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <TagInput
                value={field.value}
                onChange={field.onChange}
                label="Skills"
                placeholder="React, Python, Node.js, SQL..."
                error={errors.skills?.message}
              />
            )}
          />
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-base font-bold text-primary mb-4">Projects</h3>
          <div className="space-y-4">
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
                    <h4 className="text-sm font-bold text-primary">Project {i + 1}</h4>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="p-1.5 text-secondary hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Project Name"
                        placeholder="E-Commerce Platform"
                        required
                        error={errors.projects?.[i]?.name?.message}
                        {...register(`projects.${i}.name`)}
                      />
                      <Input
                        label="Technologies Used"
                        placeholder="React, Node.js, PostgreSQL"
                        required
                        error={errors.projects?.[i]?.technologies?.message}
                        {...register(`projects.${i}.technologies`)}
                      />
                    </div>
                    <Textarea
                      label="Project Description"
                      placeholder="Briefly describe what this project does, your role, and the impact..."
                      rows={3}
                      required
                      error={errors.projects?.[i]?.description?.message}
                      {...register(`projects.${i}.description`)}
                    />
                    <Input
                      label="Project Link"
                      type="url"
                      placeholder="https://github.com/you/project"
                      error={errors.projects?.[i]?.link?.message}
                      {...register(`projects.${i}.link`)}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => append(emptyProject)}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 text-sm text-secondary hover:text-accent transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        </div>

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
