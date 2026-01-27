import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLostFoundStore } from "../store/useLostandFoundStore";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";

const ReportItem = () => {
  const navigate = useNavigate();
  const { createLostItem, createFoundItem, loading } = useLostFoundStore();
  const { toast, showToast, hideToast } = useToast();

  const [type, setType] = useState("found");
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    images: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "images") v.forEach((f) => payload.append("images", f));
      else payload.append(k, v);
    });

    const res =
      type === "lost"
        ? await createLostItem(payload)
        : await createFoundItem(payload);

    if (res.success) {
      showToast("success", res.message || "Item reported successfully");
      setTimeout(() => navigate("/lost-found"), 800);
    } else {
      showToast("error", res.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-emerald-50 flex justify-center px-4 py-14 shadow-[0_25px_60px_-15px_rgba(99,102,241,0.35)]
"
      >
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.25)] border border-white/50">
          <h1 className="text-2xl font-semibold text-center text-slate-900">
            Report Item
          </h1>
          <p className="text-sm text-slate-500 text-center mt-1">
            Help others recover their belongings
          </p>

          <div className="mt-6 bg-slate-100/80 p-1.5 rounded-xl flex">
            <button
              type="button"
              onClick={() => setType("lost")}
              className={`flex-1 py-2 rounded-lg font-medium transition
                ${
                  type === "lost"
                    ? "bg-white shadow text-indigo-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
            >
              Lost Item
            </button>

            <button
              type="button"
              onClick={() => setType("found")}
              className={`flex-1 py-2 rounded-lg font-medium transition
                ${
                  type === "found"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500 hover:text-slate-700"
                }`}
            >
              Found Item
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Item Name
              </label>
              <input
                name="title"
                placeholder="e.g. Black Wallet, iPhone 12, Keys..."
                onChange={handleChange}
                className="w-full h-11 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-slate-200/70 shadow-sm shadow-indigo-100/40 focus-outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                name="location"
                placeholder={`Where did you ${type === "lost" ? "lose" : "find"} it?`}
                onChange={handleChange}
                className="w-full h-11 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-slate-200/70 shadow-sm shadow-indigo-100/40 focus-outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="w-full h-11 px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-slate-200/70 shadow-sm shadow-indigo-100/40 focus-outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Color, brand, unique marks, stickers, scratches..."
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur border border-slate-200/70 shadow-sm shadow-indigo-100/40 focus:outline-none  transition resize-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Upload Images
              </label>
              <label className="mt-2 border-2 border-dashed rounded-2xl h-36 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-400 hover:text-indigo-500 transition bg-white/40">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, images: [...e.target.files] })
                  }
                />
                <div className="text-3xl">📸</div>
                <p className="text-sm font-medium">Click to upload images</p>
                <p className="text-xs">PNG, JPG — max 5MB</p>
              </label>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40 transition"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={hideToast} />}

      <Footer />
    </>
  );
};

export default ReportItem;
