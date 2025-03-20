<template>
  <nav class="p-4 shadow">
    <div class="max-w-screen-xl mx-auto flex justify-between items-center">
      <div class="text-black text-2xl font-bold">MySite</div>
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
      </div>
    </div>
  </nav>
  <div><slot /></div>
</template>

<script setup></script>

<style scoped>
/* Optional custom styling */
</style>
