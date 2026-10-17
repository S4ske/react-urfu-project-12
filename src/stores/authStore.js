import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

const createAuthStore = () => createStore()(
  persist(
    (set) => ({
      token: null,
      username: null,
      logIn: ({ token, username }) => set({ token, username }),
      logOut: () => set({ token: null, username: null }),
    }),
    {
      name: "auth",
      partialize: ({ token, username }) => ({ token, username }),
    },
  ),
);

export default createAuthStore;
