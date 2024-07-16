<template>
  <div class="body flex gap-4 items-start">
    <div class="bg-white rounded-md p-6 body-content w-full">
      <!-- Dashboard -->
      <div>
        <div class="flex justify-between items-center">
          <h4 class="font-semibold text-lg">My Store</h4>
          <div class="flex justify-end mb-4 gap-4">
            <button
              class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
              @click="$router.push('/app/product/new')"
            >
              Create Ad
            </button>
            <button
              class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
              @click="$router.push('/app/my-store/analysis')"
            >
              Store Analysis
            </button>
          </div>
        </div>
        <div>
          <div>
            <wxProductCard
              :products="items"
              :loading="loading"
              iconType="bx:store"
              btnText="Create Product"
              emptyText="Your store is Empty 😥"
              btnUrl="/app/product/new"
              @viewProduct="showProduct"
            />
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isProductDetails"
      class="bg-white rounded-md filter-container min-h-[80vh]"
      :class="[isProductDetails ? 'w-[400px]' : 'w-0 overflow-x-hidden hidden']"
    >
      <!-- <ProductFilter @close="filterFunc"/> -->
      <ProductDetails :productID="isProductDetails" :isMyStore="true" />
    </div>
  </div>
</template>

<script>
import ProductDetails from '@/modules/App/Dashboard/product/_UUID.vue'
export default {
  components: { ProductDetails },
  data() {
    return {
      items: [],
      loading: false,
      isProductDetails: null
    }
  },

  methods: {
    list() {
      this.loading = true
      this.$user
        .list()
        .then((res) => {
          console.log('data from products list:', res)
          this.items = res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    showProduct(e) {
      console.log(e)
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }

      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        this.$router.push(`/app/product/${e?.id}`)
      } else {
        console.log('You are using a desktop device')
        this.openProductDetails(e.id)
      }
    },

    openProductDetails(e) {
      this.isProductDetails = this.isProductDetails === e ? null : e
    }
  },

  beforeMount() {
    this.list()
  }
}
</script>

<style></style>
