<template>
  <div class="lg:page-bg md:page-bg ">
    <span class=" flex justify-between items-center">
      <h4 class="font-bold text-xl">Chats</h4>
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
          <div class="overflow-y-auto">
            <div class="flex flex-col gap-5">
              <div
                class="flex items-center justify-between"
                @click="$emit('selectMessage', item)"
                role="button"
                v-for="item in messages"
                :key="item?.id"
              >
                <div class="flex gap-3 items-center">
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
                    <!-- {{JSON.parse(item?.message).title}} -->
                    <span class="text-[13px] text-black1 font-semibold">
                      {{ `${item?.userInfo?.firstname} ${item?.userInfo?.lastname}` }}
                    </span>
                    <!-- <span class="text-[12px] text-gray-500">
                      <span>{{ item?.userInfo_id !== user.id ? 'You:' : '' }}</span>
                      {{ JSON.parse(item?.message).title ? JSON.parse(item?.message).title.slice(0, 12) + '...' : item?.message.slice(0, 12) + '...' }}
                    </span> -->
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
  props: {
    allMessages: Array,
    isLoading: Boolean,
  },
  data() {
    return {
      image,
      messages: [],
      loading: false
    }
  },

  methods: {
   
  },

  watch: {
    allMessages: {
      handler(val) {
        this.messages = val
      },
      immediate: true
    },
    isLoading: {
      handler(val) {
        this.loading = val
      },
      immediate: true
    }
  },

  beforeMount() {
    // this.getList()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
