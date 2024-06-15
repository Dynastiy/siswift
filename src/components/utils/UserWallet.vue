<template>
  <div>
    <div class="wallet px-4 py-8 rounded-2xl lg:w-5/12 md:w-7/12 w-full">
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
          <div style="margin-top: 14px" class="flex flex-col gap-2 lg:pt-4 lg:pt-4">
            <div class="flex justify-between">
              <div class="w-full">
                <el-skeleton-item variant="text" style="width: 50%; height: 10px" />
                <div>
                  <el-skeleton-item
                    variant="text"
                    style="width: 80%; margin-top: 5px; height: 30px"
                  />
                </div>
              </div>

              <!-- <div>
                <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
              </div> -->
            </div>
          </div>
        </template>
        <template #default>
          <div class="flex items-center justify-between lg:pt-4 lg:pt-4">
            <div>
              <span class="flex items-center gap-1">
                <span class="block text-[12px] text-gray-200 font-medium"
                  >Total Wallet Balance:</span
                >
                <span class="password-iccon" role="button" @click="showAmount = !showAmount">
                  <i-icon
                    :icon="showAmount ? 'tabler:eye' : 'gridicons:not-visible'"
                    class="form-icon"
                  />
                </span>
              </span>
              <h1 class="text-4xl font-bold">
                {{ showAmount ? balance : hidden }}
              </h1>
            </div>
            <img src="@/assets/img/wallet.svg" class="w-24" alt="" />
          </div>
        </template>
      </el-skeleton>

      <hr class="border-gray-400 my-3 lg:block md:block hidden" />
      <div class="lg:block md:block hidden">
        <div class="flex">
          <span
            class="flex w-full flex-col items-center gap-1"
            v-for="(item, idx) in actions"
            :key="idx"
            @click="$router.push(`/${item.url}`)"
            role="button"
          >
            <span
              class="flex items-center text-deep bg-white w-8 h-8 rounded-full shadow-md justify-center"
            >
              <i-icon :icon="item.icon" />
            </span>
            <span class="capitalize font-semibold block text-[10px]">
              {{ item.label }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <div v-if="!user.isVerifyKYC" class="flex bg-white shadow-sm p-2 rounded-lg gap-3 mt-5">
      <i-icon icon="lets-icons:user-scan" class="text-error text-4xl" />
      <span class="block text-sm font-medium"> Kindly <router-link class="text-primary underline" to="kyc-verification">verify</router-link> your identity to unlock all features of the app. </span>
      <!-- {{ user }} -->
    </div>

    <div class="lg:hidden md:hidden block mt-6" v-if="hasActions">
      <!-- <h3 class="text-xl font-semibold mb-2">Quick Actions</h3> -->
      <div class="flex justify-between bg-white shadow-sm p-2 rounded-lg">
        <span
          class="flex w-full flex-col items-center gap-1"
          v-for="(item, idx) in actions"
          :key="idx"
          @click="$router.push(`/${item.url}`)"
          role="button"
        >
          <span class="flex items-center bg-blue-100 w-12 rounded-full h-12 justify-center text-xl">
            <i-icon :icon="item.icon" />
          </span>
          <span class="capitalize font-semibold block text-[13px]">
            {{ item.label }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasActions: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      assets: [],
      actions: [
        {
          label: 'Buy/Sell',
          icon: 'ri:import-fill',
          url: 'buy-sell'
        },

        {
          label: 'send',
          icon: 'mingcute:send-fill',
          url: 'send'
        },

        {
          label: 'receive',
          icon: 'streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw',
          url: 'receive'
        },

        {
          label: 'pay',
          icon: 'fluent:payment-32-filled',
          url: 'pay'
        }
      ],
      loading: false,
      showAmount: true
    }
  },
  methods: {
    async getAssets() {
      let walletRes = await this.$request.get(`trans/getdetails`)
      let walletData = walletRes.data
      this.$store.commit('auth/setWallet', walletData)
    }
  },

  beforeMount() {
    this.getAssets()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    walletAddress() {
      return this.$route.query.wallet_address
    },

    wallet() {
      return this.$store.getters['auth/getWallet']
    },

    balance() {
      return Number(this.wallet.tradingBalance).toLocaleString('en-US', {
        style: 'currency',
        currency: 'NGN'
      })
    },

    hidden() {
      let nummber_of_times = this.balance.length
      let value = []
      for (let i = 0; i < nummber_of_times; i++) {
        value.push('*')
      }
      let completed = value.join('')
      return completed
    }
  }
}
</script>

<style scoped>
.wallet {
  background: var(---secondary-color);
  color: var(---white);
  /* box-shadow: var(--secondary-color) 0px 25px 20px -20px; */
  /* box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px; */
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px; */
  /* filter: drop-shadow(0px 10px 0px rgb(136, 136, 248))  */
  box-shadow: 0 13px 6px -10px #8282fe;
}
</style>
