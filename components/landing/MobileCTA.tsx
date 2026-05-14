"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link href="/build">
        <Button variant="secondary" size="lg" fullWidth className="gap-2">
          Build My Resume
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
