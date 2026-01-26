import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (credentials) => {
        try {
          set({ loading: true });

          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Login failed");

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          set({ loading: false });
          return { success: false, message: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
    }),
    { name: "auth-storage" }
  )
);
