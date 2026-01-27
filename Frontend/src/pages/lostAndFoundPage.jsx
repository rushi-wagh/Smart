import { useState, useMemo } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const categories = ["All", "Electronics", "Keys", "Personal", "Stationery"];

const items = [
  {
    id: 1,
    name: "Sony Earbuds Case",
    category: "Electronics",
    location: "Block A, Lobby",
    time: "2 hours ago",
    status: "found",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
  },
  {
    id: 2,
    name: "Blue Steel Bottle",
    category: "Personal",
    location: "Block C, Gym",
    time: "5 hours ago",
    status: "found",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800",
  },
  {
    id: 3,
    name: "Room 304 Keys",
    category: "Keys",
    location: "Hostel Main Gate",
    time: "1 day ago",
    status: "claimed",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=800",
  },
  {
    id: 4,
    name: "Casio Calculator",
    category: "Stationery",
    location: "Library, Table 4",
    time: "2 days ago",
    status: "found",
    image:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800",
  },
];

const LostFoundDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
    
    <div className="min-h-screen  bg-slate-50 pb-24">
     <Navbar className ="shadow-lg shadow-indigo-500/40"/>   
      {/* Header */}
      <div className="bg-white  py-3 shadow-sm sticky top-0 z-40 mx-auto px-6">
        

        {/* Search */}
        <div className="mt-3 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-slate-100 px-15 py-2 rounded-xl">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items (keys, phone...)"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 px-15 py-4 overflow-x-auto ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                activeCategory === cat
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-white text-slate-600 border"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 ">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/lost-found/${item.id}`)}
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-46 w-full object-cover"
              />

              <span
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold
                ${
                  item.status === "found"
                    ? "bg-emerald-500 text-white"
                    : item.status === "claimed"
                    ? "bg-amber-500 text-white"
                    : "bg-rose-500 text-white"
                }`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>

            <div className="p-3">
              <span className="inline-block mb-1 px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600">
                {item.category}
              </span>

              <h3 className="font-semibold text-sm line-clamp-1">
                {item.name}
              </h3>

              <p className="text-xs text-slate-500">
                📍 {item.location}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center mt-16 text-slate-500">
          No items found
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/lost-found/report")}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-xl shadow-indigo-500/40 hover:scale-105 transition"
      >
        <Plus className="w-5 h-5" />
        Report Item
      </button>
    </div>
    <Footer/>
    </>
  );
};

export default LostFoundDashboard;
