import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Auth from './modules/auth'
import App from './modules/app'

// Error Page 
import PageNotFound from '../modules/ErrorPages/Error404Page.vue'

const baseRoutes = [
  // Route for Page Not found 
  { path: "/:pathMatch(.*)", component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes.concat(Auth, App),
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/getAuthenticated']
  const user = store.getters['auth/getUser']
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      if (to.meta.isVendor && user.role !== 'vendor') {
        // Redirect to dashboard if not a vendor
        next({ path: '/user' });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router
