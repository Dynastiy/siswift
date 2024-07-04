<template>
  <div class="flex flex-col justify-between">
    <div>
      <vForm
        class="flex flex-col"
        @submit="nextStep"
        :validation-schema="currentSchema"
        keep-values
        v-slot="{ meta }"
      >
        <template v-if="currentStep === 0">
          <div class="flex flex-col gap-2">
            <div>
              <vField name="name" v-slot="{ field }" class="input">
                <label for="">Shop Name</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="name"
                    class="w-full"
                    id="name"
                    placeholder="Enter shop name"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="phone" v-slot="{ field }" class="input">
                <label for="">Phone Number</label>
                <div class="input-field">
                  <input
                    type="tel"
                    name="phone"
                    class="w-full"
                    id="name"
                    placeholder="Enter Phone Number"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="phone" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="description" v-slot="{ field }" class="input">
                <label for="">Store Description</label>
                <div class="input-field">
                  <textarea
                    name="description"
                    class="w-full bg-transparent py-2"
                    id="description"
                    placeholder="Enter Store Description"
                    v-bind="field"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </vField>
              <ErrorMessage name="description" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="country" v-slot="{ field }" class="input">
                <label for="">Country</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="country"
                    class="w-full"
                    id="name"
                    placeholder="Enter Country"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="country" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="state" v-slot="{ field }" class="input">
                <label for="">State</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="state"
                    class="w-full"
                    id="name"
                    placeholder="Enter State"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="state" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="flex flex-col gap-2">
            <div>
              <vField name="product_name" v-slot="{ field }" class="input">
                <label for="">Product Name</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="product_name"
                    class="w-full"
                    id="name"
                    placeholder="Enter Product Name"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="product_name" class="text-xs text-error"></ErrorMessage>
            </div>

            <div>
              <vField name="location" v-slot="{ field }" class="input">
                <label for="">Location</label>
                <div class="input-field">
                  <input
                    type="text"
                    name="location"
                    class="w-full"
                    id="name"
                    placeholder="Enter Location"
                    v-bind="field"
                  />
                </div>
              </vField>
              <ErrorMessage name="location" class="text-xs text-error"></ErrorMessage>
            </div>

            <div class="flex gap-3">
              <div>
                <vField name="product_price" v-slot="{ field }" class="input">
                  <label for="">Product Price</label>
                  <div class="input-field">
                    <input
                      type="tel"
                      name="product_price"
                      class="w-full"
                      id="name"
                      placeholder="Enter Product Price"
                      v-bind="field"
                    />
                  </div>
                </vField>
                <ErrorMessage name="product_price" class="text-xs text-error"></ErrorMessage>
              </div>
              <div>
                <vField name="product_brand" v-slot="{ field }" class="input">
                  <label for="">Product Brand</label>
                  <div class="input-field">
                    <input
                      type="text"
                      name="product_brand"
                      class="w-full"
                      id="name"
                      placeholder="Enter Product Brand"
                      v-bind="field"
                    />
                  </div>
                </vField>
                <ErrorMessage name="product_brand" class="text-xs text-error"></ErrorMessage>
              </div>
            </div>
            <div>
              <vField name="product_description" v-slot="{ field }" class="input">
                <label for="">Description</label>
                <div class="input-field">
                  <textarea
                    name="product_description"
                    class="w-full bg-transparent py-2"
                    id="description"
                    placeholder="Enter Description"
                    v-bind="field"
                    cols="30"
                    rows="4"
                  ></textarea>
                </div>
              </vField>
              <ErrorMessage name="product_description" class="text-xs text-error"></ErrorMessage>
            </div>
          </div>
        </template>

        <div class="flex flex-col gap-4 mt-7">
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
            class="brand-btn w-full"
            v-if="currentStep === 1"
            type="submit"
          >
            Done
          </button>
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
          //   email: yup.string().required().email(),
          description: yup.string().required(),
          country: yup.string().required(),
          state: yup.string().required(),
          phone: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric')
        }),
        yup.object({
            product_name: yup.string().required(),
          location: yup.string().required(),
          product_price: yup
            .string()
            .required()
            .matches(/^[0-9]+$/, 'Must be numeric'),
          product_brand: yup.string().required(),
          product_description: yup.string().required()
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
        console.log('Done: ', JSON.stringify(values, null, 2))
        alert('Product Created Successfully')
        return
      }
      this.currentStep++
      this.$emit('nextStep')
    },

    prevStep() {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
      this.$emit('prevStep')
    }
  },

  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    }
  }
}
</script>
