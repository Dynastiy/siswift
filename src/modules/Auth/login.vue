<template>
  <div class="">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Login</h3>
      <span class="text-xs block font-medium text-gray2"
        >Enter your correct details to log into your warehauze account</span
      >
    </div>
    <div>
      <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
        item
      }}</span>
    </div>
    <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2 mt-4">
      <div>
        <label for="">Email</label>
        <vField name="email" class="input" placeholder="Email" type="email" rules="email" />
        <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
      </div>

      <div>
        <label for="">Password</label>
        <vField name="password" v-slot="{ field }" rules="required">
          <div class="input-field">
            <input
              :type="typePassword ? 'password' : 'text'"
              name="password"
              id="password"
              placeholder="Password"
              v-bind="field"
            />
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

      <div class="text-right">
        <router-link class="text-[12px] font-semibold text-secondary" to="/forgot-password"
          >Forgot Password?</router-link
        >
      </div>

      <div class="text-center mt-3">
        <button
          class="brand-btn w-full"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading
              ? 'bg-gray400 text-gray600'
              : meta.valid
                ? 'brand-primary'
                : 'bg-gray400 text-gray600'
          ]"
        >
          Log In
        </button>
      </div>
      <div class="mt-3">
        <span class="flex justify-center gap-1 text-[12px]">
          <span class="font-medium">Don't have an account?</span>
          <router-link class="font-semibold text-secondary" to="/register"
            >Create Account</router-link
          >
        </span>
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
      try {
        let res = await this.$request.post(`auth/signin`, values)
        console.log(res.data)
        let userData = res.data
        let token = res.data.token
        this.$store.commit('auth/login', {
          token,
          user: userData.user
        })
        this.$toastify({
          text: `Welcome back, ${userData.user.first_name}`,
          gravity: 'top',
          position: 'center',
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#333'
          }
        }).showToast()
        console.log(userData, 'ommmo')
        const route = this.$route.query.redirectFrom
        console.log(route)
        if (route) {
          this.$router.push(route).catch(() => {})
        } else {
          if (userData.user.role === 'buyer') {
            this.$router.push('/user').catch(() => {})
          } else {
            this.$router.push('/vendor/dashboard').catch(() => {})
          }
        }
      } catch (error) {
        console.log(error)
        this.$toastify({
          text: `User not logged in`,
          gravity: 'top',
          position: 'center',
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: 'red'
          }
        }).showToast()
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
