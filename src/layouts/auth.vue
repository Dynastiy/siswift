<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 h-screen">
    <div class="md:block lg:block hidden">Left Side</div>
    <div class="lg:p-16 md:p-12 p-8 bg-white">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name
    }
  }
}
</script>

<style></style>
