<template>
  <v-table>
    <thead>
      <tr class="text-left">
        <th>Name</th>
        <th>Day</th>
        <th>Time</th>
        <th>Length</th>
        <th>Signups</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <shift-table-row
        v-for="shift in shifts"
        :key="shift"
        @shift-action="handleShiftAction"
        @show-shift-card="showShiftCard"
        :name="shift.name"
        :start="shift.start"
        :end="shift.end"
        :duration="shift.duration"
        :description="shift.description"
        :signups="shift.signups ?? 0"
        :capacity="shift.capacity"
        :id="shift.id"
        :day="shift.day"
        :button="shift.button"
      />
    </tbody>
  </v-table>
</template>
<script>
import ShiftTableRow from '../../shifts/components/ShiftTableRow.vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ShiftTable',
  emits: ['shift-action', 'show-shift-card'],
  props: {
    shifts: {
      type: Array,
      required: true
    }
  },
  components: {
    ShiftTableRow
  },
  data() {
    return {
      userStore: useUserStore(),
      isLoading: true
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
<style lang="scss" scoped>
tbody tr {
  &:hover {
    background-color: rgb(193, 193, 255);
  }
}
</style>
