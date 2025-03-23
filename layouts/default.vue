<template>
  <nav class="p-4 shadow">
    <div
      class="max-w-screen-xl mx-auto flex justify-center md:justify-between items-center"
    >
      <div class="text-black text-2xl font-bold hidden md:block">MySite</div>
      <div class="max-w-screen-xl flex space-x-4">
        <NuxtLink
          to="/"
          class="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium"
        >
          products
        </NuxtLink>
        <NuxtLink
          to="/wishlist"
          class="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium"
        >
          wishlist
        </NuxtLink>
        <NuxtLink v-if="!accessToken" :to="`/auth`">
          <button
            class="text-sm w-[fit-content] px-4 bg-black hover:bg-white hover:text-black border hover:border-black text-white py-2 rounded"
          >
            Log in
          </button></NuxtLink
        >
        <div class="relative z-30" v-if="accessToken">
          <button
            @click="toggleLogoutConfirmation"
            class="text-sm w-[fit-content] px-4 bg-black hover:bg-white hover:text-black border hover:border-black text-white py-2 rounded"
          >
            Log out
          </button>
          <div
            v-if="showLogoutConfirmation"
            class="absolute top-12 left-[-70%] bg-white w-[fit-content] p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <p class="text-sm text-gray-700 mb-3">Are you sure to log out?</p>
            <div class="flex space-x-2">
              <button
                @click="cancelLogout"
                class="text-sm w-[fit-content] px-4 bg-white hover:bg-black hover:text-white border border-black text-black py-2 rounded"
              >
                No
              </button>
              <button
                @click="confirmLogout"
                class="text-sm w-[fit-content] px-4 bg-black hover:bg-white hover:text-black border hover:border-black text-white py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div><slot /></div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
const router = useRouter();
const { getValidAccessToken } = useAuth();
const accessToken = useCookie("accessToken");
const refreshToken = useCookie("refreshToken");
const accessTokenExpiry = useCookie("accessTokenExpiry");
const showLogoutConfirmation = ref(false);

const toggleLogoutConfirmation = () => {
  showLogoutConfirmation.value = !showLogoutConfirmation.value;
};

const cancelLogout = () => {
  showLogoutConfirmation.value = false;
};

const confirmLogout = () => {
  accessToken.value = null;
  refreshToken.value = null;
  accessTokenExpiry.value = null;
  showLogoutConfirmation.value = false;
  router.push("/auth");
};
// onMounted(fetchUserPf);
</script>

<style scoped>
/* Optional custom styling */
</style>
