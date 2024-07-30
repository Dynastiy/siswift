const routes = [
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
    path: '/privacy-policy',
    name: "privacy-policy",
    component: () => import('@/modules/App/PrivacyPolicy.vue'),
    meta: {
      layout: 'Home',
      requiresAuth: false,
      name: "privacy-policy"
    }
  },

  {
    path: '/contact',
    name: "contact",
    component: () => import('@/modules/App/Contact.vue'),
    meta: {
      layout: 'Home',
      requiresAuth: false,
      name: "contact"
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
    path: '/app/product/:id/sponsor-listing',
    name: 'sponsor-listing',
    component: () => import('@/modules/App/Dashboard/product/sponsor.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-store',
      name: 'home'
    }
  },

  {
    path: '/app/product/:slug/seller/:id',
    name: 'user-details',
    component: () => import('@/modules/App/Dashboard/utility_pages/UserProfile.vue'),
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
    path: '/app/my-favourites',
    name: 'app-favourites',
    component: () => import('@/modules/App/Dashboard/Wishlist.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-favourites',
      name: 'home'
    }
  },

  {
    path: '/app/checkout',
    name: 'cart-checkout',
    component: () => import('@/modules/App/Dashboard/cart/CheckOut.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-cart',
      name: 'home'
    }
  },

  {
    path: '/app/make-offer/:id',
    name: 'make-offer',
    component: () => import('@/modules/App/Dashboard/cart/MakeOffer.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/user/review/:id',
    name: 'user-review',
    component: () => import('@/modules/App/Dashboard/utility_pages/ReviewUser.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/product/review/:id',
    name: 'product-review',
    component: () => import('@/modules/App/Dashboard/product/ReviewProduct.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/product/review',
    name: 'product-review',
    component: () => import('@/modules/App/Dashboard/product/ReviewProduct.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'marketplace',
      name: 'home'
    }
  },

  {
    path: '/app/order/:order_id',
    name: 'order-details',
    component: () => import('@/modules/App/Dashboard/orders/_UUID.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'orders',
      name: 'home'
    }
  },

  {
    path: '/app/my-listings',
    name: 'app-listings',
    component: () => import('@/modules/App/Dashboard/Listings.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-listings',
      name: 'home'
    }
  },

  {
    path: '/app/my-orders',
    name: 'app-orders',
    component: () => import('@/modules/App/Dashboard/Orders.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'my-orders',
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
    path: '/app/store/new',
    name: 'app-store-new',
    component: () => import('@/modules/App/Dashboard/store/create.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'store-new',
      name: 'home'
    }
  },

  {
    path: '/app/store/edit',
    name: 'app-store-edit',
    component: () => import('@/modules/App/Dashboard/store/create.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'store-edit',
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
    path: '/app/message/m',
    name: 'app-messages-m',
    component: () => import('@/components/chat/mobileMessages.vue'),
    meta: {
      layout: 'Default',
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
    path: '/app/wallet/deposit',
    name: 'app-wallet-deposit',
    component: () => import('@/modules/App/Dashboard/wallet/Deposit.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'app-wallet',
      name: 'deposit'
    }
  },

  {
    path: '/app/success',
    name: 'app-success',
    component: () => import('@/modules/App/Dashboard/SuccessPage.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'app-success',
      name: ''
    }
  },

  {
    path: '/app/wallet/withdraw',
    name: 'app-wallet-withdraw',
    component: () => import('@/modules/App/Dashboard/wallet/Withdraw.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'app-wallet',
      name: 'withdraw'
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
    path: '/app/setting/upgrade',
    name: 'app-setting-upgrade',
    component: () => import('@/modules/App/Dashboard/Upgrade.vue'),
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
  },

  {
    path: '/app/kyc',
    name: 'app-kyc',
    component: () => import('@/modules/App/Dashboard/KYC.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'kyc',
      name: 'home'
    }
  },

  {
    path: '/app/kyc/select-document-type',
    name: 'app-kyc-document-type',
    component: () => import('@/modules/App/Dashboard/kyc/selectDocumentType.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'kyc',
      name: 'home'
    }
  },

  {
    path: '/app/kyc/upload',
    name: 'app-kyc-upload',
    component: () => import('@/modules/App/Dashboard/kyc/uploadDocument.vue'),
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'kyc',
      name: 'home'
    }
  }
]

export default routes
