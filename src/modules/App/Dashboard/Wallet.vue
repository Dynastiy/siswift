<template>
  <div class="">
    <div class="p-6 flex flex-col justify-between rounded-md h-[200px] bg-white wallet lg:w-5/12 md:w-6/12 w-full">
      <div class="flex flex-col gap-2">
        <span class="text-gray-400 text-sm font-medium">Wallet Balance</span>
        <h4 class="font-bold lg:text-4xl md:text-3xl text-2xl" v-if="user">{{ $currencyFormat(user?.wallet?.balance)}}</h4>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-400 text-xs font-regular">Pending Transaction: </span>
        <h4 class="font-bold text-sm text-gray-400" v-if="user">{{ $currencyFormat(user?.escrow_wallet?.balance)}}</h4>
      </div>
      <div class="flex gap-4">
        <button class="brand-btn-md brand-primary flex gap-1 items-center" @click="$router.push('/app/wallet/deposit')">
          <i-icon icon="mingcute:send-fill" />
          Deposit
        </button>
        <button class="brand-btn-md brand-primary flex gap-1 items-center"  @click="$router.push('/app/wallet/withdraw')">
          <i-icon icon="hugeicons:dollar-receive-01" />
          Withdrawal
        </button>
      </div>
    </div>

    <div class="bg-white p-6 mt-6">
      <h4 class="mb-3 font-semibold">Latest Transactions</h4>
      <wxTable :columns="columns" :items="items" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
      { field: 'txn_amount', header: 'Amount' },
      { field: 'hash', header: 'Hash' },
        { field: 'txn_type', header: 'Type' },
        { field: 'created_at', header: 'Date' }
      ],
      items: []
    }
  },

  methods: {
    listTxns(){
      this.$user.getTransactions()
      .then((res)=> {
        this.items = res.data
      })
    },
    
    getUser(){
      this.$auth.getProfile()
      .then((res)=> {
        this.$store.commit('auth/setUser', res.profile)
      })
    }
  },

  beforeMount(){
    this.getUser()
    this.listTxns()
  },

  computed: {
    user(){
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>

.wallet {
  /* background-image: url('@/assets/img/walletbg.png'); */
  background: #000;
  /* background-blend-mode: overlay; */
  background-size: cover;
  background-position: center;
}

</style>