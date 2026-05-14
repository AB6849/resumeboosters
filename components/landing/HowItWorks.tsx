"use client";

import { motion } from "framer-motion";
import { ClipboardList, CreditCard, FileCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Fill the Form",
    description:
      "Complete our detailed multi-step form with your professional details, experience, education, skills, and career goals. Optionally upload your existing resume.",
    time: "10–15 minutes",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Make Payment",
    description:
      "Choose the plan that fits your career stage and complete the secure payment via Razorpay. Your details are saved instantly upon confirmation.",
    time: "2 minutes",
  },
  {
    icon: FileCheck,
    number: "03",
    title: "Receive Resume",
    description:
      "Our expert resume writer crafts your personalized, ATS-optimized resume and delivers it directly to your email within 48 hours.",
    time: "Within 48 hours",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-background border border-border text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Simple Process
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Three simple steps to your professional resume. No back-and-forth,
            no waiting weeks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-background rounded-2xl flex items-center justify-center border border-border group-hover:border-accent/30 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white text-xs font-black rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  {step.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent-light px-3 py-1.5 rounded-full">
                  ⏱ {step.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
