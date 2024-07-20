<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
    <main-photo @uploadMainImage="uploadMainImage" uploadLabel="Document" />

    <div class="mt-4" v-if="isLoading">
      <span class="flex items-center gap-2 text-[14px]">
        <i-icon icon="eos-icons:bubble-loading" />
        Uploading
      </span>
    </div>

    <div class="text-center mt-6">
      <button
        @click="uploadDocument"
        class="brand-btn w-8/12"
        :disabled="isLoading"
        :class="[isLoading ? 'bg-gray1 text-gray' : 'brand-primary']"
      >
        <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
        <span v-else> Update </span>
      </button>
    </div>
  </div>
</template>

<script>
import MainPhoto from '@/components/product/mainPhoto.vue'
export default {
  components: {
    MainPhoto
  },
  data() {
    return {
      mainImage: null,
      isLoading: false
    }
  },

  methods: {
    nextStep() {
      this.currentStep++
    },

    prevStep() {
      this.currentStep--
    },

    getUser() {
      this.$auth.getProfile().then((res) => {
        console.log(res.profile)
        this.$store.commit('auth/setUser', res.profile)
      })
    },

    uploadDocument() {
      const formdata = new FormData()
      let keyType = this.type === 'document' ? 'nin_upload' : "selfie"
      formdata.append(keyType, this.mainImage)
      console.log();
      this.$auth.uploadDocument(formdata).then((res) => {
        console.log(res)
        this.getUser()
        this.$router.push('/app/kyc')
      })
    },

    uploadMainImage(e) {
      this.mainImage = e
    }
  },

  beforeMount() {
    this.getUser()
    // this.getDocument()
  },

  computed:{
    type(){
      return this.$route.query.type
    }
  }
}
</script>

<style></style>
