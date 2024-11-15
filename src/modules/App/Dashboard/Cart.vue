<template>
  <div class="lg:page-bg md:page-bg body-content w-full">
    <div class="flex lg:flex-row md:flex-row flex-col gap-3 justify-between items-center">
      <h4 class="font-semibold text-lg">Cart</h4>
      <span
        v-if="items.length > 0 && !loading"
        role="button"
        class="text-[13px] flex gap-1 text-primary items-center"
        @click="$router.push('/app/marketplace')"
      >
        <i-icon icon="la:long-arrow-alt-left" />
        Explore
      </span>
    </div>

    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="flex flex-col gap-4 mt-4">
          <div v-for="item in 4" :key="item">
            <el-skeleton-item variant="image" style="height: 100px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div v-if="!loading && items.length === 0" class="flex justify-center">
          <div class="text-center flex flex-col items-center gap-4">
            <span
              class="bg-accent block h-[200px] w-[200px] text-primary rounded-full flex justify-center items-center"
            >
              <i-icon icon="emojione-monotone:shopping-cart" class="text-[100px]" />
            </span>
            <h5>Your cart is Empty 😥</h5>
            <div>
              <button
                class="brand-btn-md text-sm brand-primary mx-auto w-fit flex gap-1 items-center"
                @click="$router.push('/app/marketplace')"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-col">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="border-b border-gray-200 py-6 last:border-none grid lg:grid-cols-5 md:grid-cols-5 grid-cols-2 gap-4 items-center"
          >
            <div
              class="flex lg:flex-row md:flex-row flex-col gap-4 lg:col-span-3 md:col-span-3 col-span-2"
            >
              <div class="relative">
                <img
                  role="button"
                  @click="$router.push(`/app/product/${item?.id}`)"
                  :src="imgUrl + 'product/' + item?.main_image"
                  alt=""
                  class="w-full h-[100px] w-[100px] object-cover object-top"
                />

                <span
                  v-if="item?.shop?.user?.kv"
                  class="bg-secondary text-white shadow flex text-[12px] items-center rounded-[4px] absolute top-1 right-1 gap-[3px] px-[6px] py-[2px] w-fit"
                >
                  <i-icon icon="mdi:user-tick" />
                  verified
                </span>

                <span
                  v-if="item?.is_featured"
                  class="bg-white flex text-[10px] items-center text-primary rounded-[4px] absolute bottom-1 left-1 gap-[3px] px-[6px] py-[2px] w-fit"
                >
                  <i-icon icon="mdi:fire" />
                  sponsored
                </span>
              </div>
              <span class="tw-h-[250px] flex flex-col gap-2 justify-between">
                <div>
                  <h5 class="font-medium text-md" @click="$router.push(`/app/product/${item?.id}`)" role="button">{{ item.name }}</h5>
                  <span
                    v-if="item?.condition"
                    class="text-[12px] block bg-primary text-white w-fit rounded-sm px-[6px] py-[2px] block"
                  >
                    {{ item?.condition.split('-').join(' ') }}</span
                  >
                </div>

                <span class="flex gap-6 items-center">
                  <span class="text-green-600 text-[13px] flex font-regular items-center gap-1" role="button" @click="goToSeller(item)">
                    <i-icon icon="material-symbols:store-outline" />
                    {{ item.shop.user.firstname + ' ' + item.shop.user.lastname }}
                  </span>
                  <span
                    class="text-red-600 text-[13px] flex font-regular items-center gap-1"
                    role="button"
                    @click="removeFromCart(item)"
                  >
                    <i-icon icon="mingcute:delete-2-line" />
                    Remove
                  </span>
                </span>
              </span>
            </div>
            <div>
              <span class="flex gap-2">
                <button
                  class="p-1 rounded-[5px] text-[12px]"
                  role="button"
                  :class="[
                    item.quantity == 1
                      ? 'text-gray-500 border-gray-300 border'
                      : 'border border-primary text-primary bg-transparent'
                  ]"
                  :disabled="item.track_inventory == 1"
                  @click="quantityFunc('reduce', item)"
                >
                  <i-icon icon="ic:sharp-minus" />
                </button>
                <input
                  type="number"
                  v-model="item.quantity"
                  disabled
                  @keyup="handleChangeQty(item)"
                  class="rounded-lg text-[14px] outline-none text-center w-[30px] font-medium"
                />
                <button
                  class="p-1 rounded-[5px] text-[12px]"
                  :class="[
                     item.quantity >= item.track_inventory
                      ? 'text-gray-500 border-gray-300 border'
                      : 'border border-primary text-primary bg-transparent'
                  ]"
                  role="button"
                  @click="quantityFunc('increase', item)"
                  :disabled=" item.quantity >= item.track_inventory"
                >
                  <i-icon icon="ic:sharp-plus" />
                </button>
              </span>
            </div>

            <div class="text-right">
              <span class="font-semibold text-sm">{{ $currencyFormat(returnTotal(item)) }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>

    <div class="text-center mt-4" v-if="!loading && items.length > 0">
      <button @click="checkOut" class="brand-btn-md brand-primary w-fit">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
// import cartCard from '@/components/UI/cartCard.vue'
export default {
  // components: { cartCard },
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
          console.log('data from products list:', res.data)
          let vreq = res.data.filter((item) => item.status)
          let req = []
          vreq.forEach((item) => {
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

    quantityFunc(value, item) {
      if (value == 'reduce') {
        item.quantity--
        this.updateCart(item)
      } else {
        item.quantity++
        this.updateCart(item)
      }
    },

    // handleChangeQty(item) {
    //   this.updateCart(item)
    // },

    updateCart(item) {
      const payload = {
        quantity: item.quantity,
        offer_price: item.offer_price,
        product_id: item.id,
        _method: 'put'
      }

      console.log(payload)
      this.$user.updateCart({ id: item.cart_id, payload }).then(() => {
        return
      })
    },

    returnTotal(item) {
      let price = item.offer_price
      var amount = price * item.quantity || 1
      return amount
    },

    removeFromCart(e) {
      this.$user.removeFromCart(e.cart_id).then((res) => {
        console.log(res)
        this.getCartItems()
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

    goToSeller(item) {
      let sellerName = item.shop
      let name = `${sellerName?.user.firstname}-${sellerName?.user.lastname}`
      let editedName = name.toLowerCase()
      this.$router.push(`/app/product/${editedName}/seller/${sellerName.user_id}`)
    },

    openProductDetails(e) {
      this.isProductDetails = this.isProductDetails === e ? null : e
    },

    checkOut() {
      this.$router.push('/app/checkout')
    }
  },

  beforeMount() {
    this.getCartItems()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
