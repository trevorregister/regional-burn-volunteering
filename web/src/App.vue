<script setup>
import { RouterView } from 'vue-router'
import TopNavBar from './domains/shared/TopNavBar.vue'
import FlashBoundary from './domains/shared/FlashBoundary.vue'
</script>

<template>
  <v-app class="app-container">
    <TopNavBar />
    <FlashBoundary :flashes="flashes"/>
        <v-main>
            <RouterView />
        </v-main>
  </v-app>
</template>
<script>
  export default {
    components: {
      TopNavBar,
      FlashBoundary,
    },
    data() {
      return {
        flashes: []
      }
    },
    provide(){
      return {
        flash: {
          $success: this.$success,
          $error: this.$error,
          $info: this.$info,
          $warning: this.$warning,
        }
      }
    },
    methods:{
        $success(message){
            this.flashes.push({message: message, type: 'success'})
            this.removeFlash()
        },
        $error(message){
            this.flashes.push({message: message, type: 'error'})
            this.removeFlash()
        },
        $info(message){
            this.flashes.push({message: message, type: 'info'})
            this.removeFlash()
        },
        $warning(message){
            this.flashes.push({message: message, type: 'warning'})
            this.removeFlash()
        },
        removeFlash(){
          setTimeout(() => {
                this.flashes.pop()
            }, 3500)
        }
    }
  }
</script>
<style lang="scss" scoped>
</style>
