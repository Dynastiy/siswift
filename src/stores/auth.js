export default {
  namespaced: true,
  state: {
    user: null,
    _user_token: null,
    subscription: null,
    recent_searches: []
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

    removeRecent(state, data) {
      state.recent_searches.splice(data, 1)
    },

    removeAllItems(state) {
      state.recent_searches = []
    },

    login(state, { token, user }) {
      state._user_token = token;
      state.user = user;
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
    getRecentSearches: (state) => state.recent_searches
  }
}
