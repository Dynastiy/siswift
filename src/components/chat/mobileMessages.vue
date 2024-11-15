<template>
  <div class="lg:bg-accent md:bg-accent pb-3 rounded-md flex overflow-hidden flex-col rounded-lg">
    <div class="flex-1">
      <div v-if="Object.keys(messageData).length > 0 && userData">
        <span
          class="lg:px-4 py-3 md:px-4 flex justify-between items-center w-full bg-white px-5 py-[12px] border-b border-gray-300"
        >
          <div class="flex gap-2 items-center">
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
            <h4 class="font-semibold">
              {{ `${userData?.firstname} ${userData?.lastname}` }}
            </h4>
          </div>
          <span class="flex gap-2 items-center">
            <a :href="`tel:${userData.mobile}`"
              ><i-icon icon="solar:phone-bold" class="form-icon text-gray-600" role="button"
            /></a>
          </span>
        </span>
        <span
          class="lg:px-4 py-3 md:px-4 flex justify-between items-center w-full bg-white px-5 py-[12px]"
        >
          <div class="flex items-end gap-2">
            <img
              :src="imgUrl + 'product/' + messageData?.product?.main_image"
              class="w-[50px] h-[35px] p-[2px] border-gray-100 rounded-[6px] object-fit object-top"
            />
            <span class="flex flex-col">
              <span class="text-[12px] block leading-tightest">
                {{ messageData.product.name }}
              </span>
              <span class="font-bold block leading-tightest">
                {{ $currencyFormat(messageData.product.base_price) }}
              </span>
            </span>
          </div>
          <span class="text-[12px] block leading-tightest">
            Location: {{ `${messageData.product?.lga}, ${messageData.product?.state}` }}
          </span>
        </span>
      </div>
      <div class="px-5 py-4 overflow-y-auto chat-screen custom-scroll" ref="messagesContainer">
        <div
          class="p-3 text-[13px] w-6/12 shadow mb-3"
          :class="[
            item.user_id === user.id
              ? 'ml-auto bg-gray-100 rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]'
              : 'rounded-tr-[15px] rounded-tl-[15px] rounded- rounded-bl-[15px] bg-white'
          ]"
          v-for="item in messages"
          :key="item?.id"
        >
          <span v-if="isValidJSON(item?.message)">
            {{}}
            <span class="text-[12px]">{{
              item.user_id === user.id
                ? `Offer of ${$currencyFormat(isValidJSON(item?.message).amount)} for ${
                    isValidJSON(item?.message).product?.name
                  } sent to ${userData?.firstname} ${userData?.lastname}`
                : `Offer of ${$currencyFormat(isValidJSON(item?.message).amount)} for ${
                    isValidJSON(item?.message).product?.name
                  } received from ${userData?.firstname} ${userData?.lastname}`
            }}</span>

            <div class="flex justify-between items-center mt-2">
              <!-- <div>
                {{isValidJSON(item?.message).cart}}
              </div> -->
              <!-- <div v-if="isValidJSON(item?.message).cart.status"> -->
                <div v-if="isValidJSON(item?.message).cart.status == '0'">
                  <span v-if="item.user_id !== user.id" class="flex gap-4 justify-end">
                    <span class="text-green-500" role="button" @click="offerFunc('accept', item)"
                      >Accept</span
                    >
                    <span class="text-red-500" role="button" @click="offerFunc('reject', item)"
                      >Reject</span
                    >
                  </span>
                  <span v-else class="text-amber-500">Pending</span>
                </div>
                <span
                  v-else
                  :class="[
                    'text-[12px] block',
                    isValidJSON(item?.message).cart.status == '1'
                      ? 'text-green-500'
                      : 'text-red-500'
                  ]"
                  >{{
                    isValidJSON(item?.message).cart.status == '1'
                      ? 'Offer Accepted'
                      : 'Offer Rejected'
                  }}</span
                >
              <!-- </div> -->
              <span class="text-xs block ml-auto">{{ $formatShortDate(item?.created_at) }}</span>
            </div>
          </span>
          <span v-else class="flex flex-col">
            <span>{{ item?.message }}</span>
            <span class="text-[11px] mt-1 text-gray-400 block text-right">{{
              $formatShortDate(item?.created_at)
            }}</span>
          </span>
        </div>
        <div>Attachments Preview</div>
      </div>
    </div>
    <div v-if="chatID && messageData.is_active">
      <span class="flex gap-4 items-center mt-4 px-5">
        <div class="input-field message-field bg-white border-none w-full">
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
            <!-- <textarea
            class="w-full"
      :rows="rows"
      @keydown="handleKeydown"
      placeholder="Type here and press Enter to increase rows"
    ></textarea> -->
            <span class="password-iccon" role="button">
              <i-icon icon="mi:attachment" class="form-icon text-black2" />
            </span>
          </span>
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
      image,
      // ID: this.$route.query.chatId,
      attachments: [],
      chatID: null,
      messageData: {},
      rows: 1
    }
  },

  methods: {
    handleKeydown(event) {
      // Check if the pressed key is Enter (key code 13)
      if (event.key === 'Enter') {
        // Prevent the default behavior of the Enter key (which is to add a newline)
        event.preventDefault()

        // Increase the number of rows
        this.rows += 1
      }
    },

    addEmoji(emoji) {
      let text = this.content
      var curPos = document.getElementById('enter-message').selectionStart
      let text_to_insert = emoji.i
      this.content = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
    },

    getMessages() {
      if (this.ID) {
        this.$user.getMessages(this.ID).then((res) => {
          this.messages = res.conversation.messages
          let resData = res.conversation
          this.messageData = resData
          console.log(res)
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
      }
    },

    scrollToEnd() {
      const container = this.$refs.messagesContainer
      container.scrollTop = container.scrollHeight
    },

    isValidJSON(str) {
      try {
        let data = JSON.parse(str)
        return data
      } catch (e) {
        return false
      }
    },

    getCartItems() {
      this.$user.cartList().then((res) => {
        console.log(res)
      })
    },

    updateCartInMessage(e) {
      this.$user
        .updateMessage(e.id)
        .then(() => {
          return
        })
        .finally(() => {
          this.getMessages()
        })
    },

    offerFunc(e, value) {
      console.log(e, value)
      let payload = {
        cat_id: this.isValidJSON(value.message).cart.id,
        id: value.id
      }
      this.$orders.modifyOffer(payload, e).then((res) => {
        console.log(res)
        // isValidJSON(item?.message).cart
        // this.updateCartInMessage(value)
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
      // let formData = {
      //   receiver_id: this.ID,
      //   message: this.content
      // }
      let formData = new FormData()
      formData.append('message', this.content)
      formData.append('_method', 'PUT')
      if (this.attachments.length > 0) {
        this.attachments.forEach((elem) => {
          formData.append('files[]', elem)
        })
      }
      // else {
      //   formData.append('files[]', null)
      // }
      this.$user.sendMessage(formData, this.ID).then((res) => {
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
    this.getCartItems()
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
  height: calc(100vh - 320px);
}
</style>
