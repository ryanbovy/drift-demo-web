import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce, {
  // defaultTime: '2000ms',
  cancelOnEmpty: true
})
