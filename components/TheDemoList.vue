<template>
  <!-- MENU CONTENT -->
  <div class="relative mt-6 flex-1 px-4 sm:px-6">
    <!-- SEARCH -->
    <div
      class="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-drift-indigo focus-within:border-drift-indigo"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Your Demos"
        class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
      >
    </div>
    <!-- END SEARCH -->

    <!-- NEW DEMO BUTTON -->
    <button
      type="button"
      class="mt-6 w-full items-center px-6 py-3 border border-transparent rounded-md shadow-sm transition bg-drift-lime hover:bg-drift-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-drift-indigo font-bold uppercase"
      @click="createDemo"
    >
      ⚡️ Create new demo
    </button>
    <!-- END NEW DEMO BUTTON -->

    <!-- DIVIDER -->
    <div class="relative mt-6 mb-2">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-start">
        <span class="pr-2 bg-white text-xs uppercase font-bold">
          Your Demos
        </span>
      </div>
    </div>
    <!-- END DIVIDER -->

    <!-- CONTENT -->
    <ul v-if="filteredDemos.length" class="border rounded divide-y">
      <li
        v-for="demo in filteredDemos"
        :key="demo.id"
        class="group p-4 cursor-pointer"
      >
        <div class="flex items-center">
          <div
            class="grow items-center transition origin-left group-hover:scale-105 opacity-75 group-hover:opacity-100 z-40"
            @click="selectDemo(demo.id)"
          >
            <span v-if="demo.id === activated" class="mr-2 text-xxs"> ✅ </span>
            {{ demo.name }}
          </div>
          <button
            class="grow-0 text-xs uppercase rounded border font-base leading-4 px-3 py-2 bg-drift-violet text-white z-50"
            @click="cloneDemo(demo.id, demo.name)"
          >
            Clone
          </button>
        </div>
      </li>
    </ul>
    <div v-else class="uppercase text-xs text-center p-4 font-bold opacity-50">
      😭 You don't have any demos
    </div>
    <!-- END CONTENT -->
  </div>
</template>

<script>
export default {
  name: 'TheDemoMenu',
  data () {
    return {
      searchQuery: '' // Initialize the search query
    }
  },
  computed: {
    demos () {
      return this.$store.state.demos.saved
    },
    activated () {
      return this.$store.state.demos.activated
    },
    filteredDemos () {
      return this.demos
        .filter((demo) => {
          // Perform case-insensitive search on the 'name' property
          return demo.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        })
        .sort((a, b) => {
          // Sort by 'updated_at' field in descending order
          return new Date(b.updated_at) - new Date(a.updated_at)
        })
    }
  },
  methods: {
    async createDemo () {
      await this.$store.dispatch('demos/create')
    },
    async cloneDemo (demoId, demoName) {
      await this.$store.dispatch('demos/clone', {
        demoId,
        demoName
      })
    },
    selectDemo (demoId) {
      this.$store.commit('demos/select', {
        demoId
      })
    }
  }
}
</script>
<style>
.grow {
  flex-grow: 1;
}
.grow-0 {
  flex-grow: 0;
}
</style>
