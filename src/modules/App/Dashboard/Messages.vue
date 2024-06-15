<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <chatlist/>
      <pane  class="col-span-2"/>
    </div>
  </div>
</template>

<script>
import Pane from '@/components/chat/pane.vue'
import Chatlist from '@/components/chat/chatlist.vue'
export default {
  components: {
    Pane,
    Chatlist
  }
}
</script>

<style></style>
