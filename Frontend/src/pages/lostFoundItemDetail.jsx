import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const demoItem = {
  _id: "1",
  title: "Sony WH-1000XM4",
  description:
    "Black Sony noise cancelling headphones found near library table. Looks new. No scratches.",
  category: "Electronics",
  location: "Library, L2",
  status: "AVAILABLE",
  type: "FOUND",
  images: [
    "https://images.unsplash.com/photo-1585386959984-a41552231692?q=80&w=1200",
    "https://images.unsplash.com/photo-1518445697889-9bd1d8c3aa43?q=80&w=1200",
  ],
};

const LostFoundItemDetail = () => {
  const navigate = useNavigate();
  const [item] = useState(demoItem);
  const [showClaim, setShowClaim] = useState(false);
  const [proof, setProof] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pb-24">
        <div className="relative">
          <img
            src="https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY24_UP_10_Beauty_H_M?$productIntroPlatemobile$&fmt=png-alpha"
            className="h-80 mx-auto object-cover"
          />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="px-5 pt-5">
          <span className="inline-flex text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 font-semibold">
            FOUND ITEM
          </span>

          <h1 className="text-xl font-semibold mt-2">{item.title}</h1>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-white rounded-xl p-3 shadow-sm border">
              <p className="text-xs text-slate-500">Category</p>
              <p className="font-medium text-sm">{item.category}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm border">
              <p className="text-xs text-slate-500">Location</p>
              <p className="font-medium text-sm">{item.location}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            {item.description}
          </p>

          <button
            onClick={() => setShowClaim(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-12 rounded-xl bg-indigo-600 text-white font-medium shadow-xl shadow-indigo-500/40"
          >
            Claim Item
          </button>
        </div>

        {showClaim && (
          <>
            <div
              onClick={() => setShowClaim(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 animate-slideUp">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Claim Item</h2>
                <button onClick={() => setShowClaim(false)}>
                  <X />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <textarea
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  rows={3}
                  placeholder="Describe unique features (scratches, stickers, etc)"
                  className="textarea textarea-bordered w-full rounded-xl"
                />

                <label className="border-2 border-dashed rounded-xl h-28 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-400 transition">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setFiles([...e.target.files])}
                  />
                  <div className="text-2xl">📸</div>
                  <p className="text-sm">Tap to upload photo</p>
                </label>

                <button
                  className="btn w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40"
                >
                  Submit Claim Request
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default LostFoundItemDetail;

