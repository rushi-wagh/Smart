const Footer = () => {
  return (
    <footer className="border-t border-white/40 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3 items-start">

          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              ResolveX <span className="text-indigo-600">AI</span>
            </h3>

            <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
              AI-powered campus operations platform for smart issue resolution,
              duplicate detection, and intelligent lost & found matching.
            </p>

            <p className="text-xs text-slate-400">
              Built for modern campuses 
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-slate-600">
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Security
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Terms
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Contact
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} ResolveX AI · All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
