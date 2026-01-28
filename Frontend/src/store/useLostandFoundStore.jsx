import { create } from "zustand";
import api from "../utils/api";

export const useLostFoundStore = create((set, get) => ({
  items: [],
  currentItem: null,
  loading: false,
  claimLoading: false,

  createLostItem: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await api.post("/api/v1/lost-found/lost", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        items: [data.data, ...state.items],
        loading: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to report lost item",
      };
    }
  },

  createFoundItem: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await api.post("/api/v1/lost-found/found", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        items: [data.data, ...state.items],
        loading: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to report found item",
      };
    }
  },

  fetchItems: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/api/v1/lost-found");
      set({ items: data.items || data.data || [], loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchItemById: async (id) => {
    try {
      set({ loading: true });
      const { data } = await api.get(`/api/v1/lost-found/${id}`);
      set({ currentItem: data.item || data.data, loading: false });
    } catch (error) {
      set({ loading: false, currentItem: null });
    }
  },

  claimItem: async (id, payload) => {
    try {
      set({ claimLoading: true });

      const { data } = await api.post(
        `/api/v1/lost-found/claim/${id}`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      set({ claimLoading: false });
      return { success: true, message: data.message };
    } catch (error) {
      set({ claimLoading: false });
      return {
        success: false,
        message: error?.response?.data?.message || "Claim failed",
      };
    }
  },

  approveClaim: async (id) => {
    try {
      const { data } = await api.post(`/api/v1/lost-found/claim/approve/${id}`);
      get().fetchItems();
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Approval failed",
      };
    }
  },

  rejectClaim: async (id) => {
    try {
      const { data } = await api.post(`/api/v1/lost-found/claim/reject/${id}`);
      get().fetchItems();
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Rejection failed",
      };
    }
  },

  clearCurrentItem: () => set({ currentItem: null }),
}));
