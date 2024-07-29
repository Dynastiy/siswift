<template>
  <div>
    <div class="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4">
      <chatlist :isLoading="loading" @selectMessage="selectMessage($event)" :allMessages="messages"/>
      <pane :userMessage="message" @refresh="getList('refresh')" class="col-span-2 lg:block md:block hidden" />
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
        this.$router.push(`/app/message/m?user=${e?.userId}`)
      } else {
        console.log('You are using a desktop device')
        this.$router.push('/app/messages?user=' + e.userId)
      }
    },

    getList(e) {
      if(!e) {
        this.loading = true
      }
      this.$user
        .messages()
        .then((res) => {
          console.log(res.data)
          let messages = res.data
          // Group the data by 'category' and keep only the last item
          // let groupedData =
          const groupedData = this.groupByAndKeepLast(messages)

          let chatList = []
          groupedData.forEach((elem) => {
            let receiver = {
              ...elem.receiver
            }
            let sender = {
              ...elem.sender
            }
            let message = {
              userInfo: elem.sender_id === this.user.id ? receiver : sender,
              userId: elem.sender_id === this.user.id ? elem.receiver_id : elem.sender_id,
              message: elem.message,
              created_at: elem.created_at
            }
            chatList.push(message)
          })
          this.messages = chatList
          console.log('chat list data:', chatList)
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

<style></style>
