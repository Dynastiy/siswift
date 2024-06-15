<template>
  <div class="bg-white rounded-md p-6 body-content w-full">
    <!-- Dashboard -->
    <!-- <div class="flex justify-end mb-4 gap-4">
      <button class="brand-btn-md text-sm brand-primary flex gap-1 items-center" @click="$router.push('/app/product/new')">
        Add Product
      </button>
    </div> -->
    <div>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4"
      >
        <wxProductCard v-for="(item, idx) in 16" :key="idx" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {}
}
</script>

<style></style>
