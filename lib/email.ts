import nodemailer from "nodemailer";
import type { Submission } from "@/types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAdminNotification(submission: Submission) {
  const educationHtml = submission.education_json
    .map(
      (edu) =>
        `<tr>
          <td style="padding:8px;border:1px solid #e8e5df;">${edu.degree}</td>
          <td style="padding:8px;border:1px solid #e8e5df;">${edu.college}</td>
          <td style="padding:8px;border:1px solid #e8e5df;">${edu.startYear} – ${edu.endYear}</td>
          <td style="padding:8px;border:1px solid #e8e5df;">${edu.cgpa || "N/A"}</td>
        </tr>`
    )
    .join("");

  const experienceHtml =
    submission.experience_json
      ?.map(
        (exp) =>
          `<div style="margin-bottom:16px;padding:16px;background:#f8f6f1;border-radius:8px;">
          <strong>${exp.role}</strong> at <strong>${exp.company}</strong><br>
          <em>${exp.startDate} – ${exp.endDate}</em><br>
          <p style="margin-top:8px;">${exp.responsibilities}</p>
          ${exp.achievements ? `<p><strong>Achievements:</strong> ${exp.achievements}</p>` : ""}
        </div>`
      )
      .join("") || "<p>No experience provided</p>";

  const skillsHtml =
    submission.skills_json
      ?.map(
        (skill) =>
          `<span style="display:inline-block;padding:4px 12px;background:#f0ede8;border-radius:9999px;margin:4px;font-size:13px;">${skill}</span>`
      )
      .join("") || "None";

  const projectsHtml =
    submission.projects_json
      ?.map(
        (proj) =>
          `<div style="margin-bottom:12px;padding:12px;background:#f8f6f1;border-radius:8px;">
          <strong>${proj.name}</strong><br>
          <em>Tech: ${proj.technologies}</em><br>
          <p style="margin-top:4px;">${proj.description}</p>
          ${proj.link ? `<a href="${proj.link}" style="color:#d97757;">${proj.link}</a>` : ""}
        </div>`
      )
      .join("") || "<p>No projects provided</p>";

  const certsHtml =
    submission.certifications_json
      ?.map(
        (cert) =>
          `<li>${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ""}${cert.year ? ` (${cert.year})` : ""}</li>`
      )
      .join("") || "<li>None</li>";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Inter',system-ui,sans-serif;max-width:700px;margin:0 auto;padding:24px;color:#1a1a1a;background:#fff;">
  <div style="border-bottom:3px solid #d97757;padding-bottom:24px;margin-bottom:32px;">
    <h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">New Resume Submission</h1>
    <p style="margin:8px 0 0;color:#6b6b6b;">Payment confirmed — Action required</p>
  </div>

  <div style="background:#f8f6f1;border-radius:12px;padding:20px;margin-bottom:24px;">
    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Contact Information</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#6b6b6b;width:160px;">Name</td><td style="padding:6px 0;font-weight:600;">${submission.full_name}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">Email</td><td style="padding:6px 0;"><a href="mailto:${submission.email}" style="color:#d97757;">${submission.email}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">Phone</td><td style="padding:6px 0;">${submission.phone}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">City</td><td style="padding:6px 0;">${submission.city || "N/A"}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">Desired Role</td><td style="padding:6px 0;font-weight:600;color:#d97757;">${submission.desired_role}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">Experience</td><td style="padding:6px 0;">${submission.years_experience || "N/A"} years</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">LinkedIn</td><td style="padding:6px 0;">${submission.linkedin_url ? `<a href="${submission.linkedin_url}" style="color:#d97757;">${submission.linkedin_url}</a>` : "N/A"}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6b6b;">Portfolio</td><td style="padding:6px 0;">${submission.portfolio_url ? `<a href="${submission.portfolio_url}" style="color:#d97757;">${submission.portfolio_url}</a>` : "N/A"}</td></tr>
    </table>
  </div>

  <div style="background:#f8f6f1;border-radius:12px;padding:20px;margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Professional Summary</h2>
    <p style="margin:0 0 12px;">${submission.professional_summary || "N/A"}</p>
    <strong>Career Goals:</strong>
    <p style="margin:8px 0;">${submission.career_goals || "N/A"}</p>
    <strong>Target Companies:</strong>
    <p style="margin:8px 0;">${submission.target_companies || "N/A"}</p>
  </div>

  <div style="margin-bottom:24px;">
    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Education</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="background:#f0ede8;">
          <th style="padding:10px 8px;border:1px solid #e8e5df;text-align:left;">Degree</th>
          <th style="padding:10px 8px;border:1px solid #e8e5df;text-align:left;">Institution</th>
          <th style="padding:10px 8px;border:1px solid #e8e5df;text-align:left;">Years</th>
          <th style="padding:10px 8px;border:1px solid #e8e5df;text-align:left;">CGPA</th>
        </tr>
      </thead>
      <tbody>${educationHtml}</tbody>
    </table>
  </div>

  <div style="margin-bottom:24px;">
    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Experience</h2>
    ${experienceHtml}
  </div>

  <div style="margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Skills</h2>
    <div>${skillsHtml}</div>
  </div>

  <div style="margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Projects</h2>
    ${projectsHtml}
  </div>

  <div style="margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6b6b6b;">Certifications</h2>
    <ul>${certsHtml}</ul>
  </div>

  ${
    submission.resume_file_url
      ? `<div style="margin-bottom:24px;background:#fff3ef;border:1px solid #f5c4b3;border-radius:12px;padding:20px;">
    <h2 style="margin:0 0 8px;font-size:16px;font-weight:700;color:#d97757;">Uploaded Resume</h2>
    <a href="${submission.resume_file_url}" style="color:#d97757;word-break:break-all;">${submission.resume_file_url}</a>
  </div>`
      : ""
  }

  <div style="background:#1a1a1a;color:#fff;border-radius:12px;padding:20px;">
    <h2 style="margin:0 0 12px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#d97757;">Payment Details</h2>
    <table style="width:100%;border-collapse:collapse;color:#fff;">
      <tr><td style="padding:6px 0;color:#9b9b9b;width:160px;">Payment ID</td><td style="padding:6px 0;">${submission.payment_id || "N/A"}</td></tr>
      <tr><td style="padding:6px 0;color:#9b9b9b;">Amount</td><td style="padding:6px 0;font-weight:700;font-size:18px;">₹${(submission.order_amount / 100).toLocaleString("en-IN")}</td></tr>
      <tr><td style="padding:6px 0;color:#9b9b9b;">Status</td><td style="padding:6px 0;color:#4ade80;font-weight:600;">✓ PAID</td></tr>
    </table>
  </div>

  <p style="margin-top:32px;font-size:12px;color:#9b9b9b;text-align:center;">
    Submission ID: ${submission.id} · ${new Date(submission.created_at).toLocaleString("en-IN")}
  </p>
