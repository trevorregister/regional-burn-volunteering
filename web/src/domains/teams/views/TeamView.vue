<template>
  <v-container>
    <div>
      <h1>{{ team.name }}</h1>
      <p>{{ team.description }}</p>
    </div>
    <v-row>
      <v-col>
        <v-expansion-panels variant="popout" multiple>
          <v-expansion-panel v-for="day in days" :key="day" class="ma-2">
            <v-expansion-panel-title color="primary-lighten-1">
              <h4>{{panelTitle(day)}}</h4>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <shift-table 
                @show-shift-card="loadShift" 
                @shift-action="shiftAction" 
                :shifts="filterShiftsByDay(day)"/> 
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col v-if="shiftPanelCard" cols="4">
        <v-container style="position: fixed; width: 300px;">
          <shift-card :shift="shiftPanelCard"/>
          <action-button @click="clearShift" label="Close"/>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import { formatDate } from '@/utils/formatDate'
import ShiftTable from '../../shifts/components/ShiftTable.vue'
import ShiftCard from '../../shifts/components/ShiftCard.vue'
import ActionButton from '@/domains/shared/components/ActionButton.vue'

export default {
  components: {
    ShiftTable,
    ShiftCard,
    ActionButton
  },
  inject: ['flash'],
  data() {
    return {
      teamId: this.$route.params.teamId,
      team: {},
      shifts: [],
      userShifts: [],
      days: [],
      shiftPanelCard: null,
      userStore: useUserStore()
    }
  },
  methods: {
    filterShiftsByDay(day){
      return this.shifts.filter(shift => shift.day === day)
    },
    panelTitle(day){
      const { dayName, monthName, dayOfMonth} = formatDate(day)
      return `${dayName}, ${monthName} ${dayOfMonth}`
    },
    loadShift(shiftId){
      if (this.shiftPanelCard && this.shiftPanelCard.id === shiftId) {
        this.clearShift()
      } else {
      this.shiftPanelCard = this.shifts.find(shift => shift.id === shiftId)
      }
    },
    clearShift(){
      this.shiftPanelCard = null
    },
    async getTeamShifts(teamId) {
      try {
        let shifts = await client.teams.getShifts(teamId)
        this.shifts = shifts.data
        this.shifts = this.shifts.map((shift) => {
          if(!this.days.some(day => day === shift.day)) {
            this.days.push(shift.day)
          }
          shift.button = this.buildButton(shift)
          return shift
        })
      } catch (err) {
        this.flash.$error(`${err.data.message}`)
      }
    },
    async getUserShifts() {
      try {
        const shifts = await client.users.getShifts(this.userStore.userId)
        this.userShifts = shifts.data
      } catch (err) {
        this.flash.$error(`${err.data.message}`)
      }
    },
    async getTeam() {
      try {
        const team = await client.teams.getTeamById(this.teamId)
        this.team = team.data
      } catch (err) {
        this.flash.$error(`${err.data.message}`)
      }
    },

    async shiftAction(action, shiftId) {
      switch (action) {
        case 'signup':
          await this.signup(shiftId)
          break
        case 'unsignup':
          await this.unsignup(shiftId)
          break
        default:
          break
      }
      await this.load()
    },
    async signup(shiftId) {
      try {
        this.isLoading = true
        await client.shifts.signup({
          id: shiftId,
          userId: this.userStore.userId
        })
        this.flash.$success('Successfully signed up for shift')
        this.isLoading = false
      } catch (err) {
        this.flash.$warning(`${err.data.message}`)
      }
    },
    async unsignup(shiftId) {
      try {
        this.isLoading = true
        await client.shifts.unsignup({
          id: shiftId,
          userId: this.userStore.userId
        })
        this.flash.$success('Successfully unsigned up for shift')
        this.isLoading = false
      } catch (err) {
        this.flash.$warning(`${err.data.message}`)
      }
    },
    buildButton(shift) {
      if (this.userShifts.some((userShift) => userShift.id === shift.id)) {
        return {
          id: shift.id,
          label: 'Unsignup',
          action: 'unsignup'
        }
      } else if (shift.capacity === shift.signups) {
        return {
          id: shift.id,
          label: 'Full',
          action: 'none'
        }
      } else {
        return {
          id: shift.id,
          label: 'Sign Up',
          action: 'signup'
        }
      }
    },
    async load() {
      await this.getTeam()
      await this.getUserShifts()
      await this.getTeamShifts(this.teamId)
      this.isLoading = false
    }
  },
  async created() {
    await this.load()
  },
  computed:{

  }
}
</script>
<style>
</style>