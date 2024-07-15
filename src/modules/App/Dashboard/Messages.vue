<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <chatlist @selectMessage="selectMessage($event)"/>
      <pane :userMessage="message" class="col-span-2"/>
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
  },

  data(){
    return {
      message: {}
    }
  },

  methods: {
    selectMessage(e) {
      this.message = e
    }
  }
}
</script>

<style></style>
