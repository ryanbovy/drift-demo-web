<template>
  <div
    v-if="isVisible"
    class="
      fixed
      flex
      justify-center
      items-center
      inset-0
      z-[99999999999]
      text-3xl
      gap-4
    "
    :class="[isWarning ? 'bg-drift-orange' : 'bg-drift-yellow']"
  >
    <div class="w-3/5 flex gap-4 items-center">
      <div class="loader grow-0 shrink-0" />
      <div class="uppercase font-bold animate-pulse">
        {{ message || "Loading your amazing demo." }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheLoaderModal',
  data () {
    return {}
  },
  computed: {
    isVisible () {
      return this.$store.state.loader.isVisible
    },
    isWarning () {
      return this.$store.state.loader.isWarning
    },
    message () {
      return this.$store.state.loader.message
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

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
