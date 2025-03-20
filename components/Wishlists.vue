<template>
  <div class="mx-auto max-w-screen-xl mx-auto p-2">
    <h2 class="text-2xl font-bold mb-4">Wishlist</h2>
    <div
      class="flex justify-center items-center min-h-[50vh]"
      v-if="wishlistList.length === 0"
    >
      <h3 class="font-semibold">Your Wishlist Is Empty</h3>
    </div>
    <div v-if="wishlistList.length !== 0" class="overflow-x-auto">
      <table class="min-w-full table table-bordered table-hover">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="py-2 px-4">Product Name</th>
            <th class="py-2 px-4">Unit Price</th>
            <th class="py-2 px-4">Stock Status</th>
            <th class="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in wishlistList"
            :key="index"
            class="border-b"
          >
            <td class="py-2 px-4 flex items-center">
              <img
                :src="item.category.image"
                alt="Product Image"
                class="w-16 h-16 object-cover mr-4"
              />
              {{ item.title }}
            </td>
            <td class="py-2 px-4 font-bold">${{ item.price }}</td>
            <td
              class="py-2 px-4"
              :class="item.inStock ? 'text-green-600' : 'text-red-600'"
            >
              {{ item.inStock ? "In Stock" : "Out Of Stock" }}
            </td>
            <td class="py-2 px-4">
              <button
                :disabled="!item.inStock"
                class="px-4 py-2 text-white font-bold rounded-lg"
                :class="
                  item.inStock
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                "
              >
                Add to Cart
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "../store/products";

const productStore = useProductStore();
const { wishlist, wishlistList } = storeToRefs(productStore);
</script>
