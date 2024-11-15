<template>
  <div class="flex flex-col justify-between">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Change password</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Now let’s get you a new password</span
      >
    </div>
    <!-- <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div> -->
    <vForm
      @submit="onSubmit"
      v-slot="{ meta }"
      class="mt-20 h-[60vh] flex flex-col justify-between"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label for="">Password</label>
          <vField name="password" v-slot="{ field }" rules="required">
            <div class="input-field">
              <span class="w-full flex gap-2 items-center">
                <span class="password-iccon">
                  <i-icon icon="solar:lock-bold" class="form-icon" />
                </span>
                <input
                  :type="typePassword ? 'password' : 'text'"
                  name="password"
                  class="w-full"
                  id="password"
                  placeholder="Password"
                  v-bind="field"
                />
              </span>
              <span class="password-iccon" role="button" @click="typePassword = !typePassword">
                <i-icon
                  :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                  class="form-icon"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="password" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Confirm Password</label>
          <vField name="confirm_password" v-slot="{ field }" rules="required|confirmed:@password">
            <div class="input-field">
              <span class="w-full flex gap-2 items-center">
                <span class="password-iccon">
                  <i-icon icon="solar:lock-bold" class="form-icon" />
                </span>
                <input
                  :type="typePassword2 ? 'password' : 'text'"
                  name="confirm_password"
                  class="w-full"
                  id="password2"
                  placeholder="Confirm Password"
                  v-bind="field"
                />
              </span>
              <span class="password-iccon" role="button" @click="typePassword2 = !typePassword2">
                <i-icon
                  :icon="typePassword2 ? 'tabler:eye' : 'gridicons:not-visible'"
                  class="form-icon"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="confirm_password" class="text-xs text-error"></ErrorMessage>
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
          Continue
        </button>
        <!-- <div class="mt-3">
          <span class="flex justify-center gap-1 text-[14.5px]">
            <router-link class="font-regular text-primary" to="/login"
              >we'll do that later</router-link
            >
          </span>
        </div> -->
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
      validationErrors: {}
    }
  },

  methods: {
    async onSubmit(values) {
      console.log(values, 'ommmo')
      let email = this.$route.query.email
      let token = this.$route.query.code
      let payload = {
        token: token,
        password: values.password,
        password_confirmation:values.confirm_password
      }
      let formData = {
        email: email
      }
      this.$auth.resetPassword(payload, formData).then((res) => {
        console.log(res)
        this.$router.push('/login')
      })
    }
  }
}
</script>
