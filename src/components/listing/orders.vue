<template>
  <div>
    <h4 class="mb-3 font-semibold">Buying Orders</h4>
    <wxTable :columns="columns" :items="items" />
  </div>
</template>

<script>
export default {
  // components: { GeneralSettings, ChangePassword },
  props: {
    currentTab: Number
  },
  data() {
    return {
      activeTab: 0,
      columns: [
        { field: 'orderId', header: 'ID' },
        { field: 'seller_amount', header: 'Amount' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'created_at', header: 'Date' }
        // { field: 'status', header: 'Status' }
      ],
      items: []
    }
  },

  methods: {
    

    list() {
      let activeTab = this.currentTab
      let type = activeTab === 1 ? 'pending'  : activeTab === 2  ? 'completed' : ''
      this.$user.getSellerOrders(type).then((res) => {
        console.log(res)
        this.items = res.orders.data
      })
    }
  },

  watch:{
    currentTab: {
      handler(newVal, oldVal) {
          if(newVal != oldVal) {
            this.list()
          }
      },
      immediate: true
    }
  },

  beforeMount() {
    this.list()
  }
}
</script>

<style></style>
