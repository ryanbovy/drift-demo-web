<template>
  <div>
    <input v-model="email">
    <button @click="login">
      Login
    </button>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: null
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async login () {
      try {
        const user = await this.$axios.post(`${process.env.API_URL}/user`, { email: this.email })
        console.log(user.data)
      } catch (err) {
        alert(err.message)
      }
    }
  }
}
</script>
