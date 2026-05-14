"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-primary text-lg tracking-tight">
            ResumeForge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            FAQ
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/build">
            <Button variant="primary" size="sm">
              Build My Resume
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-primary"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-4 space-y-4">
          {["#how-it-works", "#features", "#pricing", "#faq"].map((href) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-secondary hover:text-primary"
            >
              {href.replace("#", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </a>
          ))}
          <Link href="/build" onClick={() => setMobileOpen(false)}>
            <Button variant="primary" size="md" fullWidth>
              Build My Resume
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
