import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  user: "",
  status: 1, //cart:1 address:2 delivery:3 payment:4

  setStatus: (status) => set({ status }),
  setCart: (product) => set({ cart: product }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateCart: (updatedProduct) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      ),
    })),
  setUser: (user) => set({ user }),
}));

export default useStore;
