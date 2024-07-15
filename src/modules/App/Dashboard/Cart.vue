<template>
  <div class="bg-white rounded-md p-6 body-content w-full">
    <div class="">
      <wxProductCard
        :products="items"
        :loading="loading"
        iconType="emojione-monotone:shopping-cart"
        btnText="Explore"
        btnUrl="/app/marketplace"
        emptyText="Your cart is Empty 😥"
        @viewProduct="showProduct"
      />
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
    getCartItems() {
      this.loading = true
      this.$user
        .cartList()
        .then((res) => {
          console.log('data from products list:', res)
          // this.items = res.data.products.data
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
    this.getCartItems()
  }
}
</script>

<style></style>
