import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-sm
">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-indigo-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3 21V3h18v18H3zm2-2h14V5H5v14zm2-2h2v-5H7v5zm4 0h2V7h-2v10zm4 0h2v-3h-2v3z" />
            </svg>
          </div>

          <div className="leading-tight">
            <div className="text-lg font-semibold text-slate-900">
              SmartHostel AI
            </div>
            <div className="text-sm text-slate-500">
              Issue Tracking Platform
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <>
              <Link
                to="/docs"
                className="btn btn-outline btn-sm rounded-lg"
              >
                Docs
              </Link>

              <Link
                to="/login"
                className="btn btn-primary btn-sm rounded-lg px-5"
              >
                Login
              </Link>
            </>
          )}

          {isAuthenticated && user?.role === "student" && (
            <Link to="/student" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin" className="btn btn-primary btn-sm">
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
