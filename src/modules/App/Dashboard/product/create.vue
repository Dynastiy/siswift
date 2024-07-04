<template>
  <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
    <div class="bg-white rounded-md">
      <h4 class="font-semibold p-4">Product Image</h4>
      <hr class="" />
      <div class="p-4">
        <photo-upload />
      </div>
    </div>

    <div class="bg-white rounded-md">
      <h4 class="font-semibold flex justify-between items-center py-4 px-6">
        General Information
        <div class="flex justify-center gap-2">
          <span
            class="block h-[8px] bg-secondary rounded-full"
            :class="[currentStep === 0 ? 'w-[25px]' : 'w-[8px]']"
            role="button"
          >
          </span>
          <span
            class="block h-[8px] bg-secondary rounded-full"
            :class="[currentStep === 1 ? 'w-[25px]' : 'w-[8px]']"
          ></span>
        </div>
      </h4>
      <hr class="" />
      <div class="p-6">
        <create @prevStep="prevStep" @nextStep="nextStep" />
      </div>
    </div>
  </div>
</template>

<script>
import create from '@/components/product/create.vue'
import PhotoUpload from '@/components/product/photoUpload.vue'
export default {
  components: { create, PhotoUpload },
  data() {
    return {
      currentStep: 0
    }
  },

  methods: {
    nextStep() {
      this.currentStep++
    },

    prevStep() {
      this.currentStep--
    }
  }
}
</script>

<style></style>
