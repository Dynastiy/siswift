<template>
  <div class="bg-white p-6 rounded-lg">
    <div class="mt-3 flex flex-col gap-4">
      <h4 class="mb-3 font-semibold">Notifications</h4>
      <wx-notification />
    </div>
  </div>
</template>

<script>
import wxNotification from '@/components/UI/wxNotification.vue'
export default {
  components: { wxNotification }
}
</script>

<style></style>
