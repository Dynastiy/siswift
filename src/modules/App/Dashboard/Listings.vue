<template>
  <div>
    <span class="border-b border-b-gray-400 w-full flex gap-4 justify-center">
      <span
        v-for="(item, idx) in tabs"
        :key="idx"
        role="button"
        class="capitalize w-full text-center"
        :class="{ 'border-b text-primary border-b-primary font-semibold': activeTab === idx }"
        @click="activateMenu(idx)"
      >
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class="lg:page-bg md:page-bg mt-6">
      <all v-if="activeTab === 0" />
      <orders v-else  :currentTab="activeTab"/>
    </div>
  </div>
</template>

<script>
import all from '@/components/listing/all.vue'
import Orders from '@/components/listing/orders.vue'
export default {
  components: { all, Orders },
  data() {
    return {
      tabs: [
        {
          label: 'all_ads'
        },
        {
          label: 'selling'
        },
        {
          label: 'sold'
        }
      ],
      activeTab: 0
    }
  },

  methods: {
    activateMenu(i) {
      console.log(i)
      this.activeTab = i
    }
  }
}
</script>

<style></style>
