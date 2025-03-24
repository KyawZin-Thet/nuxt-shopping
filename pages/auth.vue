<template>
  <div
    class="relative max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div
      v-if="LgSuccess"
      class="absolute top-[300px] left-[45%] bg-white w-[fit-content] p-4 rounded-lg shadow-lg border border-black"
    >
      <p class="text-sm text-black mb-3">Log in Success! Go to Home Page.</p>

      <div class="flex items-center justify-center">
        <button
          @click="closeLgSuccess"
          class="text-sm w-[fit-content] px-4 bg-black hover:bg-white hover:text-black border hover:border-black text-white py-2 rounded"
        >
          Ok
        </button>
      </div>
    </div>
    <div
      v-if="RgSuccess"
      class="absolute top-[300px] left-[45%] bg-white w-[fit-content] p-4 rounded-lg shadow-lg border border-black"
    >
      <p class="text-sm text-black mb-3">
        Registeraion Success! Please Log In.
      </p>

      <div class="flex items-center justify-center">
        <button
          @click="closeRgSuccess"
          class="text-sm w-[fit-content] px-4 bg-black hover:bg-white hover:text-black border hover:border-black text-white py-2 rounded"
        >
          Ok
        </button>
      </div>
    </div>
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
        <form @submit.prevent="handleLogin">
          <!-- Username or Email -->
          <label class="block text-gray-700 mb-1"
            >Username or email address *</label
          >
          <input
            v-model="loginUsernameOrEmail"
            type="text"
            class="w-full border p-2 rounded mb-4"
            placeholder="Enter your username or email"
          />
          <span
            v-if="!loginUsernameOrEmail && isLgSubmitted"
            class="text-red-500 text-sm"
          >
            Username or email is required.
          </span>

          <!-- Password -->
          <label class="block text-gray-700 mb-1">Password *</label>
          <div class="relative">
            <input
              v-model="loginPassword"
              :type="showLgPassword ? 'text' : 'password'"
              class="w-full border p-2 rounded mb-4"
              placeholder="Enter your password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="toggleLgEye"
            >
              <i
                :class="showLgPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="text-gray-500 mb-1"
              ></i>
            </button>
          </div>
          <span
            v-if="
              (!isPasswordValid(loginPassword) && isLgSubmitted) ||
              (!loginPassword && isLgSubmitted)
            "
            class="text-red-500 text-sm"
          >
            Password must contain only letters and numbers.
          </span>

          <!-- Remember Me -->
          <div class="flex items-center mb-4">
            <input type="checkbox" id="remember" class="mr-2" />
            <label for="remember" class="text-gray-700">Remember me</label>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-[fit-content] px-4 bg-black text-white py-2 rounded"
          >
            Log in
          </button>

          <!-- Lost Password Link -->
          <div class="mt-3">
            <a href="#" class="text-[#b20808] mt-3 text-sm font-medium">
              Lost your password?
            </a>
          </div>
        </form>
      </div>

      <!-- Register Form -->
      <div class="shadow-lg m-4 p-4 w-1/2">
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <form @submit.prevent="handleRegister">
          <!-- Username  -->
          <label class="block text-gray-700 mb-1">Username *</label>
          <input
            v-model="registerUsername"
            type="text"
            class="w-full border p-2 rounded mb-4"
            placeholder="Enter your username"
          />
          <span
            v-if="!registerUsername && isRgSubmitted"
            class="text-red-500 text-sm"
          >
            Username is required.
          </span>

          <!-- Email  -->
          <label class="block text-gray-700 mb-1">Email address *</label>
          <input
            v-model="registerEmail"
            type="email"
            class="w-full border p-2 rounded mb-4"
            placeholder="Enter your email"
          />
          <span
            v-if="
              (!isEmailValid() && isRgSubmitted) ||
              (!registerEmail && isRgSubmitted)
            "
            class="text-red-500 text-sm"
          >
            Please enter a valid email address.
          </span>

          <!-- Password  -->
          <label class="block text-gray-700 mb-1">Password *</label>
          <div class="relative">
            <input
              v-model="registerPassword"
              :type="showRgPassword ? 'text' : 'password'"
              class="w-full border p-2 rounded mb-4"
              placeholder="Enter your password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="toggleRgEye"
            >
              <i
                :class="showRgPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="text-gray-500 mb-1"
              ></i>
            </button>
          </div>
          <span
            v-if="
              (!isPasswordValid(registerPassword) && isRgSubmitted) ||
              (!registerPassword && isRgSubmitted)
            "
            class="text-red-500 text-sm"
          >
            Password must contain only letters and numbers.
          </span>

          <p class="text-gray-600 text-sm mb-4">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our
            <span class="text-black font-medium">privacy policy</span>.
          </p>

          <button
            type="submit"
            class="w-[fit-content] px-4 bg-black text-white py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCookie } from "nuxt/app";
