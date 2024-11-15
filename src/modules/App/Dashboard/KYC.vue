<template>
  <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
    <img src="@/assets/img/kyc.svg" alt="" />
    <div class="flex flex-col gap-4">
      <button
        class="border border-dashed border-primary bg-white block p-2 rounded-md flex justify-between items-center"
        @click="$router.push('/app/kyc/select-document-type')"
      >
        <span class="font-medium text-sm flex gap-2 items-center">
          <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
          <div class="flex flex-col items-start">
            <span>Upload an image of a valid ID</span>
            <span class="text-xs text-gray-500">Please input your report below</span>
          </div>
        </span>
        <i-icon icon="prime:angle-right" class="text-[25px]" />
      </button>

      <button
        class="border border-dashed border-primary bg-white block p-2 rounded-md flex justify-between items-center"
        @click="$router.push('/app/kyc/upload?type=selfie')"
      >
        <span class="font-medium text-sm flex gap-2 items-center">
          <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
          <div class="flex flex-col items-start">
            <span>Take a selfie of yourself</span>
            <span class="text-xs text-gray-500">To match your id </span>
          </div>
        </span>
        <i-icon icon="prime:angle-right" class="text-[25px]" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kyc: {}
    }
  },

  methods: {
    fetchKYCData() {
      this.$user.getKYC().then((res) => {
        console.log(res)
        this.kyc = res
      })
    }
  },

  mounted() {
    this.fetchKYCData()
  }
}
</script>

<style></style>
