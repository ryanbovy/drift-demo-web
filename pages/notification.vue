<template>
  <main class="font-balto">
    <!-- LOADER SCREEN -->
    <TheLoaderModal />
    <!-- MAIN WINDOW CONTENT -->
    <div>
      <img :src="background">
    </div>
    <!-- END MAIN WINDOW CONTENT -->
    <!-- NOFICATION -->
    <TheNotificationSlider />
    <!-- END NOFICATION -->
  </main>
</template>

<script>
export default {
  name: 'Notification',
  data () {
    return {
      background: 'https://i.imgur.com/I8y3kyf.png' // SFDC Background
      // Outreach: https://i.imgur.com/14XBHXV.png
      // Salesloft: https://i.imgur.com/wtoza39.png
    }
  },
  computed: {},
  watch: {},
  mouted () {},
  methods: {}
}
</script>
