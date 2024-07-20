<template>
  <div class="lg:bg-white md:bg-white rounded-md flex flex-col">
    <span class="lg:px-4 py-3 md:px-4 flex justify-between items-center">
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
          :src="
            userData?.image ? imgUrl + 'user/profile/' + userData?.image : image
          "
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
        <a :href="userData.mobile"
          ><i-icon icon="ph:phone" class="form-icon text-gray-600" role="button"
        /></a>
        <!-- <i-icon icon="pajamas:ellipsis-v" class="form-icon text-gray-600" role="button" /> -->
      </span>
    </span>
    <div class="flex flex-col justify-between lg:bg-accent md:bg-accent lg:p-4 md:p-4 h-full">
      <div class="h-[66vh] overflow-y-auto">
        <div class="flex flex-col gap-2">
          <!-- {{messages}} -->
          <span
            class="bg-white p-3 text-[13px] w-fit"
            :class="[
              item.sender_id === user.id
                ? 'ml-auto bg-white rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]'
                : 'rounded-tr-[15px] rounded-tl-[15px] rounded- rounded-bl-[15px] '
            ]"
            v-for="item in messages"
            :key="item?.id"
          >
            <span v-if="item?.message.title">
              <span>{{ `Offer received from ${userData?.firstname} ${userData?.lastname}` }}</span>
              <span></span>
            </span>
            <span v-else>
              <span>{{ item?.message }}</span>
              <span></span>
            </span>
          </span>
        </div>
      </div>

      <span class="flex gap-4 items-center mt-4">
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
      console.log(emoji)
      let text = this.content
      var curPos = document.getElementById('enter-message').selectionStart
      let text_to_insert = emoji.i
      this.content = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
    },

    getMessages() {
      console.log('userData:', this.userID)
      this.$user.getMessages(this.userID).then((res) => {
        console.log(res.data)
        this.messages = res.data

        console.log(this.groupByAndKeepLast(this.messages))
        let info  = this.groupByAndKeepLast(this.messages)[0]
        let receiver = {
              ...info.receiver
            }
            let sender = {
              ...info.sender
            }
            let userData = info.sender_id === this.user.id ? receiver : sender
            console.log(userData);
            this.userData = userData
        // let info = this.messages.find((item)=> this.user.id !== item.sender_id || item.receiver_id)
      })
    },

    groupByAndKeepLast(array) {
      return Object.values(
        array.reduce((result, currentValue) => {
          // Get the value of the key in the current item
          const testKey = currentValue
          const groupKey =
            currentValue[testKey.sender_id === this.ID ? 'receiver_id' : 'sender_id']

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
        console.log(res)
        this.getMessages()
        this.content = ''
        this.$emit('refresh')
      })
    }
  },

  mounted() {
    // this.intervalId = setInterval(this.getMessages, 5000); 
    // Poll every 5 seconds
  },

  beforeUnmount() {
    // clearInterval(this.intervalId);
  },

  watch: {
    // userMessage: {
    //   handler(val) {
    //     if (Object.keys(val).length > 0) {
    //       this.userData = val
    //       this.getMessages()
    //       this.dynamicLink = `tel:${val.sender.mobile}`
    //     }
    //   },
    //   immediate: true
    // },

    ID: {
      handler(val) {
        if (val) {
          this.userID = val
          console.log(val)
          this.getMessages()
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
    },
    
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
</style>
