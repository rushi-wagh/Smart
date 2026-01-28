import { useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useIssueStore } from "../store/useIssueStore";

const statusColors = {
  OPEN: "bg-indigo-100 text-indigo-600",
  IN_PROGRESS: "bg-amber-100 text-amber-600",
  RESOLVED: "bg-emerald-100 text-emerald-600",
  ESCALATED: "bg-red-100 text-red-600",
};

const priorityColors = {
  Low: "bg-slate-100 text-slate-500",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-600",
  Emergency: "bg-red-100 text-red-600",
};

const StaffDashboard = () => {
  const { fetchStaffTasks, staffTasks, staffUpdateStatus, loading } =
    useIssueStore();

  useEffect(() => {
    fetchStaffTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-emerald-50 px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Staff Task Dashboard
          </h1>

          <p className="text-sm text-slate-500 mb-6">
            Issues assigned to you — sorted by urgency & priority
          </p>

          {loading && (
            <div className="text-center py-20 text-slate-500">
              Loading tasks...
            </div>
          )}

          {!loading && staffTasks.length === 0 && (
            <div className="text-center py-24 text-slate-500">
              No pending tasks assigned to you
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffTasks.map((issue) => (
              <div
                key={issue._id}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md border border-white/40 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 line-clamp-1">
                    {issue.title}
                  </h3>

                  {issue.emergency && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white">
                       Emergency
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {issue.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 text-xs">
                  <span className={`px-3 py-1 rounded-full ${statusColors[issue.status]}`}>
                    {issue.status}
                  </span>

                  <span className={`px-3 py-1 rounded-full ${priorityColors[issue.priority]}`}>
                    {issue.priority}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {issue.category}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-slate-400">
                    {new Date(issue.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <select
                    value={issue.status}
                    onChange={(e) =>
                      staffUpdateStatus(issue._id, e.target.value)
                    }
                    className="text-xs px-2 py-1 rounded-lg border border-slate-200"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StaffDashboard;
