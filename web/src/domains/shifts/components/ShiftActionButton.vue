<template>
  <action-button
    @click="shiftAction(button.action, button.id)"
    :disabled="isDisabled"
    :label="button.label"
  />
</template>

<script>
import ActionButton from '@/domains/shared/components/ActionButton.vue'

export default {
  name: 'ShiftActionButton',
  components: {
    ActionButton
  },
  emits: ['shift-action'],
  props: {
    button: {
      type: Object,
      required: true
    }
  },
  methods: {
    shiftAction(action, shiftId) {
      this.$emit('shift-action', action, shiftId)
    }
  },
  computed: {
    isDisabled() {
      return this.button.action === 'none'
    }
  }
}
</script>

<style scoped></style>
