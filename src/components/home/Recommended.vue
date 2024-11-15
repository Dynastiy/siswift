<template>
  <div class="container">
    <h4 class="font-semibold mb-6 text-xl">Suggested for you</h4>
    <!-- {{items}} -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4 mt-4">
          <div v-for="item in 8" :key="item">
            <el-skeleton-item variant="image" style="height: 200px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4">
          <div
            v-for="(item, idx) in items"
            :key="idx"
            class="hover:shadow"
            role="button"
            @click="$router.push('/login')"
          >
            <div>
              <div class="">
                <img
                  :src="imgUrl + 'product/' + item?.main_image"
                  alt=""
                  role="button"
                  class="w-full h-[150px] object-cover"
                />
              </div>
            </div>
            <div class="mt-2 flex flex-col justify-between px-4 p-3">
              <div class="flex justify-between items-center">
                <h6 role="button" class="text-black1 capitalize text-md font-semibold">
                  {{ item?.name }}
                </h6>
              </div>

              <small class="text-xs block text-gray-500">
                Seller: {{ `${item?.shop?.user.firstname} ${item?.shop?.user.lastname}` }}
              </small>
              <!-- <small class="text-xs block text-gray-500"> {{ item?.brand?.name }} </small> -->

              <div class="flex justify-between items-center mt-3">
                <span
                  class="text-primary font-bold lg:text-sm md:text-sm text-xs block leading-tight"
                >
                  {{ $currencyFormat(item?.base_price) }}
                </span>
                <span class="text-xs flex gap-1">
                  <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                  {{ avgRating(item) }}
                </span>
              </div>
            </div>
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
      items: [],
      loading: false
    }
  },

  methods: {
    getProducts() {
      this.loading = true
      this.$products
        .getProducts()
        .then((res) => {
          console.log(res)
          this.items = res[0].data.slice(0, 4)
        })
        .finally(() => {
          this.loading = false
        })
    },

    avgRating(item) {
      let ratings = item.seller.review
      let allRates = []
      ratings.forEach((item) => {
        allRates.push(item.rating)
      })
      let rateSum = allRates.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      let avg = rateSum / allRates.length
      return avg || 0
    }
  },

  beforeMount() {
    this.getProducts()
  }
}
</script>

<style></style>
