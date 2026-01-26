import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  isOpen: false,
  messages: [],
  loading: false,

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  closeChat: () => set({ isOpen: false }),

  clearChat: () => set({ messages: [] }),

  sendMessage: async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };

    set((state) => ({
      messages: [...state.messages, userMsg],
      loading: true,
    }));

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const botMsg = { role: "bot", text: data.reply };

      set((state) => ({
        messages: [...state.messages, botMsg],
        loading: false,
      }));
    } catch (err) {
      const errorMsg = {
        role: "bot",
        text: "Something went wrong. Please try again.",
      };

      set((state) => ({
        messages: [...state.messages, errorMsg],
        loading: false,
      }));
    }
  },
}));
