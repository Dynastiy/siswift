<template>
  <div class="bg-white rounded-md">
    <span class="px-4 py-3 flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <img
          src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
          alt=""
          role="button"
          class="h-[28px] w-[28px] rounded-full object-cover object-center"
        />
        <h4 class="font-semibold">Bukki Store</h4>
      </div>
      <span class="flex gap-2 items-center">
        <i-icon icon="ph:phone" class="form-icon text-gray-600" role="button" />
        <i-icon icon="pajamas:ellipsis-v" class="form-icon text-gray-600" role="button" />
      </span>
    </span>
    <hr />
    <div class="p-4 bg-white flex justify-between items-end">
      <div class="flex gap-2 items-center">
        <img
          src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
          alt=""
          role="button"
          class="h-[28px] w-[28px] rounded-md object-cover object-center"
        />
        <div class="flex flex-col">
          <span class="text-[12px] text-gray-500"> Tecno Spark 17 </span>
          <h4 class="font-semibold text-sm">Bukki Store</h4>
        </div>
      </div>
      <span class="text-[12px] text-gray-500"> Location: Uyo, Akwa Ibom State </span>
    </div>
    <div class="flex flex-col justify-between bg-accent h-[68vh] overflow-y-auto p-4">
      <div class="">
        <div></div>
        
      </div>

      <span class="flex gap-4 items-center">
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
              v-model="message"
            />
          </span>
          <span class="password-iccon" role="button">
            <i-icon icon="icomoon-free:attachment" class="form-icon text-black2" />
          </span>
        </div>
        <span class="password-iccon bg-primary p-2 text-white rounded-full" role="button">
          <i-icon icon="lets-icons:send" class="form-icon text-2xl" />
        </span>
      </span>
    </div>
  </div>
</template>

<script>
// import picker compopnent
// import { EmojiPicker } from 'vue-emoji-picker'
export default {
  components: {
    // EmojiPicker
  },
  data() {
    return {
      message: '',
      emojiBox: false
    }
  },

  methods: {
    addEmoji(emoji) {
      console.log(emoji)
      let text = this.message
      var curPos = document.getElementById('enter-message').selectionStart
      let text_to_insert = emoji.i
      this.message = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
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
</style>
