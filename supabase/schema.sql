-- ============================================================
-- ResumeForge — Supabase Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- SUBMISSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS submissions (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Personal Details
  full_name             TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  city                  TEXT,
  linkedin_url          TEXT,
  portfolio_url         TEXT,
  current_company       TEXT,
  years_experience      TEXT,
  desired_role          TEXT NOT NULL,

  -- Professional Summary
  professional_summary  TEXT,
  career_goals          TEXT,
  target_companies      TEXT,

  -- JSON Fields
  education_json        JSONB NOT NULL DEFAULT '[]',
  experience_json       JSONB NOT NULL DEFAULT '[]',
  skills_json           JSONB NOT NULL DEFAULT '[]',
  projects_json         JSONB NOT NULL DEFAULT '[]',
  certifications_json   JSONB NOT NULL DEFAULT '[]',

  -- File
  resume_file_url       TEXT,

  -- Payment
  payment_id            TEXT,
  payment_status        TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_id              TEXT,
  order_amount          INTEGER NOT NULL DEFAULT 0,

  -- Status
  status                TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'delivered'))
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_submissions_email       ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_status      ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at  ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_payment_id  ON submissions(payment_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Only service role can access (admin API uses service role key)
-- No public read/write allowed
CREATE POLICY "Service role only" ON submissions
  USING (auth.role() = 'service_role');

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
-- Run this in Supabase dashboard > Storage > New Bucket
-- Bucket name: resumes
-- Public: true (for downloadable URLs)
-- File size limit: 5MB
-- Allowed MIME types: application/pdf, application/msword,
--   application/vnd.openxmlformats-officedocument.wordprocessingml.document

-- ============================================================
-- STORAGE POLICIES
-- ============================================================
-- After creating the bucket, run these policies:

/*
-- Allow service role to upload
CREATE POLICY "Service role can upload resumes"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'resumes');

-- Allow public to read (for admin to download)
CREATE POLICY "Public can read resumes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');
*/
