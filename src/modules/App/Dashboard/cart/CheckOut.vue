<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto">
    <h4 class="font-semibold">Checkout <span class="text-xs">{{`(${items.length} items)`}}</span> </h4>
    <hr class="my-2" />
    <div class="flex flex-col gap-5">
      <div class="flex gap-2" v-for="item in items" :key="item?.id">
        <img
          :src="imgUrl + 'product/' + item?.main_image"
          alt=""
          role="button"
          class="h-[80px] w-[60px] object-contain rounded-lg"
        />
        <div class="flex gap-[4px] flex-col">
          <span
            class="font-semibold block"
            role="button"
            @click="$router.push(`/app/product/${item?.id}`)"
            >{{ item?.name }}</span
          >
          <!-- <span>{{totalAmount}}</span> -->
          <span class="flex gap-1 items-center">
            <span class="block text-sm">{{ $currencyFormat(totalAmount(item)) }}</span>
            <span class="block text-[12px] font-semibold text-primary">x{{ item?.quantity }}</span>
          </span>
        </div>
      </div>
      <hr class="" />
      <div class="flex flex-col gap-1">
          <span class="text-xs flex justify-between">Sub Total: <span class="font-semibold">{{ $currencyFormat(totalPrice) }}</span></span>
          <span class="text-xs flex justify-between">Buyers protection fee: <span class="font-semibold">{{ $currencyFormat(protectionFee) }}</span></span>
          <hr class="my-2">
          <span class="flex justify-between text-sm font-bold">Total: <span class="font-bold">{{ $currencyFormat(overallTotal) }}</span></span>
        <!-- <span>2% transaction fee</span> -->
        
      </div>
    </div>
    <div class="mt-3">
      <select v-model="escrow" name="" id="" class="input">
        <option value="">--Select payment Method--</option>
        <option :value="1">Pay with Wallet</option>
        <option :value="0">Pay Directly</option>
      </select>
    </div>
    <div class="bg-accent p-3 mt-4">
      <p class="text-[13px]">
        For your protection, your payment will be held in a secure account until you've received
        your order and confirm.
      </p>

      <p class="text-[13px] mt-2">
        To confirm it go to cart and click on the menu of the item, then click to view product
        details and confirm it
      </p>
    </div>
    <div class="text-center mt-4">
      <button @click="checkOut" class="brand-btn brand-primary px-[30px] py-[10px]">
        Make Payment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      isProductDetails: null,
      escrow: ''
    }
  },

  methods: {
    getCartItems() {
      this.loading = true
      this.$user
        .cartList()
        .then((res) => {
          console.log('data from products list:', res.data)
          let req = []
          let vreq = res.data.filter((item) => item.status)
          vreq.forEach((item) => {
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

    removeFromCart() {
      this.items.forEach((item) => {
        this.$user.removeFromCart(item.cart_id).then((res) => {
          console.log(res)
        })
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
      let paystack = {
        callback_url: window.location.origin + '/app/success',
        gateway: 'paystack'
      }
      let payload = {
        type: 1,
        address: this.user.address,
        payment: 1,
        escrow: String(this.escrow),
        description: 'Pay for Order',
        ...paystack
      }
      this.$orders.checkOut(payload).then((res) => {
        console.log(res)
        let paymentUrl = res.data.paymentUrl
        console.log(res.data.paymentUrl)
        if (this.escrow) {
          this.$router.push('/app/success')
        } else {
          window.open(paymentUrl, '_parent')
        }
        // this.removeFromCart()
      })
    },

    totalAmount(item) {
      let amount = item?.offer_price
        ? item?.offer_price * item?.quantity
        : item?.base_price * item?.quantity
      return amount
    }
  },

  beforeMount() {
    this.getCartItems()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    totalQty() {
      const cartItem = this.items
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity
      }, 0)
      return totalPrice
    },

    totalPrice() {
      const cartItem = this.items
      const totalPrice = cartItem.reduce((accumulator, item) => {
        if (item.offer_price === null) {
          return accumulator + item.quantity * item.offer_price
        } else {
          return accumulator + item.quantity * item.base_price
        }
      }, 0)
      return totalPrice
    },

    protectionFee(){
      let fee = (2/100) * this.totalPrice
      return fee
    },

    overallTotal() {
      return this.protectionFee + this.totalPrice
    }
  }
}
</script>

<style></style>
