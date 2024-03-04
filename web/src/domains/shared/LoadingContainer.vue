<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <div class="loading-container">
        <div v-if="loading">
          <loading-spinner/>
        </div>
        <div v-if="!loading">
          <slot />
        </div>
      </div>
    </v-row>
  </v-container>
</template>
<script>

import LoadingSpinner from './LoadingSpinner.vue'

export default {
    name: 'LoadingContainer',
    components: {
        LoadingSpinner
    },
    props: {
        loading: {
            type: Boolean,
            required: true
        }
    }
    
}
</script>
