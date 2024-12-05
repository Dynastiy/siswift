<template>
  <div>
    <div class="chat-page flex gap-4">
      <chatlist
        class="lg:w-64 md:w-64 w-full"
        :isLoading="loading"
        @selectMessage="selectMessage($event)"
        :allMessages="messages"
        @refresh="getList('refresh')"
      />
      <pane
        :userMessage="message"
        @refresh="getList('refresh')"
        class="lg:block md:block hidden flex-1"
      />
    </div>
  </div>
</template>

<script>
import Pane from '@/components/chat/Discussions.vue'
import Chatlist from '@/components/chat/chatlist.vue'
export default {
  components: {
    Pane,
    Chatlist
  },

  data() {
    return {
      message: {},
      messages: [],
      loading: false
    }
  },

  methods: {
    selectMessage(e) {
      this.message = e
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }

      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        this.$router.push(`/app/message/m?chatId=${e?.id}`)
      } else {
        console.log('You are using a desktop device')
        this.$router.push('/app/messages?chatId=' + e.id)
      }
    },

    getList(e) {
      if (!e) {
        this.loading = true
      }
      this.$user
        .messages()
        .then((res) => {
          this.messages = res.conversations
          this.$store.commit('auth/setMessagesCount', res.conversations.length)
        })
        .finally(() => {
          this.loading = false
        })
    },

    groupByAndKeepLast(array) {
      return Object.values(
        array.reduce((result, currentValue) => {
          // Get the value of the key in the current item
          const testKey = currentValue
          const groupKey =
            currentValue[testKey.sender_id === this.user.id ? 'receiver_id' : 'sender_id']

          // Always set the current item as the value for this key
          result[groupKey] = currentValue

          // Return the result object for the next iteration
          return result
        }, {})
      )
    }
  },

  beforeMount() {
    this.getList()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.chat-page {
  height: calc(100vh - 100px);
}
</style>
