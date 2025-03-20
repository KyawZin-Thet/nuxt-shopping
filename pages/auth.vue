<template>
  <div
    class="max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-3xl font-bold mb-4">MY ACCOUNT</h1>
    <nav class="text-sm text-gray-500 mb-6">
      <NuxtLink :to="`/`">HOME</NuxtLink> •
    </nav>
    <div
      class="bg-white p-8 shadow-lg rounded-lg flex flex-col md:flex-row items-center space-x-12 w-[50rem]"
    >
      <!-- Login Form -->
      <div class="shadow-lg m-4 p-4 w-1/2">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form>
          <label class="block text-gray-700 mb-1"
            >Username or email address *</label
          >
          <input type="text" class="w-full border p-2 rounded mb-4" />

          <label class="block text-gray-700 mb-1">Password *</label>
          <input type="password" class="w-full border p-2 rounded mb-4" />

          <div class="flex items-center mb-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-gray-700">Remember me</label>
          </div>

          <button class="w-[fit-content] px-4 bg-black text-white py-2 rounded">
            Log in
          </button>
          <div class="mt-3">
            <a href="#" class="text-[#b20808] mt-3 text-sm font-medium"
              >Lost your password?</a
            >
          </div>
        </form>
      </div>

      <!-- Register Form -->
      <div class="shadow-lg m-4 p-4 w-1/2">
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <form>
          <label class="block text-gray-700 mb-1">Email address *</label>
          <input type="email" class="w-full border p-2 rounded mb-4" />

          <p class="text-gray-600 text-sm mb-4">
            A link to set a new password will be sent to your email address.
          </p>

          <p class="text-gray-600 text-sm mb-4">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our
            <span class="text-black font-medium">privacy policy</span>.
          </p>

          <button class="w-[fit-content] px-4 bg-black text-white py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
