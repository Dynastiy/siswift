<template>
  <div class="">
    <div>
      <div class="w-12 rounded-full">
        <img src="@/assets/img/logo.svg" alt="" />
      </div>
      <div class="my-4">
        <h3 class="lg:text-3xl md:text-3xl text-2xl font-bold">Verify Email</h3>
        <span class="text-xs block">Enter OTP sent to your email to verify email</span>
      </div>
      <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div>
      <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2">
        <div>
          <label for="">OTP</label>
          <vField
            name="token"
            class="input"
            placeholder="Enter OTP"
            type="text"
            rules="required"
          />
          <ErrorMessage name="token" class="text-xs text-error"></ErrorMessage>
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
            Verify
          </button>
        </div>
      </vForm>

      <div class="text-center mt-4">
        <button type="button" class="" :disabled="counting" @click="sendVerifyToken">
          <vue-countdown
            v-if="counting"
            :time="120000"
            @end="onCountdownEnd"
            v-slot="{ minutes, seconds, totalSeconds}"
            >
            <span class="font-medium text-[13.6px]" :class="{ 'text-red-600': totalSeconds <= 10 }">
              Resend OTP in {{ "0"+minutes }}:{{ seconds < 10 ? `0${seconds}` : seconds }}
            </span>
            </vue-countdown
          >
          <span class="bg-primary text-white px-3 py-1 rounded-md font-medium text-[13.6px]" v-else>Resend Token</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { Form, Field, ErrorMessage } from 'vee-validate'
// import { mapState } from 'vuex'
export default {
  components: {
    // Form,
    // Field,
    // ErrorMessage
  },

  data() {
    return {
      typePassword: true,
      counting: false,
      isLoading: false,
      validationErrors: {}
    }
  },

  methods: {
    onSubmit(values) {
      this.isLoading = true
      let payload = {
        userId: this.userId,
        otp: values.token
      }
      this.$request
        .post(`/auth/sendotp`, payload)
        .then((res) => {
          this.$toastify({
            text: `Email Verification Complete`,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              fontSize: '13px',
              borderRadius: '4px',
              background: '#333'
            }
          }).showToast()
          this.$router.push('/login')
          this.isLoading = false
          return res
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
          this.$toastify({
            text: `${err.data.message}`,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              fontSize: '13px',
              borderRadius: '4px',
              background: 'red'
            }
          }).showToast()
        })
    },

    startCountdown() {
      this.counting = true
    },

    sendVerifyToken() {
      let payload = {
        userId: this.userId,
        email: this.email
      }
      this.$request
        .post(`auth/resendotp`, payload)
        .then((res) => {
          this.startCountdown()
          this.$toastify({
            text: `OTP resend successful`,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              fontSize: '13px',
              borderRadius: '4px',
              background: '#333'
            }
          }).showToast()
          return res
        })
        .catch((err) => {
          console.log(err)
          this.$toastify({
            text: `${err.data.message}`,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              fontSize: '13px',
              borderRadius: '4px',
              background: 'red'
            }
          }).showToast()
        })
    },

    onCountdownEnd() {
      this.counting = false
    }
  },

  mounted() {
    // this.$store.commit('auth/REMOVE_ERRORS')
    this.startCountdown()
  },

  computed: {
    email() {
      return this.$route.query.email
    },
    userId(){
      return this.$route.query.userId
    }
  }
}
</script>
