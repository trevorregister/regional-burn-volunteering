<template>
  <tr @click="showShiftCard(shiftId)">
    <td>{{ name }}</td>
    <td>{{ day }}</td>
    <td>{{ start }} - {{ end }}</td>
    <td>{{ duration }} hours</td>
    <td>{{ shiftSignups }}/{{ capacity }}</td>
    <td>
      <shift-action-button :button="button" @shift-action="handleShiftAction" />
    </td>
  </tr>
</template>
<script>
import { useUserStore } from '../../../stores/user'
import ShiftActionButton from './ShiftActionButton.vue'

export default {
  name: 'ShiftTableRow',
  emits: ['shift-action', 'show-shift-card'],
  components: {
    ShiftActionButton
  },
  data() {
    return {
      shiftId: this.id,
      shiftSignups: this.signups,
      userStore: useUserStore()
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    signups: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    button: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleShiftAction(action, shiftId) {
      this.$emit('shift-action', action, shiftId)
    },
    showShiftCard(shiftId) {
      this.$emit('show-shift-card', shiftId)
    }
  }
}
</script>
