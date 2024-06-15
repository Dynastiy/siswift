<template>
  <div class="flex flex-col gap-2">
    <li v-for="(item, idx) in menuItems" :key="idx">
      <div class="menu-item">
        <span
          class="menu-item-link flex justify-between items-center w-full text-black-300 rounded-lg px-[8px] py-[8px]"
          role="button"
          @click="$emit('menuClick', item)"
          :class="{ 'text-primary bg-accent ml-4': item.parent === routeParent }"
        >
          <div class="flex gap-2 items-center">
            <i-icon :icon="item.icon" v-if="item.icon" class="menu-item-icon" />
            <span class="flex flex-column text-[13px] capitalize">
              <span class="font-medium" :class="item.header ? 'menu-title-header' : 'menu-title'">
                {{ item.title.split('-').join(' ') }}
              </span>
            </span>
          </div>

          <span v-if="item.hasChildren">
            <i-icon
              :icon="subMenu === item.parent ? 'prime:angle-down' : 'prime:angle-right'"
              width="22px"
            />
          </span>
        </span>
        <div class="flex flex-col gap-3 mt-2 pl-7" v-if="subMenu === item.parent">
          <span
            role="button"
            class=""
            v-for="(data, idx) in item.children"
            :key="idx"
            @click="$router.push(data.url)"
          >
            <span
              class="sub-menu-items flex text-[13px] gap-2 items-center py-1 px-2 rounded-md"
              :class="[data.subItem === subMenuRouteName ? 'bg-accent text-gray-600' : 'text-gray-500']"
            >
              <i-icon :icon="data.icon" class="menu-item-icon" />
              <span class="sub-menu-title"> {{ data.title }} </span>
            </span>
          </span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    // goToLink(item) {
    //   this.$router.push({ path: item.url }).catch(() => {})
    // },

    // openSubMenu(item) {
    //   let value = this.subMenu === item.parent ? null : item.parent
    //   this.$store.dispatch('drawer/setSubMenu', value)
    // }
  },

  computed: {
    routeParent() {
      return this.$route.meta.parent
    },
    
    subMenu() {
      return this.$store.state.drawer.subMenu
    },

    subMenuRouteName(){
      return this.$route.meta.subName
    }
  }
}
</script>

<style></style>
