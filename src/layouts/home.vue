<template>
  <div class="bg-white min-h-screen">
    <app-nav :menu="menu" class="sticky top-0 z-10" />
    <slot />
    <app-footer />
  </div>
</template>

<script>
import AppNav from '@/components/navigation/AppNav.vue'
import AppFooter from '@/components/navigation/AppFooter.vue'
export default {
  components: { AppNav, AppFooter },
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
