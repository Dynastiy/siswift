<template>
  <div class="" id="mobile-drawer">
    <div class="py-4 bg-white px-6 w-full lg:z-10 md:z-10">
      <div class="flex justify-between items-center">
        <!-- <span class="font-bold" role="button" @click="$router.push('/')">Top Header</span> -->
        <span role="button" class="lg:hidden md:hidden" @click="drawer = !drawer">
          <i-icon icon="grommet-icons:menu" width="24px" class="text-black1" />
        </span>
        <!-- <span class="brand-logo" role="button" @click="$router.push('/')">
          <img src="@/assets/BrandLogos/logo.png" class="lg:w-36 md:w-36 w-24" alt="" />
        </span> -->

        <div class="flex justify-center items-center">
          <div class="flex lg:w-[250px] md:w-[250px] justify-center w-full">
            <img
              src="@/assets/BrandLogos/logo.png"
              class="lg:w-28 md:w-28 w-24"
              alt="Siswift logo"
              @click="$router.push('/app/marketplace')"
              role="button"
            />
          </div>
          <menu-search v-if="isSearching" class="lg:block md:block hidden" />
          <span v-else class="font-semibold text-lg capitalize lg:block md:block hidden">{{
            routeName.split('-').join(' ')
          }}</span>
        </div>

        <div class="flex items-center gap-3">
          <i-icon
            icon="ri:search-2-line"
            class="lg:block md:block hidden"
            width="22px"
            role="button"
            @click="isSearching = !isSearching"
          />
          <div class="lg:block md:block hidden">
            <el-dropdown trigger="click" placement="bottom-end">
              <span class="el-dropdown-link flex items-center">
                <i-icon icon="ph:bell" width="22px" />
              </span>
              <template #dropdown>
                <div class="p-4 w-[350px]">
                  <span class="flex justify-between items-center">
                    <h4 class="font-semibold text-[14px]">Notification</h4>
                    <span
                      class="text-primary font-semibold text-sm"
                      role="button"
                      @click="$router.push('/app/notifications')"
                      >See All</span
                    >
                  </span>
                  <div class="mt-3 flex flex-col gap-4">
                    <wx-notification v-for="item in 5" :key="item" />
                  </div>
                </div>
              </template>
            </el-dropdown>
          </div>

          <span @click="$router.push('/app/my-store')" role="button">
            <i-icon icon="entypo:shop" width="20px" />
          </span>

          <el-dropdown trigger="click" placement="bottom-end">
            <span class="el-dropdown-link flex items-center">
              <img
                :src="user.image ? imgUrl + 'user/profile/'+ user.image : image"
                class="w-[38px] h-[38px] border-2 p-[2px] border-gray-100 rounded-full object-fit object-top"
              />
              <i-icon icon="prime:angle-down" class="" width="20px" />
            </span>
            <template #dropdown>
              <div class="p-4 w-[150px]">
                <h4 class="font-semibold text-[14px]">My Account</h4>
                <ul class="mt-2 p-0">
                  <li>
                    <span
                      @click="$router.push('/app/profile')"
                      class="flex gap-2 items-center text-[13px] p-2 hover:bg-accent rounded-md"
                      role="button"
                    >
                      <i-icon icon="solar:user-bold" />
                      <span>Profile</span>
                    </span>
                  </li>
                  <li>
                    <span
                      @click="logout"
                      role="button"
                      class="flex gap-2 items-center text-[13px] p-2 hover:bg-accent rounded-md"
                    >
                      <i-icon icon="ri:logout-circle-r-fill" />
                      <span>Logout</span>
                    </span>
                  </li>
                </ul>
              </div>
              <!-- <el-dropdown-menu>
                <el-dropdown-item
                  ><span @click="$router.push('/vendor/settings')">
                    View Profile
                  </span></el-dropdown-item
                >
                <el-dropdown-item>
                  <span @click="logout"> Logout </span>
                </el-dropdown-item>
              </el-dropdown-menu> -->
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="">
      <Sidebar v-model:visible="drawer" position="right" style="width: 80%">
        <template #container="{ closeCallback }">
          <div class="h-screen bg-white px-8 pb-28 flex flex-col z-20">
            <div>
              <span role="button" class="flex justify-end mt-4" @click="closeCallback">
                <i-icon icon="gg:close-o" class="text-error text-2xl" />
              </span>
            </div>
            <div class="flex flex-col justify-between h-[80vh]">
              <div class="mt-4">
                <div class="flex justify-center mt-2">
                  <router-link to="/"
                    ><img src="@/assets/BrandLogos/logo.png" width="120" alt=""
                  /></router-link>
                </div>

                <hr class="my-6 bg-gray-200" />

                <ul class="flex flex-col min-h-[75vh] justify-between">
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

              <div
                class="flex gap-2 px-4 items-center text-white text-[13px]"
                role="button"
                @click="logout"
              >
                <i-icon icon="fe:logout" class="menu-item-icon text-[20px]" />
                <span class="flex flex-column capitalize">
                  <span> Sign Out </span>
                </span>
              </div>
            </div>
          </div>
        </template>
      </Sidebar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import image from '@/assets/img/no-user.png'
import MenuSearch from '../filters/menuSearch.vue'
import MenuItem from './menu/menuItem.vue'
import WxNotification from '../UI/wxNotification.vue'
// import AppDrawer from "./MobileDrawer.vue";
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  components: { MenuSearch, MenuItem, WxNotification },

  data() {
    return {
      drawer: false,
      image,
      isSearching: false
    }
  },

  methods: {
    ...mapActions('drawer', ['setSubMenu']),
    goToLink(item) {
      if (item.parent === 'sign-out') {
        this.drawer = false
        this.logout()
      } else {
        this.drawer = false
        this.$router.push(item.url).catch(() => {})
      }
    },

    openSubMenu(item) {
      let value = this.subMenu === item.parent ? null : item.parent
      this.setSubMenu(value)
    },

    logout() {
      this.drawer = false
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.userLogout()
          }
        })
    },

    userLogout() {
      this.$store.dispatch('auth/logout')
      this.$swal
        .fire({
          title: 'Woo hoo 😫',
          text: 'Logged out succesfully',
          icon: 'success',
          confirmButtonText: 'Ok!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.$router.push('/login')
          }
        })
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    },
    routeParent() {
      return this.$route.meta.parent
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    subMenuRouteName() {
      return this.$route.meta.subName
    },
    ...mapState('drawer', {
      subMenu: (state) => state.subMenu
    }),
    menuItems() {
      return this.menu.filter((item) => !item.isBottom)
    },
    isBottom() {
      return this.menu.filter((item) => item.isBottom)
    }

    //   userMeta() {
    //     return this.$store.getters["auth/getUserMeta"];
    //   },
  }
}
</script>

<style>
#mobile-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 13px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#mobile-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--secondary-color);
  transition: all 0.3s;
}

#mobile-drawer .menu-icon {
  background-color: var(--white);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* margin-bottom: 30px; */
}

#mobile-drawer ul li .menu-item-link.active-link {
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  color: var(--white);
  font-weight: 500;
  border-radius: 6px;
}

#mobile-drawer ul li .menu-item-link .menu-item-icon,
#mobile-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: #fff;
  color: var(--secondary-color);
  padding: 5px;
  border-radius: 50%;
}

#mobile-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items {
  color: var(--secondary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--secondary-color);
  color: var(--gray-800);
}
</style>
