import { create } from "zustand";
import api from "../utils/api.js";

export const useProfileStore = create((set) => ({
  profile: null,
  completion: 0,
  loading: false,

  getProfile: async () => {
    try {
      set({ loading: true });

      const { data } = await api.get("/api/v1/user/profile");

      set({
        profile: data.data.user,
        completion: data.data.percentage,
        loading: false,
      });

      return { success: true,completion: data.data.percentage };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message:
          error?.response?.data?.message || "Failed to load profile",
      };
    }
  },

  updateProfile: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await api.put("/api/v1/user/update-profile", payload);

      set({
        profile: data.data,
        loading: false,
      });

      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message:
          error?.response?.data?.message || "Profile update failed",
      };
    }
  },
}));
