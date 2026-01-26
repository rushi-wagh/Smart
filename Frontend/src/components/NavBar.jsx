import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Toast from "./Toast";
import useToast from "../hooks/useToast";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toast, showToast, hideToast } = useToast();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    showToast("success", "Logged out successfully");
    setOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <>
      <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/40">
              AI
            </div>
            <span className="font-semibold text-lg text-slate-900">
              SmartHostel AI
            </span>
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="btn btn-sm rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/40"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigate(user?.role === "admin" ? "/admin" : "/student")
                }
                className="px-4 py-1.5 rounded-xl text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
              >
                Dashboard
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow-md shadow-indigo-500/40 hover:scale-105 transition-all duration-150"
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-44 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.35)] py-2 animate-in fade-in slide-in-from-top-1 zoom-in-95 duration-150">
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full px-4 py-2.5 text-sm flex items-center gap-2 rounded-xl hover:bg-indigo-50 transition"
                    >
                      👤 Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-sm flex items-center gap-2 text-red-500 rounded-xl hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {toast && <Toast {...toast} onClose={hideToast} />}
    </>
  );
};

export default Navbar;