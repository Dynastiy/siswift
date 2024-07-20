<template>
  <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
    <div class="bg-white rounded-md">
      <h4 class="font-semibold p-4">Product Image</h4>
      <hr class="" />
      <div class="p-4">
        <main-photo @uploadMainImage="uploadMainImage"/>
        <photo-upload @uploadImage="uploadImage" />
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
            @click="prevStep"
          >
          </span>
          <span
            class="block h-[8px] bg-secondary rounded-full"
            :class="[currentStep === 1 ? 'w-[25px]' : 'w-[8px]']"
            role="button"
            @click="nextStep"
          ></span>
        </div>
      </h4>
      <hr class="" />
      <div class="p-6">
        <create @prevStep="prevStep" @nextStep="nextStep" :mainImage="mainImage" :productImages="productImages"  @refresh="getUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import create from '@/components/product/create.vue'
import PhotoUpload from '@/components/product/photoUpload.vue'
import MainPhoto from '@/components/product/mainPhoto.vue'
export default {
  components: { create, PhotoUpload, 
    MainPhoto 
  },
  data() {
    return {
      currentStep: 0,
      mainImage: null,
      productImages: null
    }
  },

  methods: {
    nextStep() {
      this.currentStep++
    },

    prevStep() {
      this.currentStep--
    },
    
    getUser(){
      this.$auth.getProfile()
      .then((res)=> {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    },

    uploadImage(e){
      this.productImages = e
    },

    uploadMainImage(e){
      this.mainImage = e
    }
  },

  beforeMount(){
    this.getUser()
  }
}
</script>

<style></style>
