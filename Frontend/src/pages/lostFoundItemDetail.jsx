import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLostFoundStore } from "../store/useLostandFoundStore";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";

const LostFoundItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchItemById, currentItem, loading, claimItem } =
    useLostFoundStore();

  const { toast, showToast, hideToast } = useToast();

  const [proof, setProof] = useState(null);

  useEffect(() => {
    if (id) fetchItemById(id);
  }, [id]);

  const handleClaim = async () => {
    if (!proof) {
      showToast("error", "Please upload proof first");
      return;
    }

    const formData = new FormData();
    formData.append("proof", proof);

    const res = await claimItem(id, formData);

    if (res?.success) {
      showToast("success", "Claim submitted successfully");
      setTimeout(() => navigate(-1), 1200);
    } else {
      showToast("error", res?.message || "Claim failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Loading item...
        </div>
        <Footer />
      </>
    );
  }

  if (!currentItem) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Item not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="max-w-5xl mx-auto">

          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-indigo-600 hover:underline"
          >
            ← Back
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-6 grid md:grid-cols-2 gap-8">

            <img
              src={currentItem.images?.[0] || "/placeholder.jpg"}
              alt={currentItem.title}
              className="w-full h-96 object-cover rounded-2xl"
            />

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {currentItem.title}
              </h1>

              <p className="text-slate-500 mt-3">
                {currentItem.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 text-sm">
                <Badge>{currentItem.category}</Badge>
                <Badge>{currentItem.location}</Badge>
                <StatusBadge status={currentItem.status} />
              </div>

              {currentItem.status === "AVAILABLE" && (
                <div className="mt-8 space-y-4">

                  <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setProof(e.target.files[0])}
                    />
                    📄 Upload ownership proof
                  </label>

                  <button
                    onClick={handleClaim}
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition"
                  >
                    Claim Item
                  </button>

                </div>
              )}

              {currentItem.status !== "AVAILABLE" && (
                <div className="mt-6 text-sm text-slate-500">
                  This item is already {currentItem.status.toLowerCase()}.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      <Footer />

      {toast && <Toast {...toast} onClose={hideToast} />}
    </>
  );
};

export default LostFoundItemDetail;

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
    {children}
  </span>
);

const StatusBadge = ({ status }) => {
  const colors = {
    AVAILABLE: "bg-emerald-100 text-emerald-600",
    CLAIMED: "bg-amber-100 text-amber-600",
    RETURNED: "bg-rose-100 text-rose-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
};
