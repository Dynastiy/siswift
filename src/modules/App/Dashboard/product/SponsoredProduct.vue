<template>
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

    <div class="flex gap-4 md:flex-row lg:flex-row flex-col">
      <div
        class="info-card bg-white p-4 rounded-md w-full"
        v-for="(item, idx) in datedStats"
        :key="idx"
      >
        <h6 class="text-[13.5px] font-bold text-gray-800 capitalize">
          {{ item.title }}
        </h6>
        <hr class="my-2">
        <div class="flex gap-2 justify-between">
          <span class="block text-center" v-for="(obj, idx) in item.stats" :key="idx" >
            <h6 class="text-xs text-gray-400 capitalize">{{ obj.label }}</h6>
            <h1 class="text-2xl font-semibold">{{ obj.value }}</h1>
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
        }
        // {
        //   label: 'total_order_received',
        //   value: '15 Orders',
        //   desc: '-8% over Month'
        // }
      ],
      stats: {},
      datedStats: [],
      ID: this.$route.params.id
    }
  },

  methods: {
    getStats() {
      this.$products.getProductAnalysis(this.ID).then((res) => {
        console.log(res)
        this.stats = {
          all_views: res.all_stats.views,
          all_chats: res.all_stats.chats,
          total_quantity_sold: res.all_stats.sold
        }
        this.datedStats = [
          {
            title: 'last month',
            stats: [
              {
                label: 'views',
                value: res.last_month.views
              },
              {
                label: 'chats',
                value: res.last_month.chats
              },
              {
                label: 'sales',
                value: res.last_month.sold
              }
            ]
          },
          {
            title: 'this month',
            stats: [
              {
                label: 'views',
                value: res.this_month.views
              },
              {
                label: 'chats',
                value: res.this_month.chats
              },
              {
                label: 'sales',
                value: res.this_month.sales
              }
            ]
          },
          // {
          //   title: 'sales',
          //   stats: [
          //     {
          //       label: 'Last Month',
          //       value: 0
          //     },
          //     {
          //       label: 'This Month',
          //       value: 0
          //     }
          //   ]
          // }
        ]
      })
    }
  },

  beforeMount() {
    this.getStats()
  }
}
</script>

<style></style>
