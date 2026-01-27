import { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const hostelOptions = {
  "Sunrise Hall": ["A", "B", "C"],
  "Green View Hostel": ["A", "B"],
  "Blue Moon Residency": ["A", "B", "C", "D"],
};

const ReportItem = () => {
  const [type, setType] = useState("found");

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    date: "",
    description: "",
    location: "",
    hostel: "",
    block: "",
    deposit: "",
    images: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setForm({ ...form, images: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...form, type });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100 flex justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.18)] border border-white/40">

          <h1 className="text-2xl font-semibold text-slate-900 text-center">
            Report Item
          </h1>
          <p className="text-sm text-slate-500 text-center mt-1">
            Help us keep track of lost and found items.
          </p>

          {/* Toggle */}
          <div className="mt-5 bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setType("lost")}
              className={`flex-1 py-2 rounded-lg font-medium transition 
              ${type === "lost" ? "bg-white shadow text-indigo-600" : "text-slate-500"}`}
            >
              Lost Item
            </button>

            <button
              onClick={() => setType("found")}
              className={`flex-1 py-2 rounded-lg font-medium transition 
              ${type === "found" ? "bg-slate-900 text-white shadow" : "text-slate-500"}`}
            >
              ✓ Found Item
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">

            {/* Item Details */}
            <section>
              <p className="text-xs font-semibold tracking-widest text-slate-500 mb-2">
                ITEM DETAILS
              </p>

              <div className="space-y-4">
                <input
                  name="itemName"
                  placeholder="Item Name"
                  className="input input-bordered w-full h-11 rounded-xl bg-white/80"
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="category"
                    onChange={handleChange}
                    className="select select-bordered h-11 rounded-xl bg-white/80"
                  >
                    <option value="">Category</option>
                    <option>Electronics</option>
                    <option>Keys</option>
                    <option>Personal</option>
                    <option>Stationery</option>
                  </select>

                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    className="input input-bordered h-11 rounded-xl bg-white/80"
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Describe the item (color, brand, distinguishing marks)..."
                  rows={3}
                  className="textarea textarea-bordered w-full rounded-xl bg-white/80"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Location Info */}
            <section>
              <p className="text-xs font-semibold tracking-widest text-slate-500 mb-2">
                LOCATION INFO
              </p>

              <div className="space-y-4">
                <input
                  name="location"
                  placeholder={`Where did you ${type === "lost" ? "lose" : "find"} it?`}
                  className="input input-bordered w-full h-11 rounded-xl bg-white/80"
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="hostel"
                    value={form.hostel}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hostel: e.target.value,
                        block: "",
                      })
                    }
                    className="select select-bordered h-11 rounded-xl bg-white/80"
                  >
                    <option value="">Hostel</option>
                    {Object.keys(hostelOptions).map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>

                  <select
                    name="block"
                    value={form.block}
                    disabled={!form.hostel}
                    onChange={handleChange}
                    className="select select-bordered h-11 rounded-xl bg-white/80 disabled:bg-slate-100"
                  >
                    <option value="">Block</option>
                    {hostelOptions[form.hostel]?.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {type === "found" && (
                  <select
                    name="deposit"
                    onChange={handleChange}
                    className="select select-bordered w-full h-11 rounded-xl bg-white/80"
                  >
                    <option value="">Where is the item deposited?</option>
                    <option>Security Guard Desk</option>
                    <option>Warden Office</option>
                    <option>Reception</option>
                  </select>
                )}
              </div>
            </section>

            {/* Photos */}
            <section>
              <p className="text-xs font-semibold tracking-widest text-slate-500 mb-2">
                PHOTOS
              </p>

              <label className="border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-400 transition">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="text-3xl">☁️</div>
                <p className="text-sm">Tap to upload photos</p>
                <p className="text-xs">JPG or PNG, max 5MB</p>
              </label>
            </section>

            <button
              type="submit"
              className="btn w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40"
            >
              Submit Report
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReportItem;
