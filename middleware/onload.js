export default function ({ store, route }) {
  const userEmail = localStorage.getItem('userEmail') || null
  if (userEmail) {
    store.dispatch('user/login', userEmail)
  }
  if (route.path === '/' && route.query.demo) {
    store.commit('demos/activate', {
      demoId: parseInt(route.query.demo)
    })
  }
}
