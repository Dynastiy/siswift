<template>
  <div class="">
    <div>
      <div
        class="bg-secondary lg:w-16 lg:h-16 md:w-16 md:h-16 h-28 w-28 p-3 mx-auto rounded-full"
      >
        <img src="@/assets/img/login.svg" alt="" />
      </div>
      <div class="text-center mb-3">
        <h3 class="text-2xl font-bold">Forgot Password?</h3>
        <span class="text-xs block"
          >Enter the email you used to create your account so we can send you instructions on how to
          reset your password.</span
        >
      </div>
      <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2 mt-6">
        <div>
          <label for="">Email</label>
          <vField name="email" class="input" placeholder="Email" type="email" rules="email" />
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>

        <div class="text-center mt-3">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid"
            :class="[isLoading ? 'bg-gray-400 text-gray-600' : meta.valid ? 'brand-primary' : 'bg-gray-400 text-gray-600']"
          >
            Send Link
          </button>
        </div>
        <div>
          <span class="flex justify-center gap-1 text-[13px]">
            <router-link class="font-semibold text-secondary" to="/register"
              >Back to Login</router-link
            >
          </span>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
        isLoading: false,
      error: "",
    }
  },

  methods: {
    onSubmit(values) {
      this.isLoading = true
      this.$auth.forgotPasswordRequestLink(values)
      .then(()=> {
        this.$router.push('/auth/reset-link-sent')
      })
      .finally(()=> {
        this.isLoading = false
      })
    },
  },

  mounted() {
  },

  computed: {
    
  }
}
</script>
