"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const stats = [
  { value: "2,400+", label: "Resumes delivered" },
  { value: "96%", label: "Interview call rate" },
  { value: "48hrs", label: "Delivery time" },
  { value: "4.9★", label: "Average rating" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const fast = { duration: reduce ? 0 : 0.35 };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Very faint dot grid — much more subtle than the diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Warm gradient blobs — reduced blur radius for mobile GPU */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-28">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fast}
        >
          <div className="inline-flex items-center gap-2 bg-accent-light border border-accent/25 text-accent text-xs font-semibold px-4 py-2 rounded-full mb-10 tracking-wide">
            <Sparkles className="w-3 h-3" />
            Professionally written by expert resume writers
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fast, delay: reduce ? 0 : 0.08 }}
          className="font-serif text-[3.25rem] md:text-[5.5rem] font-bold text-primary leading-[1.08] tracking-[-0.02em] mb-7"
        >
          Get a resume that
          <br />
          <span className="italic text-accent">actually</span> gets you hired
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fast, delay: reduce ? 0 : 0.15 }}
          className="text-lg md:text-xl text-secondary max-w-xl mx-auto mb-10 leading-relaxed font-sans"
        >
          ATS-optimized, professionally crafted resumes delivered in 48 hours.
          Trusted by thousands of candidates at top companies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fast, delay: reduce ? 0 : 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link href="/build">
            <Button variant="secondary" size="xl" className="gap-2 px-10">
              Build My Resume
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...fast, delay: reduce ? 0 : 0.25 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-20"
        >
          {[
            "No AI-generated content",
            "Expert human writers",
            "ATS-compatible formats",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-secondary">
              <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...fast, delay: reduce ? 0 : 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border bg-card rounded-2xl overflow-hidden border border-border shadow-card"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-6 flex flex-col items-center gap-1"
            >
              <span className="text-2xl md:text-3xl font-bold font-serif text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-secondary">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
