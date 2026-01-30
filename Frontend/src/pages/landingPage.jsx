import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/NavBar";
import HowItWorks from "../components/Works";
import { Sparkles } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16 space-y-24">

        <Hero />

       

        <Features />

        <HowItWorks />

        <CTA />

      </main>

      <Footer />
    </div>
  );
};

export default Landing;




const CTA = () => (
  <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-emerald-600 p-12 text-center shadow-[0_30px_80px_-20px_rgba(79,70,229,0.6)]">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />

    <div className="relative z-10">

      <h2 className="text-4xl font-bold text-white tracking-tight">
        Smarter Hostels Start Here 🚀
      </h2>

      <p className="text-white/80 max-w-2xl mx-auto mt-4">
        AI-powered hostel issue management, smart lost & found, community-driven urgency detection — all in one intelligent platform.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/signup"
          className="px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:scale-[1.03] transition"
        >
          Get Started
        </a>

        <a
          href="/login"
          className="px-8 py-3 rounded-xl border border-white/50 text-white font-semibold hover:bg-white/10 transition"
        >
          Login
        </a>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-sm">
        <Sparkles className="w-4 h-4" />
        Smart auto-merge + priority detection included
      </div>

    </div>
  </section>
);
