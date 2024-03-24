<template>
  <div v-for="flash in flashes" :key="flash">
    <flash-notification :message="flash.message" :type="flash.type" />
  </div>
</template>
<script>
import FlashNotification from './components/FlashNotification.vue'
export default {
  name: 'FlashBoundary',
  components: {
    FlashNotification
  },
  props: {
    flashes: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style></style>
