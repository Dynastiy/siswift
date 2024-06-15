<template>
  <div class="">
    <div class="flex justify-between items-center mb-4 gap-4">
      <h4 class="font-semibold">Filter</h4>
      <span class="flex gap-2 items-center">
        <button
          class="rounded-[6px] border border-gray-500 text-[13px] py-2 px-2 flex gap-2 items-center"
        >
          Sort by
          <i-icon icon="fa:angle-down" class="text-[10px]" />
        </button>
        <span class="text-primary font-medium text-[13px]" role="button" @click="$emit('close')"
          >Close</span
        >
      </span>
    </div>

    <div class="flex flex-col gap-6">
      <menu-search />
      <div>
        <h4 class="font-semibold text-[14px]">Brand</h4>
        <span class="flex flex-wrap w-full gap-2">
          <span
            v-for="(item, idx) in ['Tecno', 'Samsung', 'Itel', 'Infinix', 'Oppo', 'Xaomi']"
            :key="idx"
            class="flex gap-1"
          >
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Location</h4>
        <select name="" class="input py-2" id="">
          <option selected disabled value="">---Select One---</option>
        </select>
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Condition</h4>
        <span class="flex flex-wrap w-full gap-3">
          <span v-for="(item, idx) in ['Used', 'New']" :key="idx" class="flex gap-1">
            <input class="accent-primary" type="checkbox" name="" id="" />
            <label class="text-[13px]" for="">{{ item }}</label>
          </span>
        </span>
      </div>

      <div>
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
      </div>

      <div>
        <h4 class="font-semibold text-[14px]">Price Range</h4>
        <!-- <vSlider v-model="value" range class="w-14rem" /> -->
        <el-slider v-model="value" range class="accent-primary" :max="100"> </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
import menuSearch from './menuSearch.vue'
export default {
  components: { menuSearch },
  data() {
    return {
      value: [4, 40]
    }
  }
}
</script>

<style></style>
