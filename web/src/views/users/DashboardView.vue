<template>
    <div>
        <h1>Dashboard</h1>
        <p>{{ user.name }}</p>
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
        <v-table>
            <thead>
                <tr class="text-left">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Length</th>
                    <th>Signups</th>
                    <th>Actions</th>
                </tr>
            </thead>
                <tbody>
                    <!-- <ShiftTableRow @unsignup="removeShift" -->
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
                        :actions="'unsignup'"
                        />
                </tbody>
        </v-table>
    </v-row>
</template>
<script>
import { initUserStore } from '../../stores/user'
import { client } from '@client'
import ShiftTableRow from '../../components/shifts/ShiftTableRow.vue'

export default {
    name: 'DashboardView',
    components: {
        ShiftTableRow
    },
    data() {
        return {
            user: {},
            userStore: initUserStore(),
            shifts: [],
            teams: [],
        }
    },
    methods: {
        async load() {
            if(this.userId === ''){
                alert('You need to log in first.')
                this.$router.push({path: '/login'})
            }
            const userResponse = await client.users.getUserById(this.userId)
            this.user = userResponse.data
            const shiftsResponse = await client.users.getShifts(this.userId)
            this.shifts = shiftsResponse.data
            const teamsResponse = await client.users.getTeams(this.userId)
            this.teams = teamsResponse.data
        },
/*         removeShift: function(shiftId){
            this.shifts = this.shifts.filter(shift => {
                return shift.id != shiftId
            })
        } */
        
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