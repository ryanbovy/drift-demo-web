<template>
  <!-- SIDEBAR MENU -->
  <div
    id="app"
    v-shortkey="menuHotKeys"
    class="fixed inset-0 overflow-hidden"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
    @shortkey="toggleMenu()"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-opacity-75 transition-opacity ease-in-out duration-500"
        aria-hidden="true"
        :class="[isOpen ? 'opacity-100' : 'opacity-0']"
      />
      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        :class="[isOpen ? 'menu-shadow' : '']"
      >
        <div
          class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700"
          :class="[isOpen ? 'translate-x-0' : 'translate-x-full']"
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
                    @click="toggleMenu"
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
              <button v-if="isLoggedIn && !selectedDemo" class="uppercase font-black text-xs text-drift-magenta" @click="logout">
                Logout <span class="opacity-25 ml-1">({{ $store.state.user.email }})</span>
              </button>
              <button v-if="isLoggedIn && selectedDemo" class="uppercase font-black text-xs text-drift-magenta" @click="goToDemoMenu">
                &larr; Back
              </button>
            </div>
            <TheLoginForm v-if="!isLoggedIn" />
            <TheDemoList v-else-if="!selectedDemo" />
            <TheEditMenu v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSideBar',
  data () {
    return {
      menuHotKeys: ['shift', 'z']
    }
  },
  computed: {
    isOpen () {
      return this.$store.state.sidebar.isOpen
    },
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    },
    selectedDemo () {
      return this.$store.state.demos.selected
    }
  },
  mounted () {},
  methods: {
    toggleMenu () {
      this.$store.commit('sidebar/toggle')
    },
    logout () {
      this.$store.dispatch('user/logout')
    },
    goToDemoMenu () {
      this.$store.commit('demos/deselect')
    }
  }
}
</script>
