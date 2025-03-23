import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    wishlist: [],
    profile: null,
  }),
  getters: {
    wishlistList: (state) => state.wishlist,
    profilegetter: (state) => state.profile,
  },
  actions: {
    addToWishlist(item) {
      this.wishlist.push(item);
    },
    setProfile(profileData) {
      this.profile = profileData;
    },
  },
});
