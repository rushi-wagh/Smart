import { create } from "zustand";
import api from "../utils/api.js";

export const useAnnouncementStore = create((set) => ({
  announcements: [],
  loading: false,

  fetchAnnouncements: async (filters = {}) => {
    try {
      set({ loading: true });

      const { data } = await api.get("/api/v1/announcement", {
        params: filters,
      });

      set({
        announcements: data.data,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to fetch announcements",
      };
    }
  },

  createAnnouncement: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await api.post(
        "/api/v1/announcement/post",
        payload
      );

      set((state) => ({
        announcements: [data.data, ...state.announcements],
        loading: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Announcement creation failed",
      };
    }
  },
}));
