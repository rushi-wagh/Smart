import { useEffect, useState } from "react";
import { useIssueStore } from "../store/useIssueStore";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";

const categories = [
  "Electricity",
  "Plumbing",
  "Cleaning",
  "Security",
  "Internet",
  "Mess",
  "Other",
];

const issueTypes = ["Public", "Private"];
const priorities = ["Low", "Medium", "High", "Emergency"];

const ReportIssue = () => {
  const navigate = useNavigate();
  const { createIssue, detectCategory, suggestedCategory, loading } =
    useIssueStore();
  const { toast, showToast, hideToast } = useToast();

  const [timer, setTimer] = useState(null);
  const [detecting, setDetecting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    issueType: "Public",
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setForm({ ...form, description: value });

    if (timer) clearTimeout(timer);

    setDetecting(true);

    const t = setTimeout(async () => {
      await detectCategory(value);
      setDetecting(false);
    }, 800);

    setTimer(t);
  };

  useEffect(() => {
    if (suggestedCategory) {
      const corrected =
        suggestedCategory.charAt(0).toUpperCase() +
        suggestedCategory.slice(1).toLowerCase();

      setForm((prev) => ({ ...prev, category: corrected }));
    }
  }, [suggestedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null) payload.append(k, v);
    });

    const res = await createIssue(payload);

    if (res.success) {
      showToast("success", res.message);
      setTimeout(() => navigate("/my-issues"), 900);
    } else {
      showToast("error", res.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-emerald-50 flex justify-center px-4 py-14">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-[0_25px_60px_-15px_rgba(99,102,241,0.35)] border border-white/50">

        <h1 className="text-2xl font-semibold text-center text-slate-900">
          Report an Issue
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Raise hostel issues instantly with AI assistance
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <input
            name="title"
            placeholder="Issue title"
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-300 transition"
            required
          />

          <div>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe issue clearly..."
              onChange={handleDescription}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-300 transition resize-none"
              required
            />

            <div className="mt-1 text-xs flex items-center gap-2">
              {detecting && (
                <span className="text-indigo-600 animate-pulse">
                  🤖 Detecting category...
                </span>
              )}
              {!detecting && suggestedCategory && (
                <span className="text-emerald-600">
                  ✨ Auto-detected: {form.category}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="h-11 px-4 rounded-xl border border-slate-200 bg-white shadow-sm"
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="h-11 px-4 rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              name="issueType"
              value={form.issueType}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {issueTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <p className={`mt-1 text-xs ${form.issueType === "Public" ? "text-emerald-600" : "text-amber-600"}`}>
              {form.issueType === "Public"
                ? "Visible to all students & staff"
                : "Only visible to hostel staff & admin"}
            </p>
          </div>

          <label className="border-2 border-dashed rounded-2xl h-36 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-400 hover:text-indigo-500 transition bg-white/40">
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />
            📸 Upload image
          </label>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
              Auto-tagged: Hostel
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-600">
              Block
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
              Room
            </span>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/40 transition"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </button>

        </form>
      </div>

      {toast && <Toast {...toast} onClose={hideToast} />}
    </div>
  );
};

export default ReportIssue;
