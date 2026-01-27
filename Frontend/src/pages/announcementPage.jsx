import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAnnouncementStore } from "../store/useAnnouncementStore";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";

const tabs = [
  { label: "All", value: {} },
  { label: "My Hostel", value: { hostel: "Sunrise Hall" } },
  { label: "My Block", value: { hostel: "Sunrise Hall", block: "B" } },
];

const Announcements = () => {
  const { announcements, fetchAnnouncements } =
    useAnnouncementStore();
  const { toast, showToast, hideToast } = useToast();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchAnnouncements(tabs[activeTab].value).then((res) => {
      if (!res.success) showToast("error", res.message);
    });
  }, [activeTab]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-5">
            Announcements
          </h1>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeTab === i
                      ? "bg-indigo-600 text-white"
                      : "bg-white border"
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {announcements.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-2xl p-5 shadow-sm border"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">
                    {a.title}
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                    {a.hostel} · {a.block}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-2">
                  {a.description}
                </p>

                <p className="text-xs text-slate-400 mt-3">
                  🗓 {new Date(a.date).toLocaleDateString()}
                </p>
              </div>
            ))}

            {announcements.length === 0 && (
              <div className="text-center text-slate-500 mt-20">
                No announcements yet
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={hideToast} />}

      <Footer />
    </>
  );
};

export default Announcements;
