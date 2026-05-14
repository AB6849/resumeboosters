"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does ResumeForge work?",
    a: "You fill out our detailed multi-step form with your professional details, experience, education, and career goals. After a secure payment, our expert resume writers craft a personalized, ATS-optimized resume and deliver it to your email within 48 hours.",
  },
  {
    q: "Is the resume written by a human or AI?",
    a: "Every resume is written by a human expert. We don't use AI to generate content. Our team of certified resume writers specializes in different industries and career levels, ensuring your resume is authentic, personalized, and professional.",
  },
  {
    q: "What formats will I receive my resume in?",
    a: "You'll receive your resume in both PDF and DOCX formats. The PDF ensures consistent formatting when shared digitally, while the DOCX allows you to make future edits.",
  },
  {
    q: "What if I'm not satisfied with the resume?",
    a: "We offer free revisions based on your plan — 1 revision for Fresher, 2 for Mid-Level, and unlimited for Executive. If you have specific feedback, our writers will revise until you're happy.",
  },
  {
    q: "Do you offer resumes for freshers and students?",
    a: "Absolutely! Our Fresher Resume plan is specifically designed for students and recent graduates. We know how to highlight academic achievements, projects, internships, and transferable skills effectively.",
  },
  {
    q: "How secure is my data?",
    a: "Your data is stored securely in our database and never shared with third parties. Payments are processed via Razorpay, a PCI-DSS compliant payment gateway. Your uploaded resume files are stored in encrypted cloud storage.",
  },
  {
    q: "Can I upload my existing resume?",
    a: "Yes! There's an optional step to upload your current resume (PDF, DOC, or DOCX, max 5MB). Our writers will use it as reference while crafting your improved version.",
  },
  {
    q: "What information do I need to provide?",
    a: "We ask for your personal contact details, professional summary, education history, work experience, skills, projects, and certifications. The more detail you provide, the better your resume will be.",
  },
];

function FAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-primary">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center mt-0.5">
          {open ? (
            <Minus className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-secondary" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-secondary leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-card border border-border text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-4">
            FAQ
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            Questions answered
          </h2>
          <p className="text-lg text-secondary">
            Everything you need to know about our resume service.
          </p>
        </motion.div>

        <div className="bg-card rounded-2xl border border-border px-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
