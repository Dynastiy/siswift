<template>
  <div class="lg:page-bg md:page-bg">
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <div v-for="item in plans" :key="item?.id" class="border border-gray-300 p-4 rounded-[10px]">
        <h5 class="font-semibold text-[13px]">{{ JSON.parse(item?.name).en }}</h5>
        <h1>
          <span class="font-semibold text-xl">{{ item?.price == '0.00' ? 'Free' :`${item?.currency} ${item?.price}` }}</span>
          <span class="text-[12px]">{{ item?.price == '0.00' ? '' :`/${item?.invoice_period}${item?.invoice_interval}` }}</span>
        </h1>
        <!-- <div v-html="JSON.parse(item?.description).en.split('\\u2022')">

        </div> -->
        <ul class="flex flex-col gap-1">
          <li v-for="obj in item?.features" :key="obj.id" class="capitalize text-[13px] flex gap-[4px] text-gray-600 items-center">
            <i-icon icon="ic:round-check-box" />
            {{ obj.name.split('_').join(' ') }}</li>
        </ul>

        <button>

        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: []
    }
  },

  methods: {
    getPlans() {
      this.$config.getPlans().then((res) => {
        console.log(res)
        this.plans = res.plans
      })
    },

    getCurrentSubscription() {
      this.$config.getSubscription().then((res) => {
        console.log(res)
      })
    }
  },

  beforeMount() {
    this.getPlans()
    this.getCurrentSubscription()
  }
}
</script>

<style></style>
