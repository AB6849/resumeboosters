import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { sendAdminNotification, sendCandidateConfirmation } from "@/lib/email";
import { PRICING_PLANS } from "@/lib/utils";
import type { ResumeFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      planId,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      formData: ResumeFormData;
      planId: string;
    } = await req.json();

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed — invalid signature" },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Save to Supabase
    const supabase = createServiceClient();

    const { data: submission, error } = await supabase
      .from("submissions")
      .insert({
        full_name: formData.personal.fullName,
        email: formData.personal.email,
        phone: formData.personal.phone,
        city: formData.personal.city || null,
        linkedin_url: formData.personal.linkedinUrl || null,
        portfolio_url: formData.personal.portfolioUrl || null,
        current_company: formData.personal.currentCompany || null,
        years_experience: formData.personal.yearsOfExperience || null,
        desired_role: formData.personal.desiredRole,
        professional_summary: formData.summary.aboutYourself || null,
        career_goals: formData.summary.careerGoals || null,
        target_companies: formData.summary.targetCompanies || null,
        education_json: formData.education,
        experience_json: formData.experience || [],
        skills_json: formData.skillsProjects.skills,
        projects_json: formData.skillsProjects.projects || [],
        certifications_json: formData.certifications || [],
        resume_file_url: formData.resumeFileUrl || null,
        payment_id: razorpay_payment_id,
        payment_status: "paid",
        order_id: razorpay_order_id,
        order_amount: plan.price * 100,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      console.error("Supabase URL present:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error("Service role key present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
      return NextResponse.json(
        { error: "Failed to save submission", detail: error.message },
        { status: 500 }
      );
    }

    // Send emails (non-blocking)
    Promise.all([
      sendAdminNotification(submission),
      sendCandidateConfirmation(
        formData.personal.email,
        formData.personal.fullName,
        formData.personal.desiredRole
      ),
    ]).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
    });
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
