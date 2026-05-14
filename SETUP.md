# ResumeForge — Setup & Deployment Guide

## Prerequisites

- Node.js 18+
- A Supabase project
- A Razorpay account
- A Gmail account with App Password enabled

---

## 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in all values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) |
| `NEXT_PUBLIC_RAZORPAY_KEY` | Razorpay Key ID (starts with `rzp_`) |
| `RAZORPAY_SECRET` | Razorpay Key Secret |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Gmail App Password (not your login password) |
| `ADMIN_EMAIL` | Email address to receive admin notifications |
| `ADMIN_SECRET` | A strong secret string for admin dashboard access |
| `NEXT_PUBLIC_APP_URL` | Your deployed app URL |

---

## 2. Supabase Setup

### Database

1. Go to your Supabase project → **SQL Editor**
2. Paste and run the contents of `supabase/schema.sql`

### Storage Bucket

1. Go to **Storage** → **New Bucket**
2. Name: `resumes`
3. Public: **Yes** (needed for downloadable file URLs)
4. File size limit: `5242880` (5MB)
5. Allowed MIME types:
   - `application/pdf`
   - `application/msword`
   - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### Storage Policies (run in SQL Editor)

```sql
-- Allow service role to upload
CREATE POLICY "Service role can upload resumes"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'resumes');

-- Allow public to read
CREATE POLICY "Public can read resumes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');
```

---

## 3. Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to **Settings** → **API Keys**
3. Generate a key pair
4. Copy Key ID → `NEXT_PUBLIC_RAZORPAY_KEY`
5. Copy Key Secret → `RAZORPAY_SECRET`

> For testing: use Test mode keys (prefix `rzp_test_`)
> For production: use Live mode keys (prefix `rzp_live_`)

---

## 4. Gmail App Password

1. Go to your Google Account → **Security**
2. Enable **2-Factor Authentication** (required)
3. Go to **App Passwords**
4. Create a new app password for "Mail"
5. Copy the 16-character password → `EMAIL_PASS`

---

## 5. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 6. Vercel Deployment

### One-click deploy

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy

### Manual CLI deploy

```bash
npm install -g vercel
vercel --prod
```

---

## 7. Admin Dashboard

Access at `/admin`. Enter your `ADMIN_SECRET` to log in.

Features:
- View all submissions
- Filter by status
- Click any row to view full details
- Update submission status (Pending → In Progress → Delivered)

---

## 8. Testing the Payment Flow

1. Use Razorpay Test mode keys
2. Test card: `4111 1111 1111 1111`, any future expiry, any CVV
3. UPI: `success@razorpay`

---

## File Structure

```
app/
  page.tsx              # Landing page
  build/                # Multi-step form
  success/              # Post-payment confirmation
  admin/                # Admin dashboard
  api/
    payment/
      create-order/     # Creates Razorpay order
      verify/           # Verifies payment + saves to Supabase
    upload/             # File upload to Supabase Storage
    admin/
      submissions/      # CRUD for admin

components/
  ui/                   # Button, Input, Card, etc.
  landing/              # Landing page sections
  form/                 # Multi-step form components

lib/
  supabase/             # Client + server Supabase instances
  email.ts              # Nodemailer email templates
  utils.ts              # Helpers + PRICING_PLANS
  validations.ts        # Zod schemas

types/
  index.ts              # All TypeScript interfaces

supabase/
  schema.sql            # Full database schema
```
