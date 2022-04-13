<template>
  <main>
    Hi
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      widgetId: 'bra3fivwpda4' // The default widgetId (can be overridden)
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  mounted () {
    // Mounted runs when the page is ready (kind of like onload)
    this.loadDrift()
  },
  methods: {
    // This is where we'll put all our functions to make our code organized
    loadDrift () {
      // A function to run the standard install code. The widgetId variable can be set (otherwise uses a default value)
      // Drift's install code doesn't cooperate well with our linter, so turning that off here
      /*eslint-disable */
      'use strict'
      !(function () {
        const t = window.driftt = window.drift = window.driftt || []
        if (!t.init) {
          if (t.invoked) { return void (window.console && console.error && console.error('Drift snippet included twice.')) }
          t.invoked = !0, t.methods = ['identify', 'config', 'track', 'reset', 'debug', 'show', 'ping', 'page', 'hide', 'off', 'on'],
            t.factory = function (e) {
              return function () {
                const n = Array.prototype.slice.call(arguments)
                return n.unshift(e), t.push(n), t
              }
            }, t.methods.forEach(function (e) {
              t[e] = t.factory(e)
            }), t.load = function (t) {
              const e = 3e5; const n = Math.ceil(new Date() / e) * e; const o = document.createElement('script')
              o.type = 'text/javascript', o.async = !0, o.crossorigin = 'anonymous', o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js'
              const i = document.getElementsByTagName('script')[0]
              i.parentNode.insertBefore(o, i)
            }
        }
      }())
      drift.SNIPPET_VERSION = '0.3.1'
      drift.load(this.widgetId)
      /* eslint-enable */
    }
  }
}
</script>

<style scoped lang="scss">
</style>
