<template>
  <div class="flex flex-col">
    <div v-if="items.length == 0" class="flex flex-col justify-center items-center">
      <span
        class="bg-accent block h-[100px] w-[100px] text-primary rounded-full flex justify-center items-center"
      >
        <i-icon icon="mdi:rate-review" class="text-[60px]" />
      </span>
      <h5>User has no review</h5>
    </div>
    <div v-for="obj in items" :key="obj?.id" class="border-b border-b-gray-200 py-2">
      <div class="flex items-center justify-between">
        <div class="flex gap-1 items-center">
          <span>
            <img
              :src="
                !reviewers[obj.user_id]
                  ? image
                  : reviewers[obj.user_id].image
                    ? imgUrl + 'user/profile/' + reviewers[obj.user_id].image
                    : image
              "
              class="w-[35px] h-[35px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
            />
          </span>
          <h6 class="text-[16px] font-semibold" v-if="reviewers[obj.user_id]">
            {{
              reviewers[obj.user_id]
                ? `${reviewers[obj.user_id].firstname} ${reviewers[obj.user_id].lastname}`
                : 'User not found'
            }}
          </h6>
        </div>
        <div v-if="user.id == obj?.reviewed_user_id">
          <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand($event, obj)">
            <span class="el-dropdown-link flex items-center">
              <i-icon icon="pepicons-pencil:dots-y" width="20px" />
            </span>
            <template #dropdown>
              <el-dropdown-menu class="w-[150px]">
                <el-dropdown-item
                  command="reply"
                  class="capitalize block text-[13px] hover:bg-accent py-[5px] px-[8px] rounded-sm"
                  >Reply</el-dropdown-item
                >
                <el-dropdown-item
                  command="deleteRecord"
                  class="capitalize block hover:bg-accent text-[13px] py-[5px] px-[8px] rounded-sm text-red-600"
                  >Delete</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <div>
          <p class="text-sm">{{ obj?.content }}</p>
          <span class="text-xs flex gap-[2px]">
            <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
            {{ obj?.rating }}
          </span>
        </div>
      </div>

      <div class="flex gap-4 mt-2">
        <span
          class="underline text-primary text-xs font-semibold"
          role="button"
          @click="viewRecord(obj)"
          >Replies</span
        >
      </div>
      <div class="flex gap-2 flex-col mt-3">
        <span class="text-sm" v-for="item in obj?.replies" :key="item?.id">
          <div class="flex gap-1 mb-1 items-center">
            <img
              :src="item.image ? imgUrl + 'user/profile/' + item.user.image : image"
              class="w-[20px] h-[20px] border-1 p-[1px] border-gray-100 rounded-full object-fit object-top"
            />
            <span class="font-semibold text-[14px]">{{ `${item.user.firstname} ${item.user.lastname}` }}</span>
          </div>
          <textarea v-if="editing == item.id" v-model="item.content" class="input py-1" > </textarea>
            <span class="text-[13px]" v-else>
              {{ item.content }}
            </span>
          <span class=" mt-1" v-if="user.id == obj?.reviewed_user_id">
            <span v-if="editing == item.id" class="flex gap-3 items-center">
              <span
                role="button"
                @click="completeEdit(item)"
                :class="['text-[12px] font-semibold text-primary']"
              >
                Finish Editing
              </span>
              <span
                role="button"
                @click="cancelEditing"
                :class="['text-[12px] font-semibold text-red-600']"
              >
                Cancel
              </span>
            </span>
            <span v-else class="flex gap-3 items-center">
              <span
                role="button"
                @click="completeAction(action, item)"
                :class="[
                  'text-[12px] font-semibold capitalize',
                  action == 'edit' ? 'text-amber-600' : 'text-red-600'
                ]"
                v-for="action in ['edit', 'delete']"
                :key="action"
              >
                {{ action }}
              </span>
            </span>
          </span>
        </span>
      </div>

      <vDialog v-model:visible="visible" :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }" modal header="Reply Review" :style="{ width: '30rem' }">
        <form @submit.prevent="onSubmit">
          <div class="mb-6">
            <label for="">Content</label>
            <textarea name="" v-model="content" class="input" id=""></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="brand-btn-md bg-primary brand-primary w-7/12">
              Submit
            </button>
          </div>
        </form>
      </vDialog>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    items: Array
  },

  data() {
    return {
      image,
      visible: false,
      content: '',
      review_id: '',
      editing: null,
      replyContent: "",
      reviewers: {} // This will store reviewer data with user_id as keys
    }
  },

  methods: {
    async fetchReviewers() {
      // this.loading = true;
      // this.error = null;

      // Create an array of Axios requests
      const requests = this.items.map((item) => {
        console.log(item)

        return this.$config
          .getUserData(`${item.user_id}`)
          .then((response) => {
            console.log(response, 'testing')
            // this.$set(this.reviewers, item.user_id, response.user);
            this.reviewers[item.user_id] = response.user
          })
          .catch((err) => {
            // this.error = 'An error occurred while fetching reviewer data.';
            console.log(err)
          })
      })

      // Wait for all requests to complete
      try {
        await Promise.all(requests)
      } catch (err) {
        this.error = 'An error occurred while fetching reviewer data.'
      } finally {
        this.loading = false
      }
    },

    handleCommand(e, item) {
      if (e == 'reply') return this.reply(item)
      this.deleteReview(item)
    },

    completeAction(e, value) {
      console.log(e)
      if(e == 'edit') return this.editing = value.id 
      this.deleteRecord(value)
    },

    deleteRecord(e) {
      this.$user.deleteReviewReply(e.id).then((res) => {
        this.$emit('refresh')
        return res
      })
    },

    deleteReview(item){
      console.log(item)
      this.$user.deleteReview(item.id).then((res) => {
        this.$emit('refresh')
        return res
      })
    },

    cancelEditing(){
      this.editing = null
    },

    reply(item) {
      this.visible = !this.visible
      this.review_id = item.id
    },

    completeEdit(e) {
      let payload = {
        content: e.content, 
        method: '_put'
      }
      this.$user.editReviewReply(payload, this.editing).then((res) => {
        this.editing = null
        this.$emit('refresh')
        return res
      })
    },

    onSubmit() {
      let payload = {
        review_id: this.review_id,
        content: this.content
      }
      this.$user.replyReview(payload).then((res) => {
        this.visible = !this.visible
        this.$emit('refresh')
        return res
      })
    }
  },

  mounted() {
    this.fetchReviewers()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
