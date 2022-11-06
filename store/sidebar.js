export const state = () => ({
  isOpen: false
})

export const getters = {
  isOpen (state) {
    return state.isOpen
  }
}

export const mutations = {
  toggle (state) {
    state.isOpen = !state.isOpen
    if (typeof drift !== 'undefined') {
      if (state.isOpen) {
        drift.api.hideChat()
      } else {
        drift.api.openChat()
      }
    }
  }
}
