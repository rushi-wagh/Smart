const Features = () => {
  const items = [
    {
      title: "AI Complaint Categorization",
      desc: "Automatically groups complaints into plumbing, electricity, mess, security, and more.",
      icon: "✨",
    },
    {
      title: "Smart Priority Detection",
      desc: "Detects emergencies and high-impact issues instantly for faster escalation.",
      icon: "📊",
    },
    {
      title: "AI Assistant Chatbot",
      desc: "Conversational interface for students to raise and track complaints.",
      icon: "💬",
    },
    {
      title: "Admin Analytics Dashboard",
      desc: "Live insights into complaint load, SLAs, blocks, and recurring issues.",
      icon: "📈",
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
            Purpose-built for student complaints, warden oversight, and admin analytics.
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
