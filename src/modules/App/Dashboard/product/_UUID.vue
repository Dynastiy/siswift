<template>
  <div class="bg-white rounded-md p-6 body-content w-full">
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
            <img
              :src="imgUrl + item?.main_image"
              alt=""
              role="button"
              class="h-[200px] w-full rounded-md object-cover object-center border border-primary"
            />

            <div class="mt-4" :class="{ 'flex justify-between': !isMyProduct }">
              <div class="grid grid-cols-4 gap-3 mb-3">
                <img
                  v-for="j in item?.product_images"
                  :key="j?.id"
                  :src="imgUrl + j?.image"
                  alt=""
                  role="button"
                  class="h-[40px] w-[60px] rounded-[4px] object-cover object-center"
                />
              </div>
              <span class="flex gap-2 items-center" role>
                <span
                  v-if="isMyProduct"
                  class="bg-accent p-2 rounded-md whitespace-nowrap block text-primary text-xs font-semibold"
                >
                  Check Sponsored Analysis
                </span>
                <span  v-if="!isMyProduct" class="bg-accent p-2 rounded-md text-primary text-lg">
                  <i-icon icon="ph:heart-fill" />
                </span>
                <span v-if="!isMyProduct" class="bg-accent p-2 rounded-md text-primary text-lg">
                  <i-icon icon="material-symbols:report" />
                </span>
                <span class="bg-accent p-2 rounded-md text-primary text-lg">
                  <i-icon icon="ic:baseline-share" />
                </span>
              </span>
            </div>

            <div class="mt-4 flex flex-col gap-4">
              <div>
                <span class="text-[13px] block">Brand: {{ item?.brand?.name }}</span>
                <h4 class="font-semibold">{{ `${item?.name} ${item?.model}` }}</h4>
                <span class="flex gap-2">
                  <!-- <span class="text-xs flex gap-1 font-semibold">
                    <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                    4.5
                  </span> -->
                  <!-- <span class="text-xs">Reviews ({{item?.reviews?.length}})</span> -->
                </span>
              </div>

              <div>
                <span v-for="item in ['overview', 'review']" :key="item">{{ item }}</span>
                <div>
                  <span>
                    <h4 class="font-semibold text-[13px]">Description</h4>
                    <p class="text-xs">
                      {{ item?.description }}
                    </p>
                  </span>
                </div>
              </div>

              <div>
                <span class="text-[13px] block">Location: {{ item?.location }}</span>
                <span class="text-[13px] block font-semibold" v-if="item?.shop"
                  >Store Name: {{ item?.shop?.name }}</span
                >
                <hr class="my-4" />
                <div v-if="isMyProduct" class="flex justify-between items-center">
                  <h4 class="font-bold text-primary">{{ $currencyFormat(item?.base_price) }}</h4>
                  <button class="brand-btn-md brand-primary">Edit</button>
                </div>
                <div v-else class="flex justify-between">
                  <span class="flex gap-3">
                    <button class="brand-btn-md brand-outline">Make an offer</button>
                    <button class="brand-btn-md brand-outline">Start a chat</button>
                  </span>
                  <button class="brand-btn-md brand-primary">Order Now</button>
                </div>
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
  props: {
    productID: Number,
    isMyStore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ID: this.$route.params.id,
      item: {},
      loading: false
    }
  },

  methods: {
    filterFunc() {
      this.isFilterOpen = !this.isFilterOpen
    },
    getProduct() {
      this.loading = true
      this.$products
        .getRecord(this.ID)
        .then((res) => {
          console.log('data from products list:', res)
          this.item = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getUser() {
      this.$auth.getProfile().then((res) => {
        console.log(res)
      })
    }
  },

  beforeMount() {
    this.getProduct()
    this.getUser()
    console.log(this.$route)
  },

  // beforeRouteEnter(to, from) {
  //   console.log(to, from);
  // },

  watch: {
    productID: {
      handler(val) {
        if (val) {
          this.ID = val
          this.getProduct()
        }
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isMyProduct() {
      return this.user.seller_id == this.item.seller_id
    }
  }
}
</script>

<style></style>
