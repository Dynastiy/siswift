<template>
  <div>
    <!-- <el-skeleton :loading="loading && messages.length == 0" animated>
      <template #template>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-4">
          <div v-for="item in 8" :key="item">
            <el-skeleton-item variant="image" style="height: 200px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default> -->
        <div class="flex flex-col gap-3">
          <div v-for="item in messages" :key="item?.id" class="flex items-end gap-1">
            <img
              v-if="item.user_id !== user.id"
              :src="userData?.image ? imgUrl + 'user/profile/' + userData?.image : image"
              alt=""
              class="w-[30px] h-[30px] rounded-full object-fit object-top"
            />
            <div
              class="p-3 text-[13px] lg:w-6/12 md:w-7/12 w-9/12"
              :class="[
                item.user_id === user.id
                  ? 'ml-auto lg:bg-gray-100 md:bg-gray-100 bg-accent rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px]'
                  : 'rounded-tr-[15px] rounded-tl-[15px] rounded- rounded-bl-[15px] bg-white'
              ]"
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

                <div class="flex flex-col mt-2">
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
                  <span class="text-xs block ml-auto">{{
                    $dateFormat(item?.created_at)
                  }}</span>
                </div>
              </span>

              <span v-else class="flex flex-col">
                <div class="grid grid-cols-2 gap-1 mb-2">
                  <img
                    role="button"
                    @click="viewImage(image)"
                    v-for="image in item.files"
                    :key="image.id"
                    :src="imgUrl + 'messages/' + image.file_path"
                    alt=""
                  />
                </div>
                <span>{{ item?.message }}</span>
                <span class="text-[11px] mt-1 text-gray-400 block text-right">{{
                  $dateFormat(item?.created_at)
                }}</span>
              </span>
            </div>
          </div>
        </div>
      <!-- </template>
    </el-skeleton> -->

    <ImageFullScreen v-if="imageView" :imgSrc="imageView" @closeFullScreen="closeFullScreen" />
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    userData: null,
    messages: null,
    user: null
  },

  data() {
    return {
      image,
      imageView: null
    }
  },

  methods: {
    closeFullScreen() {
      this.imageView = null
    },

    viewImage(item) {
      this.imageView = this.imgUrl + 'messages/' + item.file_path
      console.log(this.imageView)
    },

    offerFunc(e, value) {
      let info = {
        type: e,
        item: value
      } 
      this.$emit('offerFunc', JSON.stringify(info))
    },

    isValidJSON(str) {
      try {
        let data = JSON.parse(str)
        return data
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style></style>
