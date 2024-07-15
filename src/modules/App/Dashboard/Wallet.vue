<template>
  <div>
    <div>
      {{user}}
    </div>
    <div class="p-6 flex flex-col justify-between rounded-md h-[200px] bg-white wallet lg:w-5/12 md:w-6/12 w-full">
      <div class="flex flex-col gap-3">
        <span class="text-gray-400 text-sm font-medium">Wallet Balance</span>
        <span>{{ user?.wallet.balance }}</span>
        <h4 class="font-semibold text-4xl" v-if="user?.wallet">{{ $currencyFormat(user?.wallet?.balance) }}</h4>
      </div>
      <div class="flex gap-4">
        <button class="brand-btn-md brand-primary flex gap-1 items-center">
          <i-icon icon="mingcute:send-fill" />
          Deposit
        </button>
        <button class="brand-btn-md brand-primary flex gap-1 items-center">
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
        { field: 'userName', header: 'Name' },
        { field: 'email', header: 'Type' },
        { field: 'phone', header: 'Date' },
        { field: 'department_name', header: 'Amount' },
        { field: 'status', header: 'Status' }
      ],
      items: []
    }
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
  background-image: url('@/assets/img/walletbg.png');
  background-size: cover;
  background-position: center;
}
</style>
