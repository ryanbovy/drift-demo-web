export const state = () => ({
  isVisible: false,
  isWarning: false,
  message: null
})

export const getters = {
  isVisible (state) {
    return state.isVisible
  },
  isWarning (state) {
    return state.isWarning
  },
  getMessage (state) {
    return state.message
  }
}

export const mutations = {
  show (state, { message, isWarning }) {
    state.isVisible = true
    state.isWarning = isWarning
    state.message = message
  },
  reset (state) {
    state.isVisible = false
    state.isWarning = false
    state.message = null
  }
}
