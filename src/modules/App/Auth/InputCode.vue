<!-- darrian.konstantinos@dockstones.com -->

<template>
  <div class="flex flex-col justify-between">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Input Code</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Please input code sent to your mail</span
      >
    </div>
    <div class="mt-20 h-[60vh] flex flex-col justify-between">
      <div class="flex flex-col gap-6">
        <div>
          <div class="flex justify-center w-full">
            <PinCode
              input-class="lg:w-12 md:w-12 w-[40px] lg:h-12 md:h-12 h-[40px] text-2xl font-semibold rounded-lg text-gray-600 border-2 border-gray-300"
              success-class=""
              spacing-class=""
              :digits="6"
              autofocus
              v-model="code"
            />
          </div>
        </div>

        <vue-countdown :time="60000" @end="onCountdownEnd" v-slot="{ seconds, totalSeconds }">
          <span class="flex gap-1 justify-center text-sm">
            <span
              :disabled="counting"
              :role="counting ? '' : 'button'"
              @click="resendToken"
              class="font-regular"
              :class="[counting ? 'text-gray-400' : 'text-primary']"
              >Resend Token</span
            >
            <span
              class="font-medium"
              :class="[
                totalSeconds < 10 && totalSeconds > 0
                  ? 'text-red-600'
                  : counting
                    ? 'text-primary'
                    : 'text-gray-400'
              ]"
            >
              {{ seconds < 10 ? `(0${seconds}s)` : `(${seconds}s)` }}
            </span>
          </span>
        </vue-countdown>
      </div>

      <div class="text-center mt-12">
        <button
          @click="onSubmit"
          class="brand-btn w-full"
          :disabled="isLoading"
          :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isLoading: false,
      validationErrors: {},
      counting: false,
      code: ''
    }
  },

  methods: {
    async onSubmit() {
      let email = this.$route.query.email
      let payload = {
        email: email
        // email_verified_code: this.code
      }
      this.$auth.verifyResetCode(payload, this.code).then((res) => {
        console.log(res)
        this.$router.push(`/change-password?email=${res.data.email}&code=${res.data.token}`)
      })
    },

    getCode() {
      let payload = {
        email: this.$route.query.email
      }
      this.$auth
        .forgotPassword(payload)
        .then((res) => {
          this.startCountdown()
          return res
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    resendToken() {
      if (!this.counting) {
        this.getCode()
      }
    },

    startCountdown() {
      this.counting = true
    },

    onCountdownEnd() {
      this.counting = false
    }
  },

  mounted() {},

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style scoped>
.vue-pincode-input-wrapper {
  /* justify-content: space-between !important; */
  width: 100%;
  justify-content: center;
  /* gap: 30px; */
}
</style>
