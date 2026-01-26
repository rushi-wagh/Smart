const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100 rounded-3xl p-12 shadow-[0_30px_80px_-20px_rgba(79,70,229,0.35)] border border-white/40 backdrop-blur-xl"
>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-sm font-medium text-indigo-600">
              AI-Powered · Built for Hostels
            </span>
            <span className="text-sm text-slate-500 ml-3">
              Hackathon-ready demo UI
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-slate-900">
            <span className="text-indigo-600">AI-Powered</span> Smart Hostel
            <br />
            Issue Tracking System
          </h1>

          <p className="text-slate-600 max-w-lg">
            Capture complaints, let AI categorize and prioritize them, and give
            students and admins a transparent, real-time resolution experience.
          </p>

          <div className="flex items-center gap-4">
            <button className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 hover:scale-[1.02] transition-all duration-200"

>
              Get Started →
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow min-w-40">
              <div className="text-sm text-slate-500">Avg. resolution</div>
              <div className="text-xl font-semibold text-slate-900">
                3.2x faster
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow min-w-40">
              <div className="text-sm text-slate-500">AI classified</div>
              <div className="text-xl font-semibold text-slate-900">
                 Priority levels
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 bg-slate-900 text-white rounded-2xl p-5 w-64 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.45)]
">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-300">
              <span>AI Issue Insight</span>
              <span className="text-emerald-400">Live</span>
            </div>

            <div className="space-y-2">
              <div className="bg-slate-800 px-3 py-2 rounded-lg text-sm">
                Leaking tap · Plumbing
              </div>
              <div className="bg-indigo-600/90 px-3 py-2 rounded-lg text-sm">
                Priority: High
              </div>
              <div className="bg-red-500/90 px-3 py-2 rounded-lg text-sm">
                Emergency risk
              </div>
              <div className="bg-emerald-600/90 px-3 py-2 rounded-lg text-sm">
                ETA: 2 hrs
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
