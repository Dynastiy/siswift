<template>
    <div class="">
      <div class="">
        <wxProductCard
          :products="items"
          :loading="loading"
          iconType="emojione-monotone:shopping-cart"
          btnText="Explore"
          btnUrl="/app/marketplace"
          emptyText="No items in your favourite yet 😥"
          @viewProduct="showProduct"
          @removeFromCart="removeFromCart"
          :isCart="true"
          @checkOut="checkOut"
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
      getWishlist() {
        this.loading = true
        this.$user
          .wishList()
          .then((res) => {
            console.log('data from products list:', res)
            let req = []
            res.wishlist.forEach((item) => {
              console.log(item)
              let dataInfo = {
                ...item.product,
                cart_id: item.id,
                offer_price: item.offer_price,
                quantity: item.quantity,
                session_id: item.session_id,
                status: item.status
              }
              req.push(dataInfo)
            })
            this.items = req
          })
          .finally(() => {
            this.loading = false
          })
      },
  
      removeFromCart(e) {
        this.$user.removeFromWishlist(e.cart_id).then((res) => {
          console.log(res)
          this.getWishlist()
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
  
      checkOut() {
        this.$router.push('/app/checkout')
      }
    },
  
    beforeMount() {
      this.getWishlist()
    },
  
    computed: {
      user() {
        return this.$store.getters['auth/getUser']
      }
    }
  }
  </script>
  
  <style></style>
  