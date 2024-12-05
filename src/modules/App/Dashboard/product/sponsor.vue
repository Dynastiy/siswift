<template>
  <div class="bg-white p-4">
    <span class="border-b border-b-gray-400 w-full flex gap-4 justify-center">
      <span
        v-for="(item, idx) in tabs"
        :key="idx"
        role="button"
        class="capitalize w-full text-center"
        :class="{ 'border-b text-primary border-b-primary font-semibold': activeTab == idx }"
        @click="activateMenu(idx)"
      >
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class="mt-6 grid lg:grid-cols-3 md:grid-cols-3 gap-4 grid-cols-2">
      <!-- <div>
        {{plans}}
      </div> -->
      <div
        v-for="item in plans"
        :key="item?.id"
        @click="selectPlan(item)"
        role="button"
        :class="[
          'border border-[2px] p-4 rounded-[10px]',
          active === item?.slug ? 'border-primary' : 'border-gray-300'
        ]"
      >
        <h5 class="font-semibold text-[13px]">{{ JSON.parse(item?.name).en }}</h5>

        <h1>
          <span class="font-semibold text-[20px]">{{
            item?.price == '0.00' ? 'Free' : `${item?.currency} ${item?.price}`
          }}</span>
          <span class="text-[12px]">{{
            item?.price == '0.00' ? '' : `/${item?.invoice_period}${item?.invoice_interval}`
          }}</span>
        </h1>

        <ul class="flex flex-col gap-1 mt-[4px]">
          <li
            v-for="obj in item?.features"
            :key="obj.id"
            :class="[
              'capitalize text-[13px] flex gap-[4px] items-center',
              active === item?.slug ? 'text-gray-700' : 'text-gray-500'
            ]"
          >
            <i-icon
              icon="ic:round-check-box"
              :class="[active === item?.slug ? 'text-primary' : 'text-gray-500']"
            />
            {{ obj.name.split('_').join(' ') }}
          </li>
        </ul>

        <button
          :class="[
            'brand-btn-md w-full mt-4',
            active === item?.slug ? 'brand-primary' : 'bg-gray-400 border border-gray-400'
          ]"
          @click="pay(item)"
        >
          Pay
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import all from '@/components/listing/all.vue'
// import Orders from '@/components/listing/orders.vue'
export default {
  // components: { all, Orders },
  data() {
    return {
      tabs: [
        {
          label: 'highlight_listing'
        },
        {
          label: 'boost_listing'
        },
        {
          label: 'super_boost'
        }
      ],
      activeTab: 0,
      plans: [],
      allPlans: [],
      active: null,
      id: this.$route.params.id
    }
  },

  methods: {
    selectPlan(item) {
      this.active = !this.active ? item.slug : this.active == item?.slug ? null : item?.slug
      this.selectedPlan = !this.selectedPlan ? item : this.selectedPlan == item ? null : item
    },

    pay(e){
      console.log(e)
      let payload = {
        product_id: this.id,
        plan_id: e.id
      }
      this.$products.sponsorListing(payload)
      .then((res)=> {
        console.log(res);
        this.$router.push(`/app/product/${this.id}/sponsored-analysis`)
      })
    },

    getPlans() {
      this.$config.getPlans().then((res) => {
        this.allPlans = res
        if (this.activeTab == 1) {
          this.plans = this.allPlans.plans
        }
        if (this.activeTab == 2) {
          this.plans = this.allPlans.booster
        }
        if (this.activeTab == 0) {
          this.plans = this.allPlans.listing
        }
      })
    },

    activateMenu(i) {
      this.activeTab = i
      if (this.activeTab == 1) {
          this.plans = this.allPlans.plans
        }
        if (this.activeTab == 2) {
          this.plans = this.allPlans.booster
        }
        if (this.activeTab == 0) {
          this.plans = this.allPlans.listing
        }
      // this.$router.push({ name: 'sponsor-listing', query: { tab: i } })
    }
  },

  mounted() {
   
  },

  beforeMount() {
    this.getPlans()
  }
}
</script>

<style></style>
