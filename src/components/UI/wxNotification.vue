<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <span class="block bg-accent text-primary text-xl p-2 rounded-md w-fit">
          <i-icon icon="bxs:data" />
        </span>
        <span class="text-sm"> Notification </span>
      </div>

      <span class="flex flex-col items-end">
        <span class="block w-2 h-2 bg-red-600 rounded-full"></span>
        <span class="text-gray-500 text-xs">2 days ago</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
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
      })
    }
  },

  beforeMount(){
    this.list()
  }
}
</script>

<style></style>
