<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto">
    <h4 class="font-semibold">Make Offer</h4>
    <hr class="my-4" />
    <span v-if="loading"> Retrieving Product Details </span>
    <div v-else>
      <div class="mb-3">
        <div class="flex gap-2">
          <img
            :src="imgUrl + 'product/' + item?.main_image"
            alt=""
            role="button"
            class="h-[60px] w-[65px] object-contain rounded-lg"
          />
          <div class="flex gap-[4px] flex-col">
            <span class="font-semibold block">{{ item?.name }}</span>
            <span :class="['block text-[13px] text-primary font-semibold', price ? 'line-through' : '']">{{
              `Actual Price: ${$currencyFormat(item?.base_price * quantity)}`
            }}</span>
            <span class="block text-[13px] text-primary font-semibold">{{
              `Your Offer: ${$currencyFormat(price * quantity)}`
            }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div>
          <label for="" class="text-[14px]">Quantity</label>
          <input
            type="text"
            :disabled="item?.track_inventory <= 1"
            v-model="quantity"
            class="input"
            placeholder="Enter Quantity"
          />
        </div>
        <div>
          <label for="" class="text-[14px]">Amount</label>
          <input type="tel" v-model="price" class="input" placeholder="Enter Offer Amount" />
        </div>
      </div>
      <div class="text-center mt-6">
        <button @click="makeOffer" class="brand-btn brand-primary px-[30px] py-[10px]">
          Make Offer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      item: {},
      ID: this.$route.params.id,
      price: "",
      quantity: 1
    }
  },

  methods: {
    makeOffer() {
      let payload = {
        product_id: this.ID,
        quantity: this.quantity,
        offer_price: this.price || this.item.base_price
      }
      this.$user.addToCart(payload).then((res) => {
        console.log(res.data.messages.conversation_id)
        let chatId = res.data.messages.conversation_id
        this.startChat(chatId)
      })
    },

    startChat(e) {
      let url = ''
      // this.$router.push(`/app/messages/?user=${this.item?.shop?.user_id}`)
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }
      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        url = `/app/message/m?chatId=${e}`
      } else {
        console.log('You are using a desktop device')
        url = `/app/messages/?chatId=${e}`
      }
      this.$router.push(url)
    },

    getProduct() {
      this.loading = true
      this.$products
        .getRecord(this.ID)
        .then((res) => {
          console.log('data from products list:', res)
          this.item = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  watch: {
    price: {
      handler(val) {
        if (Number(val) > +Number(this.item.base_price)) {
          this.$toast.error('Offer Price cannot be higher than or equal to product actual price', {
            timeout: 4000
          })
          this.price = Number(this.item.base_price) - 1
        }
      },
      immediate: true
    },

    quantity: {
      handler(val) {
        if (val > this.item.track_inventory) {
          // alert('Quantity cannot be above quantity available')
          this.$toast.error('Quantity cannot be above quantity available', {
            timeout: 4000
          })
          this.quantity = 1
        }
      },
      immediate: false
    },

  },

  beforeMount() {
    this.getProduct()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isDisabled() {
      return JSON.parse(this.item?.bulk_price).length === 0
    }
  }
}
</script>

<style></style>
