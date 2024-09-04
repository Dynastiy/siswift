<template>
  <div>
    <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <div class="">
        <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Make Deposit</h3>
        <span class="text-[15px] block font-regular text-gray2"
          >Enter Amount to be funded to your wallet</span
        >
      </div>
      <!-- <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div> -->
      <vForm @submit="onSubmit" v-slot="{ meta }" class="mt-8">
        <div class="flex flex-col gap-4">
          <div>
            <label for="">Amount</label>
            <vField name="amount" v-slot="{ field }" rules="required|integer">
              <input
                type="tel"
                name="amount"
                class="w-full input"
                id="input"
                placeholder="300000"
                v-bind="field"
                
              />
            </vField>
            <ErrorMessage name="amount" class="text-xs text-error"></ErrorMessage>
          </div>
        </div>

        <div class="text-center mt-8">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid"
            :class="[
              isLoading
                ? 'bg-gray1 text-gray'
                : meta.valid
                  ? 'brand-primary'
                  : 'bg-gray1 text-black1'
            ]"
          >
            Continue
          </button>
          <div class="mt-3"></div>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      typePassword: true,
      typePassword2: true,
      isLoading: false,
      validationErrors: {}
    }
  },

  methods: {
    async onSubmit(values) {
      // Define your callback URL
      

      let payload = {
        ...values,
        currency: 'NGN',
        method_code: 109,
        gateway: 'paystack',
        callback_url: window.location.origin + '/app/success',
        description: 'Fund main wallet'
      }
      this.$user.fundWallet(payload).then((res) => {
        let paymentUrl = res.data.paymentUrl
        console.log(res.data.paymentUrl)
        window.open(paymentUrl, '_parent');
        // this.$router.push(res.paymentUrl)
        // window.location.href = res.paymentUrl
      })
    },

    getUser() {
      this.$auth.getProfile().then((res) => {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    }
  },

  mounted() {
    console.log(window.location)
  }
}
</script>
