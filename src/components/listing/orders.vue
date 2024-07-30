<template>
  <div>
    <h4 class="mb-3 font-semibold">Selling Orders</h4>
    <wxTable :columns="columns" :items="items" @btnClick="viewRecord"/>
  </div>
</template>

<script>
export default {
  // components: { GeneralSettings, ChangePassword },
  props: {
    currentTab: String
  },
  data() {
    return {
      activeTab: 0,
      columns: [
        { field: 'order_id', header: 'ID' },
        { field: 'seller_amount', header: 'Amount' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'created_at', header: 'Date' },
        { field: 'tableBtn', header: '' }
      ],
      items: []
    }
  },

  methods: {
    

    list() {
      let activeTab = this.currentTab
      let type = activeTab === '1' ? 'pending'  : activeTab === "2"  ? 'completed' : ''
      this.$orders.getSellerOrders(type).then((res) => {
        console.log(res)
        this.items = res.orders.data
      })
    },

    viewRecord(e) {
      console.log(e, 'ommmo')
      this.$router.push(`/app/order/${e.order_id}`)
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
