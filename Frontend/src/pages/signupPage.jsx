import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";


const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();
  const { toast, showToast, hideToast } = useToast();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup(form);
    if (!res.success) {
      showToast("error", res.message);
      return;
    }
    showToast("success", "Account created successfully");

    setTimeout(() => {
      navigate('/login')
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl px-10 py-10 shadow-[0_25px_60px_-12px_rgba(79,70,229,0.25)] border border-white/40">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-500/40">
            AI
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mt-4">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm">
            Join SmartHostel AI platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full h-11 pl-4 rounded-xl bg-white/80 border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full h-11 pl-4 rounded-xl bg-white/80 border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full h-11 pl-4 rounded-xl bg-white/80 border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="select select-bordered w-full h-11 pl-4 rounded-xl bg-white/80 border-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account →"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
       {toast && <Toast {...toast} onClose={hideToast} />}
    </div>
  );
};

export default Signup;
