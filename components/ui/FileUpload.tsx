"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFileType, validateFileSize } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onUploadComplete?: (url: string) => void;
  uploading?: boolean;
  uploadedUrl?: string;
  error?: string;
  className?: string;
}

export default function FileUpload({
  onFileSelect,
  onUploadComplete,
  uploading = false,
  uploadedUrl,
  error,
  className,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState("");

  const handleFile = useCallback(
    (file: File) => {
      setLocalError("");
      if (!validateFileType(file)) {
        setLocalError("Only PDF, DOC, and DOCX files are accepted");
        return;
      }
      if (!validateFileSize(file)) {
        setLocalError("File size must be under 5MB");
        return;
      }
      setSelectedFile(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const clear = () => {
    setSelectedFile(null);
    setLocalError("");
    onFileSelect(null);
  };

  const displayError = error || localError;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {uploadedUrl ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-800">
              Resume uploaded successfully
            </p>
            <p className="text-xs text-green-600 truncate">{selectedFile?.name}</p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : selectedFile && uploading ? (
        <div className="flex items-center gap-3 p-4 bg-accent-light border border-accent/30 rounded-xl">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-accent">Uploading...</p>
            <p className="text-xs text-secondary">{selectedFile.name}</p>
          </div>
        </div>
      ) : selectedFile ? (
        <div className="flex items-center gap-3 p-4 bg-background border border-border rounded-xl">
          <FileText className="w-5 h-5 text-accent flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-secondary">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="text-secondary hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-8",
            "border-2 border-dashed rounded-2xl cursor-pointer",
            "transition-all duration-200",
            dragOver
              ? "border-accent bg-accent-light"
              : "border-border bg-background hover:border-accent/50 hover:bg-accent-light/30",
            displayError && "border-red-300"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              dragOver ? "bg-accent text-white" : "bg-border/50 text-secondary"
            )}
          >
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-primary">
              Drop your resume here, or{" "}
              <span className="text-accent">browse</span>
            </p>
            <p className="text-xs text-secondary mt-1">
              PDF, DOC, DOCX · Max 5MB
            </p>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
      )}
      {displayError && (
        <p className="text-xs text-red-500">⚠ {displayError}</p>
      )}
    </div>
  );
}
