<template>
  <div class="flex flex-col justify-between">
    <div class="mb-5">
      <img
        src="@/assets/BrandLogos/logo.png"
        class="lg:w-28 md:w-28 w-24"
        alt="Siswift logo"
        role="button"
      />
    </div>
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Welcome back</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Let's continue writing your love story</span
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
          <label for="">Email</label>
          <vField name="email" v-slot="{ field }" class="input" type="email" rules="email">
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

        <div class="flex justify-end">
          <!-- <vField name="checked">
            <span class="flex gap-1 items-center">
              <input type="checkbox" class="accent-primary border-transparent" name="" id="" />
              <label for="" class="mb-0">Remember Me</label>
            </span>
          </vField> -->
          <router-link class="text-[13px] font-semibold text-primary" to="/forgot-password"
            >Forgot Password?</router-link
          >
        </div>
      </div>

      <div class="text-center mt-12">
        <button
          class="brand-btn w-full flex justify-center items-center gap-2"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading ? 'bg-gray1 text-gray' : meta.valid ? 'brand-primary' : 'bg-gray1 text-black1'
          ]"
        >
          <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
          <span v-else> Login </span>
        </button>
        <div class="mt-3">
          <span class="flex justify-center gap-1 text-[14.5px]">
            <span class="font-medium text-gray2">Don't have an account?</span>
            <router-link class="font-semibold text-primary" to="/register">Sign Up</router-link>
          </span>
        </div>
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
      this.isLoading = true
      let payload = {
        email: values.email,
        password: values.password
      }
      this.$auth
        .login(payload)
        .then((res) => {
          console.log(res.data, 'from login')
          let userData = res.data
          this.$store.commit('auth/login', {
            token: userData.access_token,
            user: userData.user
          })
          localStorage.setItem('_user_token', userData.access_token)
          let redirectFrom = this.$route.query.redirect
          let urlTo = redirectFrom ? redirectFrom : '/app/marketplace'
          this.$router.push(urlTo)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
