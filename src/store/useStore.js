import { create } from "zustand";

export const useStore = create((set) => ({
  //   loaded: false,
  //   setLoaded: (loaded) => set({ loaded }),
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  currentPageTitle: null,
  setCurrentPageTitle: (currentPageTitle) => set({currentPageTitle}),
}));
