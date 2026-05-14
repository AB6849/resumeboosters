"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  LogIn,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Submission, SubmissionStatus } from "@/types";

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  in_progress: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  delivered: "Delivered",
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-black text-primary">{value}</p>
      <p className="text-sm text-secondary mt-0.5">{label}</p>
    </div>
  );
}

function SubmissionModal({
  submission,
  onClose,
  onStatusChange,
}: {
  submission: Submission;
  onClose: () => void;
  onStatusChange: (id: string, status: SubmissionStatus) => void;
}) {
  const [updating, setUpdating] = useState(false);
  const [secret] = useState(() => localStorage.getItem("admin_secret") || "");

  const updateStatus = async (status: SubmissionStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) onStatusChange(submission.id, status);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full max-w-lg h-full bg-background overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-primary">{submission.full_name}</h3>
          <button onClick={onClose} className="p-1.5 text-secondary hover:text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">
              Status
            </p>
            <div className="flex gap-2 flex-wrap">
              {(["pending", "in_progress", "delivered"] as SubmissionStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={updating || submission.status === s}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    submission.status === s
                      ? STATUS_COLORS[s] + " ring-2 ring-current ring-offset-1"
                      : "bg-background border border-border text-secondary hover:border-accent"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Section title="Contact">
            <Row label="Email" value={submission.email} />
            <Row label="Phone" value={submission.phone} />
            <Row label="City" value={submission.city} />
            <Row label="Role" value={submission.desired_role} />
            <Row label="Experience" value={submission.years_experience ? `${submission.years_experience} years` : undefined} />
            {submission.linkedin_url && (
              <div className="flex gap-3 py-1.5">
                <span className="text-sm text-secondary min-w-[100px]">LinkedIn</span>
                <a href={submission.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent flex items-center gap-1">
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </Section>

          {/* Summary */}
          {submission.professional_summary && (
            <Section title="Professional Summary">
              <p className="text-sm text-primary leading-relaxed">
                {submission.professional_summary}
              </p>
            </Section>
          )}

          {/* Education */}
          <Section title="Education">
            {submission.education_json.map((edu, i) => (
              <div key={i} className="py-2 border-b border-border last:border-0">
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-secondary">{edu.college}</p>
                <p className="text-xs text-secondary">{edu.startYear}–{edu.endYear}{edu.cgpa && ` · ${edu.cgpa}`}</p>
              </div>
            ))}
          </Section>

          {/* Skills */}
          {submission.skills_json?.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {submission.skills_json.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-accent-light text-accent text-xs font-semibold rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Experience */}
          {submission.experience_json && submission.experience_json.length > 0 && (
            <Section title="Experience">
              {submission.experience_json.map((exp, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <p className="text-sm font-semibold">{exp.role}</p>
                  <p className="text-xs text-secondary">{exp.company} · {exp.startDate}–{exp.endDate}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Payment */}
          <Section title="Payment">
            <Row label="Amount" value={formatCurrency(submission.order_amount / 100)} />
            <Row label="Status" value={submission.payment_status.toUpperCase()} />
            <Row label="Payment ID" value={submission.payment_id} />
            <Row label="Submitted" value={formatDate(submission.created_at)} />
          </Section>

          {/* Resume file */}
          {submission.resume_file_url && (
            <Section title="Uploaded Resume">
              <a
                href={submission.resume_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Download Resume <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Section>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">{title}</p>
      <div className="bg-card rounded-xl border border-border p-4">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-1.5 border-b border-border last:border-0">
      <span className="text-sm text-secondary min-w-[100px] flex-shrink-0">{label}</span>
      <span className="text-sm text-primary font-medium">{value}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [secret, setSecret] = useState("");
  const [secretInput, setSecretInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("admin_secret");
    if (stored) {
      setSecret(stored);
      setAuthenticated(true);
    }
  }, []);

  const fetchSubmissions = useCallback(async () => {
    if (!secret) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/submissions?${params}`, {
        headers: { "x-admin-secret": secret },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        localStorage.removeItem("admin_secret");
        return;
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [secret, statusFilter]);

  useEffect(() => {
    if (authenticated) fetchSubmissions();
  }, [authenticated, fetchSubmissions]);

  const handleLogin = () => {
    if (!secretInput) return;
    localStorage.setItem("admin_secret", secretInput);
    setSecret(secretInput);
    setAuthenticated(true);
  };

  const handleStatusChange = (id: string, status: SubmissionStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, status } : null);
    }
  };

  const stats = {
    total: total,
    pending: submissions.filter((s) => s.status === "pending").length,
    inProgress: submissions.filter((s) => s.status === "in_progress").length,
    delivered: submissions.filter((s) => s.status === "delivered").length,
    revenue: submissions.reduce((sum, s) => sum + (s.order_amount || 0), 0) / 100,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-primary">Admin Access</h1>
            <p className="text-sm text-secondary mt-1">Enter your admin secret to continue</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="space-y-4">
              <input
                type="password"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Admin secret key"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring focus:ring-accent/20"
              />
              <Button onClick={handleLogin} variant="primary" size="lg" fullWidth className="gap-2">
                <LogIn className="w-4 h-4" />
                Access Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">ResumeForge Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchSubmissions}
            loading={loading}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Submissions" value={total} color="bg-blue-100 text-blue-600" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} color="bg-amber-100 text-amber-600" />
          <StatCard icon={TrendingUp} label="In Progress" value={stats.inProgress} color="bg-purple-100 text-purple-600" />
          <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} color="bg-green-100 text-green-600" />
        </div>

        {/* Revenue */}
        <div className="bg-primary text-white rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Total Revenue (loaded)</p>
            <p className="text-3xl font-black mt-1">{formatCurrency(stats.revenue)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">Avg per submission</p>
            <p className="text-xl font-bold mt-1">
              {submissions.length > 0
                ? formatCurrency(Math.round(stats.revenue / submissions.length))
                : "—"}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "in_progress", "delivered"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                statusFilter === s
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-secondary hover:border-primary"
              }`}
            >
              {s === "all" ? "All" : STATUS_LABELS[s as SubmissionStatus]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-secondary">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              Loading submissions...
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-secondary">
              <Users className="w-8 h-8 mb-3 opacity-30" />
              <p className="text-sm">No submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-5 py-3.5">Name</th>
                    <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3.5">Role</th>
                    <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">Payment</th>
                    <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3.5">Status</th>
                    <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3.5 hidden lg:table-cell">Date</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-primary">{s.full_name}</p>
                        <p className="text-xs text-secondary">{s.email}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-secondary max-w-[160px] truncate">
                        {s.desired_role}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-sm font-semibold text-primary">
                          {formatCurrency(s.order_amount / 100)}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          s.payment_status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {s.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[s.status]}`}>
                          {STATUS_LABELS[s.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-sm text-secondary">
                        {formatDate(s.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelectedSubmission(s)}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedSubmission && (
          <SubmissionModal
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
