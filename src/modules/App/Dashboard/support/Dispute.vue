<template>
  <div>
    <wxTable :columns="columns" :items="items" @btnClick="viewRecord" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { field: 'id', header: 'ID' },
        { field: 'amount', header: 'Refund Amount' },
        
        { field: "disputeUser", header: "User" },
        { field: 'created_at', header: 'Date Created' },
        { field: 'updated_at', header: 'Last Updated' },
        { field: 'dispute_status', header: 'Status' },
        { field: 'tableBtn', header: '' }
      ],
      items: []
    }
  },

  methods: {
    getRecord() {
      this.$orders.listDispute().then((res) => {
        console.log(res)
        this.items = res.data
      })
    },

    setField(){
      return 'seller'
    },

    setHeader(){
      return 'Buyer'
    },

    viewRecord(e) {
      this.$router.push(`/app/dispute/${e.id}/view/${e.order_id}`)
    }
  },

  beforeMount() {
    this.getRecord()
  },

  computed: {
    isSeller() {
      let info = null
      info = this.user.seller_id == this.order.seller_id
      return info
    },

  }
}
</script>

<style></style>
