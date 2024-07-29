<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto">
    <h4 class="font-semibold">Make Offer</h4>
    <hr class="my-4" />
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
          <span class="block text-[13px] text-primary font-semibold">{{
            item?.offer_price
              ? $currencyFormat(item?.offer_price)
              : $currencyFormat(item?.base_price)
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div>
        <label for="" class="text-[14px]">Quantity</label>
        <input type="text" :disabled="JSON.parse(item?.bulk_price).length === 0 " model="quantity" class="input" placeholder="Enter Offer Amount" />
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
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      item: {},
      ID: this.$route.params.id,
      price: '',
      quantity: 1
    }
  },

  methods: {
    makeOffer() {
      let payload = {
        product_id: this.ID,
        quantity: this.quantity,
        offer_price: this.price
      }
      this.$user.addToCart(payload).then((res) => {
        console.log(res)
        this.startChat()
      })
    },

    startChat(){
      let url = ""
      // this.$router.push(`/app/messages/?user=${this.item?.shop?.user_id}`)
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }
      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        url = `/app/message/m?user=${this.item?.shop?.user_id}&userData=${JSON.stringify(this.item?.shop?.user)}`
      } else {
        console.log('You are using a desktop device')
        url = `/app/messages/?user=${this.item?.shop?.user_id}&userData=${JSON.stringify(this.item?.shop?.user)}`
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
        console.log(val);
        if(val >= this.item.base_price) {
          console.log("Offer Price cannot be higher than or equal to product actual price");
        }
      },
      immediate: true
    }
  },

  beforeMount() {
    this.getProduct()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
