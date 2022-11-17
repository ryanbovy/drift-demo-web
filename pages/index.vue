<template>
  <main
    v-shortkey="notificationHotKeys"
    class="font-balto"
    @shortkey="openNotification()"
    @contextmenu.prevent="toggleMenu()"
  >
    <!-- LOADER SCREEN -->
    <TheLoaderModal />
    <!-- MAIN WINDOW CONTENT -->
    <div
      @click="fireFastlane()"
      @dblclick="openNotification()"
    >
      <img :src="background">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- SIDEBAR MENU -->
    <TheSideBar />
    <!-- END SIDEBAR MENU -->
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      baseWidget: '23x3bmcifbhe',
      background: 'https://screenshotapi-dot-net.storage.googleapis.com/www_drift_com__9efae73eb9a4.png',
      backgroundFormats: ['.png', '.jpeg', '.jpg'],
      notificationHotKeys: ['shift', 'n'],
      interactionId: null
    }
  },
  computed: {
    activeDemo () {
      return this.$store.getters['demos/getActivated']
    }
  },
  watch: {
    activeDemo: {
      handler (newValue, oldValue) {
        if (newValue?.id !== oldValue?.id) {
          // TODO: For some reason watch is being called twice
          this.resetDrift()
          this.loadDrift()
          this.calculateBackground()
          this.firePlaybook()
        }
      },
      deep: true
    }
  },
  mounted () {},
  methods: {
    fireFastlane () {
      if (this.activeDemo.settings?.playbookType === 'Fastlane') {
        drift('collectFormData', {
          fname: this.activeDemo?.settings?.firstName || 'John',
          lname: this.activeDemo?.settings?.lastName || 'Williams',
          email: this.activeDemo?.settings?.email || 'John.Williams@adobe.com',
          companyName: this.activeDemo?.settings?.accountName || 'Adobe'
        }, {
          campaignId: this.interactionId
        })
      }
    },
    openNotification () {
      window.open(`/notification?demo=${this.$route.query.demo}`, 'NotificationWindow')
    },
    toggleMenu () {
      this.$store.commit('sidebar/toggle')
    },
    resetDrift () {
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
      drift.load(this.activeDemo?.settings?.widgetId || this.baseWidget)
      drift.config({
        backgroundColor: this.activeDemo?.settings?.color || '#005A9C'
      })
    },
    firePlaybook () {
      // A function to fire the desired playbook
      // Choose selected playbook
      switch (this.activeDemo.settings?.playbookType) {
        case 'Fastlane':
          // deploy fastlane on body click
          this.interactionId = 2527830
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
        case 'Custom Bot':
          this.interactionId = null
          setTimeout(this.setCookie('playbook', this.activeDemo.settings?.targetingCondition, 1), 5000)
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
        if (this.activeDemo.settings?.firstName) {
          drift.api.setUserAttributes({
            first_name: this.activeDemo.settings?.firstName
          })
          console.log('setFirstName complete')
        }
        if (this.activeDemo.settings?.lastName) {
          drift.api.setUserAttributes({
            last_name: this.activeDemo.settings?.lastName
          })
          console.log('setLastName complete')
        }
        if (this.activeDemo.settings?.email) {
          drift.api.setUserAttributes({
            email: this.activeDemo.settings?.email
          })
          console.log('setEmail complete')
        }
        if (this.activeDemo.settings?.accountName) {
          drift.api.setUserAttributes({
            employment_name: this.activeDemo.settings?.accountName
          })
          console.log('setCompany complete')
        }
        if (this.activeDemo.settings?.abmMessage) {
          drift.api.setUserAttributes({
            abm_message: this.activeDemo.settings?.abmMessage
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
    async calculateBackground () {
      if (this.activeDemo.settings?.background && this.activeDemo.settings?.background !== null && this.activeDemo.settings?.background !== '') {
        let isImage = false
        this.backgroundFormats.forEach((format) => {
          if (this.activeDemo.settings?.background.includes(format)) {
            isImage = true
            this.background = this.activeDemo.settings?.background
          }
        })
        // If not, make a request to the screenshot generator
        if (!isImage) {
          this.$store.commit('loader/show', {
            message: 'Loading your background image. This may take a minute but will be faster next time!',
            isWarning: false
          })
          try {
            const response = await this.$axios.$get(
              `https://api.apiflash.com/v1/urltoimage?access_key=50c864cc62ee4df69a23f65c15eea431&url=${encodeURIComponent(
                this.activeDemo.settings?.background
              )}&format=jpeg&full_page=true&quality=100&scroll_page=true&response_type=json&no_cookie_banners=true&no_tracking=true`
            )
            this.background = response.url
          } catch (err) {
            await new Promise((resolve) => {
              this.$store.commit('loader/show', {
                message: 'Something went wrong loading your background image. Make sure it starts with http:// or https://.',
                isWarning: true
              })
              setTimeout(resolve, 3000)
            })
          } finally {
            this.$store.commit('loader/reset')
          }
        }
      }
    }
  }
}
</script>
