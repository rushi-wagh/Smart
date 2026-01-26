const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
          <div className="space-y-2">
            <div className="text-lg font-semibold text-slate-900">
              SmartHostel AI
            </div>
            <p className="text-sm text-slate-600 max-w-xs">
              AI-powered smart hostel issue tracking system built for modern campuses.
            </p>
          </div>

          <div className="flex justify-center gap-6 text-sm text-slate-600">
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Privacy
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Security
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              Contact
            </span>
          </div>

          <div className="text-sm text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} SmartHostel AI · All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
