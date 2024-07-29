<template>
  <div>
    <div class="flex flex-col gap-4">
      <span
        v-for="item in nots"
        :key="item?.id"
        class="block flex justify-between items-center"
        role="button"
      >
        <span class="font-medium text-sm">
          <span class="font-semibold text-[16px]">{{ item.label }}</span>
          <span class="text-sm text-gray-600 block">{{ item.desc }}</span>
        </span>
        <el-switch
          v-model="item.status"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #828282"
        />
      </span>
    </div>

    <span
      @click="$router.push('/app/setting/upgrade')"
      class="mt-20 border border-dashed border-primary block p-2 rounded-md flex justify-between items-center"
      role="button"
    >
      <span class="font-medium text-sm flex gap-2 items-center">
        <i-icon icon="teenyicons:diamond-solid" class="text-primary" />
        Upgrade
      </span>
      <i-icon icon="prime:angle-right" class="text-[25px]" />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value2: false,
      nots: [
        {
          label: 'Orders',
          desc: 'Order status, tracking update, dispute progress',
          status: false
        },
        {
          label: 'Activities',
          desc: 'Activities related to your account and more',
          status: true
        },
        {
          label: 'Messages',
          desc: 'Notification from interaction with others',
          status: true
        }
      ]
    }
  }
}
</script>

<style></style>
