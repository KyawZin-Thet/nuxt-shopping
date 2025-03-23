<template>
  <div v-if="accessToken" class="bg-white flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
      <h1 class="text-2xl font-bold mb-6">Welcome to the store !</h1>
      <div v-if="profile">
        <img
          :src="profile.avatar"
          alt="Profile Avatar"
          class="w-[38px] h-[38px] rounded-full mx-auto mb-6 border-4 border-gray-200"
        />
        <p class="text-gray-700 mb-4">
          <span class="font-semibold">Name:</span> {{ profile.name }}
        </p>
        <p class="text-gray-700 mb-4">
          <span class="font-semibold">Email:</span> {{ profile.email }}
        </p>
      </div>
      <div v-else>
        <p class="text-gray-700">No profile data found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../store/products";

const accessToken = useCookie("accessToken");
// Adjust the path to your store

// Access the store
const productStore = useProductStore();

// Access the profile data using the getter
const profile = productStore.profilegetter;
</script>

<style scoped></style>
