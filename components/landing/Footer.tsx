export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <span className="font-bold text-lg tracking-tight">
                ResumeBoosters
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Professional resume writing service helping thousands of
              candidates land their dream jobs with ATS-optimized resumes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                ["How it works", "#how-it-works"],
                ["Features", "#features"],
                ["Pricing", "#pricing"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 ResumeBoosters. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Secure payments by Razorpay · Data stored securely
          </p>
        </div>
      </div>
    </footer>
  );
}
