import { create } from "zustand";
import api from "../utils/api";

export const useIssueStore = create((set, get) => ({
  myIssues: [],
  allIssues: [],
  staffTasks: [],
  loading: false,
  suggestedCategory: null,
  adminStats: null,

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
        myIssues: [data.issue, ...state.myIssues],
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
      set({ loading: true });
      const { data } = await api.get("/api/v1/issue/my-issues");
      set({ myIssues: data.issues || [], loading: false });
    } catch {
      set({ loading: false });
    }
  },

  fetchAllIssues: async (filters = {}) => {
    try {
      set({ loading: true });
      const { data } = await api.get("/api/v1/issue/all-issues", {
        params: filters,
      });
      set({ allIssues: data.issues || [], loading: false });
    } catch {
      set({ loading: false });
    }
  },

  updateStatus: async (id, status) => {
    try {
      await api.patch(`/api/v1/issue/update-status/${id}`, { status });
      get().fetchAllIssues();
      get().fetchMyIssues();
    } catch {}
  },

  deleteIssue: async (id) => {
    try {
      await api.delete(`/api/v1/issue/delete/${id}`);
      set((state) => ({
        myIssues: state.myIssues.filter((i) => i._id !== id),
        allIssues: state.allIssues.filter((i) => i._id !== id),
      }));
    } catch {}
  },

  fetchStaffTasks: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/api/v1/staff/tasks");
      set({ staffTasks: data.tasks || [], loading: false });
    } catch {
      set({ loading: false });
    }
  },

  staffUpdateStatus: async (id, status) => {
    try {
      await api.patch(`/api/v1/staff/tasks/${id}/status`, { status });
      get().fetchStaffTasks();
    } catch {}
  },
  fetchAdminStats: async (filters = {}) => {
    try {
      const { data } = await api.get("/api/v1/admin/count", {
        params: filters,
      });
      set({ adminStats: data });
    } catch {}
  },
}));
