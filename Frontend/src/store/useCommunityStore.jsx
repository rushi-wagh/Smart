import { create } from "zustand";
import api from "../utils/api";

export const useCommunityStore = create((set) => ({
  comments: [],
  reactions: [],

  fetchComments: async (id) => {
    const { data } = await api.get(`/api/v1/community/comments/${id}`);
    set({ comments: data.comments });
  },

  fetchReactions: async (id) => {
    const { data } = await api.get(`/api/v1/community/reactions/${id}`);
    set({ reactions: data.reactions });
  },

  addComment: async (payload) => {
    return api.post("/api/v1/community/comment", payload);
  },

  toggleReaction: async (payload) => {
    return api.post("/api/v1/community/reaction", payload);
  },
}));
