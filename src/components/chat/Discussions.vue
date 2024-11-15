<template>
  <div>
    <div
      class="lg:bg-accent md:bg-accent rounded-md flex flex-col rounded-lg md:h-full lg:h-full h-[100vh]"
    >
      <div >
        <chat-header :loading="loading" :messageInfo="messageData" :userInfo="userData" class="bg-white" />
      </div>
      <div class="main-chat flex-1 overflow-y-auto p-5" ref="messagesContainer" v-if="userData">
        <chat-bubble @offerFunc="offerFunc" :messages="messages" :userData="userData" :user="user" />
      </div>
      <div class="pb-5" v-if="ID && messageData">
        <input-area class="" @refreshMessages="getMessages" :messageData="messageData"  />
      </div>
      <span v-if="!ID" class="text-center mt-4"> Select a conversation </span>
    </div>
  </div>
</template>

<script>
import ChatHeader from './ChatHeader.vue'
import InputArea from './InputArea.vue'
import image from '@/assets/img/no-user.png'
import ChatBubble from './ChatBubble.vue'
export default {
  components: { ChatHeader, InputArea, ChatBubble },
  data() {
    return {
      content: '',
      emojiBox: false,
      messages: [],
      userData: null,
      dynamicLink: '',
      userID: null,
      image,
      // ID: this.$route.query.chatId,
      attachments: [],
      chatID: null,
      messageData: null,
      rows: 1,
      loading: false
    }
  },
  methods: {
    addEmoji(emoji) {
      let text = this.content
      var curPos = document.getElementById('enter-message').selectionStart
      let text_to_insert = emoji.i
      this.content = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
    },

    getMessages() {
      if (this.ID) {
        this.loading = true
        this.$user.getMessages(this.ID).then((res) => {
          this.messages = res.conversation.messages
          let resData = res.conversation
          this.messageData = resData
          let userData =
            resData.buyer.id === this.user.id
              ? resData.seller
              : resData.seller.id === this.user.id
                ? resData.buyer
                : {}
          this.userData = userData
          this.$nextTick(() => {
            this.scrollToEnd()
          })
        })
        .finally(()=> {
          this.loading = false
        })
      }
    },

    scrollToEnd() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },

    isValidJSON(str) {
      try {
        let data = JSON.parse(str)
        return data
      } catch (e) {
        return false
      }
    },

    offerFunc(e) {
      let info = JSON.parse(e)
      console.log(info)
      let payload = {
        cat_id: this.isValidJSON(info.item.message).cart.id,
        id: info.item.id
      }
      this.$orders.modifyOffer(payload, info.type).then((res) => {
        console.log(res)
      })
    },
  },

  mounted() {
    this.intervalId = setInterval(this.getMessages, 10000)
    // Poll every 10 seconds
  },

  beforeUnmount() {
    clearInterval(this.intervalId)
  },

  watch: {
    ID: {
      handler(val) {
        if (val) {
          this.chatID = val
          console.log(val)
          this.getMessages()
        }
      },
      immediate: true
    },
    '$route.query.userData': {
      handler(val) {
        if (val) {
          this.userData = JSON.parse(val)
        }
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    ID() {
      return this.$route.query.chatId
    }
  }
}
</script>

<style></style>
