<template>
  <div>
    <div class="flex flex-col gap-4">
      <div class="flex md:flex-row lg:flex-row flex-col gap-4">
        <div
          class="info-card bg-white p-4 rounded-md w-full"
          v-for="(value, name) in stats"
          :key="name"
        >
          <h6 class="text-[13.5px] text-gray-600 capitalize">{{ name.split('_').join(' ') }}</h6>
          <h1 class="text-2xl font-semibold">{{ value }}</h1>
          <!-- <h6 class="text-xs text-gray-400">{{ item.desc }}</h6> -->
        </div>
      </div>

      <div class="flex md:flex-row lg:flex-row flex-col gap-4">
        <div
          class="info-card bg-white p-4 rounded-md w-full"
          v-for="(value, name) in orders"
          :key="name"
        >
          <h6 class="text-[13.5px] text-gray-600 capitalize">{{ name.split('_').join(' ') }}</h6>
          <h1 class="text-2xl font-semibold">{{ value }}</h1>
          <!-- <h6 class="text-xs text-gray-400">{{ item.desc }}</h6> -->
        </div>
      </div>

      <div class="flex gap-4 md:flex-row lg:flex-row flex-col">
        <div
          class="info-card bg-white p-4 rounded-md w-full"
        >
          <h6 class="text-[13.5px] font-bold text-gray-800 capitalize">
            Sales
          </h6>
          <hr class="my-2" />
          <div class="flex gap-2 justify-between">
            <span class="block text-center" v-for="(value, name) in sales_stats" :key="name">
              <h6 class="text-xs text-gray-400 capitalize">{{ name.split('_').join(' ') }}</h6>
              <h1 class="text-2xl font-semibold">{{ value }}</h1>
            </span>
          </div>
        </div>
      </div>

      <!-- <div>
          <div class="bg-white p-4 rounded-md">
              Chart 1
          </div>
      </div> -->
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
      ],
      sales_stats: {},
      stats: {},
      orders: {}
    }
  },

  methods: {
    getStats() {
      this.$user.getStoreAnalysis().then((res) => {
        console.log(res)
        this.sales_stats = res.sales
        this.stats = {
          total_campaign: res.ads,
          total_ads_duration: res.ads_duration ,
          total_sold: res.total_sold
        },
        this.orders = {
          pending_orders: res.pending_order,
          processing_orders: res.Proccessing,
          cancelled_orders: res.Cancelled,
          delivered_orders: res.Delivered
        }
      })
    }
  },

  beforeMount() {
    this.getStats()
  }
}
</script>

<style></style>
