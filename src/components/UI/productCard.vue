<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4 mt-4">
          <div v-for="item in 8" :key="item">
            <el-skeleton-item variant="image" style="height: 200px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <div
            class="grid grid-cols-2 gap-4"
            :class="[
              isFilterOpen ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-4 md:grid-cols-4'
            ]"
          >
            <div v-for="(item, idx) in products" :key="idx" class="hover:shadow">
              <div>
                <div class="" @click="viewProduct(item)">
                  <img
                    :src="imgUrl + item?.main_image"
                    alt=""
                    role="button"
                    class="w-full h-[150px] object-contain"
                  />
                </div>
              </div>
              <div class="mt-2 flex flex-col justify-between px-4 p-3">
                <div class="flex justify-between items-center">
                  <h6
                  role="button"
                  class="text-black1 capitalize text-md font-semibold"
                  @click="viewProduct(item)"
                >
                  {{ item?.name }}
                </h6>

                <el-dropdown trigger="click" placement="bottom-end" v-if="user.seller_id === item?.seller_id">
                  <span class="el-dropdown-link flex items-center">
                    <i-icon icon="pepicons-pencil:dots-y" width="20px" />
                  </span>
                  <template #dropdown>
                    <div class="p-4 w-[150px]">
                      <div class="mt-3 flex flex-col gap-4">
                        <span>Hello</span>
                      </div>
                    </div>
                  </template>
                </el-dropdown>
                </div>

                <small class="text-xs block text-gray-500" v-if="item?.shop">
                  Seller:{{ item?.shop?.name }}
                </small>
                <!-- <small class="text-xs block text-gray-500"> {{ item?.brand?.name }} </small> -->

                <div class="flex justify-between items-center mt-3">
                  <span
                    class="text-primary font-bold lg:text-sm md:text-sm text-xs block leading-tight"
                  >
                    {{ $currencyFormat(item?.base_price) }}
                  </span>
                  <!-- <span class="text-xs flex gap-1">
                    <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                    4.5
                  </span> -->
                </div>
              </div>
            </div>
          </div>
          <div v-if="!loading && products.length === 0" class="flex justify-center">
            <div class="text-center flex flex-col gap-4">
              <span
                class="bg-accent block h-[200px] w-[200px] rounded-full flex justify-center items-center"
              >
                <i-icon :icon="iconType" class="text-[100px]" />
              </span>
              <h5>{{ emptyText }}</h5>
              <button
                v-if="hasButton"
                class="brand-btn-md text-sm brand-primary mx-auto w-fit flex gap-1 items-center"
                @click="$router.push(btnUrl)"
              >
                {{ btnText }}
              </button>
            </div>
          </div>
          <!-- <div class="flex justify-end">
            <wxPagination :meta="meta" @next="filter($event)" />
          </div> -->
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    isFilterOpen: {
      type: Boolean,
      default: false
    },
    isHomePage: {
      type: Boolean,
      default: false
    },
    hasButton: {
      type: Boolean,
      default: true
    },
    iconType: String,
    btnText: String,
    btnUrl: String,
    emptyText: String
  },

  methods: {
    viewProduct(item) {
      this.$emit('viewProduct', item)
    },

    cartFunc(e, value) {
      const payload = {
        product_id: e.id,
        quantity: 1
      }
      if (value === 'add') {
        this.$customer.addToCart(payload).then(() => {
          this.getUser()
        })
      } else {
        const cartItems = this.user.cart
        const val = cartItems.find((elem) => e.id === elem.product_id)
        console.log(val, 'omooo')
        this.$customer.removeFromCart(val.id).then(() => {
          this.getUser()
        })
      }
    },

    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setUser', res.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    wishlistFunc(e, value) {
      const payload = {
        product_id: e.id
      }
      if (value === 'add') {
        this.$customer.addToWishlist(payload).then(() => {
          this.getUser()
        })
      } else {
        const wishlist = this.user.wish_lists
        const val = wishlist.find((elem) => e.id === elem.product_id)
        console.log(val, 'omooo')
        this.$customer.removeFromWishlist(val.id).then(() => {
          this.getUser()
        })
      }
    },

    cart_item(item) {
      const token = this.$store.getters['auth/getAuthenticated']
      if (token) {
        const cartItems = this.user.cart
        const val = cartItems.filter((elem) => item.id === elem.product_id)
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    },

    wishlist_item(item) {
      const token = this.$store.getters['auth/getAuthenticated']
      if (token) {
        const wishlistItems = this.user.wish_lists
        const val = wishlistItems.filter((elem) => item.id === elem.product_id)
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    }
  },

  beforeMount() {},

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.middle {
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 15px;
  width: 80%;
  margin: 0 auto;
  position: absolute;
  left: 10%;
  bottom: 5%;
  color: #000;
}

.img-services1:hover .middle {
  opacity: 1;
  transition: 0.4s;
}

.img-services1:hover img {
  transform: scale(1.05);
}

.middle .icon:hover,
.middle i:hover {
  color: var(---secondary-color) !important;
}

.img-services1 {
  width: 100%;
  height: 250px;
  background-color: #fff;
  /* border-radius: 10px; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-services1 .percentage {
  position: absolute;
  background-color: var(---secondary-color);
  top: 3%;
  left: 3%;
  border-radius: 4px;
  color: #fff;
  padding: 0.1rem 0.8rem;
  font-size: 14px;
  font-weight: 500;
}

.img-services1 img {
  max-width: 100px;
  height: auto;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0 auto;
}

.img-services1:hover:before {
  content: '';
  position: absolute;
  height: 100px;
  width: 100px;
  top: 0;
  left: 0;
  background-color: red;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.product--image {
  height: 200px;
  width: 100%;
  object-position: center;
  object-fit: cover;
}

.ribbon {
  position: absolute;
  top: 5px;
  right: 0;
  background: linear-gradient(90deg, var(---primary-color), var(---black3));
  color: #fff;
  padding: 0.3rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 5px 0 0 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}
</style>
