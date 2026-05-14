"use client";

import { useState } from "react";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function Step7Upload() {
  const { formData, updateResumeFileUrl, nextStep, prevStep } = useFormContext();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(formData.resumeFileUrl || "");

  const handleFileSelect = async (selectedFile: File | null) => {
    setFile(selectedFile);
    if (!selectedFile) {
      setUploadedUrl("");
      updateResumeFileUrl("");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadedUrl(data.url);
      updateResumeFileUrl(data.url);
      toast.success("Resume uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <StepWrapper
      step={7}
      title="Upload Existing Resume"
      description="Optionally upload your current resume. Our writers will use it as a reference."
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            This step is optional. If you have an existing resume, uploading it
            helps our writers understand your current format and ensure nothing
            important is missed.
          </p>
        </div>

        <FileUpload
          onFileSelect={handleFileSelect}
          uploading={uploading}
          uploadedUrl={uploadedUrl}
        />

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="ghost" size="md" onClick={prevStep} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            {!uploadedUrl && (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={nextStep}
                className="text-secondary"
              >
                Skip
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={nextStep}
              disabled={uploading}
              className="gap-2"
            >
              {uploadedUrl ? "Continue" : "Skip & Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </StepWrapper>
  );
}
