<template>
    <loading-container :loading="isLoading">
        <div>
            <h1>Dashboard</h1>
            <p>{{ user.name }}</p>
            <p>{{  user.role  }}</p>
            <div class="ma-2 pa-2">
                <h3>Totals</h3>
                <p>Shifts: {{ totalShiftCount }}</p>
                <p>Hours: {{ totalHours }}</p>
            </div>
        </div>
        <div>
            <h1>Teams</h1>
        </div>
        <v-row class="ma-2 pa-1">
            <v-list v-for="team in teams" :key="team">
                <h2>{{ team.name }}</h2>
            </v-list>
        </v-row>
        <div>
            <h1>Shifts</h1>
        </div>
        <v-row class="ma-2 pa-2">
            <v-table v-if="shifts.length > 0">
                <thead>
                    <tr class="text-left">
                        <th>Name</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Length</th>
                        <th>Signups</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        <ShiftTableRow v-for="shift in shifts" :key="shift"
                            :name="shift.name"
                            :description="shift.description"
                            :start="shift.start"
                            :end="shift.end"
                            :duration="shift.duration"
                            :signups="shift.signups ?? 0"
                            :capacity="shift.capacity"
                            :id="shift.id"
                            :day="shift.day"
                            :button="sendButton(shift)"
                            @unsignup="unsignup"
                            />
                    </tbody>
            </v-table>
            <h2 v-else>Signup for some shifts ya slacker</h2>
        </v-row>
    </loading-container>
</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import ShiftTableRow from '../../shifts/components/ShiftTableRow.vue'
import LoadingContainer from '@/domains/shared/LoadingContainer.vue'

export default {
    name: 'DashboardView',
    components: {
        ShiftTableRow,
        LoadingContainer
    },
    data() {
        return {
            user: {},
            userStore: initUserStore(),
            shifts: [],
            teams: [],
            buttons: [],
            isLoading: true
        }
    },
    methods: {
        buildButtons(){
            this.shifts.map(shift => {
                this.buttons.push({
                    shiftId: shift.id,
                    isFull: false,
                    isConflict: false,
                    isSignedUp: true
                })
            })
        },
        sendButton(shift){
            const buttonToSend = this.buttons.find( (button) => {
                if(button.shiftId === shift.id){
                    return {...button, id: button.id, isSignedUp: button.isSignedUp}
                }    
            })
            return buttonToSend
        },
        async load() {
            this.isLoading = true
            const user = await client.users.getUserById(this.userId)
            this.user = user.data
            const shifts = await client.users.getShifts(this.userId)
            this.shifts = shifts.data
            const teams = await client.users.getTeams(this.userId)
            this.teams = teams.data

            this.buildButtons()
            this.isLoading = false
        },
        unsignup: function(shiftId){
            this.shifts = this.shifts.filter(shift => {
                return shift.id != shiftId
            })
        }
        
    },
    computed: {
        userId() {
            return this.userStore.userId
        },
        token() {
            return this.userStore.token
        },
        totalShiftCount(){
            return this.shifts.length
        },
        totalHours(){
            return this.shifts.reduce( (total, shift) => {
                return total + shift.duration
             }, 0)
        }
    },
    async created(){
        await this.load()
    }
}
</script>