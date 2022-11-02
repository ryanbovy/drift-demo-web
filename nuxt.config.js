import redirectSSL from 'redirect-ssl'
export default {
  server: {
    port: process.env.PORT || 3000
  },
  serverMiddleware: [redirectSSL.create({enabled: process.env.NODE_ENV==='production'})],
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Drift Demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      // {
      //   src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
      //   type: 'text/javascript'
      // }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/vue-debounce.js' },
    // { src: '~/plugins/vue-data-object-path.js' }
    { src: '~/plugins/vue-shortkey.js', mode: 'client' }
    //{ src: '~/plugins/chrome-color-picker.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/tailwindcss'],
    ['@nuxtjs/eslint-module', { fix: true }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  axios: {
    baseUrl: process.env.apiUrl || 'http://localhost:3001/v1'
  },
  toast: {
    position: 'top-right',
    duration: 3000
  },
  router: {
    linkActiveClass: 'active-placeholder',
    linkExactActiveClass: 'active'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler')
      }
    },
  },
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:3001/v1'
  }
}
