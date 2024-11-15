<template>
  <div class="flex lg:flex-row flex-col md:flex-row gap-3 w-full items-start">
    <div class="bg-white lg:w-[250px] md:w-[250px] w-full rounded-md">
      <h4
        class="pl-4 py-3 bg-gray-50 rounded-tl-md rounded-tr-md border-b border-b-gray-300 font-semibold"
      >
        Refund Details
      </h4>
      <div class="p-4 flex flex-col gap-3">
        <span v-for="(value, name) in itemData" :key="name" class="flex flex-col">
          <span class="capitalize text-[13px] text-gray-500">{{ name.split('_').join(' ') }}</span>
          <span class="text-[14px] font-semibold block">{{ value }}</span>
        </span>
      </div>
    </div>

    <div class="bg-white lg:flex-1 md:flex-1 w-full rounded-md">
      <div class="">
        <h4
          class="pl-4 bg-gray-50 py-3 rounded-tl-md rounded-tr-md border-b border-b-gray-300 font-semibold"
        >
          Resolution
        </h4>
      </div>

      <div class="p-4 flex flex-col gap-2">
        <span>
          <span class="capitalize text-[13px] text-gray-500">Resolution Status</span>
          <span :class="['break-keep block w-fit status', item.status == 0 ? 'pending' : 'open']">
            {{ item.status == 0 ? 'pending' : 'resolved' }}
          </span>
        </span>
        <span>
          <span class="capitalize text-[13px] text-gray-500">Conclusion</span>
          <span class="text-[14px] font-semibold block">
            {{item.conclusion || '---'}}
          </span>
        </span>
        <hr />
        <h4 class="font-medium text-sm">Resolution History</h4>
        <span v-for="(obj, idx) in item.disputes" :key="idx">
          <div class="flex gap-1 items-center mb-2" v-if="obj.user">
            <span class="bg-primary block h-2 w-2 rounded-full"></span>
            <h4 class="text-sm font-semibold">
              {{ `${obj.user.firstname} ${obj.user.lastname}` }}
            </h4>
          </div>
          <span class="border block border-gray-100 p-2 rounded-md">
            <span class="text-xs flex items-center gap-1 text-gray-500 mb-1">
              <i-icon icon="fluent-mdl2:date-time" />
              {{ $formatDate(obj.created_at) }}
            </span>
            <h5 class="text-sm">{{ obj.reason }}</h5>
            <span
              @click="openModal(obj)"
              v-if="obj.image"
              role="button"
              class="text-xs text-primary flex items-center gap-1 mt-1"
            >
              <i-icon icon="icomoon-free:attachment" />
              View Attachment</span
            >
          </span>
        </span>

        <div class="bg-gray-50 p-4 mt-5 rounded-md">
          <h4 class="text-sm font-semibold mb-2">Write a reply</h4>
          <textarea class="input" name="" id="" v-model="content"></textarea>
          <div class="w-fit">
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
          <div class="text-right">
            <button class="brand-btn-md text-sm brand-primary" @click="postReply">
              Post Reply
            </button>
          </div>
        </div>
      </div>
    </div>

    <vDialog
      v-model:visible="visible"
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
      modal
      header="Preview Image"
      :style="{ width: '30rem' }"
    >
      <div class="p-3">
        Hello World
        <img :src="previewImage" alt="" />
      </div>
    </vDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ID: this.$route.params.disputeID,
      orderID: this.$route.params.ID,
      item: {},
      itemData: {},
      content: '',
      image: '',
      visible: false,
      previewImage: null
    }
  },

  methods: {
    getRecord() {
      this.$orders.viewDispute(this.ID).then((res) => {
        console.log(res)
        this.item = res.data
        let req = res.data
        this.itemData = {
          // item_details: ,
          orderID: req.order_id,
          user:
            req.buyer.id == this.user.id
              ? `${req.seller.firstname} ${req.seller.lastname}`
              : `${req.buyer.firstname} ${req.buyer.lastname}`,
          transaction_amount: this.$currencyFormat(req.amount),
          return_reason: req.reason,
          return_detail: req.desc,
          additional_information: req.add_info
        }
      })
    },

    postReply() {
      let payload = new FormData()
      payload.append('reason', this.content)
      payload.append('refund_id', this.ID)
      payload.append('image', this.image)
      this.$orders.replyDispute(this.orderID, payload).then((res) => {
        console.log(res)
        this.getRecord()
        this.content = ''
        this.image = null
      })
    },

    removeImage() {
      this.image = null
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
    },

    openModal(e) {
      console.log(e.image)
      this.previewImage = e.image
      this.visible = true
    }
  },

  beforeMount() {
    this.getRecord()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
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
