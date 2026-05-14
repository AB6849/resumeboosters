"use client";

import { AnimatePresence } from "framer-motion";
import { useFormContext } from "./FormContext";
import ProgressBar from "@/components/ui/ProgressBar";
import Step1Personal from "./steps/Step1Personal";
import Step2Summary from "./steps/Step2Summary";
import Step3Education from "./steps/Step3Education";
import Step4Experience from "./steps/Step4Experience";
import Step5Skills from "./steps/Step5Skills";
import Step6Certifications from "./steps/Step6Certifications";
import Step7Upload from "./steps/Step7Upload";
import Step8Review from "./steps/Step8Review";

const STEP_LABELS = [
  "Personal",
  "Summary",
  "Education",
  "Experience",
  "Skills",
  "Certifications",
  "Upload",
  "Review",
];

const STEPS = [
  Step1Personal,
  Step2Summary,
  Step3Education,
  Step4Experience,
  Step5Skills,
  Step6Certifications,
  Step7Upload,
  Step8Review,
];

export default function MultiStepForm() {
  const { currentStep, totalSteps } = useFormContext();

  const StepComponent = STEPS[currentStep - 1];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <ProgressBar
          current={currentStep}
          total={totalSteps}
          labels={STEP_LABELS}
        />
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-card p-6 md:p-8">
        <AnimatePresence mode="wait">
          <StepComponent key={currentStep} />
        </AnimatePresence>
      </div>
    </div>
  );
}
