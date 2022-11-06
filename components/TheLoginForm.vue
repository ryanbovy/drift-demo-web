<template>
  <!-- LOGIN MENU CONTENT -->
  <div class="relative mt-6 flex-1 px-4 sm:px-6">
    <!-- LOGIN DIVIDER -->
    <div class="relative mt-6 mb-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-start">
        <span class="pr-2 bg-white text-xs uppercase font-bold"> Login </span>
      </div>
    </div>
    <!-- END LOGIN DIVIDER -->

    <!-- LOGIN SETTINGS OPTIONS -->
    <div class="space-y-2">
      <!-- USER EMAIL INPUT-->
      <div
        class="
          border border-gray-300
          rounded-md
          px-3
          py-2
          shadow-sm
          focus-within:ring-1
          focus-within:ring-drift-indigo
          focus-within:border-drift-indigo
        "
      >
        <label
          for="email"
          class="block text-xs font-medium text-gray-900"
        >Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="
            block
            w-full
            border-0
            p-0
            text-gray-900
            placeholder-gray-500
            focus:ring-0
            sm:text-sm
          "
          placeholder="jdoe@drift.com"
          @keydown="login"
        >
      </div>
    </div>

    <!-- LOGIN BUTTON -->
    <button
      type="button"
      class="
        mt-6
        w-full
        items-center
        px-6
        py-3
        border border-transparent
        rounded-md
        shadow-sm
        bg-drift-lime
        hover:bg-drift-cyan
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-drift-indigo
        font-bold
        uppercase
      "
      @click="login"
    >
      ⚡️ Login
    </button>

    <!-- END OF SIDEBAR MENU CONTENT -->
  </div>
</template>

<script>
export default {
  name: 'TheLoginForm',
  data () {
    return {
      email: null
    }
  },
  methods: {
    async login (e) {
      try {
        if (e.key) { // If the login was triggered by the input keydown event
          if (e.key === 'Enter') { // If the key was enter...
            await this.$store.dispatch('user/login', this.email)
          }
        } else { // Otherwise it was the button event
          await this.$store.dispatch('user/login', this.email)
        }
      } catch (err) {}
    }
  }
}
</script>
