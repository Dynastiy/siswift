<template>
  <div class="flex flex-col justify-between">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Forgot Password?</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Please input your used email below</span
      >
    </div>

    <vForm
      @submit="onSubmit"
      v-slot="{ meta }"
      class="mt-20 h-[60vh] flex flex-col justify-between"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label for="">Email</label>
          <vField name="email" v-slot="{ field }" class="input" rules="email">
            <div class="input-field">
              <span class="w-full flex gap-2 items-center">
                <span class="password-iccon">
                  <i-icon icon="mdi:email-check" class="form-icon" />
                </span>
                <input
                  type="email"
                  name="email"
                  class="w-full"
                  id="email"
                  placeholder="Enter Email"
                  v-bind="field"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>
      </div>

      <div class="text-center mt-12">
        <button
          class="brand-btn w-full"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading ? 'bg-gray1 text-gray' : meta.valid ? 'brand-primary' : 'bg-gray1 text-black1'
          ]"
        >
          Get Code
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
      isLoading: false,
      validationErrors: {}
    }
  },

  methods: {
    async onSubmit(values) {
      console.log(values, 'ommmo')
      this.$router.push('/input-code')
      this.isLoading = true
      let payload = {
        email: values.email,
        password: values.password
      }
      this.$auth
        .forgotPassword(payload)
        .then((res) => {
          console.log(res.data, 'from login')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
