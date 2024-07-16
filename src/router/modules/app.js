const routes = [
  // {
  //   path: '/',
  //   redirect: 'app/marketplace',
  //   name: 'home',
  //   meta: {
  //     layout: 'Dashboard',
  //     requiresAuth: true,
  //     parent: 'marketplace',
  //     name: 'home'
  //   }
  // },

  {
    path: '/',
    name: "home",
    component: () => import('@/modules/App/Home.vue'),
    meta: {
      layout: 'Home',
      requiresAuth: false,
      name: "home"
    }
  },

  {
    path: '/terms',
    name: "terms",
    component: () => import('@/modules/App/Terms.vue'),
    meta: {
      layout: 'Home',
      requiresAuth: false,
      name: "terms"
    }
  },

  {
    path: '/app/marketplace',
    name: 'app-marketplace',
    component: () => import('@/modules/App/Dashboard/Index.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/product/:id',
    name: 'product-details',
    component: () => import('@/modules/App/Dashboard/product/_UUID.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/product/new',
    name: 'create-product',
    component: () => import('@/modules/App/Dashboard/product/create.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-store',
      name: 'home'
    }
  },

  {
    path: '/app/my-cart',
    name: 'app-cart',
    component: () => import('@/modules/App/Dashboard/Cart.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-cart',
      name: 'home'
    }
  },

  {
    path: '/app/my-store',
    name: 'app-store',
    component: () => import('@/modules/App/Dashboard/Store.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-store',
      name: 'home'
    }
  },

  {
    path: '/app/my-store/analysis',
    name: 'app-store-analysis',
    component: () => import('@/modules/App/Dashboard/StoreAnalysis.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-store',
      name: 'store analysis'
    }
  },

  {
    path: '/app/messages',
    name: 'app-messages',
    component: () => import('@/modules/App/Dashboard/Messages.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'app-messages',
      name: 'home'
    }
  },

  {
    path: '/app/wallet',
    name: 'app-wallet',
    component: () => import('@/modules/App/Dashboard/Wallet.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'app-wallet',
      name: 'home'
    }
  },

  {
    path: '/app/setting',
    name: 'app-setting',
    component: () => import('@/modules/App/Dashboard/Setting.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'setting',
      name: 'home'
    }
  },

  {
    path: '/app/notifications',
    name: 'app-notifications',
    component: () => import('@/modules/App/Dashboard/utility_pages/Notifications.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'notifications',
      name: 'notifications'
    }
  },

  {
    path: '/app/profile',
    name: 'app-profile',
    component: () => import('@/modules/App/Dashboard/utility_pages/Profile.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'profile',
      name: 'user-profile'
    }
  },

  {
    path: '/app/support',
    name: 'app-support',
    component: () => import('@/modules/App/Dashboard/Support.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'support',
      name: 'home'
    }
  },

  {
    path: '/app/support/call',
    name: 'app-support-call',
    component: () => import('@/modules/App/Dashboard/support/Call.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'support',
      name: 'home',
      subName: 'call'
    }
  },

  {
    path: '/app/support/send-mail',
    name: 'app-support-send-mail',
    component: () => import('@/modules/App/Dashboard/support/Mail.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'support',
      name: 'home',
      subName: 'mail'
    }
  },

  {
    path: '/app/legal',
    name: 'app-legal',
    component: () => import('@/modules/App/Dashboard/Legal.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'legal',
      name: 'home'
    }
  }
]

export default routes
