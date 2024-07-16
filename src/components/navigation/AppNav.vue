<template>
  <div class="bg-white" id="mobile-drawer">
    <div class="container">
      <div class="py-4 bg-white w-full lg:z-10 md:z-10">
        <div class="flex justify-between items-center">
          <div class="">
            <img
              src="@/assets/BrandLogos/logo.png"
              class="w-28"
              alt="Siswift logo"
              @click="$router.push('/')"
              role="button"
            />
          </div>

          <span role="button" class="lg:hidden md:hidden" @click="drawer = !drawer">
            <i-icon icon="grommet-icons:menu" width="28px" class="text-black1" />
          </span>

          <ul class="lg:flex md:flex items-center hidden gap-4">
            <li v-for="item in menu" :key="item?.url">
              <router-link
                :to="item?.url"
                :class="{ 'active-nav text-primary': item?.label === routeName }"
                class="relative text-[15px] font-medium capitalize"
                >{{ item.label }}</router-link
              >
            </li>
            <button class="brand-outline-md px-6 ml-12">
              <router-link to="/login">Login</router-link>
            </button>
          </ul>
        </div>
      </div>

      <div class="">
        <Sidebar v-model:visible="drawer" position="right" style="width: 80%">
          <template #container="{ closeCallback }">
            <div class="h-screen bg-black3 px-6 pb-28 flex flex-col z-20">
              <div>
                <span role="button" class="flex justify-end mt-4" @click="closeCallback">
                  <i-icon icon="ion:close-sharp" class="text-error text-2xl" />
                </span>
              </div>
              <div class="">
                <div class="mt-4">
                  <ul class="flex flex-col">
                    <li
                      v-for="item in menu"
                      :key="item?.url"
                      class="border-b border-b-gray-300 py-3 border-b-[1px]"
                    >
                      <router-link
                        :to="item?.url"
                        class="text-[15px] text-white capitalize relative"
                        :class="{ 'active-nav text-primary': item?.label === routeName }"
                        >{{ item.label }}</router-link
                      >
                    </li>
                    <router-link to="/login">
                      <button class="brand-outline-md w-full mt-6 px-6">Login</button>
                    </router-link>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import image from '@/assets/img/no-user.png'
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },

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
    },

    checkDevice() {
      function isMobileDevice() {
        return window.matchMedia('(max-width: 767px)').matches
      }

      if (isMobileDevice()) {
        console.log('You are using a mobile device')
        this.drawer = !this.drawer ? false : !this.drawer
      }
      //   else {
      //     console.log('You are using a desktop device')

      //   }
    }
  },

  watch: {
    $route: {
      handler(oldVal, newVal) {
        if (newVal !== oldVal) {
          this.checkDevice()
        }
      },
      immediate: true
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
  }
}
</script>

<style>
.active-nav::before {
  content: '';
  width: 100%;
  /* transform: translate(45%, 45%); */
  height: 5px;
  border-radius: 0 0 10px 10px;
  bottom: -8px;
  background: var(---primary-color);
  position: absolute;
}

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
