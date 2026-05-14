"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google",
    avatar: "PS",
    rating: 5,
    text: "I had been struggling to get callbacks for 3 months. Within a week of using ResumeBoosters, I had 4 interview calls. The ATS optimization made all the difference.",
  },
  {
    name: "Rahul Verma",
    role: "Product Manager",
    company: "Flipkart",
    avatar: "RV",
    rating: 5,
    text: "The team really understood what I was going for. My resume now tells a clear career story and highlights exactly the achievements that matter for PM roles.",
  },
  {
    name: "Ananya Krishnan",
    role: "Data Analyst",
    company: "Swiggy",
    avatar: "AK",
    rating: 5,
    text: "Fast, professional, and exactly what I needed as a fresher. The format was clean and my campus placement interviews started coming in immediately.",
  },
  {
    name: "Mohammed Riyaz",
    role: "Marketing Lead",
    company: "Zomato",
    avatar: "MR",
    rating: 5,
    text: "Worth every rupee. The writers knew exactly how to frame my 6 years of experience for senior roles. Landed my dream job within 3 weeks.",
  },
  {
    name: "Sneha Patel",
    role: "UX Designer",
    company: "PhonePe",
    avatar: "SP",
    rating: 5,
    text: "I was skeptical at first but the quality blew me away. The resume felt authentically mine but professionally polished. 10/10 would recommend.",
  },
  {
    name: "Arjun Nair",
    role: "DevOps Engineer",
    company: "Razorpay",
    avatar: "AN",
    rating: 5,
    text: "Delivered in under 24 hours and the quality was exceptional. My new resume is much more impactful than what I had before. Highly recommended!",
  },
];

const companies = [
  "Google", "Microsoft", "Amazon", "Flipkart", "Zomato",
  "Swiggy", "PhonePe", "Razorpay", "CRED", "Meesho",
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-card border border-border text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Social Proof
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            Loved by job seekers
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Over 2,400 professionals have landed interviews at top companies
            with ResumeBoosters resumes.
          </p>
        </motion.div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <p className="text-sm text-secondary w-full text-center mb-2">
            Our candidates have landed roles at:
          </p>
          {companies.map((company) => (
            <span
              key={company}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {company}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-primary leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-secondary">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
