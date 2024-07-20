<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
    <div class="flex flex-col justify-center">
      <img src="@/assets/img/icons/success.svg" width="60%" class="mx-auto " />
      <span class="block text-center text-lg font-semibold capitalize my-5"> Payment Success</span>
      <button class="brand-btn brand-primary w-fit mx-auto px-6" @click="$router.push('/app/wallet')">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
    // watch:{
        
    // }
  computed: {
    action(){
        return this.$route.params.action
    },
    // action() {
    //   return this.$route.query.action
    // }
  }
}
</script>

<style></style>
