export const state = () => ({
  saved: [],
  selected: null,
  activated: null
})

export const getters = {
  getSelected (state) {
    return state.saved.find(demo => demo.id === state.selected)
  },
  getActivated (state) {
    return state.saved.find(demo => demo.id === state.activated)
  },
  getDemoById: state => (id) => {
    console.log(id)
    console.log(state.saved)
    return state.saved.find(demo => demo.id === parseInt(id))
  }
}

export const mutations = {
  get (state, { demos }) {
    state.saved = demos
  },
  create (state, { demo }) {
    state.saved.push(demo)
  },
  select (state, { demoId }) {
    state.selected = demoId
  },
  deselect (state) {
    state.selected = null
  },
  clear (state) {
    state.saved = []
    state.selected = null
  },
  activate (state, { demoId }) {
    state.activated = demoId || state.selected
  },
  deactivate (state) {
    state.activated = null
  }
}

export const actions = {
  async get ({ commit, state, rootGetters }) {
    try {
      const userId = rootGetters['user/getId']
      if (!userId) { throw new Error('Could not find user ID.') }
      const demos = await this.$axios.get(`${process.env.API_URL}/demo_settings/${userId}`)
      commit('get', {
        demos: demos.data
      })
      return demos.data
    } catch (err) {
      this.$toast.error('Failed to load your demos!')
      throw new Error(err.message)
    }
  },
  async create ({ commit, state, rootGetters }) {
    try {
      const userId = rootGetters['user/getId']
      if (!userId) { throw new Error('Could not find user ID.') }
      const demo = await this.$axios.post(`${process.env.API_URL}/demo_settings/`, {
        user: userId,
        settings: []
      })
      // Add the new demo to our array
      commit('create', {
        demo: demo.data
      })
      // Immediately select it as selected/editing
      commit('select', {
        demoId: demo.data.id
      })
      this.$toast.success('Succesfully created your new demo!')
      return demo.data
    } catch (err) {
      this.$toast.error('Failed to create your demo!')
      throw new Error(err.message)
    }
  },
  async clone ({ commit, state, rootGetters, dispatch }, data) {
    try {
      const userId = rootGetters['user/getId']
      if (!userId) { throw new Error('Could not find user ID.') }
      if (data.playbookType !== 'Custom Bot') { data.widgetId = null }
      const demo = await this.$axios.post(`${process.env.API_URL}/demo_settings/clone`, {
        user: userId,
        id: data.demoId,
        name: data.demoName
      })
      dispatch('get')
      this.$toast.success('Successfully cloned demo!')
      return demo.data
    } catch (err) {
      this.$toast.error('Failed saving demo! Make sure you have named it.')
      throw new Error(err.message)
    }
  },
  async update ({ commit, state, rootGetters, dispatch }, data) {
    try {
      const userId = rootGetters['user/getId']
      if (!userId) { throw new Error('Could not find user ID.') }
      if (data.playbookType !== 'Custom Bot') { data.widgetId = null }
      const demo = await this.$axios.put(`${process.env.API_URL}/demo_settings/${state.selected}`, {
        name: data.name,
        settings: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          abmMessage: data.abmMessage,
          accountName: data.accountName,
          playbookType: data.playbookType,
          interactionId: data.interactionId,
          color: data.color,
          background: data.background,
          widgetId: data.widgetId,
          targetingCondition: data.targetingCondition,
          notificationType: data.notificationType
        }
      })
      dispatch('get')
      this.$toast.success('Successfully saved demo!')
      return demo.data
    } catch (err) {
      this.$toast.error('Failed saving demo! Make sure you have named it.')
      throw new Error(err.message)
    }
  },
  async delete ({ commit, state, rootGetters, dispatch }) {
    try {
      const userId = rootGetters['user/getId']
      if (!userId) { throw new Error('Could not find user ID.') }
      const demo = await this.$axios.delete(`${process.env.API_URL}/demo_settings/${state.selected}`)
      dispatch('get')
      if (state.selected === state.activated) {
        dispatch('deactivate')
      }
      commit('deselect')
      this.$toast.success('Successfully deleted demo!')
      return demo.data
    } catch (err) {
      this.$toast.success('Failed to delete demo!')
      throw new Error(err.message)
    }
  },
  activate ({ commit, state }) {
    commit('activate', {
      demoId: null
    })
    this.app.router.push({ query: { ...this.app.router.currentRoute.query, demo: state.activated } })
    setTimeout(() => {
      location.reload()
    }, 100)
  },
  deactivate ({ commit, state }) {
    commit('deactivate')
    this.app.router.push({ query: {} })
  }
}