import { useProductStore } from "../store/products";

const router = useRouter();

//const accesstoken = ref(null);
const accessToken = useCookie("accessToken");
const refreshToken = useCookie("refreshToken");

console.log("accessToken", accessToken.value);
console.log("accrefreshTokenessToken", refreshToken.value);

const accessTokenExpiry = useCookie("accessTokenExpiry");

const registerUsername = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const loginUsernameOrEmail = ref("");
const loginPassword = ref("");

const showRgPassword = ref(false);
const showLgPassword = ref(false);
const isRgSubmitted = ref(false);
const isLgSubmitted = ref(false);
const RgSuccess = ref(false);
const LgSuccess = ref(false);

const closeRgSuccess = () => {
  RgSuccess.value = false;
};
const closeLgSuccess = () => {
  LgSuccess.value = false;
  fetchUserPf();
};

const isEmailValid = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(registerEmail.value);
};

const isPasswordValid = (password) => {
  const passwordPattern = /^[A-Za-z0-9]{8,}$/;
  return passwordPattern.test(password);
};

const toggleRgEye = () => {
  showRgPassword.value = !showRgPassword.value;
};
const toggleLgEye = () => {
  showLgPassword.value = !showLgPassword.value;
};

const handleRegister = async () => {
  isRgSubmitted.value = true;
  if (
    !registerUsername.value ||
    !isEmailValid() ||
    !registerPassword.value ||
    !isPasswordValid(registerPassword.value)
  ) {
    return;
  }
  try {
    const response = await $fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      body: JSON.stringify({
        name: registerUsername.value,
        email: registerEmail.value,
        password: registerPassword.value,
        avatar: "https://api.lorem.space/image/face?w=640&h=480",
      }),
    });
    RgSuccess.value = true;
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
};
const fetchUserPf = async () => {
  try {
    // const token = await getValidAccessToken();
    if (!accessToken.value) {
      console.log("No valid token, logging out.");
      return;
    }
    const response = await $fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      }
    );
    const productStore = useProductStore();
    productStore.setProfile(response);
    router.push("/");
    return response;
  } catch (error) {
    console.error("Failed to get profile:", error);
  }
};

const handleLogin = async () => {
  isLgSubmitted.value = true;
  if (
    !loginUsernameOrEmail.value ||
    !loginPassword.value ||
    !isPasswordValid(loginPassword.value)
  ) {
    return;
  }
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginUsernameOrEmail.value,
        password: loginPassword.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();

    const expiresIn = 10 * 60 * 60;
    const expiryTime = Date.now() + expiresIn * 1000;
    accessToken.value = data.access_token;
    refreshToken.value = data.refresh_token;

    accessTokenExpiry.value = expiryTime;
    LgSuccess.value = true;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    alert("Login failed. Please try again.");
  }
};
</script>

<style scoped></style>
<!-- "name": "Nicolas",
	"email": "nico@gmail.com",
	"password": "12345678",
    "avatar": "https://api.lorem.space/image/face?w=640&h=480" -->
