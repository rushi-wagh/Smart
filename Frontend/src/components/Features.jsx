const Features = () => {
 const items = [
  {
    title: "Smart Duplicate Detection & Auto Merge",
    desc: "Detects similar complaints in real-time and merges them intelligently to avoid spam, reduce noise, and accelerate resolution.",
    icon: "⚡",
  },
  {
    title: "AI Category & Priority Detection",
    desc: "Understands issue descriptions and automatically assigns correct department and urgency level.",
    icon: "🧠",
  },
  {
    title: "Automatic Staff Assignment",
    desc: "Routes complaints to the most suitable staff member based on department and live workload.",
    icon: "🎯",
  },
  {
    title: "Lost & Found Management System",
    desc: "End-to-end digital workflow for reporting, claiming, verification, and admin approval of lost items.",
    icon: "🔎",
  },
  {
    title: "Live Admin Analytics Dashboard",
    desc: "Real-time insights into hostel complaints, emergency tracking, staff workload, and resolution efficiency.",
    icon: "📊",
  },
  {
    title: "Role-Based Dashboards",
    desc: "Dedicated dashboards for students, staff, and admins to ensure clarity, transparency, and accountability.",
    icon: "🛡️",
  },
];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Features
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Everything you need for smart hostel issue management
          </h2>
          <p className="text-slate-600">
            Purpose-built for student complaints, warden oversight, and admin
            analytics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 ">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:scale-[1.015] hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
