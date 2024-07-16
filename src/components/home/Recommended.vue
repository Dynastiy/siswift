<template>
  <div class="container">
    <h4 class="font-semibold mb-6 text-xl">Suggested for you</h4>
    <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4">
      <div v-for="(item, idx) in products" :key="idx" class="hover:shadow" role="button" @click="$router.push('/login')">
        <div>
          <div class="">
            <img
              :src="item?.main_image"
              alt=""
              role="button"
              class="w-full h-[150px] object-cover"
            />
          </div>
        </div>
        <div class="mt-2 flex flex-col justify-between px-4 p-3">
          <div class="flex justify-between items-center">
            <h6 role="button" class="text-black1 capitalize text-md font-semibold">
              {{ item?.name }}
            </h6>
          </div>

          <small class="text-xs block text-gray-500"> Seller: {{ item?.shop }} </small>
          <!-- <small class="text-xs block text-gray-500"> {{ item?.brand?.name }} </small> -->

          <div class="flex justify-between items-center mt-3">
            <span class="text-primary font-bold lg:text-sm md:text-sm text-xs block leading-tight">
              {{ $currencyFormat(item?.base_price) }}
            </span>
            <span class="text-xs flex gap-1">
              <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
              4.5
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import phone1 from '@/assets/img/phone1.jpg'
import phone2 from '@/assets/img/phone2.webp'
import phone3 from '@/assets/img/phone3.webp'
import phone4 from '@/assets/img/phone4.avif'
export default {
  data() {
    return {
      products: [
        {
          main_image: phone1,
          base_price: 56000,
          shop: 'zircon',
          name: 'Tecno'
        },
        {
          main_image: phone2,
          base_price: 60900,
          shop: 'iTel',
          name: 'iTel'
        },
        {
          main_image: phone3,
          base_price: 45000,
          shop: 'therma',
          name: 'Redmi'
        },
        {
          main_image: phone4,
          base_price: 95000,
          shop: 'zirkzee',
          name: 'iPhone'
        }
      ]
    }
  }
}
</script>

<style></style>
