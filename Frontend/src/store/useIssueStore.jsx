import { create } from "zustand";
import api from "../utils/api";

export const useIssueStore = create((set, get) => ({
  issues: [],
  loading: false,
  suggestedCategory: null,

  detectCategory: async (description) => {
    if (!description || description.length < 8) return;

    try {
      const { data } = await api.post("/api/v1/ai/category-detect", {
        description,
      });
      set({ suggestedCategory: data.suggestedCategory });
    } catch {}
  },

  createIssue: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await api.post("/api/v1/issue/create", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        issues: [data.issue, ...state.issues],
        loading: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to submit issue",
      };
    }
  },

  fetchMyIssues: async () => {
    try {
      const { data } = await api.get("/api/v1/issue/my-issues");
      set({ issues: data.issues });
    } catch {}
  },

  fetchAllIssues: async (filters = {}) => {
    try {
      const { data } = await api.get("/api/v1/issue/all-issues", {
        params: filters,
      });
      set({ issues: data.issues });
    } catch {}
  },

  updateStatus: async (id, status) => {
    try {
      await api.patch(`/api/v1/issue/update-status/${id}`, { status });
      get().fetchAllIssues();
    } catch {}
  },

  deleteIssue: async (id) => {
    try {
      await api.delete(`/api/v1/issue/delete/${id}`);
      set((state) => ({
        issues: state.issues.filter((i) => i._id !== id),
      }));
    } catch {}
  },
}));
