<template>
    <div>
      <div>
  
      </div>
      <div class="bg-white p-6 rounded-md lg:w-6/12 md:w-7/12 w-full mx-auto">
      <div class="">
        <h3 class="font-bold mb-6">Want to send a mail to us?</h3>
      </div>
      <!-- <div>
          <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
            item
          }}</span>
        </div> -->
      <vForm @submit="onSubmit" v-slot="{ meta }" class="">
        <div class="flex flex-col gap-[10px]">
          <div>
            <label for="">Reason</label>
            <vField name="name" rules="required" class="input" type="text"> </vField>
            <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
          </div>
  
          <div>
            <label for="">Description</label>
            <vField name="email" rules="email" class="input" type="email"> </vField>
            <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
          </div>
  
          <div>
            <label for="">Additional Information</label>
            <vField name="message" rules="required" class="input" as="textarea" rows="3"> </vField>
            <ErrorMessage name="mesage" class="text-xs text-error"></ErrorMessage>
          </div>
  
          <div>
            <div>
              <input
                type="file"
                name="file"
                id="fileInput3"
                class="hidden-input"
                @change="onChange"
                ref="file"
                accept=".png,.jpg,.jpeg"
              />
              <div class="flex items-center gap-2" v-if="image">
                <span class="text-gray-400 text-xs block">
                  {{ image.name }} ({{ formattedImageSize(image) }})</span
                >
                <label for="fileInput3" class="file-label">
                  <span class="text-primary-600 text-xs font-medium block">Replace</span>
                </label>
                <span
                  class="text-red-600 text-xs font-medium block"
                  role="button"
                  @click="removeImage"
                >
                  Remove
                </span>
              </div>
  
              <label v-else for="fileInput3" class="file-label">
                <span class="text-primary text-xs font-medium block">Upload Image</span>
              </label>
            </div>
          </div>
        </div>
  
        <div class="text-center mt-5">
          <button
            class="brand-btn w-full"
            :disabled="isLoading || !meta.valid || !!image"
            :class="[
              isLoading
                ? 'bg-gray1 text-gray'
                : meta.valid
                  ? 'brand-primary'
                  : image
                    ? 'brand-primary'
                    : 'bg-gray1 text-black1'
            ]"
          >
            Send
          </button>
        </div>
      </vForm>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {},
  
    data() {
      return {
        isLoading: false,
        image: null,
        priorities: [
          {
            label: 'High',
            value: '1'
          },
          {
            label: 'Medium',
            value: '2'
          },
          {
            label: 'Low',
            value: '3'
          }
        ],
        tickets: []
      }
    },
  
    methods: {
      async onSubmit(values, { resetForm }) {
        this.isLoading = true
        const payload = new FormData()
        payload.append('attachments[]', this.image)
        payload.append('name', values.name)
        payload.append('email', values.image)
        payload.append('subject', values.subject)
        payload.append('priority', values.priority)
        payload.append('message', values.message)
  
        console.log(values, 'ommmo')
        this.$config
          .sendTicket(payload)
          .then((res) => {
            console.log(res)
            resetForm()
          })
          .finally(() => {
            this.isLoading = false
          })
      },
  
      removeImage() {
        this.image = null
      },
  
      fetchTicketRecords(){
        this.$config.getTickets()
        .then((res)=> {
          console.log(res)
        })
      },
  
      onChange() {
        let files = this.$refs.file.files
        this.image = files[0]
        console.log(this.image, 'from:photo Upload')
      },
  
      formattedImageSize(image) {
        if (image < 1024) {
          return `${image.size.toFixed(2)} Bytes`
        } else if (image.size < 1048576) {
          return `${(image.size / 1024).toFixed(2)} KB`
        } else {
          return `${(image.size / 1048576).toFixed(2)} MB`
        }
      }
    },
  
    beforeMount(){
      this.fetchTicketRecords()
    }
  }
  </script>
  
  <style scoped>
  .hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
  
  .file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
  }
  </style>