import $request from '@/axios/index'
export default {
  namespaced: true,
  state: {
    user: null,
    _user_token: null,
    subscription: null,
    recent_searches: [],
    cartCount: 0,
    messagesCount: 0
  },

  mutations: {
    setUser(state, data) {
      state.user = data
    },

    setSubscription(state, data) {
      state.subscription = data
    },

    setSearches(state, data) {
      state.recent_searches.push(data)
    },

    async setCartCount(state) {
      try {
        let res = await $request.get(`/carts`)
        console.log(res.data.data)
        let vreq = res.data.data.filter((item) => item.status)
        state.cartCount = vreq.length
        return res.data
      } catch (error) {
        return error
      }
    },

    setMessagesCount(state, data) {
      state.messagesCount = data
    },

    removeRecent(state, data) {
      state.recent_searches.splice(data, 1)
    },

    removeAllItems(state) {
      state.recent_searches = []
    },

    login(state, { token, user }) {
      state._user_token = token
      state.user = user
    },

    async LOGOUT(state) {
      state.user = null
      state._user_token = null
      localStorage.clear()
    },

    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null)
      })
    }
  },

  actions: {
    logout({ commit }) {
      commit('LOGOUT')
    }
  },

  getters: {
    auth: (state) => state.auth,
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getAuthenticated: (state) => !!state._user_token,
    getSubscription: (state) => state.subscription,
    getRecentSearches: (state) => state.recent_searches,
    getMessagesCount: (state) => state.messagesCount,
    getCartCount: (state) => state.cartCount
  }
}
