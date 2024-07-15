<template>
  <div class="flex flex-col justify-between">
    <div class="mb-5">
      <img
        src="@/assets/BrandLogos/logo.png"
        class="lg:w-36 md:w-36 w-36"
        alt="Siswift logo"
        @click="$router.push('/app/marketplace')"
        role="button"
      />
    </div>
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Hello, Welcome</h3>
      <span class="text-[15px] block font-regular text-gray2">Let's Explore the Phoneverse</span>
    </div>

    <div>
      <vForm
        class="mt-20 h-[60vh] flex flex-col justify-between"
        @submit="nextStep"
        :validation-schema="currentSchema"
        keep-values
        v-slot="{ meta }"
      >
        <template v-if="currentStep === 0">
          <div class="flex flex-col gap-6">
            <div>
              <vField name="name" v-slot="{ field }" class="input">
                <div class="input-field">
                  <span class="w-full flex gap-2 items-center">
                    <span class="password-iccon">
                      <i-icon icon="mdi:user" class="form-icon" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      class="w-full"
                      id="name"
                      placeholder="Jone Doe"
                      v-bind="field"
                    />
                  </span>
                </div>
              </vField>
              <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="email" v-slot="{ field }" class="input">
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
                      placeholder="john@xxx.com"
                      v-bind="field"
                    />
                  </span>
                </div>
              </vField>
              <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="address" v-slot="{ field }" class="input">
                <div class="input-field">
                  <span class="w-full flex gap-2 items-center">
                    <span class="password-iccon">
                      <i-icon icon="iconamoon:location-pin-fill" class="form-icon" />
                    </span>
                    <input
                      type="text"
                      name="address"
                      class="w-full"
                      id="address"
                      placeholder="Enter Address"
                      v-bind="field"
                    />
                  </span>
                </div>
              </vField>
              <ErrorMessage name="address" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="phone" v-slot="{ field }" class="input">
                <div class="input-field">
                  <span class="w-full flex gap-2 items-center">
                    <span class="password-iccon">
                      <i-icon icon="wpf:phone" class="form-icon" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      class="w-full"
                      id="phone"
                      placeholder="08012345678"
                      v-bind="field"
                    />
                  </span>
                </div>
              </vField>
              <ErrorMessage name="phone" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="flex flex-col gap-6">
            <div>
              <vField name="password" v-slot="{ field }">
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
              <vField name="confirmPassword" v-slot="{ field }">
                <div class="input-field">
                  <span class="w-full flex gap-2 items-center">
                    <span class="password-iccon">
                      <i-icon icon="solar:lock-bold" class="form-icon" />
                    </span>
                    <input
                      :type="typePassword2 ? 'password' : 'text'"
                      name="confirmPassword"
                      class="w-full"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      v-bind="field"
                    />
                  </span>
                  <span
                    class="password-iccon"
                    role="button"
                    @click="typePassword2 = !typePassword2"
                  >
                    <i-icon
                      :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                      class="form-icon"
                    />
                  </span>
                </div>
              </vField>
              <ErrorMessage name="confirmPassword" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>
        </template>

        <div class="flex flex-col gap-4 mt-7">
          <div class="flex justify-center gap-2">
            <span
              class="block h-[8px] bg-secondary rounded-full"
              :class="[currentStep === 0 ? 'w-[25px]' : 'w-[8px]']"
              @click="prevStep"
              role="button"
            >
            </span>
            <span
              class="block h-[8px] bg-secondary rounded-full"
              :class="[currentStep === 1 ? 'w-[25px]' : 'w-[8px]']"
            ></span>
          </div>
          <button
            class="brand-btn w-full"
            v-if="currentStep !== 1"
            type="submit"
            :disabled="!meta.valid"
            :class="[meta.valid ? 'brand-primary bg-primary' : 'bg-gray1 text-black1']"
          >
            Next
          </button>
          <button
            :disabled="isLoading || !meta.valid"
            :class="[
              isLoading
                ? 'bg-gray1 text-gray'
                : meta.valid
                  ? 'brand-primary bg-primary'
                  : 'bg-gray1 text-black1'
            ]"
            class="brand-btn w-full flex justify-center items-center gap-2"
            v-if="currentStep === 1"
            type="submit"
          >
          <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
            Register
          </button>
          <div class="mt-3">
            <span class="flex justify-center gap-1 text-[14.5px]">
              <span class="font-medium text-gray2">Already have an account?</span>
              <router-link class="font-semibold text-primary" to="/login">Login</router-link>
            </span>
          </div>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
export default {
  components: {},
  data() {
    return {
      typePassword: true,
      typePassword2: true,
      isLoading: false,
      validationErrors: {},
      currentStep: 0,
      schemas: [
        yup.object({
          name: yup.string().required(),
          email: yup.string().required().email(),
          address: yup.string().required(),
          phone: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric')
        }),
        yup.object({
          password: yup.string().required().min(8),
          confirmPassword: yup
            .string()
            .required()
            .min(8)
            .oneOf([yup.ref('password')], 'Passwords must match')
        })
        // yup.object({
        //   address: yup.string().required(),
        //   postalCode: yup
        //     .string()
        //     .required()
        //     .matches(/^[0-9]+$/, 'Must be numeric')
        // }),
        // yup.object({
        //   terms: yup.bool().required().equals([true])
        // })
      ]
    }
  },

  methods: {
    async onSubmit(values) {
      console.log(values, 'ommmo')
      //   this.isLoading = true
      //   try {
      //     let res = await this.$request.post(`auth/signin`, values)
      //     console.log(res.data)
      //     let userData = res.data
      //     let token = res.data.token
      //     this.$store.commit('auth/login', {
      //       token,
      //       user: userData.user
      //     })
      //     this.$toastify({
      //       text: `Welcome back, ${userData.user.first_name}`,
      //       gravity: 'top',
      //       position: 'center',
      //       style: {
      //         fontSize: '13px',
      //         borderRadius: '4px',
      //         background: '#333'
      //       }
      //     }).showToast()
      //     console.log(userData, 'ommmo')
      //     const route = this.$route.query.redirectFrom
      //     console.log(route)
      //     if (route) {
      //       this.$router.push(route).catch(() => {})
      //     } else {
      //       if (userData.user.role === 'buyer') {
      //         this.$router.push('/user').catch(() => {})
      //       } else {
      //         this.$router.push('/vendor/dashboard').catch(() => {})
      //       }
      //     }
      //   } catch (error) {
      //     console.log(error)
      //     this.$toastify({
      //       text: `User not logged in`,
      //       gravity: 'top',
      //       position: 'center',
      //       style: {
      //         fontSize: '13px',
      //         borderRadius: '4px',
      //         background: 'red'
      //       }
      //     }).showToast()
      //   } finally {
      //     this.isLoading = false
      //   }
    },

    nextStep(values) {
      if (this.currentStep === 1) {
        this.isLoading = true
        const formdata = new FormData()
        formdata.append('fullname', values.name)
        formdata.append('email', values.email)
        formdata.append('mobile', values.phone)
        formdata.append('password', values.password)
        formdata.append('password_confirmation', values.confirmPassword)
        formdata.append('address', values.address)

        this.$auth.createAccount(formdata).then((res) => {
          console.log('register res:', res)
          this.$router.push('/login')
        })
        .finally(()=> {
          this.isLoading = false
        })

        return
      }
      this.currentStep++
    },

    prevStep() {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
    }
  },

  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    }
  }
}
</script>
