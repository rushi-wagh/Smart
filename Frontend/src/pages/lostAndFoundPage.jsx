import { useEffect, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLostFoundStore } from "../store/useLostandFoundStore";

const categories = [
  "All",
  "electronics",
  "documents",
  "accessories",
  "clothing",
  "others",
];

const LostFoundDashboard = () => {
  const navigate = useNavigate();
  const { items, fetchItems, loading } = useLostFoundStore();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, search]);

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-24">
        
          <Navbar />

          <div className="bg-white py-3 shadow-sm sticky top-0 z-40 pl-12 mx-auto">
            <div className="mt-3 flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search items"
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 px-4 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-600 border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && <p className="text-center text-slate-500">Loading...</p>}

          <div className="grid grid-cols-2 gap-4 px-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/lost-found/${item._id}`)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.images?.[0] || "/placeholder.jpg"}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                  />

                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "AVAILABLE"
                        ? "bg-emerald-500 text-white"
                        : item.status === "CLAIMED"
                          ? "bg-amber-500 text-white"
                          : "bg-rose-500 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-3">
                  <span className="inline-block mb-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
                    {item.category}
                  </span>

                  <h3 className="font-semibold text-sm line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500">📍 {item.location}</p>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredItems.length === 0 && (
            <p className="text-center text-slate-500 mt-16">No items found</p>
          )}

          <button
            onClick={() => navigate("/lost-found/report")}
            className="fixed bottom-6 right-6 flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Report Item
          </button>
        </div>

        <Footer />
   
    </>
  );
};

export default LostFoundDashboard;
