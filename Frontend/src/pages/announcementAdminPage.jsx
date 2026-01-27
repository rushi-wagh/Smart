import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";
import { useAnnouncementStore } from "../store/useAnnouncementStore";

const hostels = [
  "All",
  "Sunrise Hall",
  "Green View Hostel",
  "Blue Moon Residency",
];

const blocks = ["All", "A", "B", "C"];

const AdminAnnouncementDashboard = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const { createAnnouncement, loading } = useAnnouncementStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    hostel: "",
    block: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createAnnouncement(form);

    if (!res.success) {
      showToast("error", res.message);
      return;
    }

    showToast("success", "Announcement published successfully!");

    setTimeout(() => {
      navigate("/announcements");
    }, 700);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100 px-4 py-10">
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_30px_70px_-15px_rgba(79,70,229,0.28)] border border-white/50">

          <h1 className="text-2xl font-semibold text-center text-slate-900">
            Post Announcement
          </h1>
          <p className="text-slate-500 text-sm text-center mt-1">
            Broadcast important updates to students instantly
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Announcement title"
              className="input input-bordered w-full h-11 pl-4 rounded-xl bg-white/90 border-slate-200 shadow-sm focus:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write announcement details..."
              rows={3}
              className="textarea textarea-bordered w-full rounded-xl bg-white/90 border-slate-200 shadow-sm focus:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300 p-3"
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                name="hostel"
                value={form.hostel}
                onChange={handleChange}
                className="select p-3 select-bordered h-11 rounded-xl bg-white/90 border-slate-200 shadow-sm focus:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              >
                <option value="">Select Hostel</option>
                {hostels.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>

              <select
                name="block"
                value={form.block}
                onChange={handleChange}
                className="select p-3 select-bordered h-11 rounded-xl bg-white/90 border-slate-200 shadow-sm focus:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              >
                <option value="">Select Block</option>
                {blocks.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input p-3 input-bordered w-full h-11 rounded-xl bg-white/90 border-slate-200 shadow-sm focus:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-11 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all"
            >
              {loading ? "Publishing..." : "Publish Announcement"}
            </button>
          </form>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={hideToast} />}

      <Footer />
    </>
  );
};

export default AdminAnnouncementDashboard;
