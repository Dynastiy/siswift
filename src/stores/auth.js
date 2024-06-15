export default {
  namespaced: true,
  state: {
    user: null,
    categories: [],
    sub_categories: [],
    tags: [],
    order: null,
    loading: false,
    warehauze_token: null,
    validationErrors: null,
  },

  mutations: {
    setUser(state, data) {
      state.user = data
    },

    setCategories(state, data) {
      state.categories = data
    },

    setOrder(state, data) {
      state.order = data
    },

    removeOrder(state) {
      state.order = null
    },

    setSubCategories(state, data) {
      state.sub_categories = data
    },

    setTags(state, data) {
      state.tags = data
    },

    login(state, { token, user }) {
      state.warehauze_token = token;
      state.user = user;
    },

    async LOGOUT(state) {
      state.user = null
      state.warehauze_token = null
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
    getAddress: (state) => state.address,
    getMeta: (state) => state.meta,
    getToken: (state) => state.warehauze_token,
    getCategories: (state) => state.categories,
    getSubCategories: (state) => state.sub_categories,
    getTags: (state) => state.tags,
    getOrder: (state) => state.order,
    getAuthenticated: (state) => !!state.warehauze_token
  }
}
