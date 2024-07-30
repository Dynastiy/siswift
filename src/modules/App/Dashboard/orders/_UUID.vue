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
            <div>
              <div class="mt-4 flex flex-col gap-1">
                <div class="flex gap-2" v-for="item in items" :key="item?.id">
        <img
          :src="imgUrl + 'product/' + item?.main_image"
          alt=""
          role="button"
          class="h-[80px] w-[60px] object-contain rounded-lg"
        />
        <div class="flex gap-[4px] flex-col">
          <span class="font-semibold block">{{ item?.name }}</span>
          <!-- <span>{{totalAmount}}</span> -->
          <!-- <span class="block text-sm">{{ $currencyFormat(totalAmount(item)) }}</span> -->
          <!-- <span class="block text-[13px]">Qty: {{ item?.quantity }}</span> -->
        </div>
      </div>

                <div class="mt-4" v-if="isSeller">
                  <div class="flex gap-2 items-center mb-3">
                    <button class="completed px-3 py-[6px] text[12px]">Messages</button>
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
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-xl text-primary">
                      {{ `${$currencyFormat(order?.total_amount)}` }}
                    </h4>
                    <span
                      class="rejected px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'cancelled'"
                      >Cancelled</span
                    >
                    <button
                      class="text-white brand-btn-md bg-primary"
                      v-if="orderData?.status === 'initiated'"
                      @click="acceptEscrow"
                    >
                      Delivered
                    </button>
                    <span class="pending" v-if="orderData?.status === 'confirmed'">
                      Awaiting Buyer Confirmation
                    </span>
                    <div v-if="orderData?.status === 'delivered'">
                      <button class="text-white brand-btn-md bg-primary" @click="$router.push('/app/user/review/'+this.orderData.buyer_id)">Review Buyer</button>
                    </div>
                  </div>
                </div>

                <div class="mt-4" v-else>
                  <div class="flex gap-2 items-center mb-3">
                    <button class="completed px-3 py-[6px] text[12px]">Messages</button>
                    <button class="pending px-3 py-[6px] text-[12px]" v-if="orderData.status === 'delivered'">View Receipt</button>
                  </div>
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-xl text-primary">
                      {{ `${$currencyFormat(order?.total_amount)}` }}
                    </h4>
                    <span
                      class="rejected px-3 py-[6px] text-[12px]"
                      v-if="orderData?.status === 'cancelled'"
                      >Cancelled</span
                    >
                    <button class="text-white brand-btn-md bg-primary" v-if="orderData.status === 'confirmed'" @click="completeTransaction">Received</button>
                    <span class="pending" v-if="orderData?.status === 'initiated'">
                      Awaiting Seller Confirmation
                    </span>
                    <div class="flex gap-2 items-center" v-if="orderData.status === 'delivered'">
                      <button class="text-white brand-btn-md bg-primary" @click="$router.push('/app/user/review/'+this.orderData.seller_id)">Review Seller</button>
                      <button class="text-white brand-btn-md bg-primary" @click="$router.push('/app/product/review/'+this.productID)">Review Product</button>
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
      items: []
    }
  },

  methods: {
    getOrder() {
      this.loading = true
      this.$orders
        .viewOrderRecord(this.orderID)
        .then((res) => {
          console.log('data from products list:', res)
          this.escrowList()
          this.order = res
          this.items = res.products
        })
        .finally(() => {
          this.loading = false
        })
    },

    escrowList() {
      this.$orders.allEscrow().then((res) => {
        console.log(res)
        let req = res.data
        let vq = req.find((item) => this.orderID == item.order_id)
        console.log(vq)
        this.orderData = vq
      })
    },

    rejectEscrow() {
      this.$orders.rejectEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    },

    acceptEscrow(){
      this.$orders.acceptEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    },

    completeTransaction(){
      this.$orders.completeEscrow(this.orderData.id).then((res) => {
        this.escrowList()
        return res
      })
    }
  },

  beforeMount() {
    this.getOrder()
          this.escrowList()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    isSeller() {
      let info = null
      // if (this.item.shop) {
      info = this.user.seller_id == this.order.seller_id
      // }
      return info
    }
  }
}
</script>

<style></style>
