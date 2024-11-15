<template>
  <div>
    <div class="flex items-start gap-4 w-full">
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <h4 class="mb-3 font-medium text-primary text-[18px]">
            Search Results for
            <span class="text-[#000] capitalize font-bold">{{ `"${filterData.search}"` }}</span>
            {{ `in ${filterData.state ? filterData.state : state}` }}
          </h4>

          <button
            class="lg:hidden md:hidden brand-btn-md text-sm brand-primary flex gap-1 items-center"
            @click="filterFunc"
          >
            <i-icon icon="mdi:filter" />
            Filter
          </button>
        </div>
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

      <div
        class="bg-white rounded-md filter-container min-h-[80vh] lg:block md-block hidden"
        :class="[isFilterOpen ? 'w-[400px] p-6' : 'w-0 overflow-x-hidden hidden']"
      >
        <ProductFilter @close="$router.go(-1)" />
      </div>
    </div>

    <!-- Filter for Mobile -->
    <Sidebar v-model:visible="drawer" position="right" style="width: 100%">
      <template #container="{ closeCallback }">
        <div class="p-6">
          <ProductFilter @close="closeCallback" />
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
      filterData: {
        state: '',
        category: '',
        brand: '',
        search: '',
        sort: '',

        condition: '',
        date_listed: '',
        min_price: '',
        max_price: '',
        color: ''
      },
      state: null,
      loading: false,
      locationItems: [],
      promotedItems: [],
      isFilterOpen: true,
      drawer: false
    }
  },

  methods: {
    showProduct(e) {
      this.$router.push(`/app/product/${e?.id}`)
    },

    filterFunc() {
      this.drawer = true
    },

    closeFilter() {
      this.drawer = false
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
                this.state = locat
                this.$router.push({
                  query: {
                    ...this.$route.query,
                    state: locat
                  }
                })
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

    getLocationProducts(value) {
      if (!value) this.loading = true
      this.$products
        .listByLocation(this.filterData)
        .then((res) => {
          console.log(res)
          this.locationItems = res.data
          this.promotedItems = res.ads
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  watch: {
    '$route.query': {
      handler(val) {
        if (Object.keys(val).length > 0) {
          console.log(val)
          this.filterData = val
          this.getLocationProducts()
          this.searching = true
          return
        }
      },
      immediate: true,
      deep: true
    },

    state: {
      handler(val) {
        if (val) {
          // this.filterData.state = val
          this.$router.push({
            query: {
              ...this.$route.query,
              state: this.state
            }
          })
        }
      },
      immediate: true
    }
  },

  beforeMount() {
    this.getUserLocation()
  },

  computed: {
    searchData() {
      return this.$route.query.search
    }
  }
}
</script>

<style></style>
