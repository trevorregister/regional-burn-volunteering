<script setup>
import { RouterView } from 'vue-router'
import TopNavBar from './domains/shared/TopNavBar.vue'
import FlashBoundary from './domains/shared/FlashBoundary.vue'
</script>

<template>
  <v-app class="app-container">
    <TopNavBar />
    <FlashBoundary/>
        <v-main>
            <RouterView />
        </v-main>
  </v-app>
</template>
<script>
  export default {
    components: {
      TopNavBar,
      FlashBoundary
    }
  }
</script>
<style lang="scss" scoped>
</style>
