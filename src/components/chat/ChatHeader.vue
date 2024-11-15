<template>
  <div>
    <div>
      <div>
        <span
          class="lg:px-4 py-3 md:px-4 flex justify-between items-center w-full bg-white px-5 py-[12px] border-b border-gray-300"
        >
          <div class="flex gap-2 items-center">
            <span role="button" @click="$router.go(-1)">
              <i-icon icon="ic:twotone-arrow-back" />
            </span>
            <img
              :src="userData?.image ? imgUrl + 'user/profile/' + userData?.image : image"
              alt=""
              class="w-[38px] h-[38px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
            />
            <h4 class="font-semibold">
              {{ userData.firstname ? `${userData?.firstname} ${userData?.lastname}` : '--- ---' }}
            </h4>
          </div>
          <span class="flex gap-2 items-center">
            <a :href="userData ? `tel:${userData.mobile}` : '---'"
              ><i-icon icon="solar:phone-bold" class="form-icon text-gray-600" role="button"
            /></a>
          </span>
        </span>
        <span
          class="lg:px-4 py-3 md:px-4 flex justify-between items-center w-full bg-white px-5 py-[12px]"
        >
          <div class="flex items-end gap-2" v-if="messageData">
            <img
              :src="messageData?.product ? imgUrl + 'product/' + messageData?.product?.main_image : image "
              class="w-[50px] h-[35px] p-[2px] border-gray-100 rounded-[6px] object-fit object-top"
            />
            <span class="flex flex-col">
              <span class="text-[12px] block leading-tightest">
                {{ messageData.product ? messageData.product.name : '---' }}
              </span>
              <span class="font-bold block leading-tightest">
                {{ messageData.product ? $currencyFormat(messageData.product.base_price) : '---' }}
              </span>
            </span>
          </div>
          <span v-if="messageData" class="text-[12px] block leading-tightest">
            Location:
            {{
              messageData.product
                ? `${messageData.product?.lga}, ${messageData.product?.state}`
                : '---'
            }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    messageInfo: Object,
    userInfo: Object,
    loading: Boolean
  },

  data() {
    return {
      messageData: null,
      userData: null,
      image,
      isLoading: false
    }
  },

  computed: {
    // isLoading(){
    //   return this.loading && this.messageData == null && this.userData == null
    // }
  },

  watch: {
    messageInfo: {
      handler(val) {
        if (val) {
          this.messageData = val
        } else {
          this.messageData = {}
        }
      },
      immediate: true
    },

    userInfo: {
      handler(val) {
        if (val) {
          this.userData = val
        } else {
          this.userData = {}
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
