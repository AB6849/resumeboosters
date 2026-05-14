"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider } from "@/components/form/FormContext";
import MultiStepForm from "@/components/form/MultiStepForm";

export default function BuildFormClient() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "ats-resume";

  return (
    <FormProvider initialPlan={plan}>
      <MultiStepForm />
    </FormProvider>
  );
}
