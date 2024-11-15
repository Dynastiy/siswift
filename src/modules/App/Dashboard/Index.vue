<template>
  <div class="body flex gap-4 items-start gap-4">
    <div class="col-span-3 body-content w-full">
      <!-- Dashboard -->

      <div class="flex items-center justify-between">
        <h4 class="mb-3 font-semibold text-lg">Recommended Items</h4>
        <!-- {{location}} -->
        <div class="flex gap-3 items-center">
          <button
            class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
            @click="$router.push('/app/product/new')"
          >
            Create Ad
          </button>
          <div class="flex justify-end gap-4" v-if="!isFilterOpen">
            <button
              class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
              @click="filterFunc"
            >
              <i-icon icon="mdi:filter" />
              Filter
            </button>
            <!-- <button
            class="rounded-[6px] border border-gray-500 text-sm py-2 px-2 flex gap-2 items-center"
          >
            Sort by
            <i-icon icon="fa:angle-down" class="text-[10px]" />
          </button> -->
          </div>
        </div>
      </div>
      <div v-if="searching">
        <h4 class="mb-3 font-bold text-[15px]">{{ `Search Results` }}</h4>
        <div>
          <h4 class="mb-3 font-medium text-primary text-[15px]">Promoted Ads</h4>
          <wxProductCard
            :loading="loading"
            :products="promotedItems"
            :isFilterOpen="isFilterOpen"
            :hasButton="false"
            iconType="mdi:marketplace-outline"
            emptyText="No product in your area😥"
            @viewProduct="showProduct"
            @refresh="getLocationProducts"
          />
        </div>
        <div class="mt-3">
          <h4 class="mb-3 font-medium text-primary text-[15px]">More Suggestions</h4>
          <wxProductCard
            :loading="loading"
            :products="locationItems"
            :isFilterOpen="isFilterOpen"
            :hasButton="false"
            iconType="mdi:marketplace-outline"
            emptyText="No product in your area😥"
            @viewProduct="showProduct"
            @refresh="getLocationProducts"
          />
        </div>
      </div>
      <div v-else>
        <div>
          <h4 class="mb-3 font-medium text-primary capitalize text-[15px]">
            {{ `Within ${payload.state}` }}
          </h4>
          <div>
            <wxProductCard
              :loading="loading"
              :products="locationItems"
              :isFilterOpen="isFilterOpen"
              :hasButton="false"
              iconType="mdi:marketplace-outline"
              emptyText="No product in your area😥"
              @viewProduct="showProduct"
              @refresh="getLocationProducts"
            />
          </div>
        </div>

        <div class="mt-6">
          <h4 class="mb-3 font-medium text-primary text-[15px]">{{ `More Suggestions` }}</h4>
          <div>
            <wxProductCard
              :loading="loading"
              :products="items"
              :isFilterOpen="isFilterOpen"
              :hasButton="false"
              iconType="mdi:marketplace-outline"
              emptyText="No product Found😥"
              @viewProduct="showProduct"
              @refresh="getProducts"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-md filter-container min-h-[80vh]"
      :class="[isFilterOpen ? 'w-[400px] p-6' : 'w-0 overflow-x-hidden hidden']"
    >
      <ProductFilter @close="closeFilter" />
    </div>

    <!-- Filter for Mobile -->
    <Sidebar v-model:visible="drawer" position="right" style="width: 100%">
      <template #container="{ closeCallback }">
        <div class="p-6">
          <ProductFilter @close="closeFilter" />
          <div class="mt-4 text-center">
            <button
              class="brand-btn-md text-sm brand-primary flex gap-1 items-center"
              @click="closeCallback"
            >
              View Results
            </button>
          </div>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script>
import ProductFilter from '@/components/filters/ProductFilter.vue'
export default {
  components: { ProductFilter },
  data() {
    return {
      isFilterOpen: false,
      isProductDetails: null,
      items: [],
      locationItems: [],
      promotedItems: [],
      loading: false,
      lat: '',
      long: '',
      payload: {
        state: ''
      },
      search: {},
      searching: false,
      drawer: false,
      is_featured: '1'
    }
  },

  methods: {
    filterFunc() {
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }

      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        this.drawer = !this.drawer
      } else {
        console.log('You are using a desktop device')
        this.isFilterOpen = !this.isFilterOpen
      }
    },

    closeFilter() {
      this.isFilterOpen = false
      this.searching = false
      this.drawer = false
      // if (Object.keys(this.payload).length > 0) {
        this.getUserLocation('refresh')
      // }
    },

    async getUserLocation(value) {
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
                this.getLocationProducts(value)
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

    showProduct(e) {
      this.$router.push(`/app/product/${e?.id}`)
    },

    openProductDetails(e) {
      this.isProductDetails = this.isProductDetails === e ? null : e
    },

    getProducts() {
      this.loading = true
      this.$products
        .list()
        .then((res) => {
          this.items = res.data.products.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    getLocationProducts(value) {
      if(!value) this.loading = true
      this.$products
        .listByLocation(this.payload)
        .then((res) => {
          this.locationItems = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    getPromotedItems(value) {
      let payload = {
        ...this.payload, 
        is_featured: this.is_featured
      }
      if(!value) this.loading = true
      this.$products
        .listByLocation(payload)
        .then((res) => {
          console.log(res, 'promoted Items')
          this.promotedItems = res.ads
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  beforeMount() {
    this.getProducts()
  },

  mounted() {
    this.getUserLocation()
  },

  watch: {
    '$route.query': {
      handler(val) {
        if (Object.keys(val).length > 0) {
          console.log(val)
          this.payload = val
          this.getLocationProducts()
          this.getPromotedItems()
          this.searching = true
          return
        }
      },

      immediate: false,
      deep: true
    }
  }
}
</script>

<style></style>
