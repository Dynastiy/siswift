<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <div class="info-card bg-white p-4 rounded-md w-full" v-for="(item, idx) in topHeading" :key="idx">
        <h6 class="text-[13.5px] text-gray-600 capitalize">{{ item.label.split('_').join(' ') }}</h6>
        <h1 class="text-2xl font-semibold">{{ item.value }}</h1>
        <h6 class="text-xs text-gray-400">{{ item.desc }}</h6>
      </div>
    </div>

    <div>
        <div class="bg-white p-4 rounded-md">
            Chart 1
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topHeading: [
        {
          label: 'total_campaign',
          value: '10 Ads',
          desc: null
        },
        {
          label: 'total_ads_duration',
          value: '10 Ads',
          desc: null
        },
        {
          label: 'total_payment_received',
          value: 'NGN150,000',
          desc: '-8% over Month'
        },
        {
          label: 'total_order_received',
          value: '15 Orders',
          desc: '-8% over Month'
        }
      ]
    }
  },

  methods: {
    getStats(){
      this.$user.getStoreAnalysis()
      .then((res)=> {
        console.log(res)
      })
    }
  },

  beforeMount(){
    this.getStats()
  }
}
</script>

<style></style>
