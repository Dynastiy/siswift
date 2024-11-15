<template>
  <div class="bg-white p-6 rounded-lg">
    <div class="mt-3 ">
      <h4 class="mb-3 font-semibold">Notifications</h4>
      <wx-notification :items="notifications" @refresh:notifications="list" class="flex flex-col gap-4" />
    </div>
  </div>
</template>

<script>
import wxNotification from '@/components/UI/wxNotification.vue'
export default {
  components: { wxNotification },

  data(){
    return {
      notifications: []
    }
  },

  methods: {
    list(){
      this.$user.getNotifications()
      .then((res)=> {
        console.log(res);
        this.notifications = res.notifications
      })
    },
  },

  beforeMount(){
    this.list()
  }
}

</script>

<style></style>
