<template>
  <div>
    <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto">
      <div class="">
        <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Review User</h3>
        <span class="text-[15px] block font-regular text-gray2"
          >Do you have a feedback for this user?</span
        >
      </div>
      <form @submit.prevent="onSubmit" class="mt-8 flex flex-col gap-4">
        <div class="">
          <div>
            <label for="">Rating</label>
            <Rating v-model="value" :cancel="false" />
          </div>
        </div>

        <div class="">
          <div>
            <label for="">Review</label>
            <textarea
              name=""
              id=""
              cols="12"
              rows="5"
              placeholder="Type a review"
              class="input"
              v-model="review"
            ></textarea>
          </div>
        </div>

        <div class="text-center mt-8">
          <button
            class="brand-btn w-full"
            :disabled="isLoading"
            :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      value: 0,
      review: ''
    }
  },
  methods: {
    onSubmit() {
        this.isLoading = true
      let payload = {
        reviewed_user_id: this.$route.params.id,
        content: this.review,
        rating: this.value
      }
      this.$config.createUserReview(payload).then((res) => {
        this.$router.go(-1)
        return res
      })
      .finally(()=> {
        this.isLoading = false
      })
    }
  }
}
</script>
