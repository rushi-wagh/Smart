import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useProfileStore } from "../store/useProfileStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const navigate = useNavigate();
  const { profile, completion, getProfile } = useProfileStore();

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-br from-indigo-100 via-sky-100 to-emerald-100 px-4 py-8">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.18)] border border-white/40">

          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              My Profile
            </h1>
            <p className="text-sm text-slate-500">
              View your personal and hostel information
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6">
            {/* <div
              className="radial-progress text-indigo-600"
              style={{ "--value": completion }}
            >
              {completion}%
            </div> */}
            <div>
              <p className="font-semibold">Profile Completion</p>
              <p className="text-sm text-slate-500">
                Complete your profile for best experience
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <section>
              <p className="text-xs font-semibold tracking-widest text-slate-500 mb-3">
                PERSONAL INFORMATION
              </p>

              <div className="grid gap-4">
                <Info label="Full Name" value={profile.name} />
                <Info label="Email" value={profile.email} />
                <div className="flex items-center justify-between bg-indigo-50 px-4 py-3 rounded-xl border border-indigo-100">
                  <span className="text-sm text-slate-600">Role</span>
                  <span className="badge badge-primary px-4 py-2">
                    {profile.role}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold tracking-widest text-slate-500 mb-3">
                HOSTEL DETAILS
              </p>

              <div className="grid gap-4">
                <Info label="Hostel Unique ID" value={profile.hostelId || "—"} />
                <Info label="Hostel Name" value={profile.hostel || "—"} />

                <div className="grid grid-cols-2 gap-4">
                  <Info label="Block" value={profile.block || "—"} />
                  <Info label="Room No" value={profile.room || "—"} />
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button
                onClick={() => navigate("/update-profile")}
                className="btn w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/40 transition-all"
              >
                Edit Profile →
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="font-medium text-slate-900">{value}</p>
  </div>
);

export default ProfileView;
