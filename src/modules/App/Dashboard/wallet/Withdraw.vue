<template>
  <div>
    <div class="lg:page-bg md:page-bglg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <div class="">
        <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Withdraw</h3>
        <span class="text-[15px] block font-regular text-gray2">Enter Amount to withdraw</span>
      </div>
      <vForm @submit="onSubmit" class="mt-8">
        <div class="flex flex-col gap-4">
          <div>
            <label for="">Amount</label>
            <vField name="amount" v-slot="{ field }" rules="required|integer">
              <input
                type="tel"
                name="amount"
                class="w-full input"
                id="input"
                placeholder="300000"
                v-bind="field"
              />
            </vField>
            <ErrorMessage name="amount" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Bank Account Account</label>
            <vField name="bank_account_id" as="select" class="input" rules="required">
              <option value="">--Select Bank Account--</option>
              <option v-for="item in items" :key="item.id" :value="String(item?.id)">
                {{ `${item.bank_name} (${item?.account_number}) - ${item?.account_name}` }}
              </option>
            </vField>
            <ErrorMessage name="bank_account_id" class="text-xs text-error"></ErrorMessage>
            <span class="block text-xs text-primary mt-2 text-right"
              >To add new bank account, go to
              <router-link to="/app/setting" class="underline">settings</router-link> page</span
            >
          </div>
        </div>

        <div class="text-center mt-8">
          <button
            class="brand-btn w-full"
            :disabled="isLoading"
            :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
          >
            Continue
          </button>
          <div class="mt-3"></div>
        </div>
      </vForm>
    </div>
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
      validationErrors: {},
      items: []
    }
  },

  methods: {
    async onSubmit(values, { resetForm }) {
      console.log(values)
      this.$user
        .withdraw(values)
        .then((res) => {
          console.log(res)
        })
        .finally(() => {
          resetForm()
        })
    },

    getUser() {
      this.$auth.getProfile().then((res) => {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    },

    getMethods() {
      this.$config.getWithdrawalMethods().then((res) => {
        console.log(res)
        let resData = res.data
        this.items = resData
      })
    }
  },

  mounted() {
    console.log(window.location)
    this.getMethods()
  }
}
</script>
