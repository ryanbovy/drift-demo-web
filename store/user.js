export const state = () => ({
  isLoggedIn: false,
  email: null,
  name: null,
  id: null,
  widgetId: null
})

export const getters = {
  isLoggedIn (state) {
    return state.isLoggedIn
  },
  getEmail (state) {
    return state.email
  },
  getName (state) {
    return state.name
  },
  getId (state) {
    return state.id
  },
  getWidget (state) {
    return state.widgetId
  }
}

export const mutations = {
  login (state, { user }) {
    state.isLoggedIn = true
    state.email = user.email
    state.id = user.id
    state.widgetId = user.widget_id
  },
  logout (state) {
    state.isLoggedIn = false
    state.email = null
    state.id = null
    state.widgetId = null
  }
}

export const actions = {
  async login ({ commit, state, dispatch }, email) {
    try {
      const user = await this.$axios.get(`${process.env.API_URL}/user/${email}`)
      commit('login', {
        user: user.data
      })
      localStorage.setItem('userId', user.data.id)
      localStorage.setItem('userEmail', user.data.email)
      dispatch('demos/get', {}, { root: true })
      return user.data
    } catch (err) {
      this.$toast.error('Failed to logged in. Check your email address is correct.')
      throw new Error(err.message)
    }
  },
  logout ({ commit, dispatch }) {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    commit('logout')
    dispatch('demos/clear', {}, { root: true })
    this.$toast.success('Successfully logged out!')
  }
}
