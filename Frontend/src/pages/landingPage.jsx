import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/NavBar";
import HowItWorks from "../components/Works";


const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar/>
 
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Hero />
        <Features/>
        <HowItWorks/>
      </main>
      <Footer/>
    </div>
  );
};

export default Landing;
