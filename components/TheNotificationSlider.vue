<template>
  <div
    id="app"
    class="fixed inset-0 overflow-hidden"
  >
    <div class="notification">
      <div class="message">
        <img class="icons" src="~/assets/img/chrome.png" alt="">
        <div class="text">
          <span class="abmCompany">🎯 {{ account }}  - </span><span class="abmName">{{ name }}</span><br>
          <span class="abmUrl">app.drift.com</span><br>
          <span class="abmPage">is on Enterprise Communications page</span>
        </div>
        <img class="icons" src="~/assets/img/drift.png" alt="">
      </div>
      <div class="actions">
        <div class="close">
          Close
        </div>
        <div>More</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNotificationSlider',
  props: {
    demo: Object
  },
  data () {
    return {
      name: 'Joshua Perk',
      account: 'Slack'
    }
  },
  computed: {},
  watch: {
    demo () {
      if (this.demo?.settings?.firstName) { this.name = `${this.demo?.settings?.firstName} ${this.demo?.settings?.lastName}` }
      if (this.demo?.settings?.accountName) { this.account = this.demo?.settings?.accountName }
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped>
.notification {
    position: fixed;
    z-index: 99997;
    right: 10px;
    top: 10px;
    width: 350px;
    height: 70px;
    border-radius: 10px;
    background: #383838;
    border: 2px solid #5B5B5B;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
    transition: 0.7s ease all;
    opacity: 0.97;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    box-sizing: content-box;
}

.notification .message {
    flex-grow: 1;
    display: flex;
    align-items: center;
    min-width: 0;
}

.notification .message .icons {
    height: 65%;
    padding: 6px;
    box-sizing: content-box;
}

.notification .message .text {
    flex-grow: 1;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
}

.notification .message .text .abmCompany,
.notification .message .text .abmName {
    font-weight: bold;
    font-size: 14px;
    padding-bottom: 4px;
}

.notification .message .text .abmUrl {
    font-weight: bold;
    padding-bottom: 2px;
}

.notification .actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #5B5B5B;
    flex: 0 1 auto;
    cursor: pointer;
}

.notification .actions div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #B3B3B3;
    font-weight: bold;
    font-size: 12px;
    transition: 0.3s ease all;
}

.notification .actions div:hover {
    background: #525252;
}

.notification .actions div:last-of-type {
    border-top: 1px solid #5B5B5B;
}
</style>
