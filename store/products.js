import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    wishlist: [],
    cart: [],
  }),
  getters: {
    wishlistList: (state) => state.wishlist,
  },
  actions: {
    addToWishlist(item) {
      this.wishlist.push(item);
    },
  },
});
