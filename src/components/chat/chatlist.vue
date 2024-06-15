<template>
  <div class="bg-white rounded-md">
    <span class="px-4 py-3 flex justify-between items-center">
      <h4 class="font-semibold">Chats</h4>
      <span>
        <i-icon icon="ri:search-2-line" class="form-icon text-gray-400" />
      </span>
    </span>
    <hr />
    <div class="px-4 py-4">
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between" role="button" v-for="item in 6" :key="item">
          <div class="flex gap-3 items-center">
            <img
              src="https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500"
              alt=""
              role="button"
              class="h-[30px] w-[30px] rounded-[4px] object-cover object-center"
            />
            <div class="flex flex-col">
              <span class="text-[13px] text-black1 font-semibold"> Techno Spark 17 </span>
              <span class="text-[12px] text-gray-500"> Bukki stores: That's t.. </span>
            </div>
          </div>

          <span class="flex flex-col items-end gap-1">
            <span class="text-gray-500 text-[11px]">12:05</span>
            <span class="block text-xs px-1 font-semibold bg-accent rounded-sm">2</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
