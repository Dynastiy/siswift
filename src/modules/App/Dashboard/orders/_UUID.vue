<template>
  <div>
    <div class="body-content w-full lg:page-bg md:page-bg">
      <!-- <div>
        {{ orderData }}
      </div> -->
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div>
            <el-skeleton-item
              variant="image"
              style="height: 200px; margin-bottom: 20px; border-radius: 10px"
            />
            <div class="flex justify-between gap-12 mb-3">
              <div class="grid grid-cols-3 w-full gap-4">
                <div v-for="item in 3" class="" :key="item">
                  <el-skeleton-item variant="image" style="height: 50px; border-radius: 4px" />
                </div>
              </div>
              <span class="flex gap-4">
                <el-skeleton-item
                  variant="text"
                  style="height: 50px; width: 50px; border-radius: 10px"
                />
                <el-skeleton-item
                  variant="text"
                  style="height: 50px; width: 50px; border-radius: 10px"
                />
              </span>
            </div>
            <div>
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
              <el-skeleton-item variant="text" style="height: 10px; border-radius: 10px" />
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <span  class="bg-accent text-xs p-2 block mb-2 w-fit">
              Ensure the buyer or seller confirms 
              receipt or delivery of the item before you depart from the meet up location.
        </span>
            <div>
              <!-- <div>
                {{order}}
              </div> -->
              <div class="mt-4 flex flex-col gap-1">
                <div class="flex gap-2">
                  <img
                    :src="imgUrl + 'product/' + product?.main_image"
                    alt=""
                    role="button"
                    class="h-[80px] w-[60px] object-contain rounded-lg"
                  />
                  <div class="flex gap-[4px] flex-col">
                    <span class="font-semibold block">{{ product?.name }}</span>
                    <!-- <span>{{ totalAmount }}</span> -->
                    <span class="block text-sm">{{ $currencyFormat(order?.base_price) }}</span>
                    <span class="block text-[13px]">Qty: {{ order?.quantity }}</span>
                  </div>
                </div>

                <div class="mt-4" v-if="isSeller">
                  <div class="flex gap-2 items-center mb-3">
                    <!-- <button class="completed px-3 py-[6px] text[12px]">Messages</button> -->
                    <button
                      class="rejected px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'initiated'"
                      @click="rejectEscrow"
                    >
                      Cancel
                    </button>
                    <button
                      class="pending px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'delivered'"
                    >
                      View Receipt
                    </button>
                  </div>
                  <div class="flex justify-between items-center gap-4">
                    <h4 class="font-bold text-xl text-primary">
                      {{ $currencyFormat(totalAmount) }}
                      <!-- {{ totalAmount }} -->
                    </h4>
                    <span
                      class="rejected px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'rejected'"
                      >Escrow Rejected</span
                    >
                    <button
                      class="text-white brand-btn-md bg-primary"
                      v-if="orderData?.status === 'initiated'"
                      @click="acceptEscrow"
                    >
                      Accept & Deliver
                    </button>
                    <span class="pending" v-if="orderData?.status === 'confirmed'">
                      Awaiting Buyer Confirmation
                    </span>
                    <div v-if="orderData?.status === 'delivered'">
                      <button
                        class="text-white brand-btn-md bg-primary"
                        @click="$router.push('/app/user/review/' + this.orderData.buyer_id)"
                      >
                        Review Buyer
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mt-4" v-else>
                  <div class="flex gap-2 items-center mb-3">
                    <!-- <button class="completed px-3 py-[6px] text[12px]">Messages</button> -->
                    <button
                      class="pending px-3 py-[6px] text-[12px]"
                      v-if="orderData.status === 'delivered'"
                    >
                      View Receipt
                    </button>
                  </div>
                  <div class="lg:flex-row md:flex-row flex-col justify-between items-center gap-4">
                    <h4 class="font-bold text-xl text-primary">
                      {{ `${$currencyFormat(totalAmount)}` }}
                    </h4>
                    <span
                      class="rejected px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'rejected'"
                      >Escrow Rejected</span
                    >
                    <button
                      class="text-white brand-btn-md bg-primary"
                      v-if="orderData.status === 'confirmed'"
                      @click="completeTransaction"
                    >
                      Received
                    </button>
                    <span class="pending" v-if="orderData?.status === 'initiated'">
                      Awaiting Seller Confirmation
                    </span>
                    <div
                      class="flex gap-3 lg:flex-row md:flex-row flex-col lg:items-center md:items-center lg:mt-0 md:mt-0 mt-3"
                      v-if="orderData.status === 'delivered'"
                    >
                      <button
                        class="text-white brand-btn-md bg-primary"
                        @click="$router.push('/app/user/review/' + this.orderData.seller_id)"
                      >
                        Review Seller
                      </button>
                      <!-- <button
                        class="text-white brand-btn-md bg-primary"
                        @click="$router.push('/app/product/review/' + this.product.id)"
                      >
                        Review Product
                      </button> -->
                      <button
                        @click="$router.push('/app/support/send-mail')"
                        :disabled="!can_return"
                        :class="['text-white brand-btn-md', can_return ? 'bg-primary' : 'bg-gray-500 border border-gray-500' ]"
                      >
                        Return Product
                        <span v-if="can_return">
                          <vue-countdown
                            :time="countdownDate"
                            @end="onCountdownEnd"
                            v-slot="{ hours, minutes, seconds }"
                          >
                            <span>
                             {{`(${hours}hours, ${minutes}mins, ${seconds}secs)`}}
                            </span>
                          </vue-countdown></span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderID: this.$route.params.order_id,
      item: {},
      loading: false,
      order: {},
      escrow: [],
      orderData: {},
      items: [],
      product: {},
      can_return: true
    }
  },

  methods: {
    getOrder() {
      this.loading = true
      this.$orders
        .viewOrderRecord(this.orderID)
        .then((res) => {
          console.log('Oser details:', res)
          this.order = res.order
          this.product = res.order.product
          this.escrowList()
        })
        
    },

    escrowList() {
      this.$orders.allEscrow().then((res) => {
        let req = res.data
        let vq = req.find((item) => this.order.order_id == item.order_id)
        this.orderData = vq
      })
      .finally(() => {
          this.loading = false
        })
    },

    rejectEscrow() {
      this.$orders.rejectEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    },

    acceptEscrow() {
      this.$orders.acceptEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    },

    completeTransaction() {
      this.$orders.completeEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    },

    onCountdownEnd() {
      this.can_return = false
    }
  },

  beforeMount() {
    this.getOrder()
    // this.escrowList()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    totalAmount() {
      let amount = this.order.base_price * this.order.quantity
      return amount
    },

    isSeller() {
      let info = null
      // if (this.item.shop) {
      info = this.user.seller_id == this.order.seller_id
      // }
      return info
    },

    isEndDate() {
      // Get Date Created
      // console.log(this.order.created_at.g);

      // Get the current date
      var currentDate = new Date(this.order.order.updated_at)
      // Add 3 days to the current date
      var futureDate = new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000)
      console.log('Current Date:', currentDate.getTime() + 1 * 24 * 60 * 60 * 1000)
      console.log('Future Date (after adding 3 days):', futureDate)
      return futureDate
    },
    countdownDate() {
      // Get Date Created
      // console.log(this.order.created_at.g);

      // Get the current date
      var currentDate = new Date(this.order.order.updated_at)
      console.log(currentDate);
      const now = new Date();
      // Add 1 days to the current date
      var futureDate = (currentDate.getTime() + 1 * 24 * 60 * 60 * 1000) - (now.getTime())
      var res = futureDate <= 0 ? 0 : futureDate

      // const timeDifference = setTime - now;

      console.log('Current Date:', currentDate.getTime() + 1 * 24 * 60 * 60)
      console.log('Future Date (after adding 1 day):', res)
      // console.log(new Date(futureDate))
      return res
    }
  }
}
</script>

<style></style>
