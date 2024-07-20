<template>
  <div class="body lg:page-bg md:page-bg flex gap-4 items-start">
    <div class=" col-span-3 body-content w-full">
      <!-- Dashboard -->

      <div class="flex items-center justify-between">
        <h4 class="mb-3 font-semibold text-lg">Recommended Items</h4>
        <div class="flex justify-end mb-4 gap-4" v-if="!isFilterOpen">
          <!-- <button
            class="brand-btn text-sm brand-primary py-2 px-2 flex gap-1 items-center"
            @click="filterFunc"
          >
            <i-icon icon="mdi:filter" />
            Filter
          </button> -->
          <!-- <button
            class="rounded-[6px] border border-gray-500 text-sm py-2 px-2 flex gap-2 items-center"
          >
            Sort by
            <i-icon icon="fa:angle-down" class="text-[10px]" />
          </button> -->
        </div>
      </div>
      <div>
        <!-- <div>
          {{ items }}
        </div> -->
        <div>
          <!-- class="grid grid-cols-2 gap-4" :class="[isFilterOpen ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-4 md:grid-cols-4' ]"  -->
          <wxProductCard
            :loading="loading"
            :products="items"
            :isFilterOpen="isFilterOpen"
            :hasButton="false"
            iconType="mdi:marketplace-outline"
            emptyText="No product Found, try again 😥"
            @viewProduct="showProduct"
          />
          <!-- mdi:marketplace-outline -->
        </div>
      </div>

      <!-- <div class="mt-4">
        <h4 class="mb-3 font-semibold">Popular Uploads</h4>
        <div class="grid grid-cols-2 gap-4" :class="[isFilterOpen ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-4 md:grid-cols-4' ]">
          <wxProductCard v-for="(item, idx) in 4" :key="idx" />
        </div>
      </div> -->
    </div>

    <div
      class="bg-white rounded-md filter-container min-h-[80vh]"
      :class="[isFilterOpen ? 'w-[400px] p-6' : 'w-0 overflow-x-hidden hidden']"
    >
      <ProductFilter @close="filterFunc" />
    </div>

    <div
      v-if="isProductDetails"
      class="bg-white rounded-md filter-container min-h-[80vh]"
      :class="[isProductDetails ? 'w-[400px]' : 'w-0 overflow-x-hidden hidden']"
    >
      <!-- <ProductFilter @close="filterFunc"/> -->
      <ProductDetails :productID="isProductDetails" />
    </div>
  </div>
</template>

<script>
import ProductFilter from '@/components/filters/ProductFilter.vue'
import ProductDetails from '@/modules/App/Dashboard/product/_UUID.vue'
export default {
  components: { ProductFilter, ProductDetails },
  data() {
    return {
      isFilterOpen: false,
      isProductDetails: null,
      items: [],
      loading: false
    }
  },

  methods: {
    filterFunc() {
      this.isFilterOpen = !this.isFilterOpen
    },

    showProduct(e) {
      console.log(e)
      // function isMobileDevice() {
      //   return window.matchMedia('(max-width: 767px)').matches
      // }

      // if (isMobileDevice()) {
      //   console.log('You are using a mobile device')
        this.$router.push(`/app/product/${e?.id}`)
      // } else {
      //   console.log('You are using a desktop device')
      //   this.openProductDetails(e.id)
      // }
    },

    openProductDetails(e) {
      this.isProductDetails = this.isProductDetails === e ? null : e
    },

    getProducts() {
      this.loading = true
      this.$products
        .list()
        .then((res) => {
          console.log('data from products list:', res)
          this.items = res.data.products.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  beforeMount() {
    this.getProducts()
  }
}
</script>

<style></style>
