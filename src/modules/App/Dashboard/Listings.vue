<template>
  <div>
    <span class="border-b border-b-gray-400 w-full flex gap-4 justify-center">
      <span
        v-for="(item, idx) in tabs"
        :key="idx"
        role="button"
        class="capitalize w-full text-center"
        :class="{ 'border-b text-primary border-b-primary font-semibold': activeTab == idx }"
        @click="activateMenu(idx)"
      >
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class=" mt-6">
      <all v-if="activeTab == '0'" />
      <div v-else  class="lg:page-bg md:page-bg">
        <orders :currentTab="activeTab" />
      </div>
      
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
      this.$router.push({ name: 'app-listings', query: { tab: i } })
    }
  },

  mounted() {
    console.log(!this.$route.query.tab);
    if (!this.$route.query.tab ) {
      this.$router.push({ name: 'app-listings', query: { tab: this.activeTab } })
    }
  },

  watch: {
    '$route.query.tab': {
      handler(val) {
        if(val) {
          this.activeTab = val
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