</body>
</html>`;

  await transporter.sendMail({
    from: `"ResumeForge" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `[New Submission] ${submission.full_name} — ${submission.desired_role}`,
    html,
  });
}

export async function sendCandidateConfirmation(
  email: string,
  name: string,
  role: string
) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Inter',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:0;color:#1a1a1a;background:#fff;">
  <div style="background:#1a1a1a;padding:40px 40px 32px;">
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px;">ResumeForge</h1>
    <p style="margin:8px 0 0;color:#9b9b9b;font-size:14px;">Professional Resume Writing Service</p>
  </div>

  <div style="padding:40px;">
    <div style="background:#fff3ef;border-radius:12px;padding:24px;margin-bottom:32px;border:1px solid #f5c4b3;">
      <p style="margin:0;font-size:14px;font-weight:600;color:#d97757;text-transform:uppercase;letter-spacing:0.5px;">Submission Confirmed</p>
      <h2 style="margin:8px 0 0;font-size:24px;font-weight:800;">We've received your details!</h2>
    </div>

    <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hi ${name},</p>
    <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
      Thank you for choosing ResumeForge. Your resume submission for the role of
      <strong>${role}</strong> has been received and your payment has been confirmed.
    </p>

    <div style="background:#f8f6f1;border-radius:12px;padding:24px;margin-bottom:32px;">
      <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;">What happens next?</h3>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="width:28px;height:28px;background:#d97757;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;">1</div>
          <div>
            <p style="margin:0;font-weight:600;">Our expert reviews your details</p>
            <p style="margin:4px 0 0;font-size:14px;color:#6b6b6b;">A professional resume writer will review all your information carefully.</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="width:28px;height:28px;background:#d97757;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;">2</div>
          <div>
            <p style="margin:0;font-weight:600;">We craft your professional resume</p>
            <p style="margin:4px 0 0;font-size:14px;color:#6b6b6b;">Your resume will be customized, ATS-optimized, and professionally formatted.</p>
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:12px;">
          <div style="width:28px;height:28px;background:#d97757;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;">3</div>
          <div>
            <p style="margin:0;font-weight:600;">Delivery within 48 hours</p>
            <p style="margin:4px 0 0;font-size:14px;color:#6b6b6b;">Your completed resume will be delivered to this email address.</p>
          </div>
        </div>
      </div>
    </div>

    <p style="font-size:16px;line-height:1.7;margin:0 0 8px;">
      If you have any questions or need to provide additional information, reply to this email.
    </p>
    <p style="font-size:16px;line-height:1.7;margin:0 0 32px;color:#6b6b6b;">
      Expected delivery: <strong style="color:#1a1a1a;">within 48 hours</strong>
    </p>

    <p style="font-size:16px;margin:0;">
      Best regards,<br>
      <strong>The ResumeForge Team</strong>
    </p>
  </div>

  <div style="background:#f8f6f1;padding:24px 40px;border-top:1px solid #e8e5df;">
    <p style="margin:0;font-size:12px;color:#9b9b9b;text-align:center;">
      © 2025 ResumeForge. All rights reserved.<br>
      You're receiving this because you submitted your resume details through our platform.
    </p>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"ResumeForge" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Resume Submission is Confirmed — ResumeForge",
    html,
  });
}
