import { create } from "zustand";

export const useErrorCountStore = create((set) => ({
  error: false,
  setError: (error) => set({ error }),
}));
