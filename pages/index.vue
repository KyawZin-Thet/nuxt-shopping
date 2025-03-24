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
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../store/products";

const accessToken = useCookie("accessToken");
const productStore = useProductStore();

const profile = ref(null);

const fetchUserPf = async () => {
  try {
    if (!accessToken.value) {
      return;
    }
    const response = await $fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      }
    );
    productStore.setProfile(response);
    profile.value = productStore.profilegetter;
    return response;
  } catch (error) {
    console.error("Failed to get profile:", error);
  }
};

onMounted(fetchUserPf);
</script>

<style scoped></style>
