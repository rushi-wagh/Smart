import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";

export const useLostFoundStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      fetchItems: async (filters = {}) => {
        try {
          set({ loading: true });

          const { data } = await api.get("/api/v1/lost-found", {
            params: filters,
          });

          set({ items: data.data, loading: false });

          return { success: true };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Failed to load items",
          };
        }
      },

      createLostItem: async (payload) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/api/v1/lost-found/lost", payload);

          set((state) => ({
            items: [data.data, ...state.items],
            loading: false,
          }));

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message:
              error?.response?.data?.message || "Failed to report lost item",
          };
        }
      },

      createFoundItem: async (payload) => {
        try {
          set({ loading: true });

          const { data } = await api.post("/api/v1/lost-found/found", payload);

          set((state) => ({
            items: [data.data, ...state.items],
            loading: false,
          }));

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message:
              error?.response?.data?.message || "Failed to post found item",
          };
        }
      },

      claimItem: async (id, payload) => {
        try {
          set({ loading: true });

          const { data } = await api.post(
            `/api/v1/lost-found/claim/${id}`,
            payload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          set({ loading: false });

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Claim failed",
          };
        }
      },

      approveClaim: async (id) => {
        try {
          set({ loading: true });

          const { data } = await api.post(
            `/api/v1/lost-found/claim/approve/${id}`,
          );

          set((state) => ({
            items: state.items.map((i) => (i._id === id ? data.data : i)),
            loading: false,
          }));

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Approval failed",
          };
        }
      },
      getItemById: async (id) => {
        try {
          set({ loading: true });

          const { data } = await api.get(`/api/v1/lost-found/${id}`);

          set({ loading: false });

          return { success: true, data: data.data };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Failed to load item",
          };
        }
      },

      rejectClaim: async (id) => {
        try {
          set({ loading: true });

          const { data } = await api.post(
            `/api/v1/lost-found/claim/reject/${id}`,
          );

          set((state) => ({
            items: state.items.map((i) => (i._id === id ? data.data : i)),
            loading: false,
          }));

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Reject failed",
          };
        }
      },
    }),
    {
      name: "lost-found-store",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
