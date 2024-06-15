<template>
  <div class="body flex  lg:flex-row md:flex-row flex-col gap-4 items-start">
    <div class="bg-white rounded-md col-span-3 p-6 body-content w-full">
      <img
        src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
        alt=""
        role="button"
        class="h-[200px] w-full rounded-md object-cover object-center border border-primary"
      />

      <div class="flex justify-between items-center mt-4">
        <div class="flex gap-2">
          <img
            v-for="item in 3"
            :key="item"
            src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
            alt=""
            role="button"
            class="h-[40px] w-[60px] rounded-[4px] object-cover object-center"
          />
        </div>
        <span class="flex gap-2 items-center" role>
          <span class="bg-accent p-2 rounded-md text-primary text-lg">
            <i-icon icon="ph:heart-fill" />
          </span>
          <span class="bg-accent p-2 rounded-md text-primary text-lg">
            <i-icon icon="ic:baseline-share" />
          </span>
        </span>
      </div>

      <div class="mt-4 flex flex-col gap-4">
        <div>
          <span class="text-[13px] block">Brand: Tecno</span>
          <h4 class="font-semibold">iPhone 14 Pro</h4>
          <span class="flex gap-2">
            <span class="text-xs flex gap-1 font-semibold">
              <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
              4.5
            </span>
            <span class="text-xs">Review (1,100)</span>
          </span>
        </div>

        <span>
          <h4 class="font-semibold text-[13px]">Description</h4>
          <p class="text-xs">
            Enjoy the stunning Super Retina XDR display, powerful A15 Bionic chip, and advanced
            dual-camera system,s and storage options.
          </p>
        </span>

        <div>
          <span class="text-[13px] block">Location: Uyo, Akwa Ibom State</span>
          <span class="text-[13px] block font-semibold">Store Name: Bukki Store</span>
          <hr class="my-4">
          <div class="flex justify-between">
            <span class="flex gap-3">
              <button class="brand-btn-md brand-outline">Make an offer</button>
              <button class="brand-btn-md brand-outline">Start a chat</button>
            </span>
            <button class="brand-btn-md brand-primary">Order Now</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-md p-6 lg:w-9/12 md:w-10/12 w-full">
      <h4 class="mb-3 font-semibold">Recommended Phones</h4>
      <div class="grid grid-cols-2 gap-4">
        <wxProductCard v-for="(item, idx) in 5" :key="idx" />
      </div>
      <h4 class="mb-3 font-semibold">Popular Phones</h4>
      <div class="grid grid-cols-2 gap-4">
        <wxProductCard v-for="(item, idx) in 5" :key="idx" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFilterOpen: false
    }
  },

  methods: {
    filterFunc() {
      this.isFilterOpen = !this.isFilterOpen
    }
  }
}
</script>

<style></style>
