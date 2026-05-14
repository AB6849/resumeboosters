"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Palette,
  UserCheck,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "ATS Optimized",
    description:
      "Every resume is formatted to pass applicant tracking systems used by 99% of Fortune 500 companies.",
  },
  {
    icon: UserCheck,
    title: "Recruiter Friendly",
    description:
      "Written with knowledge of what recruiters actually look for — quantified impact, clear structure, and strong keywords.",
  },
  {
    icon: Palette,
    title: "Modern Formatting",
    description:
      "Clean, contemporary layouts that stand out from the crowd while maintaining professional credibility.",
  },
  {
    icon: Zap,
    title: "Personalized Content",
    description:
      "Every resume is unique. No templates, no generic phrases — content tailored to your specific role and background.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Guaranteed delivery within 48 hours. Most resumes are completed within 24 hours.",
  },
  {
    icon: Shield,
    title: "Expert Writers",
    description:
      "Written by certified resume professionals with industry expertise across tech, finance, marketing, and more.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-card border border-border text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Why ResumeBoosters
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            Everything your resume needs
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Built to get you interviews at companies you want to work at.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-11 h-11 bg-accent-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
