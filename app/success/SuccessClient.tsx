"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-black text-primary tracking-tight mb-3">
            Submission Confirmed!
          </h1>
          <p className="text-lg text-secondary mb-8 leading-relaxed">
            Your resume request has been received and your payment has been
            confirmed. Our expert writers are now on it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6 mb-8 text-left space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Check your inbox</p>
              <p className="text-sm text-secondary mt-0.5">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Delivery within 48 hours</p>
              <p className="text-sm text-secondary mt-0.5">
                Your professionally crafted, ATS-optimized resume will be delivered
                to your email within 48 hours.
              </p>
            </div>
          </div>

          {id && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-secondary">
                Reference ID: <span className="font-mono text-primary">{id}</span>
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/">
            <Button variant="secondary" size="lg" className="gap-2">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
