<template>
  <div class="">
    <div class="flex justify-between items-center mb-4 gap-4">
      <h4 class="font-semibold">Filter</h4>
      <span class="flex gap-2 items-center">
        <!-- <button
          class="rounded-[6px] border border-gray-500 text-[13px] py-2 px-2 flex gap-2 items-center"
        >
          Sort by
          <i-icon icon="fa:angle-down" class="text-[10px]" />
        </button> -->

        <select name="" v-model="filterData.sort" class="input py-2 capitalize" id="">
          <option selected disabled value="">--Sort by--</option>
          <option v-for="(item, idx) in sortOptions" :key="idx" :value="item.key">
            {{ item.label }}
          </option>
        </select>
        <span class="text-primary font-medium text-[13px]" role="button" @click="close">Close</span>
      </span>
    </div>

    <div class="flex flex-col gap-6">
      <div class="input-field">
        <span class="w-full flex gap-2 items-center py-1">
          <span class="password-iccon">
            <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
          </span>
          <input
            type="text"
            class="w-full py-1"
            id="search"
            name="nav-search"
            placeholder="Search for phone"
            v-model="filterData.search"
          />
          <!-- <span class="password-iccon">
              <i-icon icon="eos-icons:loading" class="form-icon text-gray-400" />
            </span> -->
        </span>
      </div>
      <div>
        <h4 class="font-semibold text-[14px]">Brand</h4>
        <span class="flex flex-wrap w-full gap-2">
          <span v-for="item in brands" :key="item?.id" class="flex gap-1">
            <input
              v-model="filterData.brand"
              class="accent-primary"
              type="radio"
              :name="item.name"
              :value="item.id"
              :id="item.id"
            />
            <label class="text-[13px]" for=""> {{ item?.name }}</label>
          </span>
        </span>
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Category</h4>
        <span class="flex flex-wrap w-full gap-2">
          <span v-for="item in categories" :key="item?.id" class="flex gap-1">
            <input
              v-model="filterData.category"
              class="accent-primary"
              type="radio"
              :name="item.name"
              :value="item.id"
              :id="item.id"
            />
            <label class="text-[13px]" for=""> {{ item?.name }}</label>
          </span>
        </span>
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Condition</h4>
        <select name="" v-model="filterData.condition" class="input py-2" id="">
          <option selected disabled value="">---Select One---</option>
          <option
            v-for="item in [
              'new',
              'like-new',
              'refurbished',
              'used-good',
              'used-fair',
              'used-poor'
            ]"
            class="capitalize"
            :key="item"
            :value="item"
          >
            {{ item.split('_').join(' ') }}
          </option>
        </select>
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Price</h4>
        <!-- <Slider v-model="value" range class="w-14rem" /> -->
        <el-slider v-model="value" range  :max="999999" />
        <!-- <input type="range" min="0"
        max="100" class="input" v-model="filterData.created_at" /> -->
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Date Listed</h4>
        <input type="date" class="input" v-model="filterData.created_at" />
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Color</h4>
        <input type="color" v-model="filterData.colour" />
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">State</h4>
        <select name="" v-model="filterData.state" class="input py-2" id="">
          <option selected disabled value="">---Select One---</option>
          <option v-for="item in states" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <!-- <div>
        <h4 class="font-semibold text-[14px]">Color</h4>
        <span class="flex flex-wrap w-full gap-3">
          <span
            v-for="(item, idx) in ['Red', 'Blue', 'Yellow', 'Pink', 'Orange', 'Pink']"
            :key="idx"
            class="flex gap-1"
          >
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div> -->

      <!-- <div>
        <h4 class="font-semibold text-[14px]">Delivery Fee</h4>
        <span class="flex flex-wrap w-full gap-3">
          <span
            v-for="(item, idx) in ['Delivery Fee', 'No delivery fee']"
            :key="idx"
            class="flex gap-1"
          >
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div> -->

      <!-- <div>
        <h4 class="font-semibold text-[14px]">Condition</h4>
        <span class="flex flex-wrap w-full gap-3">
          <span v-for="(item, idx) in ['Used', 'New']" :key="idx" class="flex gap-1">
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div> -->

      <!-- <div>
        <h4 class="font-semibold text-[14px]">Date Listed</h4>
        <span class="flex flex-wrap w-full gap-3">
          <span
            v-for="(item, idx) in ['Anytime', 'Past 24 Hours', 'Past week', 'Past month']"
            :key="idx"
            class="flex gap-1"
          >
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div> -->

      <!-- <div>
        <h4 class="font-semibold text-[14px]">Price Range</h4>
        
        <el-slider v-model="value" range class="accent-primary" :max="100"> </el-slider>
      </div> -->
    </div>
  </div>
</template>

<script>
// import menuSearch from './menuSearch.vue'
// import Slider from 'primevue/slider'
export default {
  // components: { Slider },
  data() {
    return {
      value: [10000, 100000],
      brands: [],
      categories: [],
      filterData: {
        state: '',
        category: '',
        brand: '',
        search: '',
        sort: '',

        condition: '',
        created_at: '',
        min_price: '',
        max_price: '',
        colour: ''
      },
      states: [],
      sortOptions: [
        {
          label: 'Relevance',
          key: 'popular'
        },
        {
          label: 'Newest Listing First',
          key: 'latest'
        },
        {
          label: 'Price(High to Low)',
          key: 'max_price'
        },
        {
          label: 'Price (Low to High)',
          key: 'low_price'
        }
      ]
    }
  },

  methods: {
    close() {
      this.$emit('close')
      this.$router.push({ query: {} })
    },

    async getStates() {
      try {
        const req = await this.$axios.get('https://nga-states-lga.onrender.com/fetch')
        console.log(req.data)
        this.states = req.data
      } catch (res) {
        console.log(res)
      }
    },

    getSetting() {
      this.$config.getSettings().then((res) => {
        console.log('settings:', res)
        this.categories = res.categories
        this.brands = res.brands
      })
    }
  },

  watch: {
    filterData: {
      handler(val) {
        this.$router.push({ query: val })
      },
      immediate: false,
      deep: true
    },

    searchData: {
      handler(val) {
        if (val) {
          this.filterData.search = val
        }
      },
      immediate: true
    },
    value: {
      handler(val) {
        this.filterData.max_price = val[1]
        this.filterData.min_price = val[0]
      }
    }
  },

  computed: {
    searchData() {
      return this.$route.query.search
    },

  },

  beforeMount() {
    this.getStates()
    this.getSetting()
  }
}
</script>

<style></style>
