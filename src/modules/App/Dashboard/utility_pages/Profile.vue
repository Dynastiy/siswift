<template>
  <div>
    <div class="bg-white p-8 rounded-md lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <!-- proile

      {{ user }} -->
      <form class="flex flex-col gap-[4px]">
        <div>
          <label for="">First Name</label>
          <input type="text" class="input" v-model="form.firstname" />
        </div>

        <div>
          <label for="">Last Name</label>
          <input type="text" class="input" v-model="form.lastname" />
        </div>

        <div>
          <label for="">Phone Number</label>
          <input type="text" class="input" v-model="form.mobile" />
        </div>

        <div>
          <label for="">Home Address</label>
          <input type="text" class="input" v-model="form.address" />
        </div>
        <!-- <div>
          <label for="">State</label>
          <input type="text" class="input">
        </div> -->
        <div class="text-center mt-2">
          <button
            class="brand-btn w-8/12"
            :disabled="isLoading"
            :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
          >
            Submit
          </button>
        </div>
        <div class="mt-3"></div>
      </form>

      <h4 class="font-semibold mt-3">Verification</h4>
      <span
        class="border border-dashed border-primary block p-2 rounded-md flex justify-between items-center"
        role="button"
      >
        <span class="font-medium text-sm flex gap-2 items-center">
          <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
          <div class="flex flex-col">
            <span>KYC Verification</span>
            <span class="text-xs text-gray-500">{{
              !!user.kyc_data ? 'Verified' : 'Not Verified'
            }}</span>
          </div>
        </span>
        <i-icon icon="prime:angle-right" class="text-[25px]" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        mobile: '',
        address: ''
      },
      isLoading: false
    }
  },

  watch: {
    user: {
      handler(val) {
        this.form = {
          firstname: val.firstname,
          lastname: val.lastname,
          mobile: val.mobile,
          address: val.address
        }
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
