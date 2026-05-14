"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "@/components/form/FormContext";
import StepWrapper from "@/components/form/StepWrapper";
import Button from "@/components/ui/Button";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { PLAN, formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 bg-background rounded-2xl border border-border">
      <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-1.5 border-b border-border last:border-0">
      <span className="text-sm text-secondary min-w-[140px] flex-shrink-0">{label}</span>
      <span className="text-sm text-primary font-medium flex-1">{value}</span>
    </div>
  );
}

export default function Step8Review() {
  const { formData, prevStep } = useFormContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: PLAN.id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Order creation failed");

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ResumeBoosters",
        description: "ATS Resume — Professional Resume Writing",
        order_id: orderData.orderId,
        prefill: {
          name: formData.personal.fullName,
          email: formData.personal.email,
          contact: formData.personal.phone,
        },
        theme: { color: "#D97757" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData,
                planId: PLAN.id,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed");

            toast.success("Payment successful! Redirecting...");
            setTimeout(() => {
              window.location.href = `/success?id=${verifyData.submissionId}`;
            }, 1500);
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Payment verification failed");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast("Payment cancelled", { icon: "ℹ️" });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <StepWrapper
      step={8}
      title="Review & Payment"
      description="Check your details, then proceed to secure payment."
    >
      <div className="space-y-4">
        <ReviewSection title="Personal Details">
          <ReviewRow label="Full Name" value={formData.personal.fullName} />
          <ReviewRow label="Email" value={formData.personal.email} />
          <ReviewRow label="Phone" value={formData.personal.phone} />
          <ReviewRow label="City" value={formData.personal.city} />
          <ReviewRow label="Desired Role" value={formData.personal.desiredRole} />
          <ReviewRow label="Experience" value={formData.personal.yearsOfExperience ? `${formData.personal.yearsOfExperience} years` : undefined} />
          <ReviewRow label="LinkedIn" value={formData.personal.linkedinUrl} />
          <ReviewRow label="Portfolio" value={formData.personal.portfolioUrl} />
        </ReviewSection>

        <ReviewSection title="Professional Summary">
          <div className="space-y-3">
            {formData.summary.aboutYourself && (
              <div>
                <p className="text-xs text-secondary mb-1">About</p>
                <p className="text-sm text-primary leading-relaxed">{formData.summary.aboutYourself}</p>
              </div>
            )}
            {formData.summary.careerGoals && (
              <div>
                <p className="text-xs text-secondary mb-1">Career Goals</p>
                <p className="text-sm text-primary leading-relaxed">{formData.summary.careerGoals}</p>
              </div>
            )}
            {formData.summary.targetCompanies && (
              <ReviewRow label="Target Companies" value={formData.summary.targetCompanies} />
            )}
          </div>
        </ReviewSection>

        <ReviewSection title="Education">
          {formData.education.map((edu, i) => (
            <div key={i} className="py-2 border-b border-border last:border-0">
              <p className="text-sm font-semibold text-primary">{edu.degree}</p>
              <p className="text-sm text-secondary">{edu.college}</p>
              <p className="text-xs text-secondary mt-0.5">
                {edu.startYear} – {edu.endYear}{edu.cgpa && ` · ${edu.cgpa}`}
              </p>
            </div>
          ))}
        </ReviewSection>

        {formData.experience.length > 0 && (
          <ReviewSection title="Experience">
            {formData.experience.map((exp, i) => (
              <div key={i} className="py-2 border-b border-border last:border-0">
                <p className="text-sm font-semibold text-primary">{exp.role}</p>
                <p className="text-sm text-secondary">{exp.company}</p>
                <p className="text-xs text-secondary mt-0.5">{exp.startDate} – {exp.endDate}</p>
              </div>
            ))}
          </ReviewSection>
        )}

        {formData.skillsProjects.skills.length > 0 && (
          <ReviewSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {formData.skillsProjects.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-accent-light text-accent text-xs font-semibold rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </ReviewSection>
        )}

        {formData.skillsProjects.projects.length > 0 && (
          <ReviewSection title="Projects">
            {formData.skillsProjects.projects.map((proj, i) => (
              <div key={i} className="py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-primary">{proj.name}</p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 text-accent" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-secondary mt-0.5">{proj.technologies}</p>
              </div>
            ))}
          </ReviewSection>
        )}

        {formData.certifications.length > 0 && (
          <ReviewSection title="Certifications">
            {formData.certifications.map((cert, i) => (
              <div key={i} className="py-1.5 border-b border-border last:border-0">
                <p className="text-sm font-semibold text-primary">{cert.name}</p>
                {cert.issuer && (
                  <p className="text-xs text-secondary">{cert.issuer}{cert.year && ` · ${cert.year}`}</p>
                )}
              </div>
            ))}
          </ReviewSection>
        )}

        {formData.resumeFileUrl && (
          <ReviewSection title="Uploaded Resume">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-primary">Resume file uploaded</p>
            </div>
          </ReviewSection>
        )}

        {/* Payment block */}
        <div className="p-6 bg-primary text-white rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Service</span>
            <span className="text-sm font-semibold">ATS Resume</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-white/60">Total</span>
            <span className="font-serif text-3xl font-bold">{formatCurrency(PLAN.price)}</span>
          </div>
          <Button
            variant="secondary"
            size="xl"
            fullWidth
            loading={loading}
            onClick={handlePayment}
          >
            Pay {formatCurrency(PLAN.price)} & Submit →
          </Button>
          <p className="text-xs text-white/30 text-center mt-3">
            Secure payment powered by Razorpay
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="ghost" size="md" onClick={prevStep} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>
    </StepWrapper>
  );
}
