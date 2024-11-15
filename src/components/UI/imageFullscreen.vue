<template>
  <div class="fixed w-full h-screen top-0 left-0 z-10 bg-accent">
    <span class="block text-red-500 flex pt-2 pr-6 justify-end" role="button" @click="$emit('closeFullScreen')">
        <i-icon icon="zondicons:close-solid" />
    </span>
    <div class="flex justify-center items-center p-4">
        <img :src="imgSrc" alt="" class="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: null
  }
}
</script>

<style></style>
