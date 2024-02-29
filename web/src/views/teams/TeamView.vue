<template>
    <div>
        <h1>{{ team.name }}</h1>
        <p>{{ team.description }}</p>
    </div>
    <div>
        <h1>Shifts</h1>
        <v-row>
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
                        :button="button"
                        @signup="signup"
                        />
                </tbody>
        </v-table>
        </v-row>
    </div>
</template>
<script>
import { client } from '@client'
import ShiftTableRow from '../../components/shifts/ShiftTableRow.vue'
import { initUserStore } from '@/stores/user'

export default {
    props: ['teamId'],
    components: {
        ShiftTableRow
    }
        ,
    data() {
        return {
            team: {},
            shifts: [],
            userShiftIds: [],
            userShifts: [],
            userStore: initUserStore(),
            button: 'signup'
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getTeamShifts(teamId){
            const shifts = await client.teams.getShifts(teamId)
            this.shifts = shifts.data
        },
        async getUserShifts(){
            const userShiftIds = []
            const shifts = await client.users.getShifts(this.userStore.userId)
            shifts.data.map(shift => userShiftIds.push(shift.id))

            this.userShiftIds = userShiftIds
            this.userShifts = shifts.data

        },
        isUserSignedUp(shiftId){
            return this.userShiftIds.includes(shiftId)
        },
        signup: function(shiftId){
            this.shifts.map(shift => {
                if(shift.id === shiftId){
                    this.button = 'unsignup'
                }
            })
            //return this.isUserSignedUp(shiftId)
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getTeamShifts(this.teamId),
                await this.getUserShifts()
            ])

        },
    },
    async created() {
        await this.load()
    }
}
</script>
<style>
    
</style>