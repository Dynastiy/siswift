<template>
  <div>
    <el-dropdown trigger="click" placement="bottom-start">
      <span class="el-dropdown-link flex items-center">
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
              v-model="search"
            />
            <span class="password-iccon" v-if="loading">
              <i-icon icon="eos-icons:loading" class="form-icon text-gray-400" />
            </span>
          </span>
        </div>
      </span>
      <template #dropdown>
        <div class="p-4 w-[250px]">
          <h4 class="font-semibold text-[14px]">Search results</h4>
          <div class="flex flex-col gap-4 mt-4">
            <div
              class="flex gap-2"
              v-for="item in items"
              :key="item?.id"
              @click="showProduct(item)"
              role="button"
            >
              <img
                :src="imgUrl + 'product/' + item?.main_image"
                alt=""
                role="button"
                class="h-[40px] w-[40px] object-contain rounded-lg"
              />
              <div class="flex flex-col">
                <span class="font-semibold block">{{ item?.name }}</span>
                <span class="block text-sm">{{ $currencyFormat(item?.base_price) }}</span>
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
      loading: false
    }
  },

  methods: {
    showProduct(e) {
      this.$router.push(`/app/product/${e?.id}`)
    },

    getProducts() {
      this.loading = true
      let payload = {
        search: this.search
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

  watch: {
    search: {
      handler: debounce(function () {
        this.getProducts()
      }, 500)
    }
  }
}
</script>

<style></style>
