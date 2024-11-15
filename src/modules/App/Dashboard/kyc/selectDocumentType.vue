<template>
    <div class="lg:page-bg md:page-bg lg:w-6/12 md:w-7/12 w-full mx-auto mt-6">
      <img src="@/assets/img/type.svg" alt="" />
      <div class="flex flex-col gap-4">
        <span
          class="border border-dashed border-primary bg-white block p-2 rounded-md flex justify-between items-center"
          role="button"
          @click="$router.push('/app/kyc/upload?type=document')"
        >
          <span class="font-medium text-sm flex gap-2 items-center">
            <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
            <div class="flex flex-col">
              <span>ID Card</span>
            </div>
          </span>
          <i-icon icon="prime:angle-right" class="text-[25px]" />
        </span>
  
        <span
          class="border border-dashed border-primary bg-white block p-2 rounded-md flex justify-between items-center"
          role="button"
          @click="$router.push('/app/kyc/upload?type=document')"
        >
          <span class="font-medium text-sm flex gap-2 items-center">
            <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
            <div class="flex flex-col">
              <span>Passport</span>
            </div>
          </span>
          <i-icon icon="prime:angle-right" class="text-[25px]" />
        </span>

        <span
          class="border border-dashed border-primary bg-white block p-2 rounded-md flex justify-between items-center"
          role="button"
          @click="$router.push('/app/kyc/upload?type=document')"
        >
          <span class="font-medium text-sm flex gap-2 items-center">
            <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
            <div class="flex flex-col">
              <span>Driving License</span>
            </div>
          </span>
          <i-icon icon="prime:angle-right" class="text-[25px]" />
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
        
      }
    }
  }
  </script>
  
  <style></style>
  