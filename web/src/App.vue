<script setup>
import { RouterView } from 'vue-router'
import TopNavBar from './domains/shared/TopNavBar.vue'
import FlashBoundary from './domains/shared/FlashBoundary.vue'
</script>

<template>
  <v-app class="app-container">
    <top-nav-bar/>
    <flash-boundary :flashes="flashes"/>
        <v-main>
            <router-view/>
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
      generateId(){
        return Math.floor(Math.random() * 1000)
      },
      $success(message){
        const flash = {message: message, type: 'success', id: this.generateId()}
        this.flashes.push(flash)
        this.removeFlash(flash.id)
      },
      $error(message){
        const flash = {message: message, type: 'error', id: this.generateId()}
        this.flashes.push(flash)
        this.removeFlash(flash.id)
      },
      $info(message){
        const flash = {message: message, type: 'info', id: this.generateId()}
        this.flashes.push(flash)
        this.removeFlash(flash.id)
      },
      $warning(message){
        const flash = {message: message, type: 'warning', id: this.generateId()}
        this.flashes.push(flash)
        this.removeFlash(flash.id)
      },
      removeFlash(id){
        setTimeout(() => {
          this.flashes = this.flashes.filter(flash => flash.id !== id)
          }, 3000)
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
