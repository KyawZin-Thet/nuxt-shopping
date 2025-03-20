<template>
  <div class="mx-auto max-w-screen-xl p-6 bg-white shadow-lg rounded-lg">
    <div
      v-if="product"
      class="flex flex-col xl:flex-row gap-5 p-5 max-w-6xl mx-auto"
    >
      <div class="flex-1">
        <div class="sticky top-16 ml-5">
          <div
            class="gallery relative border-r border-black max-w-[500px] mx-auto flex flex-col md:flex-row items-start"
          >
            <!-- Thumbnails Swiper -->
            <div class="absolute left-[-18%] w-[100px]">
              <Swiper
                @swiper="setThumbsSwiper"
                :direction="'vertical'"
                :spaceBetween="8"
                :slidesPerView="3"
                :freeMode="true"
                watchSlidesProgress
                :modules="[Navigation, Thumbs]"
                class="thumbs-swiper h-[400px]"
              >
                <SwiperSlide
                  v-for="(img, index) in product.images"
                  :key="index"
                  class="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img
                    :src="img"
                    class="w-[75px] h-[75px] mb-2 object-cover rounded-sm"
                    alt="Thumbnail"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <!-- Main Swiper -->
            <Swiper
              :spaceBetween="10"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="[Navigation, Thumbs]"
              class="main-swiper"
            >
              <SwiperSlide v-for="(img, index) in product.images" :key="index">
                <img
                  :src="img"
                  class="w-full h-[556px] object-cover rounded-sm"
                  alt="Main Image"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <h1 class="text-2xl leading-6 my-[30px] font-medium text-[#161616]">
          {{ product.title }}
        </h1>

        <p class="text-[#4e4e4e] mb-4">
          {{ product.description }}
        </p>

        <p class="text-gray-500 mb-4">
          19 people have this in their carts right now. It's running out!
        </p>

        <div
          class="flex justify-between mt-[30px] bg-[#fff8f0] px-[15px] py-[10px] border border-[#da3f3f] rounded-[4px] font-bold mb-4"
        >
          <span class="text-gray-500 font-semibold"> Flash Sale End In:</span>
          <span class="text-red-600">04 : 09 : 16 : 24</span>
        </div>

        <div class="flex justify-between mb-5">
          <div
            class="mr-2 flex flex-col items-start text-sm border border-[#eaebed] rounded-[#eaebed] pl-2.5 py-2.5 bg-white gap-[15px] justify-start flex-1"
          >
            <span
              class="text-sm font-medium leading-[1.3] text-[#161616] mb-1.25"
              >Gift Package</span
            >
            <span class="text-xs leading-[1.6] text-[#4e4e4e]"
              >lorem ipsum</span
            >
          </div>
          <div
            class="mr-2 flex flex-col items-start text-sm border border-[#eaebed] rounded-[#eaebed] pl-2.5 py-2.5 bg-white gap-[15px] justify-start flex-1"
          >
            <span
              class="text-sm font-medium leading-[1.3] text-[#161616] mb-1.25"
              >Gift Package</span
            >
            <span class="text-xs leading-[1.6] text-[#4e4e4e]"
              >lorem ipsum</span
            >
          </div>
          <div
            class="mr-2 flex flex-col items-start text-sm border border-[#eaebed] rounded-[#eaebed] pl-2.5 py-2.5 bg-white gap-[15px] justify-start flex-1"
          >
            <span
              class="text-sm font-medium leading-[1.3] text-[#161616] mb-1.25"
              >Gift Package</span
            >
            <span class="text-xs leading-[1.6] text-[#4e4e4e]"
              >lorem ipsum</span
            >
          </div>
        </div>

        <!-- Sale and profit indicators -->
        <div class="mb-4">
          <span
            class="text-[#e30a0a] bg-[#fef2f2] border h-5 px-1.75 text-[10px] font-semibold leading-[1.4] uppercase p-2 rounded-[3px] mr-2"
            >SALE!</span
          >

          <span
            class="font-semibold text-[10px] bg-[#151616] p-2 rounded-md text-white"
          >
            YOUR PROFIT: $59.00 7%
          </span>
        </div>

        <!-- Product Price Range & instock -->
        <div class="flex items-center my-2">
          <div class="text-sm uppercase font-medium font-bold mr-2">
            $ {{ product.price }}
          </div>

          <div
            class="text-[9px] px-3 py-1.5 tracking-[0.5px] bg-[#dffff8] border border-[#019267] text-[#019267] rounded-[10px] inline-block font-medium"
          >
            100 IN STOCK
          </div>
        </div>

        <!-- Action Buttons - Add to cart and Buy now -->
        <div class="my-5 flex flex-wrap">
          <div class="w-[30%] p-2 flex items-center">
            <button
              :disabled="count <= 0"
              @click="decrement"
              class="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            >
              -
            </button>

            <span
              class="w-12 text-center p-2 border border-gray-300 mx-2 rounded"
              >{{ count }}</span
            >
            <button
              :disabled="count >= 20"
              @click="increment"
              class="p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div class="w-[60%] flex-col">
            <button
              class="w-full mb-2 bg-gray-300 px-4 py-2 rounded mr-2 cursor-pointer hover:bg-gray-400 transition-colors"
            >
              Add to cart
            </button>

            <button
              class="w-full bg-[#e30a0a] text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500 transition-colors"
            >
              BUY NOW
            </button>
          </div>
        </div>

        <div class="mb-5 p-2 bg-red-600 text-white text-center rounded text-xs">
          Please select a purchasable variation for
          <strong>0.20 Carat Five Stone Ring</strong> before adding this product
          to the cart.
        </div>

        >
        <div class="my-5">
          <div class="inline-block mr-5 cursor-pointer hover:underline">
            <span>DELIVERY & RETURN</span>
          </div>

          <div class="inline-block mr-5 cursor-pointer hover:underline">
            <span>SIZE GUIDE</span>
          </div>
          >
          <div class="inline-block cursor-pointer">
            <span>2 - DAY DELIVERY MAR 19 MAR 23</span>
          </div>
        </div>

        <div
          class="mb-5 p-2 border border-gray-300 rounded hover:border-gray-400"
        >
          <h3 class="m-0">Up to 12 Months Installment Opportunity</h3>
          <p class="my-1">
            Monthly installment opportunity starting from
            <strong>42.09 TL</strong> for up to 12 months
          </p>
        </div>

        <button
          class="w-full bg-green-500 text-white py-2 px-4 border-0 rounded cursor-pointer hover:bg-green-600 transition-colors"
        >
          REQUEST INFORMATION
        </button>

        <div class="mt-5 font-sans">
          <span>Share - </span>
          <div class="flex gap-3 my-2 cursor-pointer">
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-[#1877F2] text-white text-[10px]"
            >
              <i class="fa-brands fa-facebook"></i>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-[10px]"
            >
              <i class="fa-brands fa-x-twitter"></i>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0088cc] text-white text-[10px]"
            >
              <i class="fa-brands fa-telegram"></i>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#fccc63] via-[#f56040] to-[#d6249f] text-white text-[10px]"
            >
              <i class="fa-brands fa-instagram"></i>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0A66C2] text-white text-[10px]"
            >
              <i class="fa-brands fa-linkedin"></i>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-[10px]"
            >
              <i class="fa-brands fa-tiktok"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = route.params.id;
const product = ref(null);
const count = ref(0);

onMounted(async () => {
  try {
    const response = await fetch(
      `https:api.escuelajs.co/api/v1/products/${productId}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    product.value = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

definePageMeta({
  layout: "default",
});
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const increment = () => {
  if (count.value < 20) {
    count.value++;
  }
};

const decrement = () => {
  if (count.value > 0) {
    count.value--;
  }
};
</script>

<style scoped>
.gallery {
  width: 600px;
  margin: auto;
}

.main-swiper {
  width: 100%;
  height: 400px;
}

.thumbs-swiper {
  margin-top: 10px;
  height: 100px;
}

.swiper {
  height: fit-content;
}

.thumbs-swiper .swiper-slide {
  cursor: pointer;
  opacity: 0.6;
  height: fit-content !important ;
}

.thumbs-swiper .swiper-slide-thumb-active {
  opacity: 1;
  height: fit-content !important ;
}

.swiper-button-next {
  border-radius: 50% !important;
  background-color: black !important;
  color: white !important;
}
</style>
