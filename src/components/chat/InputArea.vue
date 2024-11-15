<template>
  <div v-if="messageData.is_active && messageData.product !== null">
    <div v-if="attachments">
      <div class="grid grid-cols-4 gap-2 px-5">
        <div v-for="(item, idx) in attachments" :key="idx">
          <div class="relative">
            <img
              :src="generateURL(item)"
              alt=""
              class="h-12 w-full rounded-md object-fit object-cover"
            />
            <div class="flex justify-end gap-2 absolute top-1 right-1">
              <span
                role="button"
                class="bg-white text-xs px-2 py-1 font-semibold rounded-md"
                @click="removePhoto(idx)"
              >
                <i-icon icon="fluent:delete-12-regular" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="flex gap-4 items-center mt-4 px-5">
        <div class="message-field bg-white border-none w-full">
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
            <!-- <input
              ref="textInput"
              type="text"
              name="password"
              class="w-full"
              id="enter-message"
              placeholder="Enter Message"
              v-model="content"
              @keyup.enter="sendMessage"
            /> -->
            <!-- <textarea
              class="multiline-textarea"
              placeholder="Enter Message..."
              id="myTextarea"
              @input="resizeTextarea"
              v-model="content"
            ></textarea> -->
            <pxTextarea v-model="content" autoResize rows="1" cols="30" />

            <div class="" role="button">
              <input
                type="file"
                multiple
                name="file2"
                id="message-attachment"
                class="hidden__input"
                @change="handleMessageInput"
                ref="file2"
                accept=".png,.jpg,.jpeg"
              />
              <label for="message-attachment" role="button" class="file-label">
                <i-icon icon="mi:attachment" class="form-icon text-black2" />
              </label>
            </div>

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
import { useToast } from 'vue-toastification'
export default {
  props: {
    messageData: Object
  },

  data() {
    return {
      content: '',
      emojiBox: false,
      attachments: [],
      ID: this.$route.query.chatId,
      initialHeight: 40,
      maxFiles: 4
    }
  },

  methods: {
    addEmoji(emoji) {
      let text = this.content
      var curPos = document.getElementById('myTextarea').selectionStart
      let text_to_insert = emoji.i
      this.content = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
    },

    resizeTextarea(event) {
      const textarea = event.target
      // Set height to scrollHeight to expand to fit content
      textarea.style.height = `${textarea.scrollHeight}px`
    },

    sendMessage() {
      //   let messageData = JSON.parse(message)
      let formData = new FormData()
      formData.append('message', this.content)
      formData.append('_method', 'PUT')
      if (this.attachments.length > 0) {
        this.attachments.forEach((elem) => {
          formData.append('files[]', elem)
        })
      }
      this.$user.sendMessage(formData, this.ID).then((res) => {
        // this.getMessages()
        this.content = ''
        this.attachments = []
        this.$emit('refreshMessages')
        this.$nextTick(() => {
          this.scrollToEnd()
        })
        return res
      })
    },

    handleMessageInput(e) {
      let newFiles = e.target.files
      const toast = useToast()
      if (this.attachments.length + newFiles.length > this.maxFiles) {
        toast.error(`Cannot select more than ${this.maxFiles} images`, {
          timeout: 4000
        })
        return
      }
      const updatedFiles = Array.from(newFiles)
      this.attachments = [...this.attachments, ...updatedFiles]
      console.log(this.attachments)
    },

    setInitialHeight() {
      // Set the initial height based on the regular input field height
      this.$nextTick(() => {
        const textarea = this.$el.querySelector('textarea')
        textarea.style.height = `${this.initialHeight}px`
      })
    },

    removePhoto(value) {
      if (this.attachments.length !== 0) {
        this.attachments.splice(value, 1)
      }
    },

    generateURL(file) {
      let fileSrc = URL.createObjectURL(file)
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc)
      }, 1000)
      return fileSrc
    }
  },

  mounted() {
    this.setInitialHeight()
  }
}
</script>

<style>
.multiline-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;

  /* border: 1px solid #ccc; */
  border-radius: 4px;

  /* font-size: 16px; */
  line-height: 1.5;
  
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide scrollbar */
  max-height: 60px;
}

.message-field input.hidden__input {
    width: 1px !important;
}

.hidden__input {
  opacity: 0;
  overflow: hidden !important;
  position: absolute;

  height: 1px;
  background: red !important;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

</style>
