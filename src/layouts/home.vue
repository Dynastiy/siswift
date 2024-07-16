<template>
  <div class="bg-white min-h-screen">
    <app-nav :menu="menu" class="sticky top-0 z-10" />
    <slot />
  </div>
</template>

<script>
import AppNav from '@/components/navigation/AppNav.vue'
export default {
  components: { AppNav },
  data() {
    return {
      menu: [
        { label: 'home', url: '/' },
        { label: 'products', url: '/login' },
        { label: 'store', url: '/login' },
        // { label: 'FAQ', url: '/login' },
        { label: 'cart', url: '/login' },
        { label: 'terms', url: '/terms' }
      ]
    }
  }
}
</script>

<style></style>
