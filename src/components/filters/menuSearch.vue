<template>
  <div>
    <!-- <AutoComplete
      v-model="search"
      optionLabel="name"
      :suggestions="items"
      @complete="getProducts"
      placeholder="Search Devices"
      class="text-sm"
    >
    <template #option="slotProps">
        <div class="flex align-options-center">
            <div
              class="flex gap-2"
              @click="showProduct(slotProps?.option)"
              role="button"
            >
              <img
                :src="imgUrl + 'product/' + slotProps?.option?.main_image"
                alt=""
                role="button"
                class="h-[40px] w-[40px] object-contain rounded-lg"
              />
              <div class="flex flex-col">
                <span class="font-semibold block leading-[12px]">{{ slotProps?.option?.name }}</span>
                <span class="block text-[13px]">{{ $currencyFormat(slotProps?.option?.base_price) }}</span>
              </div>
            </div>
        </div>
    </template>
    </AutoComplete> -->
    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link flex items-center">
        <div class="input-field">
          <span class="w-full flex gap-2 items-center py-1">
            <input
              type="text"
              class="w-full py-1"
              placeholder="Search for phone"
              v-model="search"
              @keyup.enter="openResult"
            />
            <span class="password-iccon" @click="openResult">
              <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
            </span>
            <!-- <span class="password-iccon" v-if="loading">
              <i-icon icon="eos-icons:loading" class="form-icon text-gray-400" />
            </span> -->
          </span>
        </div>
      </span>
      <template #dropdown>
        <div class="p-4 w-[250px] h-[350px] overflow-y-auto">
          <span class="password-iccon" v-if="loading">
            <i-icon icon="eos-icons:loading" class="text-4xl text-gray-400" />
          </span>

          <div v-else>
            <h4 class="font-semibold text-[14px] text-primary">Search results</h4>
            <div class="flex flex-col gap-2 mt-4">
              <div
                class="flex gap-2"
                v-for="item in items"
                :key="item?.id"
                @click="showProduct(item)"
                role="button"
              >
                <!-- <img
                :src="imgUrl + 'product/' + item?.main_image"
                alt=""
                role="button"
                class="h-[40px] w-[40px] object-contain rounded-lg"
              /> -->
                <div class="flex flex-col">
                  <span class="font-semibold block">{{ item?.name }}</span>
                  <!-- <span class="block text-sm">{{ $currencyFormat(item?.base_price) }}</span> -->
                </div>
              </div>
            </div>

            <span class="flex justify-between mt-3">
              <h4 class="font-semibold text-[14px] text-primary">Recent</h4>
              <span class="text-xs text-primary underline" role="button" @click="removeRecent"
                >Clear All</span
              >
            </span>
            <div class="flex flex-col gap-2 mt-4">
              <span
                class="flex justify-between items-center"
                v-for="item in recentItems"
                :key="item"
              >
                <span class="font-semibold block" @click="openSearch(item)"> {{ item }}</span>
                <span role="button" @click="removeItem(item)">
                  <i-icon icon="material-symbols:close" />
                </span>
              </span>
            </div>

            <h4 class="font-semibold text-[14px] text-primary mt-3">Suggested Items</h4>
            <div class="flex flex-col gap-2 mt-4">
              <div
                class="flex gap-2"
                v-for="item in suggestions"
                :key="item?.id"
                @click="showProduct(item)"
                role="button"
              >
                <!-- <img
                  :src="imgUrl + 'product/' + item?.main_image"
                  alt=""
                  role="button"
                  class="h-[40px] w-[40px] object-contain rounded-lg"
                /> -->
                <div class="flex flex-col">
                  <span class="font-semibold block">{{ item?.name }}</span>
                  <!-- <span class="block text-sm">{{ $currencyFormat(item?.base_price) }}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  data() {
    return {
      search: '',
      items: [],
      loading: false,
      suggestions: [],
      payload: {
        state: ''
      }
    }
  },

  methods: {
    showProduct(e) {
      // this.$router.push(`/app/product/${e?.id}`)
      this.$router.push(`/app/search-results?search=${e.name}`)
      this.addToLocalStorage(e.name)
    },

    openResult() {
      this.$router.push(`/app/search-results?search=${this.search}`)
      this.addToLocalStorage(this.search)
    },

    openSearch(e) {
      this.$router.push(`/app/search-results?search=${e}`)
      // this.addToLocalStorage(this.search)
    },

    removeItem(e) {
      this.$store.commit('auth/removeRecent', e)
    },

    addToLocalStorage(value) {
      this.$store.commit('auth/setSearches', value)
    },

    removeRecent() {
      this.$store.commit('auth/removeAllItems')
    },

    async getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude
            this.long = position.coords.longitude
            //   console.log(this.position, 'Position');
            console.log(position, 'Position')
            // };

            this.$axios
              .get(`https://nominatim.openstreetmap.org/reverse`, {
                params: {
                  lat: this.lat,
                  lon: this.long,
                  format: 'json',
                  addressdetails: 1
                }
              })
              .then((res) => {
                console.log(res, 'citry')
                let locat =
                  res.data.address.state.split(' ').length > 2
                    ? res.data.address.state.split(' ').slice(0, 2).join(' ')
                    : res.data.address.state.split(' ')[0]
                this.payload.state = locat.toLowerCase()
                this.getLocationProducts()
              })
          },
          (error) => {
            this.error = error.message
            console.error('Error getting location:', this.error)
          }
        )
      } else {
        this.error = 'Geolocation is not supported by this browser.'
        console.error(this.error)
      }
    },

    openProductDetails(e) {
      this.isProductDetails = this.isProductDetails === e ? null : e
    },

    getLocationProducts(value) {
      if (!value) this.loading = true
      this.$products
        .listByLocation(this.payload)
        .then((res) => {
          this.suggestions = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    getProducts() {
      this.loading = true
      let payload = {
        search: this.search.name
      }
      this.$products
        .list(payload)
        .then((res) => {
          console.log('data from products list:', res)
          this.items = res.data.products.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  beforeMount() {
    this.getUserLocation()
  },

  watch: {
    search: {
      handler: debounce(function () {
        this.getProducts()
      }, 500)
    },
    recentItems: {
      handler(val) {
        console.log(val)
      },
      deep: true,
      immediate: true
    }
  },

  computed: {
    recentItems() {
      return this.$store.getters['auth/getRecentSearches']
    }
  }
}
</script>

<style></style>
