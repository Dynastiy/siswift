<template>
  <div class="lg:bg-white md:bg-white pb-3 rounded-md flex overflow-hidden flex-col rounded-lg">
    <span
      class="lg:px-4 py-3 md:px-4 flex justify-between items-center w-full bg-white px-5 py-[12px]"
    >
      <div class="flex gap-2 items-center" v-if="Object.keys(userData).length > 0">
        <span
          class="h-[30px] w-[30px] flex items-center justify-center rounded-full font-bold"
          v-if="!userData.image"
          :class="userData?.firstname.charAt(0)"
        >
          {{ userData?.firstname.charAt(0) }}
        </span>
        <img
          v-else
          :src="userData?.image ? imgUrl + 'user/profile/' + userData?.image : image"
          alt=""
          class="w-[38px] h-[38px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
        />

        <!-- <div>
            {{ userData }}
          </div> -->
        <h4 class="font-semibold">
          {{ `${userData?.firstname} ${userData?.lastname}` }}
        </h4>
      </div>
      <span class="flex gap-2 items-center">
        <a :href="`tel:${userData.mobile}`"
          ><i-icon icon="ph:phone" class="form-icon text-gray-600" role="button"
        /></a>
        <!-- <i-icon icon="pajamas:ellipsis-v" class="form-icon text-gray-600" role="button" /> -->
      </span>
    </span>
    <div
      class="px-5 py-3 overflow-auto chat-screen bg-accent custom-scroll"
      ref="messagesContainer"
    >
      <!-- <div class="flex flex-col gap-2"> -->
      <!-- {{messages}} -->
      <div
        class="p-3 text-[13px] w-6/12 shadow mb-3"
        :class="[
          item.sender_id === user.id
            ? 'ml-auto bg-gray-100 rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]'
            : 'rounded-tr-[15px] rounded-tl-[15px] rounded- rounded-bl-[15px] bg-white'
        ]"
        v-for="item in messages"
        :key="item?.id"
      >
        <span v-if="item?.message.title">
          <span class="text-[12px]">{{
            item.sender_id === user.id
              ? `Offer of ${$currencyFormat(item?.message?.amount)} for ${
                  item?.message?.product?.name
                } sent to ${userData?.firstname} ${userData?.lastname}`
              : `Offer of ${$currencyFormat(item?.message?.amount)} for ${
                  item?.message?.product?.name
                } received from ${userData?.firstname} ${userData?.lastname}`
          }}</span>
          <span v-if="item.sender_id !== user.id" class="flex gap-4 mt-2 justify-end">
            <span class="text-green-500" role="button" @click="offerFunc('accept', item?.message)">Accept</span>
            <span class="text-red-500" role="button" @click="offerFunc('reject', item?.message)">Reject</span>
          </span>
        </span>
        <span v-else class="flex flex-col">
          <span>{{ item?.message }}</span>
        </span>
      </div>
      <!-- </div> -->
    </div>
    <span class="flex gap-4 items-center mt-4 px-2 h-calc-50">
      <div class="input-field bg-white border-none w-full">
        <span class="w-full flex gap-2 items-center">
          <div class="relative">
            <span class="password-iccon" role="button" @click="emojiBox = !emojiBox">
              <i-icon
                :icon="emojiBox ? 'solar:keyboard-outline' : 'mingcute:emoji-line'"
                class="form-icon text-black2"
              />
            </span>
            <transition name="fade">
              <EmojiPicker
                v-if="emojiBox"
                class="absolute bottom-7 left-0"
                :native="true"
                @select="addEmoji"
              />
            </transition>
          </div>
          <input
            ref="textInput"
            type="text"
            name="password"
            class="w-full"
            id="enter-message"
            placeholder="Enter Message"
            v-model="content"
            @keyup.enter="sendMessage"
          />
        </span>
        <!-- <span class="password-iccon" role="button">
              <i-icon icon="icomoon-free:attachment" class="form-icon text-black2" />
            </span> -->
      </div>
      <span
        class="password-iccon bg-primary p-2 text-white rounded-full"
        role="button"
        @click="sendMessage"
      >
        <i-icon icon="lets-icons:send" class="form-icon text-2xl" />
      </span>
    </span>
  </div>
</template>

<script>
// import picker compopnent
// import { EmojiPicker } from 'vue-emoji-picker'
import image from '@/assets/img/no-user.png'
export default {
  components: {
    // EmojiPicker
  },
  props: {
    // userMessage: Object
  },
  data() {
    return {
      content: '',
      emojiBox: false,
      messages: [],
      userData: {},
      dynamicLink: '',
      userID: null,
      image
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
      if (this.userID) {
        this.$user.getMessages(this.userID).then((res) => {
          this.messages = res.data

          let info = this.groupByAndKeepLast(this.messages)[0]
          let receiver = {
            ...info.receiver
          }
          let sender = {
            ...info.sender
          }
          let userData = info.sender_id === this.user.id ? receiver : sender
          this.userData = userData
          this.$nextTick(() => {
            this.scrollToEnd()
          })
        })
      }
    },

    scrollToEnd() {
      const container = this.$refs.messagesContainer
      container.scrollTop = container.scrollHeight
    },
    
    offerFunc(e, value) {
      console.log(e, value);
      let payload = {
        cat_id: value.cart_id
      }
      this.$user.modifyOffer(payload, e)
      .then((res)=> {
        console.log(res);
      })
    },

    groupByAndKeepLast(array) {
      return Object.values(
        array.reduce((result, currentValue) => {
          // Get the value of the key in the current item
          const testKey = currentValue
          const groupKey = currentValue[testKey.sender_id === this.ID ? 'receiver_id' : 'sender_id']

          // Always set the current item as the value for this key
          result[groupKey] = currentValue

          // Return the result object for the next iteration
          return result
        }, {})
      )
    },

    sendMessage() {
      let formData = {
        receiver_id: this.ID,
        message: this.content
      }
      this.$user.sendMessage(formData).then((res) => {
        this.getMessages()
        this.content = ''
        this.$emit('refresh')
        this.$nextTick(() => {
          this.scrollToEnd()
        })
        return res
      })
    }
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
          this.userID = val
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
      return this.$route.query.user
    }
  }
}
</script>

<style>
/* @import 'vue3-emoji-picker/css'; */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s;
}
.custom-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.custom-scroll::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.chat-screen {
  height: calc(100vh - 250px);
}
</style>
