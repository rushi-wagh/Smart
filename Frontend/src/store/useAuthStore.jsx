export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async (credentials) => {
        try {
          set({ loading: true });

          const { data } = await api.post(
            "/api/v1/auth/login",
            credentials
          );

          set({
            user: data.user,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true, role: data.user.role };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Login failed",
          };
        }
      },

      signup: async (payload) => {
        try {
          set({ loading: true });

          const { data } = await api.post(
            "/api/v1/auth/register",
            payload
          );

          set({ loading: false });

          return { success: true, message: data.message };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error?.response?.data?.message || "Signup failed",
          };
        }
      },

      logout: async () => {
        await api.post("/api/v1/auth/logout"); // 🔥 call backend
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      getMe: async () => {
        try {
          set({ loading: true });

          const { data } = await api.get("/api/v1/auth/me");

          set({
            user: data,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
          });

          return {
            success: false,
            message:
              error?.response?.data?.message ||
              "Session expired. Please login again.",
          };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
