<template>
  <div class="lg:page-bg md:page-bg h-[75vh]">
    <span class=" flex justify-between items-center">
      <h4 class="font-semibold">Chats</h4>
      <!-- <span>
        <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
      </span> -->
    </span>
    <hr class=" my-3" />
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="px-4 py-4">
          <div class="flex gap-4 items-center">
            <el-skeleton-item
              variant="image"
              style="height: 40px; width: 40px; border-radius: 50%"
            />
            <el-skeleton-item
              variant="text"
              style="height: 30px; width: 80%; border-radius: 10px"
            />
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <div class="">
            <div class="flex flex-col gap-5">
              <div
                class="flex items-center justify-between"
                @click="$emit('selectMessage', item)"
                role="button"
                v-for="item in messages"
                :key="item?.id"
              >
                <div class="flex gap-3 items-center">
                  <!-- <img
              src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
              alt=""
              role="button"
              class="h-[30px] w-[30px] rounded-[4px] object-cover object-center"
            /> -->
                  <span
                    class="h-[30px] w-[30px] rounded-full flex items-center justify-center font-bold"
                    v-if="!item?.userInfo?.image"
                    :class="item?.userInfo?.firstname.charAt(0)"
                  >
                    {{ item?.userInfo?.firstname.charAt(0) }}
                  </span>
                  <img
                    v-else
                    :src="
                      item?.userInfo.image ? imgUrl + 'user/profile/' + item?.userInfo.image : image
                    "
                    class="w-[38px] h-[38px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
                  />
                  <div class="flex flex-col">
                    <span class="text-[13px] text-black1 font-semibold">
                      {{ `${item?.userInfo?.firstname} ${item?.userInfo?.lastname}` }}
                    </span>
                    <span class="text-[12px] text-gray-500">
                      <span>{{ item?.userInfo_id !== user.id ? 'You:' : '' }}</span>
                      {{ item?.message.slice(0, 12) + '...' }}
                    </span>
                  </div>
                </div>

                <span class="flex flex-col items-end gap-1">
                  <!-- <span class="text-gray-500 text-[11px]">12:05</span> -->
                  <span class="text-gray-500 text-[11px]">{{ $formatDate(item?.created_at) }}</span>
                  <!-- <span class="block text-xs px-1 font-semibold bg-accent rounded-sm">2</span> -->
                </span>
              </div>
            </div>
          </div>
          <div v-if="!loading && messages.length === 0" class="flex justify-center">
            <div class="text-center flex flex-col gap-2">
              <!-- <span
                class="bg-accent block h-[200px] w-[200px] rounded-full flex justify-center items-center"
              >
                <i-icon :icon="iconType" class="text-[100px]" />
              </span> -->
              <h5>No ongoing conversation</h5>
            </div>
          </div>
          <!-- <div class="flex justify-end">
            <wxPagination :meta="meta" @next="filter($event)" />
          </div> -->
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  data() {
    return {
      messages: [],
      image,
      loading: false
    }
  },

  methods: {
    getList() {
      this.loading = true
      this.$user
        .messages()
        .then((res) => {
          console.log(res.data)
          let messages = res.data
          // Group the data by 'category' and keep only the last item
          // let groupedData =
          const groupedData = this.groupByAndKeepLast(messages)

          let chatList = []
          groupedData.forEach((elem) => {
            let receiver = {
              ...elem.receiver
            }
            let sender = {
              ...elem.sender
            }
            let message = {
              userInfo: elem.sender_id === this.user.id ? receiver : sender,
              userId: elem.sender_id === this.user.id ? elem.receiver_id : elem.sender_id,
              message: elem.message,
              created_at: elem.created_at
            }
            chatList.push(message)
          })
          this.messages = chatList
          console.log('chat list data:', chatList)
        })
        .finally(() => {
          this.loading = false
        })
    },

    groupByAndKeepLast(array) {
      return Object.values(
        array.reduce((result, currentValue) => {
          // Get the value of the key in the current item
          const testKey = currentValue
          const groupKey =
            currentValue[testKey.sender_id === this.user.id ? 'receiver_id' : 'sender_id']


          // Always set the current item as the value for this key
          result[groupKey] = currentValue

          // Return the result object for the next iteration
          return result
        }, {})
      )
    }
  },

  beforeMount() {
    this.getList()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
