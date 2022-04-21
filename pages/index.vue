<template>
  <main class="font-balto">
    <!-- MAIN WINDOW CONTENT -->
    <div>
      <img :src="backgroundUrl">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- SIDEBAR MENU -->
    <div
      v-shortkey="menuHotKeys"
      class="fixed inset-0 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      @shortkey="toggleMenu()"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-drift-yellow bg-opacity-75 transition-opacity ease-in-out duration-500"
          aria-hidden="true"
          :class="[isMenuOpen ? 'opacity-100' : 'opacity-0']"
        />
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div
            class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700"
            :class="[isMenuOpen ? 'translate-x-0' : 'translate-x-full']"
          >
            <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 id="slide-over-title" class="text-lg font-medium">
                    Drift Demo <span class="text-xs text-drift-cyan">V2</span>
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-drift-indigo focus:ring-offset-2"
                      @click="isMenuOpen = false"
                    >
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: outline/x -->
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <!-- SIDEBAR MENU CONTENT -->
                <!-- PROFILE -->
                <div class="flex items-center">
                  <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-drift-magenta">
                    <span class="font-medium leading-none text-white">JP</span>
                  </span>
                  <div class="ml-3">
                    <p class="text-sm">
                      Joshua Perk
                    </p>
                    <span class="text-xs text-drift-grey mr-4">
                      Edit
                    </span>
                    <span class="text-xs text-drift-grey">
                      Logout
                    </span>
                  </div>
                </div>
                <!-- END PROFILE -->

                <!-- SETTINGS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold"> Scenes </span>
                  </div>
                </div>
                <!-- END SETTINGS DIVIDER -->

                <div
                  class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                >
                  <label for="name" class="block text-xs font-medium text-gray-900">Load previously saved scenes</label>
                  <select
                    id="name"
                    type="text"
                    name="name"
                    class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  >
                    <option value="volvo">
                      Elastic ABM bot
                    </option>
                    <option value="saab">
                      Saab
                    </option>
                    <option value="mercedes">
                      Mercedes
                    </option>
                    <option value="audi">
                      Audi
                    </option>
                  </select>
                </div>

                <div class="px-3">
                  <span class="text-xs text-drift-grey mr-4">
                    Rename
                  </span>
                  <span class="text-xs text-drift-grey mr-4">
                    Clone
                  </span>
                  <span class="text-xs text-drift-orange">
                    Delete
                  </span>
                </div>

                <!-- SETTINGS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold"> Settings </span>
                  </div>
                </div>
                <!-- END SETTINGS DIVIDER -->

                <!-- PLAYBOOK NAME INPUT-->
                <div class="space-y-2">
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label for="playbookName" class="block text-xs font-medium text-gray-900">Playbook // {{ playbookId }}</label>
                    <select
                      id="playbookName"
                      v-model="playbookName"
                      type="text"
                      name="playbookName"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    >
                      <option value="Fastlane">
                        Fastlane
                      </option>
                      <option value="Skip the Form" default>
                        Skip the Form
                      </option>
                      <option value="Support Bot">
                        Support Bot
                      </option>
                      <option value="Return Bot">
                        Return Bot
                      </option>
                    </select>
                  </div>
                  <!-- BACKGROUND INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label for="backgroundInput" class="block text-xs font-medium text-gray-900">Background</label>
                    <input
                      id="backgroundInput"
                      v-model="backgroundInput"
                      type="text"
                      name="backgroundInput"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Insert website or path to hosted image"
                      value="https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__cd817069080e.png"
                    >
                  </div>
                  <!-- NAME INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label for="email" class="block text-xs font-medium text-gray-900">Email</label>
                    <input
                      id="email"
                      v-model="email"
                      type="text"
                      name="email"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Jane.Doe@example.com"
                    >
                  </div>
                  <!-- WIDGET INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label for="widgetId" class="block text-xs font-medium text-gray-900">Widget ID</label>
                    <input
                      id="widgetId"
                      v-model="widgetId"
                      type="text"
                      name="widgetId"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Insert Widget ID"
                    >
                  </div>
                </div>

                <!-- USER OUTPUTS -->
                <div class="relative mt-6 mb-2">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold"> Web Vistor </span>
                  </div>
                </div>
                <div class="text-xs text-drift-grey">
                  GUID: <span class="text-drift-violet">{{ guid }}</span><br>
                  Email: <span class="text-drift-violet">{{ email }}</span>
                </div>
                <!-- END USER OUTPUTS -->

                <!-- METRICS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold"> Metrics </span>
                  </div>
                </div>
                <div class="text-xs text-drift-grey">
                  Page Views: <span class="text-drift-violet">17</span>
                </div>
                <!-- END METRICS DIVIDER -->

                <button type="button" class="mt-6 w-full items-center px-6 py-3 border border-transparent rounded-md shadow-sm bg-drift-lime hover:bg-drift-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drift-indigo font-bold uppercase">
                  ⚡️ Save
                </button>

                <!-- END OF SIDEBAR MENU CONTENT -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SIDEBAR MENU -->
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      widgetId: '23x3bmcifbhe', // The default widgetId (can be overridden)
      isMenuOpen: true,
      menuHotKeys: ['shift', 'z'],
      backgroundInput: null, // The textbox for bkgd: can be either an image file or a URL to be screenshotted
      backgroundUrl: 'https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__9efae73eb9a4.png', // The image to be used for background (will be either backgroundInput or an image from the screenshot API)
      backgroundDefault: 'https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__9efae73eb9a4.png', // The default background when input is blank
      backgroundFormats: ['.png', '.jpeg', '.jpg'],
      playbookName: 'Skip the Form', // name of the playbook
      playbookId: 309059, // id of the playbook
      email: '' // visitor name
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  computed: {
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (window.crypto.getRandomValues(new Uint32Array(1))[0] * Math.pow(2, -32) * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  },
  watch: {
    widgetId (newId, oldId) {
      this.firePlaybook()
    },
    playbookName (newPlaybook, oldPlaybook) {
      this.firePlaybook()
    },
    backgroundInput (newBackground, oldBackground) {
      this.calculateBackground()
    }
  },
  mounted () {
    // Mounted runs when the page is ready (kind of like onload)
    this.loadDrift()
    this.firePlaybook()
    this.swapLogo()
  },
  methods: {
    // This is where we'll put all our functions to make our code organized
    loadDrift () {
      // A function to run the standard install code. The widgetId variable can be set (otherwise uses a default value)
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
      // TODO: Drift config is currently broken (https://drift.slack.com/archives/CHK7L9AB1/p1649777796544179)
      // but it appears the following config is going to be needed access Drift via JS/CSS selectors to do some
      // of the fancy stuff we were doing via console (https://devdocs.drift.com/docs/securing-drift-on-your-site-with-an-iframe#required-attributes)
      // Afterwards we should be able to access elements in the iFrame like this: https://stackoverflow.com/questions/26630519/queryselector-for-web-elements-inside-iframe
      drift.config({
        iframeSandbox: 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms'
      });
      /* eslint-enable */
    },
    generateVisitor () {
      /* eslint-disable */
      drift.identify(this.guid, {
        first_name: 'First',
        last_name: 'Last',
        email: this.email
      });
      console.log(this.email);
      /* eslint-enable */
    },
    firePlaybook () {
      // A function to fire the desired playbook
      // Choose selected playbook
      switch (this.playbookName) {
        case 'Fastlane':
        // deploy fastlane on body click
          this.playbookId = 2527830
          /* document.querySelector('body').click(
          console.log('body click')
          function(){
            drift('collectFormData', {
                fname: 'Ryan',
                lname: 'Bovy',
                email: 'rbovy@drift.com',
                companyName: 'Drift',
                title: 'SC'
              }, {
                campaignId: this.playbookId
              })
          }); */
          break
        case 'Conversational Landing Page':
        // deploy CLP
          break
        default:
        // deploy regular playbook
          switch (this.playbookName) {
            case 'Skip the Form':
              this.playbookId = 309059
              break
            case 'Support Bot':
              this.playbookId = 309512
              break
            case 'Return Bot':
              this.playbookId = 308477
              break
            default:
              // default is Skip the Form
              this.playbookId = 309059
          }
      }
      // Fire selected playbook
      /*eslint-disable */
      drift.on('ready', (api, payload) => {
        this.generateVisitor();
        drift.api.startInteraction({
          interactionId: this.playbookId,
          goToConversation: false,
          replaceActiveConversation: true
        });
      });
      /* eslint-enable */
    },
    swapLogo () {
      /*eslint-disable */
      drift.on('ready', (api, payload) => {
        document.querySelector('.drift-widget-default-bot-avatar').innerHTML = '<div style="background-image:url(https://logos-world.net/wp-content/uploads/2020/06/Adobe-Emblem.png);background-size:cover;max-width:100%;background-color:#ffffff;display:block;height:100%;background-position:center center;"></div>'
      });
      /* eslint-enable */
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    async calculateBackground () {
      // Check to see if the text input is empty. If so, load the default image again
      if (this.backgroundInput === null || this.backgroundInput === '') {
        this.backgroundUrl = this.backgroundDefault
      } else {
        // Otherwise, check to see if the input ends in an image file format. If so, load the image directly
        let isImage = false
        this.backgroundFormats.forEach((format) => {
          if (this.backgroundInput.includes(format)) {
            isImage = true
            this.backgroundUrl = this.backgroundInput
          }
        })

        // If not, make a request to the screenshot generator
        // TODO: Need to debounce
        if (!isImage) {
          console.log('get the pictureeee')
          // TODO: need to finish this URL string
          const response = await this.$axios.$get('https://api.apiflash.com/v1/urltoimage?access_key=50c864cc62ee4df69a23f65c15eea431&url=https%3A%2F%2Fnytimes.com&format=jpeg&full_page=true&quality=100&scroll_page=true&response_type=json&no_cookie_banners=true&no_tracking=true')
          this.backgroundInput = response.url
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
