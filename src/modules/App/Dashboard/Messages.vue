<template>
  <div>
    <div class="grid md:grid-cols-3  lg:grid-cols-3 grid-cols-1 gap-4">
      <chatlist @selectMessage="selectMessage($event)"/>
      <pane :userMessage="message" class="col-span-2 lg:block md:block hidden"/>
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
      
      console.log(e)
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }

      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        this.$router.push(`/app/message/m?user=${e?.userId}`)
      } else {
        console.log('You are using a desktop device')
        this.$router.push('/app/messages?user='+e.userId)
      }
    },

    
  }
}
</script>

<style></style>
