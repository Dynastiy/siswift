<template>
  <div class="flex flex-col justify-between">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Input Code</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Please input code sent to your mail</span
      >
    </div>
    <vForm
      @submit="onSubmit"
      v-slot="{ meta }"
      class="mt-20 h-[60vh] flex flex-col justify-between"
    >
      <div class="flex flex-col gap-6">
        <div>
          <vField name="code" v-slot="{ field }" rules="required">
            <div class="flex justify-center w-full gap-6">
              <PinCode
                input-class="w-12 h-12 text-2xl font-semibold rounded-lg text-gray-600 border-2 border-gray-300"
                success-class=""
                spacing-class=""
                :digits="4"
                autofocus
                v-bind="field"
              />
            </div>
          </vField>
          <ErrorMessage name="code" class="text-xs text-error"></ErrorMessage>
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
          class="brand-btn w-full"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading ? 'bg-gray1 text-gray' : meta.valid ? 'brand-primary' : 'bg-gray1 text-black1'
          ]"
        >
          Continue
        </button>
      </div>
    </vForm>
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
      validationErrors: {},
      counting: false
    }
  },

  methods: {
    async onSubmit(values) {
      console.log(values, 'ommmo')
      this.$router.push('/change-password')
    },

    resendToken() {
      if(!this.counting) {
        alert('resend token')
        this.startCountdown()
      }
    },

    startCountdown() {
      this.counting = true
    },

    onCountdownEnd() {
      this.counting = false
    }
  },

  mounted() {
    this.startCountdown()
  }
}
</script>

<style scoped>
.vue-pincode-input-wrapper {
  /* justify-content: space-between !important; */
  width: 100%;
  justify-content: center;
  gap: 30px;
}
</style>
