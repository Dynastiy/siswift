<template>
  <div class="lg:bg-white md:bg-white rounded-lg">
    <span class="flex justify-between items-center">
      <h4 class="font-bold text-xl px-3 pt-3">Chats</h4>
      <!-- <span>
        <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
      </span> -->
    </span>
    <hr class="mt-3" />
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="py-4">
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
          <div class="p-3">
            <div class="flex flex-col">
              <div
                :class="[
                  'flex items-center justify-between py-3',
                  { 'border-l border-l-primary border-l-2 bg-accent': item?.id == chatId }
                ]"
                role="button"
                v-for="item in messages"
                :key="item?.id"
              >
                <div class="flex gap-3 items-center">
                  <!-- <span
                    class="h-[30px] w-[30px] rounded-full flex items-center justify-center font-bold"
                    v-if="!item?.userInfo?.image"
                    :class="item?.userInfo?.firstname.charAt(0)"
                  >
                    {{ item?.userInfo?.firstname.charAt(0) }}
                  </span> -->
                  <img
                    @click="$emit('selectMessage', item)"
                    :src="imgUrl + 'product/' + item.product?.main_image"
                    class="w-[38px] h-[38px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
                  />
                  <div class="flex flex-col">
                    <!-- {{JSON.parse(item?.message).title}} -->
                    <span
                      class="text-[13px] text-black1 font-semibold"
                      @click="$emit('selectMessage', item)"
                    >
                      {{ `${item?.product?.name}` }}
                    </span>
                    <!-- <span class="text-[12px] text-gray-500">
                      <span>{{ item?.userInfo_id !== user.id ? 'You:' : '' }}</span>
                      {{ JSON.parse(item?.message).title ? JSON.parse(item?.message).title.slice(0, 12) + '...' : item?.message.slice(0, 12) + '...' }}
                    </span> -->
                  </div>
                </div>

                <span class="flex gap-1">
                  <!-- <span class="text-gray-500 text-[11px]">12:05</span> -->
                  <span class="text-gray-500 text-[11px]">{{
                    $formatShortDate(item?.created_at)
                  }}</span>
                  <el-dropdown
                    trigger="click"
                    placement="bottom-end"
                    @command="handleCommand(item)"
                  >
                    <span class="el-dropdown-link flex items-center">
                      <i-icon icon="pepicons-pencil:dots-y" width="20px" />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu class="w-[150px]">
                        <!-- <el-dropdown-item
                              v-for="item in []"
                              :key="item"
                              :command="item"
                              class="capitalize block hover:bg-accent py-[5px] px-[8px] rounded-sm text-black"
                              >{{ item }}</el-dropdown-item
                            > -->

                        <el-dropdown-item
                          command="deleteRecord"
                          class="capitalize block hover:bg-accent py-[5px] px-[8px] rounded-sm text-red-600"
                          >Delete</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
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
import { ElMessageBox } from 'element-plus'
export default {
  props: {
    allMessages: Array,
    isLoading: Boolean
  },
  data() {
    return {
      image,
      messages: [],
      loading: false,
      chatId: null
    }
  },

  methods: {
    handleCommand(value) {
      console.log('test')
      ElMessageBox.confirm(
        'Are you sure you want to delete this conversation. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteConversation(value)
        })
        .catch(() => {
          this.$toast.error(`Delete operation cancelled`, {
            timeout: 4000
          })
        })
    },

    deleteConversation(value) {
      console.log(value, 'delete')
      this.$user.deleteMessage(value.id).then((res) => {
        console.log(res)
        this.$emit('refresh')
        return res
      })
    },

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
    },
    '$route.query': {
      handler(val) {
        this.chatId = val.chatId
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

<style scoped>
.chat-screen {
  height: calc(100vh - 225px);
  /* height: 100vh; */
}
</style>
