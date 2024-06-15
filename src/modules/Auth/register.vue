<template>
  <div class="">
    <div class="">
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold">Create Account</h3>
      <span class="text-xs block font-medium text-gray-400"
        >Enter details to create a warehauze account</span
      >
    </div>
    <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-1 mt-3">
      <div class="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-2">
        <div class="w-full">
          <label for="">First Name</label>
          <vField
            name="first_name"
            class="input"
            placeholder="First Name"
            type="text"
            rules="required"
          />
          <ErrorMessage name="first_name" class="text-xs text-error"></ErrorMessage>
        </div>

        <div class="w-full">
          <label for="">Last Name</label>
          <vField
            name="last_name"
            class="input"
            placeholder="Last Name"
            type="text"
            rules="required"
          />
          <ErrorMessage name="last_name" class="text-xs text-error"></ErrorMessage>
        </div>
      </div>

      <div>
        <label for="">Email</label>
        <vField name="email" class="input" placeholder="Email" type="email" rules="email" />
        <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
      </div>

      <div>
        <label for="">Phone Number</label>
        <vField
          name="phone_no"
          class="input"
          placeholder="Phone Number"
          type="tel"
          rules="required"
        />
        <ErrorMessage name="phone_number" class="text-xs text-error"></ErrorMessage>
      </div>

      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="w-full">
          <label class="text-[12px]">Select State</label>
            <select name="" v-model="state" id="state" class="input" required>
              <option selected disabled value="">--Select One--</option>
              <option v-for="(item, idx) in states" :key="idx" :value="item">
                {{ item }}
              </option>
            </select>
        </div>

        <div class="w-full">
          <label class="text-[12px]">Select City</label>
          <vField name="city" v-slot="{ field }" rules="required">
            <select
              name=""
              class="input"
              id="city"
              v-bind="field"
              :disabled="lgas.length === 0"
            >
              <option selected disabled value="">--Select One--</option>
              <option v-for="(item, idx) in lgas" :key="idx" :value="item">
                {{ item }}
              </option>
            </select>
          </vField>
        </div>
        <div class="col-span-2">
          <label class="text-[12px]" for="">Address</label>
          <vField name="address" v-slot="{ field }" rules="required">
            <textarea name="" v-bind="field" class="input" id="" cols="30" rows="2"></textarea>
          </vField>
        </div>
      </div>

      <div>
        <label for="">Password</label>
        <vField name="password" v-slot="{ field }" rules="required">
          <div class="input-field">
            <input
              :type="typePassword ? 'password' : 'text'"
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

      <div class="text-center mt-4">
        <button
          class="brand-btn w-full"
          :disabled="isLoading"
          :class="[
            isLoading
              ? 'bg-gray400 text-gray600'
              : meta.valid
                ? 'brand-primary'
                : 'bg-gray400 text-gray600'
          ]"
        >
          Create Account
        </button>
      </div>
      <div class="mt-3">
        <span class="flex justify-center gap-1 text-[12px] font-medium">
          <span class="font-medium">Already have an account?</span>
          <router-link class="font-semibold text-secondary" to="/login">Login</router-link>
        </span>
      </div>
    </vForm>
  </div>
</template>

<script>
import { debounce } from 'lodash'
// import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    // Form,
    // Field,
    // ErrorMessage
  },

  data() {
    return {
      typePassword: true,
      isLoading: false,
      errors: null,
      error: null,
      states: [],
      lgas: [],
      state: ""
    }
  },

  methods: {
    async onSubmit(values) {
      this.isLoading = true
      var credentials = {
        ...values, 
        country: 'Nigeria',
        state: this.state
      }
      this.$auth.createAccount(credentials)
      .then(()=> {
        this.$router.push('/login')
      })
      .finally(()=> {
        this.isLoading = false
      })
    },

    async getStates() {
      try {
        const req = await this.$axios.get('https://nga-states-lga.onrender.com/fetch')
        console.log(req.data)
        this.states = req.data
      } catch (res) {
        console.log(res)
      }
    },

    async getLGA() {
      if (this.state !== '' || null) {
        try {
          const req = await this.$axios.get(
            `https://nga-states-lga.onrender.com/?state=${this.state}`
          )
          console.log(req.data)
          this.lgas = req.data
        } catch (res) {
          console.log(res)
        }
      }
    },
  },

  mounted() {
    // this.$store.commit('auth/REMOVE_ERRORS')
  },

  beforeMount(){
    this.getStates()
  },

  watch: {
    state: {
      handler: debounce(function () {
        this.getLGA()
      }, 500)
    },
  },

  computed: {}
}
</script>
