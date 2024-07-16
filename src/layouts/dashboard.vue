<template>
  <div class="">
    <app-header :menu="menu" class="sticky top-0 z-10" />
    <!-- <top-header :menu="menu" class="lg:hidden md:hidden sticky top-0 block z-10" /> -->
    <div class="lg:block md:block hidden">
      <app-drawer :menu="menu" />
    </div>
    <div id="main" class="lg:ml-[250px] md:ml-[250px]">
      <div class="pb-6 px-5 mt-6">
        <div v-if="isSubPage" class="flex items-center gap-2 mb-4">
          <span class="back-button bg-gray-100" role="button" @click="$router.go(-1)">
            <i-icon icon="ic:baseline-arrow-back" width="20px" />
          </span>

          <div>
            <small class="font-light text-xs block">Go Back</small>
            <h6 class="mb-0 text-sm font-semibold capitalize" style="font-weight: 500">
              {{ subRouteName }}
            </h6>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppDrawer from '@/components/navigation/AppDrawer.vue'
import AppHeader from '@/components/navigation/AppHeader.vue'
export default {
  components: { AppDrawer, AppHeader },
  name: 'DashboardLayout',
  data() {
    return {
      menu: [
        {
          title: 'Marketplace',
          icon: 'fa:shopping-bag',
          url: '/app/marketplace',
          parent: 'marketplace',
          isLink: true,
          isBottom: false
        },
        {
          title: 'My Cart',
          icon: 'streamline:shopping-cart-1-solid',
          url: '/app/my-cart',
          parent: 'my-cart',
          isLink: true,
          isBottom: false
        },
        // {
        //   title: 'My Store',
        //   icon: 'entypo:shop',
        //   url: '/app/my-store',
        //   parent: 'my-store',
        //   isLink: true,
        //   isBottom: false
        // },
        {
          title: 'My Orders',
          icon: 'flowbite:messages-solid',
          url: '/app/my-orders',
          parent: 'my-orders',
          isLink: true,
          isBottom: false
        },
        {
          title: 'My Listings',
          icon: 'flowbite:messages-solid',
          url: '/app/my-listings',
          parent: 'my-listings',
          isLink: true,
          isBottom: false
        },
        
        {
          title: 'Messages',
          icon: 'flowbite:messages-solid',
          url: '/app/messages',
          parent: 'app-messages',
          isLink: true,
          isBottom: false
        },
        {
          title: 'Wallet',
          icon: 'solar:wallet-2-bold',
          url: '/app/wallet',
          parent: 'app-wallet',
          isLink: true,
          isBottom: false
        },
        {
          title: 'Settings',
          icon: 'mingcute:settings-1-fill',
          url: '/app/setting',
          parent: 'setting',
          isLink: true,
          isBottom: true,
        },
        {
          title: 'Support',
          icon: 'ri:24-hours-fill',
          url: '/app/support',
          parent: 'support',
          isLink: true,
          isBottom: true,
          hasChildren: true,
          children: [
            {
              title: 'Chat with Us',
              icon: 'mingcute:settings-1-fill',
              url: '/app/support/chat',
              isLink: true,
              subItem: 'chat'
            },
            {
              title: 'Call Us',
              icon: 'mingcute:settings-1-fill',
              url: '/app/support/call',
              isLink: true,
              subItem: 'call'
            },
            {
              title: 'Send Us a Mail',
              icon: 'mingcute:settings-1-fill',
              url: '/app/support/send-mail',
              isLink: true,
              subItem: 'mail'
            }
          ]
        },
        {
          title: 'Legal',
          icon: 'hugeicons:legal-document-02',
          url: '/app/legal',
          parent: 'legal',
          isLink: true,
          isBottom: true
        }
      ]
    }
  },

  methods: {
    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setUser', res.user)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  beforeMount() {},

  created() {},

  computed: {
    routeName() {
      return this.$route.meta.name
    },

    routeParent() {
      return this.$route.meta.header
    },

    user() {
      return this.$store.getters['auth/getUser']
    },

    isSubPage() {
      return this.$route.meta.isSubPage
    },

    subRouteName() {
      return this.$route.meta.subName
    }
  }
}
</script>

<style></style>
