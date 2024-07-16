<template>
  <div class="flex flex-col gap-12">
    <hero />
    <recommended />
    <start />
    <div class="bg-primary py-8">
      <div class="container">
        <h4 class="font-semibold mb-4 text-xl text-white">How to get started</h4>
        <p class="text-white text-md">
          Embark on your journey by signing up and seamlessly completing the registration process.
          Showcase your offerings by uploading a compelling advertisement, and patiently anticipate
          incoming orders. When opportunities arise, skillfully negotiate with interested buyers to
          ensure a mutually beneficial transaction. Your path to success starts with these simple
          yet crucial steps.
        </p>
        <button class="brand-outline-md px-6  mt-6 border border-white">
          <router-link to="/register" class="text-white">Get Started</router-link>
        </button>
      </div>
    </div>
    <recommended />
    <vDownload />
  </div>
</template>

<script>
import Hero from '@/components/home/Hero.vue'
import Recommended from '@/components/home/Recommended.vue'
import Start from '@/components/home/Start.vue'
import Download from '@/components/home/Download.vue'
export default {
  components: { Hero, Recommended, Start, vDownload:Download }
}
</script>,
    

<style></style>
