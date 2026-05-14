import type { Metadata } from "next";
import { Inter, Inter_Tight, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Editorial serif — used for hero/section headlines, gives the Claude-like premium feel
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ResumeBoosters — Professional ATS-Optimized Resumes in 48 Hours",
  description:
    "Get a professionally crafted, ATS-optimized resume tailored for jobs, internships, and career growth. Expert resume writers deliver in 48 hours.",
  keywords: ["resume builder", "professional resume", "ATS resume", "resume writing service"],
  openGraph: {
    title: "ResumeBoosters — Professional ATS-Optimized Resumes in 48 Hours",
    description:
      "Get a professionally crafted, ATS-optimized resume tailored for jobs, internships, and career growth.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeBoosters — Professional Resumes in 48 Hours",
    description: "Expert resume writing service with ATS optimization.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-primary">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "var(--font-inter-tight)",
            },
            success: {
              iconTheme: { primary: "#D97757", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
