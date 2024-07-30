<template>
  <!-- bg-white rounded-md p-6 -->
  <div class="body-content w-full lg:page-bg md:page-bg">
    <!-- <div>
      {{ loading }}
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
            <!-- <img
              :src="imgUrl + 'product/' + item?.main_image"
              alt=""
              role="button"
              class="h-[300px] w-full rounded-md object-contain object-center border border-primary"
            /> -->
            <wxCarousel v-if="item" :imagesProps="images" />
            <div class="mt-4">
              <!-- <div class="grid grid-cols-4 gap-3 mb-3">
                <img
                  v-for="j in item?.product_images"
                  :key="j?.id"
                  :src="imgUrl + 'product/' + j?.image"
                  alt=""
                  role="button"
                  class="h-[40px] w-[60px] rounded-[4px] object-cover object-center"
                />
              </div> -->
              <span class="flex gap-2 items-center justify-end">
                <span
                @click="$router.push(`/app/product/${ID}/sponsor-listing`)"
                  v-if="isMyProduct"
                  role="button"
                  class="bg-accent p-2 rounded-md whitespace-nowrap block text-primary text-xs font-semibold"
                >
                  {{ item?.isfeatured ? 'Check Sponsored Analysis' : 'Sponsor Listing' }}
                </span>

                <button
                  v-if="!isMyProduct"
                  @click="addToWishlist"
                  :class="[
                    'p-2 rounded-md  text-lg',
                    wishlist_item ? 'bg-gray-200 text-gray-700' : 'bg-accent text-primary'
                  ]"
                  :disabled="wishlist_item"
                >
                  <i-icon icon="ph:heart-fill" />
                </button>
                <span
                  v-if="!isMyProduct"
                  class="bg-accent p-2 rounded-md text-primary text-lg"
                  role="button"
                  @click="$router.push('/app/support/send-mail')"
                >
                  <i-icon icon="material-symbols:report" />
                </span>
                <button @click="onShare" class="bg-accent p-2 rounded-md text-primary text-lg">
                  <i-icon icon="ic:baseline-share" />
                </button>
              </span>
            </div>

            <div class="mt-4 flex flex-col gap-1">
              <span class="text-[13px] block"><b>Brand:</b> {{ item?.brand?.name }}</span>
              <h4 class="font-semibold">{{ `${item?.name} ${item?.model}` }}</h4>

              <h4 class="font-bold text-xl text-primary">
                {{ `${$currencyFormat(item?.base_price)}` }}
              </h4>
              <div class="flex flex-col gap-[5px]">
                <div
                  class="bg-accent p-[6px] w-fit"
                  v-for="(obj, i) in bulk"
                  :key="i"
                >
                  <span class="text-[12px] block w-fit">
                    <b>{{ `From ${obj.qty} pieces:` }}</b>
                    {{ `${$currencyFormat(obj.price)}/piece` }}</span
                  >
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span
                  class="text-[11px] block bg-primary text-white w-fit rounded-sm px-[6px] py-[2px] block"
                >
                  {{ item?.condition.split('-').join(' ') }}</span
                >
                <span class="text-[13px] block"><b>RAM:</b> {{ item?.ram }}</span>
                <span class="flex gap-[7px] text-sm items-center">
                  <b>Color:</b>
                  <span
                    class="block w-4 h-4 p-2 cursor-pointer rounded-full ring-2 ring-offset-2 ring-primary"
                    :style="{
                      backgroundColor: item?.colour
                    }"
                  ></span>
                </span>
                <span class="flex gap-2">
                  <!-- <span class="text-xs flex gap-1 font-semibold">
                    <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                    4.5
                  </span> -->
                  <!-- <span class="text-xs">Reviews ({{item?.reviews?.length}})</span> -->
                </span>
              </div>

              <div>
                <span class="border-b border-b-gray-400 w-full flex gap-4 justify-center">
                  <span
                    v-for="(item, idx) in ['description', 'reviews']"
                    :key="idx"
                    role="button"
                    class="capitalize w-full text-center text-sm"
                    @click="activeTab = item"
                    :class="{
                      'border-b text-primary border-b-primary font-semibold': activeTab === item
                    }"
                  >
                    {{ item }}
                  </span>
                </span>
                <div class="mt-2">
                  <div v-if="activeTab == 'description'">
                    <span>
                      <h4 class="font-semibold text-[13px]">Description</h4>
                      <div class="text-xs" v-html="item?.description"></div>
                    </span>
                  </div>
                  <div v-if="activeTab == 'reviews'">
                    <div class="flex flex-col gap-3">
                      <div v-for="obj in item?.reviews" :key="obj?.id">
                        <h6 class="text-[14px] font-semibold">
                          {{ `${obj?.user?.firstname} ${obj?.user?.lastname}` }}
                        </h6>
                        <div class="flex items-start gap-2">
                          <span>
                            <img
                              :src="
                                obj?.user?.image
                                  ? imgUrl + 'user/profile/' + obj?.user?.image
                                  : image
                              "
                              class="w-[35px] h-[35px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
                            />
                          </span>
                          <div>
                            <p class="text-sm">comment</p>
                            <span class="text-xs flex gap-[2px]">
                              <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                              4
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-[4px]" />

              <div>
                <span class="text-[13px] block">Address: {{ item?.location }}</span>
                <span class="text-[13px] flex gap-[3px] items-center"
                  ><i-icon icon="tabler:location-filled" class="text-secondary text-sm" />
                  {{
                    item?.state === 'AkwaIbom'
                      ? `${item?.lga}, Akwa Ibom`
                      : `${item?.lga}, ${item?.state}`
                  }}</span
                >
                <!-- <span class="text-[13px] block font-semibold" v-if="item?.shop"
                  >Store Name: {{ item?.shop?.name }}</span
                > -->
                <hr class="my-4" />
                <!-- <div v-if="isMyProduct" class="flex justi fy-between items-center">
                  <h4 class="font-bold text-primary">{{ $currencyFormat(item?.base_price) }}</h4>
                  <button class="brand-btn-md brand-primary">Edit</button>
                </div> -->
                <div
                  v-if="!isMyProduct"
                  class="flex lg:flex-row md:flex-row flex-col items-start justify-between gap-3"
                >
                  <div>
                    <div class="flex gap-2 mb-3">
                      <img
                        :src="
                          item?.shop?.user?.image
                            ? imgUrl + 'user/profile/' + item?.shop?.user.image
                            : image
                        "
                        class="w-[45px] h-[45px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
                      />
                      <span class="flex flex-col">
                        <span class="text-[14px] font-semibold" role="button" @click="goToSeller">{{
                          `${item?.shop?.user?.firstname} ${item?.shop?.user?.lastname}`
                        }}</span>
                        <span class="text-[12px] text-gray-400">{{
                          `joined Siswift ${$formatRelativeTime(item?.shop?.user?.created_at)}`
                        }}</span>
                      </span>
                    </div>
                    <span class="flex lg:flex-row md:flex-row flex-col gap-3 items-center">
                      <span v-if="displayContact">
                        <a
                          class="flex items-center gap-[5px] text-sm font-semibold"
                          :href="`tel:${item?.shop?.user?.mobile}`"
                          ><i-icon icon="solar:phone-bold" class="form-icon text-gray-600" />
                          {{ item?.shop?.user?.mobile }}
                        </a>
                      </span>
                      <button
                        v-else
                        class="brand-btn-md brand-primary flex items-center gap-[6px]"
                        @click="showContact"
                      >
                        <i-icon icon="solar:phone-bold" class="form-icon text-white" />
                        Show Contact
                      </button>
                      <button class="brand-btn-md brand-outline" @click="startChat">
                        Start a chat
                      </button>
                    </span>
                  </div>
                  <div class="flex lg:flex-row md:flex-row flex-col gap-2">
                    <input
                      type="text"
                      v-model="quantity"
                      :disabled="item?.track_inventory <= 1"
                      class="input lg:w-[80px] md:w-[100px]"
                    />
                    <button class="brand-btn-md brand-primary whitespace-nowrap" @click="addToCart">
                      Add to Cart
                    </button>
                    <button class="brand-btn-md brand-outline whitespace-nowrap" @click="makeOffer">
                      Make an offer
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
</template>

