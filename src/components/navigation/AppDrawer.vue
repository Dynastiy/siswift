<template>
  <div
    id="app-drawer"
    class="lg:z-2 pb-8 mb-8 bg-white md:z-2 lg:fixed md:fixed absolute lg:left-0 md:left-0 top-0 h-screen overflow-y-auto w-[250px] gap-24"
  >
    <div>
      <div class="flex lg:w-[250px] pt-4 md:w-[250px] justify-center w-full">
        <img
          src="@/assets/BrandLogos/logo.png"
          class="lg:w-28 md:w-28 w-24"
          alt="Siswift logo"
          @click="$router.push('/app/marketplace')"
          role="button"
        />
      </div>
      <ul class="p-0 pt-6 px-8 flex flex-col min-h-[75vh] justify-between">
        <menu-item
          :menuItems="menuItems"
          @menuClick="$event.hasChildren ? openSubMenu($event) : goToLink($event)"
        />
        <menu-item
          :menuItems="isBottom"
          @menuClick="$event.hasChildren ? openSubMenu($event) : goToLink($event)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import MenuItem from './menu/menuItem.vue'
export default {
  components: { MenuItem },
  props: ['menu'],
  data() {
    return {}
  },

  methods: {
    goToLink(item) {
      this.$router.push({ path: item.url }).catch(() => {})
    },

    openSubMenu(item) {
      let value = this.subMenu === item.parent ? null : item.parent
      this.$store.dispatch('drawer/setSubMenu', value)
    }
  },

  computed: {
    menuItems() {
      return this.menu.filter((item) => !item.isBottom)
    },
    isBottom() {
      return this.menu.filter((item) => item.isBottom)
    },
    subMenu() {
      return this.$store.state.drawer.subMenu
    }
  }
}
</script>

<style>
#app-drawer li {
  list-style: none;
}

/* When Menu is collapsed */
#app-drawer.collapsible {
  width: 120px;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items .sub-menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title-header {
  font-size: 11px;
}

#app-drawer.collapsible ul li .menu-item-link,
#app-drawer ul li .menu-icon {
  /* padding: 1rem 1.3rem; */
}

#app-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 14px;
  /* padding: 8px 6px; */
  justify-content: space-between;
  align-items: center;
}

#app-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--secondary-color);
  transition: all 0.3s;
}

#app-drawer .menu-icon {
  /* background-color: var(--white-50); */
  /* width: 60px; */
  /* height: 60px; */
  /* border-radius: 50%; */
  /* margin-bottom: 30px; */
}

#app-drawer ul li .menu-item-link.active-link {
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  color: var(--white);
  /* color: var(--white-50); */
  /* color: var(--secondary-color); */
  position: relative;
  font-weight: 800;
  /* border-radius: 6px; */
}

#app-drawer ul li .menu-item-link.active-link::before {
  content: '';
  position: absolute;
  left: 0;
  background-color: var(--accent-color);
  width: 4px;
  height: 100%;
}

#app-drawer ul li .menu-item-link .menu-item-icon,
#app-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  /* background: #fff; */
  /* color: var(--secondary-color); */
  padding: 5px;
  /* border-radius: 50%; */
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#app-drawer ul li .sub-menu .sub-menu-items {
  color: var(--secondary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#app-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--secondary-color);
  color: var(--gray-800);
}

.sub-menu {
  height: 0;
  overflow-y: hidden;
  transition: all 3s;
}
.sub-menu-open {
  height: auto;
  transition: all 3s;
}
</style>
