<template>
  <main class="font-balto">
    <div
      v-if="showLoader"
      class="fixed flex justify-center items-center inset-0 z-[99999999999] text-3xl gap-4"
      :class="[ loaderWarning ? 'bg-drift-orange' : 'bg-drift-yellow']"
    >
      <div class="w-3/5 flex gap-4 items-center">
        <div class="loader grow-0 shrink-0" />
        <div class="uppercase font-bold animate-pulse">
          {{ loaderMessage || "Loading your amazing demo." }}
        </div>
      </div>
    </div>
    <!-- MAIN WINDOW CONTENT -->
    <div>
      <img :src="backgroundUrl">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- SIDEBAR MENU -->
    <div
      id="app"
      v-shortkey="menuHotKeys"
      class="fixed inset-0 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      style="z-index:10000000000"
      @shortkey="toggleMenu()"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-drift-yellow bg-opacity-75 transition-opacity ease-in-out duration-500"
          aria-hidden="true"
          :class="[isMenuOpen ? 'opacity-100' : 'opacity-0']"
        />
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div
            class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700"
            :class="[isMenuOpen ? 'translate-x-0' : 'translate-x-full']"
          >
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
            >
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

                <!-- BOT SETTINGS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold">
                      Bot Settings
                    </span>
                  </div>
                </div>
                <!-- END BOT SETTINGS DIVIDER -->

                <!-- BOT SETTINGS OPTIONS -->
                <div class="space-y-2">
                  <!-- COLOR SELECTION-->
                  <div
                    class="flex border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="botColor"
                      class="w-3/4 text-xs font-medium text-gray-900"
                    >Bot Color</label>
                    <input
                      id="botColor"
                      v-model="botColor"
                      type="color"
                      name="botColor"
                      class="w-1/4 border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    >
                  </div>
                  <!-- BACKGROUND INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="backgroundInput"
                      class="block text-xs font-medium text-gray-900"
                    >Background</label>
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
                  <!-- PLAYBOOK DROPDOWN-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="playbookName"
                      class="block text-xs font-medium text-gray-900"
                    >Playbook
                      <span v-if="interactionId" class="opacity-50">//</span>
                      {{ interactionId }}</label>
                    <select
                      id="playbookName"
                      v-model="playbookName"
                      type="text"
                      name="playbookName"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Select a Playbook"
                    >
                      <option value="Engage All">
                        Engage All
                      </option>
                      <option value="ABM Bot">
                        ABM Bot
                      </option>
                      <option value="Support Bot">
                        Support Bot
                      </option>
                      <option value="Skip the Form">
                        Skip the Form
                      </option>

                      <!--
                      <option value="Return Bot">
                        Return Bot
                      </option>
                        <option value="Fastlane">
                        Fastlane
                      </option>
                       -->
                    </select>
                  </div>
                  <div
                  v-if="playbookName==='ABM Bot'"
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="abmMessage"
                      class="block text-xs font-medium text-gray-900"
                    >ABM Message</label>
                    <input
                      id="abmMessage"
                      v-model="abmMessage"
                      type="text"
                      name="abmMessage"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    >
                  </div>
                </div>
                <!-- END BOT SETTINGS OPTIONS -->

                <!-- USER SETTINGS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold">
                      User Settings
                    </span>
                  </div>
                </div>
                <!-- END USER SETTINGS DIVIDER -->

                <!-- USER SETTINGS OPTIONS -->
                <div class="space-y-2">
                  <!-- FIRST NAME INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="fname"
                      class="block text-xs font-medium text-gray-900"
                    >First Name</label>
                    <input
                      id="fname"
                      v-model="firstName"
                      type="text"
                      name="fname"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Jane"
                    >
                  </div>
                  <!-- LAST NAME INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="lname"
                      class="block text-xs font-medium text-gray-900"
                    >Last Name</label>
                    <input
                      id="lname"
                      v-model="lastName"
                      type="text"
                      name="lname"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Johnson"
                    >
                  </div>
                  <!-- EMAIL INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="email"
                      class="block text-xs font-medium text-gray-900"
                    >Email</label>
                    <input
                      id="email"
                      v-model="email"
                      type="text"
                      name="email"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Jane.Doe@example.com"
                    >
                  </div>
                  <!-- ACCOUNT INPUT-->
                  <div
                    class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
                  >
                    <label
                      for="account"
                      class="block text-xs font-medium text-gray-900"
                    >Account</label>
                    <input
                      id="account"
                      v-model="accountName"
                      type="text"
                      name="account"
                      class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Example Inc"
                    >
                  </div>
                </div>

                <!-- USER OUTPUTS -->
                <div class="relative mt-6 mb-2">
                  <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div class="w-full border-t border-gray-200" />
                  </div>
                  <div class="relative flex justify-start">
                    <span class="pr-2 bg-white text-xs uppercase font-bold">
                      Web Vistor
                    </span>
                  </div>
                </div>
                <div class="text-xs text-drift-grey">
                  GUID: <span class="text-drift-violet">{{ guid }}</span><br>
                  Email: <span class="text-drift-violet">{{ email }}</span>
                </div>
                <!-- END USER OUTPUTS -->

                <!-- METRICS DIVIDER -->
                <div class="relative mt-6 mb-2">
                  <div
                    class="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div class="w-full border-t border-gray-200" />
                  </div>
                </div>
                <!-- END METRICS DIVIDER -->

                <!-- SAVE BUTTON -->
                <button
                  type="button"
                  class="mt-6 w-full items-center px-6 py-3 border border-transparent rounded-md shadow-sm bg-drift-lime hover:bg-drift-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drift-indigo font-bold uppercase"
                  @click="saveSettings()"
                >
                  ⚡️ Save
                </button>

                <!-- REFRESH BUTTON -->
                <button
                  type="button"
                  class="mt-6 w-full items-center px-6 py-3 border border-transparent rounded-md shadow-sm bg-drift-lime hover:bg-drift-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drift-indigo font-bold uppercase"
                  @click="clearSettings()"
                >
                  🗑 Clear Settings
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
      isMenuOpen: false,
      menuHotKeys: ['shift', 'z'],
      backgroundInput: localStorage.getItem('backgroundInput') || '', // The textbox for bkgd: can be either an image file or a URL to be screenshotted
      backgroundUrl:
        'https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__9efae73eb9a4.png', // The image to be used for background (will be either backgroundInput or an image from the screenshot API)
      backgroundDefault:
        'https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__9efae73eb9a4.png', // The default background when input is blank
      backgroundFormats: ['.png', '.jpeg', '.jpg'],
      playbookName: localStorage.getItem('playbookName') || '', // name of the playbook
      interactionId: localStorage.getItem('interactionId') || '', // interactionId of the playbook
      firstName: localStorage.getItem('firstName') || '', // visitor fname
      lastName: localStorage.getItem('lastName') || '', // visitor lname
      abmMessage: localStorage.getItem('abmMessage') || 'We help companies like you drive pipeline and hit their revenue targets faster.', // ABM Message
      email: localStorage.getItem('email') || '', // visitor email
      accountName: localStorage.getItem('accountName') || '', // visitor account
      guid: localStorage.getItem('guid') || '', // unique user id
      botColor: localStorage.getItem('botColor') || '#005A9C', // bot color,
      showLoader: false,
      loaderWarning: false,
      loaderMessage: null
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  mounted () {
    // Mounted runs when the page is ready (kind of like onload)
    this.clearStorage()
    this.loadDrift()
    this.generateVisitor()
    this.calculateBackground()
    this.firePlaybook()
  },
  methods: {
    // This is where we'll put all our functions to make our code organized
    saveSettings () {
      // persist settings on refresh
      localStorage.setItem('guid', this.guid || '')
      localStorage.setItem('email', this.email || '')
      localStorage.setItem('firstName', this.firstName || '')
      localStorage.setItem('lastName', this.lastName || '')
      localStorage.setItem('abmMessage', this.abmMessage || '')
      localStorage.setItem('accountName', this.accountName || '')
      localStorage.setItem('playbookName', this.playbookName || '')
      localStorage.setItem('interactionId', this.interactionId || '')
      localStorage.setItem('botColor', this.botColor || '')
      localStorage.setItem('backgroundInput', this.backgroundInput || '')
      location.reload()
    },
    clearSettings () {
      localStorage.clear()
      this.playbookName = ''
      this.interactionId = ''
      this.firstName = ''
      this.lastName = ''
      this.abmMessage = ''
      this.email = ''
      this.accountName = ''
      this.guid = ''
      this.backgroundInput = ''
      this.botColor = ''
      location.reload()
      this.toggleMenu()
    },
    createGuid () {
      function value () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r =
            (window.crypto.getRandomValues(new Uint32Array(1))[0] *
              Math.pow(2, -32) *
              16) |
            0
          const v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        })
      }
      this.guid = value()
    },
    clearStorage () {
      document.cookie =
        'drift_aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'driftt_aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'drift_eid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'driftt_eid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'drift_campaign_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'driftt_sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'driftt_wmd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'DFTT_END_USER_PREV_BOOTSTRAPPED=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'DFTT_LEAD_HAS_PREV_IDENTIFIED=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie =
        'playbook=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      localStorage.removeItem('DRIFT_visitCounts')
      localStorage.removeItem('DRIFT_isChatFrameOpen')
      localStorage.removeItem('DRIFT_openTabs')
      sessionStorage.clear()
    },
    loadDrift () {
      // A function to run the standard install code. The widgetId variable can be set (otherwise uses a default value)
      'use strict'
      !(function () {
        const t = (window.driftt = window.drift = window.driftt || [])
        if (!t.init) {
          if (t.invoked) {
            return void (
              window.console &&
              console.error &&
              console.error('Drift snippet included twice.')
            )
          }
          (t.invoked = !0),
          (t.methods = [
            'identify',
            'config',
            'track',
            'reset',
            'debug',
            'show',
            'ping',
            'page',
            'hide',
            'off',
            'on'
          ]),
          (t.factory = function (e) {
            return function () {
              const n = Array.prototype.slice.call(arguments)
              return n.unshift(e), t.push(n), t
            }
          }),
          t.methods.forEach(function (e) {
            t[e] = t.factory(e)
          }),
          (t.load = function (t) {
            const e = 3e5
            const n = Math.ceil(new Date() / e) * e
            const o = document.createElement('script');
            (o.type = 'text/javascript'),
            (o.async = !0),
            (o.crossorigin = 'anonymous'),
            (o.src =
                  'https://js.driftt.com/include/' + n + '/' + t + '.js')
            const i = document.getElementsByTagName('script')[0]
            i.parentNode.insertBefore(o, i)
          })
        }
      })()
      drift.SNIPPET_VERSION = '0.3.1'
      drift.load(this.widgetId)

      drift.config({
        backgroundColor: this.botColor
      })

      // TODO: Drift config is currently broken (https://drift.slack.com/archives/CHK7L9AB1/p1649777796544179)
      // but it appears the following config is going to be needed access Drift via JS/CSS selectors to do some
      // of the fancy stuff we were doing via console (https://devdocs.drift.com/docs/securing-drift-on-your-site-with-an-iframe#required-attributes)
      // Afterwards we should be able to access elements in the iFrame like this: https://stackoverflow.com/questions/26630519/queryselector-for-web-elements-inside-iframe
      /* drift.config({
      iframeSandbox: 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms'
    }); */
    },
    generateVisitor () {
      /* eslint-disable */
      this.clearStorage();
      this.createGuid();
      /* eslint-enable */
    },
    firePlaybook () {
      // A function to fire the desired playbook
      // Choose selected playbook
      switch (this.playbookName) {
        case 'Fastlane':
          // deploy fastlane on body click
          this.interactionId = 2527830
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
              campaignId: this.interactionId
            })
        }); */
          break
        case 'Conversational Landing Page':
          // deploy CLP
          break
        case 'Skip the Form':
          this.interactionId = 309059
          break
        case 'Support Bot':
          this.interactionId = 309512
          break
        case 'Return Bot':
          this.interactionId = 308477
          break
        case 'ABM Bot':
          this.interactionId = null
          setTimeout(this.setCookie('playbook', 'abmBot', 1), 5000)
          break
        case 'Engage All':
          this.interactionId = 340714
          break
        default:
          // default is no playbook
          this.interactionId = null
      }
      // Fire selected playbook
      drift.on('ready', (api, payload) => {
        
        if (this.firstName && this.lastName) {
          drift.api.setUserAttributes({
            first_name: this.firstName,
            last_name: this.lastName
          })
          console.log('setUserName complete')
        }
        if (this.email) {
          drift.api.setUserAttributes({
            email: this.email
          })
          console.log('setEmail complete')
        }
        if (this.accountName) {
          drift.api.setUserAttributes({
            employment_name: this.accountName
          })
          console.log('setCompany complete')
        }
        if (this.abmMessage) {
          drift.api.setUserAttributes({
            abm_message: this.abmMessage
          })
          console.log('ABM message complete')
        }

        if (this.interactionId) {
          drift.api.startInteraction({
            interactionId: this.interactionId,
            goToConversation: false,
            replaceActiveConversation: true
          })
        } else {
          /* Weird fluke in Drift where the widget is already loaded and the only way to
          load an ABM bot is through alternative targeting (not interactionId). Therefore,
          we have to set a cookie, then wait a MILLIsecond and refresh the "page"
          */
          setTimeout(() => {
            window.history.replaceState(null, null, '#driftRace')
            drift.page()
          }, 250)
        }
      })
    },
    setCookie (name, value, days) {
      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
      if(this.isMenuOpen){
        drift.api.hideChat();
      } else {
        drift.api.openChat();
      }
    },
    async calculateBackground () {
      if (this.backgroundInput !== null && this.backgroundInput !== '') {
        let isImage = false
        this.backgroundFormats.forEach((format) => {
          if (this.backgroundInput.includes(format)) {
            isImage = true
            this.backgroundUrl = this.backgroundInput
          }
        })
        // If not, make a request to the screenshot generator
        if (!isImage) {
          this.showLoader = true
          this.loaderMessage =
            'Loading your background image. This may take a minute but will be faster next time!'
          try {
            const response = await this.$axios.$get(
              `https://api.apiflash.com/v1/urltoimage?access_key=50c864cc62ee4df69a23f65c15eea431&url=${encodeURIComponent(
                this.backgroundInput
              )}&format=jpeg&full_page=true&quality=100&scroll_page=true&response_type=json&no_cookie_banners=true&no_tracking=true`
            )
            this.backgroundUrl = response.url
            localStorage.setItem('backgroundInput', response.url || '')
          } catch (err) {
            await new Promise((resolve) => {
              this.loaderWarning = true
              this.loaderMessage =
                'Something went wrong loading your background image. Make sure it starts with http:// or https://.'
              setTimeout(resolve, 3000)
            })
          } finally {
            this.resetLoader()
          }
        }
      }
    },
    resetLoader () {
      this.showLoader = false
      this.loaderWarning = false
      this.loaderMessage = null
    }
  }
}
</script>

<style scoped lang="scss">
.loader {
  width: 1em;
  height: 1em;
  border: 5px solid #ff8329;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

#drift-video-extension-root{
  z-index:11000000000;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