<script>
import image from '@/assets/img/no-user.png'
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
      loading: false,
      activeTab: 'description',
      image,
      quantity: 1,
      displayContact: false,
      wishlistItems: []
    }
  },

  methods: {
    filterFunc() {
      this.isFilterOpen = !this.isFilterOpen
    },

    showContact() {
      this.displayContact = !this.displayContact
    },

    startChat() {
      let url = ''
      // this.$router.push(`/app/messages/?user=${this.item?.shop?.user_id}`)
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }
      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        url = `/app/message/m?user=${this.item?.shop?.user_id}&userData=${JSON.stringify(
          this.item?.shop?.user
        )}`
      } else {
        console.log('You are using a desktop device')
        url = `/app/messages/?user=${this.item?.shop?.user_id}&userData=${JSON.stringify(
          this.item?.shop?.user
        )}`
      }
      this.$router.push(url)
    },

    getWishlist() {
      this.loading = true
      this.$user
        .wishList()
        .then((res) => {
          console.log('data from products list:', res)
          let req = []
          res.forEach((item) => {
            console.log(item)
            let dataInfo = {
              ...item.product,
              cart_id: item.id,
              offer_price: item.offer_price,
              quantity: item.quantity,
              session_id: item.session_id,
              status: item.status
            }
            req.push(dataInfo)
          })
          this.wishlistItems = req
        })
        .finally(() => {
          this.loading = false
        })
    },

    async onShare() {
      try {
        await navigator.share({
          title: `Checkout my amazing product at ${this.windowOrigin}`,
          text: '',
          url: this.productLink
        })
      } catch (err) {
        alert(err)
      }
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
    },

    makeOffer() {
      this.$router.push(`/app/make-offer/${this.ID}`)
    },

    addToCart() {
      let payload = {
        product_id: this.ID,
        quantity: this.quantity,
        offer_price: this.item.base_price
      }
      this.$user.addToCart(payload).then((res) => {
        console.log(res)
        this.$router.push('/app/my-cart')
      })
      console.log(payload)
    },

    addToWishlist() {
      let payload = {
        product_id: this.ID,
        quantity: this.quantity,
        offer_price: this.item.base_price
      }
      this.$user.addToWishlist(payload).then((res) => {
        console.log(res)
        this.$router.push('/app/my-favourites')
      })
      console.log(payload)
    },

    removeFromCart(id) {
      this.$user.removeFromCart(id).then((res) => {
        console.log(res)
      })
    },

    goToSeller() {
      let sellerName = this.item?.shop
      console.log(sellerName)
      let name = `${sellerName?.user.firstname}-${sellerName?.user.lastname}`
      let editedName = name.toLowerCase()
      this.$router.push(`/app/product/${editedName}/seller/${sellerName.user_id}`)
    }
  },

  beforeMount() {
    this.getProduct()
    this.getUser()
    this.getWishlist()
  },

  // beforeRouteEnter(to, from) {
  //   console.log(to, from);
  // },

  watch: {
    '$route.params.id': {
      handler(val) {
        // if (newVal !== oldVal) {
        this.ID = val
        this.getProduct()
        // }
      },
      immediate: true
    },

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
      let info = ''
      if (this.item.shop) {
        info = this.user.id == this.item.shop.user_id
      }
      return info
    },

    windowOrigin() {
      return window.location.origin
    },

    productLink() {
      return `${this.windowOrigin}/app/product/${this.ID}`
    },

    wishlist_item() {
      const val = this.wishlistItems.filter((elem) => this.ID == elem.id)
      const result = val.length !== 0
      return result
    },

    bulk(){
      return this.item.bulk_price == null ? [] : JSON.parse(this.item.bulk_price).length  === 0 ? [] : JSON.parse(this.item?.bulk_price)
    },

    images(){
      let otherImages = []
      let allImages = this.item ? this.item?.product_images : []
      for(let i = 0; i < allImages.length; i++) {
        otherImages.push({
          id: i+1,
          src:this.imgUrl + 'product/' + this.item?.product_images[i].image,
          isLink: false
        })
      }
      let images = [
        {
          id: 1,
          src: this.imgUrl + 'product/' + this.item?.main_image,
          isLink: false
        },
        ...otherImages
      ]
      
      return images
    }
  }
}
</script>

<style scoped>
ol li {
  list-style: decimal !important;
  margin-left: 20px !important;
}
</style>
