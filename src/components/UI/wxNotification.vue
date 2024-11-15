<template>
  <div>
    <div class="flex items-center justify-between" role="button" v-for="item in items" :key="item?.id">
      <!-- {{notifications}} -->
      <div class="flex gap-3 items-center">
        <span class="block bg-accent text-primary text-xl p-2 rounded-md w-fit">
          <i-icon icon="lets-icons:order-fill" />
        </span>
        <span class="text-sm"> {{ item?.title }} </span>
      </div>

      <span class="flex flex-col items-end">
        <div class="flex gap-3 items-center">
          <span :class="['block w-2 h-2 rounded-full', { 'bg-red-600': item.read_status == '0' } ]" ></span>
          <span role="button" class="text-[12px] underline" v-if="item.read_status == '0'" @click="markAsRead(item)">Mark as Read</span>
        </div>
        <span class="text-gray-500 text-xs">{{ $formatRelativeTime(item?.created_at) }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: null
  },
  data(){
    return {
      // notifications: []
    }
  },

  methods: {
    markAsRead(e){
      let payload = {
        read_status: "1",
        notification_id: e.id
      }
      this.$user.readNotification(payload)
      .then((res)=> {
        console.log(res);
        this.$emit('refresh:notifications')
      })
    }
  },

  beforeMount(){
    // this.list()
  }
}
</script>

<style></style>
