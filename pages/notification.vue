<template>
  <main class="font-balto">
    <!-- LOADER SCREEN -->
    <TheLoaderModal />
    <!-- MAIN WINDOW CONTENT -->
    <div>
      <img :src="background" class="w-screen max-w-none">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- NOFICATION -->
    <TheNotificationSlider :demo="demo" />
    <!-- END NOFICATION -->
  </main>
</template>

<script>
export default {
  name: 'Notification',
  data () {
    return {
      id: this.$route.query.demo,
      background: 'https://i.imgur.com/I8y3kyf.png' // SFDC Background
    }
  },
  computed: {
    demo () {
      if (this.id) {
        return this.$store.getters['demos/getDemoById'](this.id)
      }
      return null
    }
  },
  watch: {
    demo () {
      if (this.demo?.settings?.notificationType) {
        switch (this.demo.settings.notificationType) {
          case 'Salesforce_Desktop':
            this.background = 'https://i.imgur.com/I8y3kyf.png'
            break
          case 'Dynamics_Desktop':
            this.background = 'https://i.imgur.com/LPTyP6V.jpg'
            break
          case 'Salesloft_Desktop':
            this.background = 'https://i.imgur.com/wtoza39.png'
            break
          case 'Outreach_Desktop':
            this.background = 'https://i.imgur.com/14XBHXV.png'
            break
        }
      }
    }
  },
  mouted () {},
  methods: {}
}
</script>
