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
    <div @click="fireFastlane()" @dblclick="openNotification()">
      <img id="bkgdImg" :src="background">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- SIDEBAR MENU -->
    <TheSideBar />
    <!-- END SIDEBAR MENU -->
    <!--BEGIN  MarketLinc Monitor. -->
    <script type="text/javascript">
      try {
      var ml_url =
      'https://lift-ai-js.marketlinc.com/v2.drift-demo.com/deployment.js'
      var ml_script = document.createElement('script')
      ml_script.type = 'text/javascript'
      ml_script.id = 'ml_snippet_script_id'
      ml_script.src = ml_url + '?' + Math.floor(Math.random() * 1000000000)
      document.getElementsByTagName('head')[0].appendChild(ml_script)
      } catch (e) {
      /*the endpoint is not available, do nothing*/
      }
    </script>
    <!-- END MarketLinc Monitor. -->
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      baseWidget: '23x3bmcifbhe',
      background: 'https://i.imgur.com/cvwV44o.png',
      backgroundFormats: ['.png', '.jpeg', '.jpg'],
      notificationHotKeys: ['ctrl', 'n'],
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
  mounted () {
    this.resetDrift()
  },
  methods: {
    fastlaneFix () {
      if (this.activeDemo?.settings?.playbookType === 'Fastlane') {
        const chatFrame = document.getElementById('drift-frame-chat')
        chatFrame.style.removeProperty('width')

        const innerFrame = document.querySelector(
          '[title="Drift Widget Chat Window"]'
        )
        innerFrame.style.removeProperty('width')

        console.log('fixes fired')
      }
    },
    capFirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    generateName (type) {
      const firstNames = [
        'Emily',
        'Hannah',
        'Madison',
        'Ashley',
        'Sarah',
        'Alexis',
        'Samantha',
        'Jessica',
        'Elizabeth',
        'Taylor',
        'Lauren',
        'Alyssa',
        'Kayla',
        'Abigail',
        'Brianna',
        'Olivia',
        'Emma',
        'Megan',
        'Grace',
        'Victoria',
        'Rachel',
        'Anna',
        'Sydney',
        'Destiny',
        'Morgan',
        'Jennifer',
        'Jasmine',
        'Haley',
        'Julia',
        'Kaitlyn',
        'Nicole',
        'Amanda',
        'Jacob',
        'Michael',
        'Matthew',
        'Joshua',
        'Christopher',
        'Nicholas',
        'Andrew',
        'Joseph',
        'Daniel',
        'Tyler',
        'William',
        'Brandon',
        'Ryan',
        'John',
        'Zachary',
        'David',
        'Anthony',
        'James',
        'Justin',
        'Alexander',
        'Jonathan',
        'Christian',
        'Austin',
        'Dylan',
        'Ethan',
        'Benjamin',
        'Noah',
        'Samuel',
        'Robert',
        'Nathan',
        'Cameron',
        'Kevin',
        'Thomas',
        'Jose',
        'Hunter',
        'Jordan',
        'Kyle',
        'Caleb',
        'Jason',
        'Logan',
        'Aaron',
        'Eric',
        'Brian',
        'Gabriel',
        'Adam',
        'Jack',
        'Isaiah',
        'Juan',
        'Luis',
        'Connor',
        'Charles',
        'Elijah',
        'Isaac',
        'Steven',
        'Evan',
        'Jared',
        'Sean',
        'Timothy',
        'Luke',
        'Cody',
        'Nathaniel',
        'Alex',
        'Seth',
        'Mason',
        'Richard',
        'Carlos',
        'Angel',
        'Patrick',
        'Devin',
        'Bryan',
        'Cole',
        'Jackson',
        'Ian',
        'Garrett',
        'Trevor',
        'Jesus',
        'Chase',
        'Adrian',
        'Mark',
        'Blake',
        'Sebastian',
        'Antonio',
        'Lucas',
        'Jeremy',
        'Gavin',
        'Miguel',
        'Julian',
        'Dakota',
        'Alejandro',
        'Jesse'
      ]
      const lastNames = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Miller',
        'Davis',
        'Garcia',
        'Rodriguez',
        'Wilson',
        'Martinez',
        'Anderson',
        'Taylor',
        'Thomas',
        'Hernandez',
        'Moore',
        'Martin',
        'Jackson',
        'Thompson',
        'White',
        'Lopez',
        'Lee',
        'Gonzalez',
        'Harris',
        'Clark',
        'Lewis',
        'Robinson',
        'Walker',
        'Perez',
        'Hall',
        'Young',
        'Allen',
        'Sanchez',
        'Wright',
        'King',
        'Scott',
        'Green',
        'Baker',
        'Adams',
        'Nelson',
        'Hill',
        'Ramirez',
        'Campbell',
        'Mitchell',
        'Roberts',
        'Carter',
        'Phillips',
        'Evans',
        'Turner',
        'Torres',
        'Parker',
        'Collins',
        'Edwards',
        'Stewart',
        'Flores',
        'Morris',
        'Nguyen',
        'Murphy',
        'Rivera',
        'Cook',
        'Rogers',
        'Morgan',
        'Peterson',
        'Cooper',
        'Reed',
        'Bailey',
        'Bell',
        'Gomez',
        'Kelly',
        'Howard',
        'Ward',
        'Cox'
      ]
      switch (type) {
        case 'first':
          return this.capFirst(
            firstNames[this.getRandomInt(0, firstNames.length + 1)]
          )
        case 'last':
          return this.capFirst(
            lastNames[this.getRandomInt(0, lastNames.length + 1)]
          )
      }
    },
    fireFastlane () {
      if (this.activeDemo?.settings?.playbookType === 'Fastlane') {
        drift(
          'collectFormData',
          {
            fname: this.activeDemo?.settings?.firstName || 'John',
            lname: this.activeDemo?.settings?.lastName || 'Williams',
            email:
              this.activeDemo?.settings?.email ||
              'John.Williams@whitewhale.com',
            companyName: this.activeDemo?.settings?.accountName || 'Whitewhale'
          },
          {
            campaignId: this.interactionId
          }
        )
      }
      setTimeout(() => {
        this.fastlaneFix()
      }, 1750)
    },
    openNotification () {
      window.open(
        `/notification?demo=${this.$route.query.demo}`,
        'NotificationWindow'
      )
    },
    toggleMenu () {
      this.$store.commit('sidebar/toggle')
    },
    resetDrift () {
      this.$cookies.remove('drift_aid', null, 'v2.drift-demo.com')
      this.$cookies.remove('driftt_aid', null, 'v2.drift-demo.com')
      this.$cookies.remove('drift_eid', null, 'v2.drift-demo.com')
      this.$cookies.remove('driftt_eid', null, 'v2.drift-demo.com')
      this.$cookies.remove('drift_campaign_refresh', null, 'v2.drift-demo.com')
      this.$cookies.remove('drift_campaign_refresh', null, 'v2.drift-demo.com')
      this.$cookies.remove('driftt_sid', null, 'v2.drift-demo.com')
      this.$cookies.remove('driftt_wmd', null, 'v2.drift-demo.com')
      this.$cookies.remove(
        'DFTT_END_USER_PREV_BOOTSTRAPPED',
        null,
        'v2.drift-demo.com'
      )
      this.$cookies.remove(
        'DFTT_LEAD_HAS_PREV_IDENTIFIED',
        null,
        'v2.drift-demo.com'
      )
      // Clear local storage items
      localStorage.removeItem('DRIFT_visitCounts')
      localStorage.removeItem('DRIFT_isChatFrameOpen')
      localStorage.removeItem('DRIFT_openTabs')
      // Clear session storage items
      sessionStorage.removeItem('DRIFT_SESSION_ID')
      sessionStorage.removeItem('DRIFT_SESSION_STARTED')
      sessionStorage.removeItem('DRIFT_NOTIFICATION_PLAYED')
      // Clear Lift AI Cookies
      this.$cookies.remove('vs_convo_ai', null, 'v2.drift-demo.com')
      this.$cookies.remove('vs_vfs', null, 'v2.drift-demo.com')
      this.$cookies.remove('vs_lift_ai', null, 'v2.drift-demo.com')
      this.$cookies.remove('vs_intent', null, 'v2.drift-demo.com')
      this.$cookies.remove('vs_sid', null, 'v2.drift-demo.com')
      this.$cookies.remove('vs_vid', null, 'v2.drift-demo.com')
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
          ;(t.invoked = !0),
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
            const o = document.createElement('script')
              ;(o.type = 'text/javascript'),
            (o.async = !0),
            (o.crossorigin = 'anonymous'),
            (o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js')
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
        case 'ConvoAI Bot':
          this.interactionId = 219549
          break
        case 'ROI Bot':
          this.interactionId = 368523
          break
        case 'ABM Bot':
          this.interactionId = null
          setTimeout(this.setCookie('playbook', 'abmBot', 1), 5000)
          break
        case 'Custom Bot':
          this.interactionId = null
          setTimeout(
            this.setCookie(
              'playbook',
              this.activeDemo.settings?.targetingCondition,
              1
            ),
            5000
          )
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
        if (
          this.activeDemo.settings.firstName &&
          this.activeDemo.settings.lastName
        ) {
          drift.api.setUserAttributes({
            first_name: this.activeDemo.settings.firstName,
            last_name: this.activeDemo.settings.lastName
          })
        } else if (
          this.activeDemo.settings.firstName &&
          !this.activeDemo.settings.lastName
        ) {
          drift.api.setUserAttributes({
            first_name: this.activeDemo.settings.firstName,
            last_name: this.generateName('last')
          })
        } else if (
          !this.activeDemo.settings.firstName &&
          this.activeDemo.settings.lastName
        ) {
          drift.api.setUserAttributes({
            first_name: this.generateName('first'),
            last_name: this.activeDemo.settings.lastName
          })
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
        if (
          this.interactionId &&
          this.activeDemo.settings?.playbookType === 'Fastlane'
        ) {
          // Hide widget for Fastlane
          drift.api.widget.hide()
        } else if (this.interactionId) {
          // Start bot interaction for all bots aside from ABM and Fastlane
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
          }, 500)
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
      if (
        this.activeDemo.settings?.background &&
        this.activeDemo.settings?.background !== null &&
        this.activeDemo.settings?.background !== ''
      ) {
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
            message:
              'Loading your background image. This may take a minute but will be faster next time!',
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
                message:
                  'Something went wrong loading your background image. Make sure it starts with http:// or https://.',
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
