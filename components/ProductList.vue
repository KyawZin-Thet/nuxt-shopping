<template>
  <div class="mx-auto max-w-screen-xl m-1">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Sidebar Filters -->
      <div class="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
        <div class="shadow w-[100%] my-2 flex justify-center md:justify-start">
          <div>
            <h2 class="font-bold mb-4 p-2">Category</h2>
            <ul class="min-w-[125px] p-2">
              <li v-for="category in categories" :key="category">
                <input
                  type="radio"
                  name="category"
                  v-model="selectedCategory"
                  :value="category.slug"
                  class="leading-[1.6] mb-4"
                />
                {{ category.slug }}
              </li>
            </ul>
          </div>
        </div>
        <div class="p-4 w-[100%] bg-white shadow rounded md:ml-0 ml-2 my-4">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">Filter by price</h2>
            <button class="text-xl font-bold">-</button>
          </div>
          <div class="flex flex-col space-y-4">
            <div class="relative flex my-5">
              <input
                type="range"
                min="0"
                max="500"
                v-model="minPrice"
                class="appearance-none w-[50%] bg-gray-200 h-1 rounded-lg"
              />
              <input
                type="range"
                min="500"
                max="1000"
                v-model="maxPrice"
                class="appearance-none bg-gray-200 h-1 w-[50%] rounded-lg"
              />
            </div>
            <div
              class="flex justify-between flex-wrap items-center text-sm text-gray-700"
            >
              <button
                @click="priceRangeFilter"
                class="px-2 py-2 border border-gray-500 rounded hover:bg-gray-100"
              >
                FILTER
              </button>
              <span class="py-2 text-[12px] font-medium"
                >PRICE: ${{ minPrice }} — ${{ maxPrice }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Product List -->
      <div class="flex-1 bg-white p-4 rounded-lg shadow">
        <div>
          <div class="flex justify-between items-center mb-4">
            <div v-if="products.value">
              Showing 1-{{ limit.value }} of {{ products }} results
            </div>

            <select class="border p-2 rounded w-full md:w-auto">
              <option>Sort by average rating</option>
            </select>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[15px] gap-y-[25px]"
          >
            <div
              v-for="product in products"
              :key="product.id"
              class="rounded-md bg-[#fff] border-[#eaebed] shadow relative group"
            >
              <span
                v-if="product.isNew"
                class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded"
                >NEW</span
              >
              <span
                v-if="product.discount"
                class="absolute top-2 left-14 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                {{ product.discount }}%
              </span>

              <!-- Product Image -->
              <div>
                <div class="relative">
                  <NuxtLink :to="`/products/${product.id}`">
                    <img
                      :src="product.category.image"
                      :alt="product.category.name"
                      class="w-full h-[300px] w-[300px] align-middle object-cover"
                  /></NuxtLink>

                  <!-- Floating Icons -->
                  <div
                    class="border shadow rounded-[3px] flex flex-col absolute top-[10px] right-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div class="relative inline-block group/tooltip z-10">
                      <button
                        class="flex items-center w-[38px] h-[38px] justify-center relative border-b border-[#eeeff1] p-[10px] bg-white"
                        aria-label="Wishlist"
                        :disabled="!hasAccessToken"
                        @click="addToWishlistAndRedirect(product)"
                      >
                        <i
                          class="fa-regular fa-heart text-xl w-[1.125rem] h-[1.125rem] text-[#595959]"
                        ></i>
                      </button>

                      <div
                        v-if="hasAccessToken"
                        class="absolute hidden group-hover/tooltip:block bg-[#595959] text-white text-sm px-2 py-1 rounded mt-2 whitespace-nowrap top-[-30px] left-1/2 transform -translate-x-1/2"
                      >
                        Wishlist
                      </div>
                      <div
                        v-else
                        class="absolute hidden group-hover/tooltip:block bg-[#595959] text-white text-sm px-2 py-1 rounded mt-2 whitespace-nowrap top-[-30px] left-1/2 transform -translate-x-1/2"
                      >
                        Need to Log In
                      </div>
                    </div>
                    <div class="relative inline-block group/tooltip z-10">
                      <button
                        class="flex items-center w-[38px] h-[38px] justify-center relative border-b border-[#eeeff1] p-[10px] bg-white"
                        aria-label="View"
                      >
                        <i
                          class="fa-solid fa-code-compare text-xl w-[1.125rem] h-[1.125rem] text-[#595959]"
                        ></i>
                        <div
                          class="absolute hidden group-hover/tooltip:block bg-[#595959] text-white text-sm px-2 py-1 rounded mt-2 whitespace-nowrap top-[-30px] left-1/2 transform -translate-x-1/2"
                        >
                          Unavailable
                        </div>
                      </button>
                    </div>
                    <NuxtLink :to="`/products/${product.id}`">
                      <div class="relative inline-block group/tooltip z-10">
                        <button
                          class="flex items-center w-[38px] h-[38px] justify-center relative border-b border-[#eeeff1] p-[10px] bg-white"
                          aria-label="View"
                        >
                          <i
                            class="fas fa-eye text-xl w-[1.125rem] h-[1.125rem] text-[#595959]"
                          ></i>
                          <div
                            class="absolute hidden group-hover/tooltip:block bg-[#595959] text-white text-sm px-2 py-1 rounded mt-2 whitespace-nowrap top-[-30px] left-1/2 transform -translate-x-1/2"
                          >
                            View
                          </div>
                        </button>
                      </div></NuxtLink
                    >
                  </div>
                </div>
              </div>

              <div class="p-[15px] border-t border-[#eaebed]">
                <NuxtLink :to="`/products/${product.id}`">
                  <h3 class="text-[14px] h-[45px] m-0 leading-[1.6]">
                    {{ product.title }}
                  </h3></NuxtLink
                >
                <span
                  class="text-[#309D79] uppercase text-xs font-medium leading-none"
                  >in stock</span
                >

                <!-- Price , Add to Cart Button (on hover) -->
                <div class="relative h-[30px] overflow-hidden text-left">
                  <span
                    class="text-[14px] leading-[1] font-medium leading-[26px] text-black absolute transition-all duration-500 top-0 group-hover:top-[-200px]"
                  >
                    ${{ product.price }}
                  </span>
                  <button
                    class="font-semibold text-base leading-[26px] block transform absolute bottom-[-100px] transition-all duration-500 group-hover:bottom-0 text-black"
                    @click="addToCart(product)"
                  >
                    <i
                      class="fa-solid fa-cart-shopping mr-2 text-[#595959]"
                    ></i>

                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!allFetched" class="flex justify-center">
          <button
            v-if="!isCategorySelected"
            class="bg-black text-white px-4 py-2 rounded-lg mt-4"
            @click="loadMore"
          >
            Load More
          </button>
          <button
            v-if="isCategorySelected"
            class="bg-black text-white px-4 py-2 rounded-lg mt-4"
            @click="resetFilters"
          >
            Unfilter
          </button>
        </div>
        <div v-if="allFetched" class="flex justify-center">
          <h3 class="font-semibold my-5">No More Products Left.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { storeToRefs } from "pinia";
import { useProductStore } from "../store/products";

const accessToken = useCookie("accessToken");

const productStore = useProductStore();

const { items } = storeToRefs(productStore);

const router = useRouter();
const selectedCategory = ref(null);
const limit = ref(12);
const products = ref([]);
const allFetched = ref(false);
const page = ref(1);
const categories = ref([]);
const isCategorySelected = ref(false);

const hasAccessToken = computed(() => {
  return !!accessToken.value;
});

const addToWishlistAndRedirect = (product) => {
  if (hasAccessToken.value) {
    productStore.addToWishlist(product);
    router.push("/wishlist");
  }
};

watch(selectedCategory, (newValue) => {
  if (newValue) {
    isCategorySelected.value = true;
    categoryFilter(newValue);
  }
});

const resetFilters = () => {
  isCategorySelected.value = false;
  selectedCategory.value = null;
  console.log("const selectedCategory = ref(null);", selectedCategory.value);
  fetchProducts();
};

const loadMore = () => {
  page.value = page.value + 1;
  fetchProducts();
};

const offset = computed(() => (page.value - 1) * limit.value);

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?offset=${offset.value}&limit=${limit.value}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.length < 12) {
      allFetched.value = true;
    }
    if (page.value > 1) {
      products.value = [...products.value, ...data];
      console.log("products.value", products.value);
      console.log("products.value page.value", page.value);
    } else {
      products.value = data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(async () => {
  await fetchProducts();
  categories.value = await fetchCategories();
});

const minPrice = ref(370);
const maxPrice = ref(600);

const categoryFilter = async (slug) => {
  isCategorySelected.value = true;
  try {
    const response = await fetch(
      ` https://api.escuelajs.co/api/v1/products/?categorySlug=${slug}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    products.value = data;
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const priceRangeFilter = async () => {
  selectedCategory.value = null;
  try {
    const response = await fetch(
      ` https://api.escuelajs.co/api/v1/products/?price_min=${minPrice.value}&price_max=${maxPrice.value}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

console.log("products.value", products.value);
</script>

<style>
input[type="range"]::-webkit-slider-thumb {
  height: 16px;
  width: 9px;
  border-radius: 15%;
  background: #000000;
  pointer-events: auto;
  -webkit-appearance: none;
}
</style>
