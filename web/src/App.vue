<script setup>
import { RouterView } from 'vue-router'
import  TopNavBar  from './components/global/TopNavBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <TopNavBar />
    </div>
  </header>
  <RouterView />
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
