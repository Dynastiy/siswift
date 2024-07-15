<template>
  <div class="bg-white rounded-md">
    <span class="px-4 py-3 flex justify-between items-center">
      <h4 class="font-semibold">Chats</h4>
      <span>
        <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
      </span>
    </span>
    <hr />
    <div class="px-4 py-4">
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between" @click="$emit('selectMessage', item)" role="button" v-for="item in messages" :key="item?.id">
          <div class="flex gap-3 items-center">
            <!-- <img
              src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
              alt=""
              role="button"
              class="h-[30px] w-[30px] rounded-[4px] object-cover object-center"
            /> -->
            <span class="p-2 rounded-md font-bold" v-if="item" :class="item?.receiver?.firstname.charAt(0)"> {{ item?.receiver?.firstname.charAt(0) }} </span>
            <div class="flex flex-col">
              <span class="text-[13px] text-black1 font-semibold"> {{ `${item?.receiver?.firstname} ${item?.receiver?.lastname}` }} </span>
              <span class="text-[12px] text-gray-500"> {{ item?.message.slice(0,12)+'...' }} </span>
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
  </div>
</template>

<script>
export default {
  data(){
    return {
      messages: []
    }
  },

  methods: {
    getList(){
      this.$user.messages()
      .then((res)=> {
        console.log(res.data);
        this.messages = res.data
      })
    }
  },

  beforeMount(){
    this.getList()
  }
}
</script>

<style></style>
