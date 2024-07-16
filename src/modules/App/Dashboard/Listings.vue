<template>
    <div>
      <span class="border-b border-b-gray-400 w-full flex gap-4  justify-center">
        <span v-for="(item, idx) in tabs" :key="idx" role="button" class="capitalize w-full text-center" :class="{'border-b text-primary border-b-primary font-semibold': activeTab === idx}" @click="activateMenu(idx)">
          {{ item.label.split('_').join(' ') }}
        </span>
      </span>
      <div class="bg-white p-8 rounded-md  mt-6">
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // components: { GeneralSettings, ChangePassword },
    data() {
      return {
        tabs: [
          {
            label: 'all_ads',
            
          },
          {
            label: 'selling',
            
          },
          {
            label: 'sold',
            
          }
        ],
        activeTab: 0
      }
    },
  
    methods: {
      activateMenu(i) {
        console.log(i);
        this.activeTab = i
      }
    }
  }
  </script>
  
  <style></style>
  