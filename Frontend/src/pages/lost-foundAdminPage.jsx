import { useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLostFoundStore } from "../store/useLostandFoundStore";
import Toast from "../components/Toast";
import useToast from "../hooks/useToast";

const AdminModerationPanel = () => {
  const { items, fetchItems, approveClaim, rejectClaim } = useLostFoundStore();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    fetchItems({ status: "CLAIM_REQUESTED" });
  }, []);

  const handleApprove = async (id) => {
    const res = await approveClaim(id);
    res.success
      ? showToast("success", res.message || "Approved")
      : showToast("error", res.message || "Approval failed");
  };

  const handleReject = async (id) => {
    const res = await rejectClaim(id);
    res.success
      ? showToast("success", res.message || "Rejected")
      : showToast("error", res.message || "Reject failed");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-2xl text-center font-semibold mb-6">
            Moderation Panel
          </h1>

          <div className="space-y-4">
            {items.length === 0 && (<p className="py-8 text-center">No claim requests found.</p>)}
            {items.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-2xl p-4 shadow border flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-xs text-slate-500">
                    {c.location}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(c._id)}
                    className="btn bg-emerald-500 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(c._id)}
                    className="btn bg-rose-100 text-rose-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {toast && <Toast {...toast} onClose={hideToast} />}

      <Footer />
    </>
  );
};

export default AdminModerationPanel;
