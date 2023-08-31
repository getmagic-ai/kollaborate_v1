import { create } from "zustand";

const useSetBrandStore = create((set) => ({
  brand: null,
  select: (brand) => set((state) => ({ brand })),
}));

export default useSetBrandStore;
