<template>
  <div>
    <span class="border-b border-b-gray-400 w-full flex gap-4  justify-center">
      <span v-for="(item, idx) in tabs" :key="idx" role="button" class="capitalize" :class="{'border-b text-primary border-b-primary font-semibold': activeTab === idx}" @click="activateMenu(idx)">
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class="bg-white p-8 rounded-md lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <component :is="tabs[activeTab].component" />
    </div>
  </div>
</template>

<script>
import GeneralSettings from '@/components/settings/GeneralSettings.vue'
import ChangePassword from '@/components/settings/ChangePassword.vue'
import { markRaw } from 'vue'
export default {
  // components: { GeneralSettings, ChangePassword },
  data() {
    return {
      tabs: [
        {
          label: 'general_settings',
          component: markRaw(GeneralSettings)
        },
        {
          label: 'change_password',
          component: markRaw(ChangePassword)
        }
      ],
      activeTab: 0
    }
  },

  methods: {
    activateMenu(i) {
      console.log(i);
      this.activeTab = i
    }
  }
}
</script>

<style></style>
