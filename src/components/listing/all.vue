<template>
  <div>
    <div class="flex justify-between items-center">
      <h4 class="font-semibold text-lg">My Listings</h4>
      <div class="flex justify-end mb-4 gap-4">
        <button
          class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
          @click="$router.push('/app/product/new')"
        >
          Create Ad
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
          emptyText="You have not listed any ad yet 😥"
          btnUrl="/app/product/new"
          @viewProduct="showProduct"
          helperText="or Create a Store"
          helperURL="/app/store/new"
          :hasHelper="true"
        />
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
// import ProductDetails from '@/modules/App/Dashboard/product/_UUID.vue'
export default {
  // components: { ProductDetails },
  data() {
    return {
      items: [],
      loading: false,
      isProductDetails: null,
      shop: {}
    }
  },

  methods: {
    list() {
      this.loading = true
      this.$user
        .sellerProducts()
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

    getShop() {
      this.$user.showShop().then((res) => {
        // console.log(res)
        this.shop = res[0]
      })
    }
  },

  beforeMount() {
    this.list()
    this.getShop()
  }
}
</script>

<style>
/* input:contenteditable {
  
  } */
</style>
