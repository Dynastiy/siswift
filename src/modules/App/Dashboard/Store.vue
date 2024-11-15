<template>
  <div class="body flex lg:flex-row md:flex-row flex-col-reverse gap-6 items-start">
    <div class="body-content w-full">
      <!-- Dashboard -->
      <div>
        <div class="flex justify-between lg:items-center md:items-center items-start mb-6">
          <h4 class="font-semibold text-lg">My Store Ads</h4>
          <div class="flex lg:flex-row md:flex-rol flex-col justify-end gap-4" v-if="shop && shop.status">
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
              helperText="or Create a Store"
              helperURL="/app/store/new"
              :hasHelper="hasHelper"
              @viewProduct="showProduct"
            />
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="shop && shop.status"
      class="lg:w-[400px] md:w-[400px] w-full"
    >
      <div class="bg-white rounded-md filter-container lg:min-h-[80vh] md:min-h-[80vh] h-max">
        <h4 class="font-semibold p-4">{{ `${shop?.name} Store` }}</h4>
        <hr class="" />
        <div class="p-4">
          <img
            :src="imgUrl + 'seller/shop_logo/' + shop?.logo"
            alt=""
            role="button"
            class="h-[200px] w-full rounded-md object-cover object-center border border-primary"
          />
          <!-- {{ shop }} -->
          <div class="">
            <div class="flex flex-col gap-[8px] mt-4">
              <div class="flex justify-between items-start">
                <span class="text-sm flex flex-col">
                  <span class="font-semibold"> Description </span>
                  <span>{{ shop?.meta_description || '---' }}</span>
                </span>
                <span
                @click="$router.push(`/app/store/edit`)"
                  role="button"
                  class="bg-accent p-2 rounded-md whitespace-nowrap block text-primary text-xs font-semibold"
                >
                  Edit
                </span>
              </div>
              <span class="text-sm flex justify-between items-center">
                <span class="font-semibold"> Location: </span>
                <span contenteditable>{{ shop?.address }}</span>
              </span>

              <span class="text-sm flex justify-between items-center">
                <span class="font-semibold"> Phone Number: </span>
                <span>{{ shop?.phone }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- <ProductDetails :productID="isProductDetails" :isMyStore="true" /> -->
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
      shop: null
    }
  },

  methods: {
    list() {
      // console.log(Object.keys(this.shop).length)
      // let ShopStatus = Boolean(this.shop.status)
      if (this.shop && this.shop.status) {
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
      }
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
        console.log(res);
        if(res.length > 0) {
          this.shop = res[0]
        }
        else {
          this.shop = null
        }
      })
    }
  },

  beforeMount() {
    this.list()
    this.getShop()
  },

  watch: {
    shop: {
      handler(val) {
        if(val && val.status) {
          this.list()
        }
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    hasHelper(){
      let val
      if(this.shop && this.shop.status ) {
        val = false
      }
      else {
        val = true
      }
      return val
    }
  }
}
</script>

<style>
/* input:contenteditable {

} */
</style>
