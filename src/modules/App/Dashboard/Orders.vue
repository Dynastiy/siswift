<template>
  <div>
    <span class="border-b border-b-gray-400 w-full flex gap-4 justify-center">
      <span
        v-for="(item, idx) in tabs"
        :key="idx"
        role="button"
        class="capitalize w-full text-center"
        :class="{ 'border-b text-primary border-b-primary font-semibold': activeTab === idx }"
        @click="activateMenu(idx)"
      >
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class="lg:page-bg md:page-bg mt-6">
        <h4 class="mb-3 font-semibold">Buying Orders</h4>
        <wxTable :columns="columns" :items="items" @btnClick="viewRecord"/>
    </div>
  </div>
</template>

<script>
export default {
  // components: { GeneralSettings, ChangePassword },
  data() {
    return {
      tabs: [
        {
          label: 'buying'
        },
        {
          label: 'bought'
        }
      ],
      activeTab: 0,
      columns: [
      { field: 'order_number', header: 'ID' },
      { field: 'total_amount', header: 'Amount' },
      
        { field: 'seller', header: 'Seller' },
        { field: 'created_at', header: 'Date' },
        { field: 'tableBtn', header: '' }
      ],
      items: []
    }
  },

  methods: {
    activateMenu(i) {
      console.log(i)
      this.activeTab = i
      this.list()
    },

    list() {
      let activeTab = Boolean(this.activeTab)
      let type = activeTab ? 'completed' : 'pending'
      this.$orders.getOrders(type).then((res) => {
        console.log(res)
        this.items = res.data
      })
    },

    viewRecord(e) {
      console.log(e, 'ommmo')
      this.$router.push(`/app/order/${e.id}`)
    }
  },

  // watch:{
  //   activeTab: {
  //     handler(val) {
  //       if(val) {
  //         this.list()
  //       }
  //     },
  //     immediate: true
  //   }
  // },

  beforeMount() {
    this.list()
  }
}
</script>

<style></style>
