<template>
    <div>
        <h1>{{ team.name }}</h1>
        <p>{{ team.description }}</p>
    </div>
    <div>
        <h1>Shifts</h1>
        <v-row>
            <div v-for="shift in shifts" :key="shift">
                <v-col>
                    <ShiftSignupCard
                        :name="shift.name"
                        :description="shift.description"
                        :start="shift.start"
                        :end="shift.end"
                        :duration="shift.duration"
                        :signups="shift.signups ?? 0"
                        :capacity="shift.capacity"
                        :id="shift.id"
                        :showButton="true"
                        :isUserSignedUp="isUserSignedUp(shift.id)"
                        />
                </v-col>
            </div>
        </v-row>
    </div>
</template>
<script>
import { client } from '@client'
import ShiftSignupCard from '../../components/shifts/ShiftSignupCard.vue'
import { initUserStore } from '@/stores/user'

export default {
    props: ['teamId'],
    components: {
        ShiftSignupCard
    }
        ,
    data() {
        return {
            team: {},
            shifts: [],
            userShiftIds: [],
            userStore: initUserStore()
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
        async getUserShiftIds(){
            const userShiftIds = []
            const shifts = await client.users.getShifts(this.userStore.userId)
            shifts.data.map(shift => userShiftIds.push(shift.id))
            this.userShiftIds = userShiftIds

        },
        isUserSignedUp(shiftId){
            return this.userShiftIds.includes(shiftId)
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getTeamShifts(this.teamId),
                await this.getUserShiftIds()
            ])

        },
    },
    async created() {
        this.load()
    }
}
</script>
<style>
    
</style>