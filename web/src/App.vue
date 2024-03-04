<script setup>
import { RouterView } from 'vue-router'
import TopNavBar from './domains/shared/TopNavBar.vue'
</script>

<template>
  <v-app>
    <TopNavBar />
      <v-main>
          <RouterView />
      </v-main>
  </v-app>
</template>
<script>
  export default {
    components: {
      TopNavBar
    }
  }
</script>
<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
