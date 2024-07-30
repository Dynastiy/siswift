<template>
  <div class="lg:page-bg md:page-bg">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div>
          <div class="grid grid-cols-3 w-full gap-4">
            <div v-for="item in 3" class="" :key="item">
              <el-skeleton-item variant="image" style="height: 400px; border-radius: 4px" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
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
              @click="subscribe"
            >
              Upgrade
            </button>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [],
      active: null,
      selectedPlan: null,
      loading: false
    }
  },

  methods: {
    getPlans() {
      this.loading = true
      this.$config
        .getPlans()
        .then((res) => {
          console.log(res)
          this.plans = res.plans
        })
        .finally(() => {
          this.loading = false
        })
    },

    getCurrentSubscription() {
      this.$config.getSubscription().then((res) => {
        console.log(res.subscription)
        this.$store.commit('auth/setSubscription', res.subscription)
      })
    },

    subscribe() {
      let payload = {
        plan_id: this.selectedPlan.id,
        gateway: 'paystack',
        callback_url: window.location.origin + '/app/success',
        amount: Number(this.selectedPlan.price)
      }
      console.log(payload)
      this.$config.subscribeToPlan(payload).then((res) => {
        console.log(res)
        this.getCurrentSubscription()
      })
    },

    selectPlan(item) {
      this.active = !this.active ? item.slug : this.active == item?.slug ? null : item?.slug
      this.selectedPlan = !this.selectedPlan ? item : this.selectedPlan == item ? null : item
    }
  },

  watch: {
    subscription: {
      handler(val) {
        if (val) {
          console.log(val.slug, 'ommmmo')
          this.active = val.slug
        }
      },
      immediate: true
    }
  },

  beforeMount() {
    this.getPlans()
    this.getCurrentSubscription()
  },

  computed: {
    subscription() {
      return this.$store.getters['auth/getSubscription']
    }
  }
}
</script>

<style></style>
