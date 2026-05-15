"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { PLAN, formatCurrency } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-24 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-background border border-border text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Simple Pricing
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            One service, one price
          </h2>
          <p className="text-lg text-secondary max-w-md mx-auto">
            No tiers, no confusion. One flat price for a professionally crafted
            ATS-optimized resume.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-primary text-white rounded-3xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
                {PLAN.name}
              </p>
              <div className="flex items-start justify-center gap-1">
                <span className="text-2xl font-bold text-white/60 mt-2">₹</span>
                <span className="font-serif text-7xl font-bold text-white leading-none tracking-tight">
                  299
                </span>
              </div>
              <p className="text-sm text-white/50 mt-2">
                Delivered within {PLAN.deliveryTime}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-7" />

            {/* Features */}
            <ul className="space-y-3.5 mb-9">
              {PLAN.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/25 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/build">
              <Button variant="secondary" size="xl" fullWidth>
                Get My Resume — {formatCurrency(PLAN.price)}
              </Button>
            </Link>

            <p className="text-xs text-white/30 text-center mt-4">
              Secure payment via Razorpay · No hidden fees
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-secondary mt-8"
        >
          Not satisfied? We&apos;ll revise your resume free of charge.
        </motion.p>
      </div>
    </section>
  );
}
