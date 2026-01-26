const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Raise Complaint Instantly",
      desc: "Students report issues naturally via AI chat or web interface with text or images — completing the process in under 30 seconds with zero friction.",
    },
    {
      id: 2,
      title: "AI-Powered Intelligence Engine",
      desc: "Our AI system automatically understands the complaint using NLP, classifies the category, predicts urgency, flags emergencies, and recommends optimal technician assignment — all in real time.",
    },
    {
      id: 3,
      title: "Smart Resolution & Proactive Maintenance",
      desc: "Admins receive a prioritized workflow, SLA tracking, and predictive analytics, enabling faster resolution, reduced downtime, and preventive maintenance planning.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            How it works
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            From student complaint to AI-driven resolution
          </h2>

          <p className="text-slate-600">
            Designed for clarity during hackathon demos while mirroring a real-world SaaS flow.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                {step.id}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-600 max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
