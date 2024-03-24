<template>
  <v-overlay scroll-strategy="none" class="align-center justify-center">
    <v-sheet elevation="5" class="rounded-lg" height="200" width="300">
      <v-container>
        <v-row class="pa-2">
          <h1>Confirm</h1>
          <p>{{ prompt }}</p>
        </v-row>
        <v-row justify="space-around" align="end" class="py-5 my-5">
          <action-button @click="confirm" :label="'Confirm'" />
          <warning-button @click="cancel" :label="'Cancel'" />
        </v-row>
      </v-container>
    </v-sheet>
  </v-overlay>
</template>
<script>
import ActionButton from './ActionButton.vue'
import WarningButton from './WarningButton.vue'
export default {
  name: 'ConfirmModal',
  components: {
    ActionButton,
    WarningButton
  },
  emits: ['cancel', 'confirm'],
  props: {
    prompt: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style></style>
