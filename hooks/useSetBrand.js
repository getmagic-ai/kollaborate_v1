import { create } from "zustand";

const useSetBrandStore = create((set) => ({
  brand: null,
  select: (brand) => set((state) => ({ brand })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSetBrandStore;
