<template>
  <div class="body flex gap-4 items-start">
    <div
      class="bg-white rounded-md col-span-3 p-6 body-content w-full"
    >
      <!-- Dashboard -->
      <div class="flex justify-end mb-4 gap-4" v-if="!isFilterOpen">
        <button
          class="brand-btn text-sm brand-primary py-2 px-2 flex gap-1 items-center"
          @click="filterFunc"
        >
          <i-icon icon="mdi:filter" />
          Filter
        </button>
        <button
          class="rounded-[6px] border border-gray-500 text-sm py-2 px-2 flex gap-2 items-center"
        >
          Sort by
          <i-icon icon="fa:angle-down" class="text-[10px]" />
        </button>
      </div>
      <div>
        <h4 class="mb-3 font-semibold">Recommended Phones</h4>
        <div class="grid grid-cols-2 gap-4" :class="[isFilterOpen ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-4 md:grid-cols-4' ]">
          <wxProductCard v-for="(item, idx) in 4" :key="idx" />
        </div>
      </div>

      <div class="mt-4">
        <h4 class="mb-3 font-semibold">Popular Uploads</h4>
        <div class="grid grid-cols-2 gap-4" :class="[isFilterOpen ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-4 md:grid-cols-4' ]">
          <wxProductCard v-for="(item, idx) in 4" :key="idx" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-md filter-container min-h-[80vh]" :class="[ isFilterOpen ? 'w-[400px] p-6' : 'w-0 overflow-x-hidden hidden'  ]">
      <ProductFilter @close="filterFunc"/>
    </div>
  </div>
</template>

<script>
import ProductFilter from '@/components/filters/ProductFilter.vue'
export default {
  components: { ProductFilter },
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
