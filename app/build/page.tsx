import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BuildFormClient from "./BuildFormClient";

export const metadata = {
  title: "Build Your Resume — ResumeForge",
  description: "Fill out our comprehensive form to get your professional resume crafted by experts.",
};

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <span className="font-bold text-primary tracking-tight">ResumeForge</span>
          <div className="w-24" />
        </div>
      </header>

      {/* Form */}
      <main className="py-10 px-6">
        <Suspense fallback={<div className="max-w-2xl mx-auto text-center py-20 text-secondary">Loading form...</div>}>
          <BuildFormClient />
        </Suspense>
      </main>
    </div>
  );
}
