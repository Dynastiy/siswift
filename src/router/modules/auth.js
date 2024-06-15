import Login from '@/modules/App/Auth/Login.vue'
import Register from '@/modules/App/Auth/Register.vue'
import ForgotPassword from '@/modules/App/Auth/ForgotPassword.vue'
import ChangePassword from '@/modules/App/Auth/ChangePassword.vue'
import InputCode from '@/modules/App/Auth/InputCode.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/input-code',
    name: 'input-code',
    component: InputCode,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },
]

export default routes
