import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";
import { useProfileStore } from "../store/useProfileStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const { toast, showToast, hideToast } = useToast();
  const { getProfile } = useProfileStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(form);

    if (!res.success) {
      showToast("error", res.message);
      return;
    }
    const profileRes = await getProfile();
    
    console.log("profile",profileRes);
    if (profileRes?.completion < 85) {
      showToast("info", "Please complete your profile first");
      setTimeout(() => navigate("/update-profile"), 500);
      return;
    }

    showToast("success", "Login successful");

    setTimeout(() => {
      if (res.role === "admin") navigate("/");
      else navigate("/");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-500/40">
            AI
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mt-4">
            SmartHostel AI
          </h1>
          <p className="text-slate-500 text-sm">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder=" Email"
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

          <button
            type="submit"
            className="btn w-full rounded-xl h-10 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          New here?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Create account
          </Link>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={hideToast} />}
    </div>
  );
};

export default Login;
