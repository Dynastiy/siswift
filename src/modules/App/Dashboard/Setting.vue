<template>
  <div>
    <span class="border-b border-b-gray-400 w-full flex gap-6  justify-center">
      <span v-for="(item, idx) in tabs" :key="idx" role="button" class="capitalize text-[14px] text-center" :class="{'border-b text-primary border-b-primary font-semibold': activeTab === idx}" @click="activateMenu(idx)">
        {{ item.label.split('_').join(' ') }}
      </span>
    </span>
    <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <component :is="tabs[activeTab].component" />
    </div>
  </div>
</template>

<script>
import GeneralSettings from '@/components/settings/GeneralSettings.vue'
import ChangePassword from '@/components/settings/ChangePassword.vue'
import { markRaw } from 'vue'
import Withdrawal from '@/components/settings/Withdrawal.vue'
export default {
  // components: { Withdrawal },
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
        },
        {
          label: 'withdrawal',
          component: markRaw(Withdrawal)
        }
      ],
      activeTab: 0
    }
  },

  methods: {
    activateMenu(i) {
      this.activeTab = i
    }
  }
}
</script>

<style></style>
