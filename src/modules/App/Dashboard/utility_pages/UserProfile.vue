<template>
  <div>
    <span v-if="isLoading"> Retrieving Data </span>
    <div v-else class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
      <div class="bg-white p-6">
        <div class="flex items-center flex-col mb-3">
          <div class="relative">
            <img
              :src="user.image ? imgUrl + 'user/profile/' + user.image : image"
              class="w-[80px] h-[80px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
            />
          </div>

          <h4 class="font-semibold flex items-center mt-3">
            {{ `${user.firstname} ${user.lastname}` }}
            <span>
              <i-icon
                icon="ic:round-verified"
                :class="[!user?.kv ? 'text-gray-300' : 'text-green-600']"
              />
            </span>
          </h4>
          <span class="text-[12px] text-gray-400">{{ user?.email }}</span>
          <span class="text-[12px] text-gray-400">{{
            `joined Siswift ${$formatRelativeTime(user?.created_at)}`
          }}</span>
        </div>
        <div class="mt-3">
          <a class="flex items-center text-black1 gap-[5px] text-sm font-semibold" :href="`tel:${user?.mobile}`"
            ><i-icon icon="solar:phone-bold" class="form-icon text-gray-600" />
            {{ user?.mobile }}
          </a>
          <span class="flex items-center text-black1 gap-[5px] text-sm font-semibold"
            ><i-icon icon="tabler:location-filled" class="form-icon text-gray-600" />
            {{ user?.address }}
          </span>
        </div>
      </div>
      <div class="bg-white p-6 lg:col-span-2 md:col-span-2 col-span-1">
        <h4 class="font-semibold text-lg">Reviews</h4>
        <hr class="my-2" />
        <div class="flex flex-col gap-3">
          <div v-for="obj in user?.review" :key="obj?.id">
            <h6 class="text-[14px] font-semibold" v-if="obj">
              {{
                obj.seller ? `${obj?.seller?.firstname} ${obj?.seller?.lastname}` : 'User not found'
              }}
            </h6>
            <div class="flex items-start gap-2">
              <span>
                <img
                  :src="obj?.seller?.image ? imgUrl + 'user/profile/' + obj?.seller?.image : image"
                  class="w-[35px] h-[35px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
                />
              </span>
              <div>
                <p class="text-sm">{{ obj?.review }}</p>
                <span class="text-xs flex gap-[2px]">
                  <i-icon icon="mingcute:star-fill" class="text-secondary text-xs" />
                  {{ obj?.rating }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  data() {
    return {
      isLoading: false,
      image,
      ID: this.$route.params.id,
      user: {}
    }
  },

  methods: {
    avgRating(item) {
      let ratings = item.review
      let allRates = []
      ratings.forEach((item) => {
        allRates.push(item.rating)
      })
      let rateSum = allRates.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      let avg = rateSum / allRates.length
      return avg || 0
    },

    getReviewer(item) {
      this.$config.getUserData(item).then((res) => {
        console.log(res)
        return res.user
      })
    },

    getUser() {
      this.isLoading = true
      this.$config
        .getUserData(this.ID)
        .then((res) => {
          console.log(res)
          this.user = res.user
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  beforeMount() {
    this.getUser()
  },

  computed: {}
}
</script>

<style></style>
