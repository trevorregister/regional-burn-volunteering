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
                    <ShiftCard
                        :name="shift.name"
                        :description="shift.description"
                        :start="shift.start"
                        :end="shift.end"
                        :duration="shift.duration"
                        :signups="shift.signups ?? 0"
                        :capacity="shift.capacity"
                        />
                </v-col>
            </div>
        </v-row>
    </div>
</template>
<script>
import { client } from '../../../api-client/client'
import ShiftCard from '../../components/shifts/ShiftCard.vue'

export default {
    props: ['teamId'],
    components: {
        ShiftCard}
        ,
    data() {
        return {
            team: {},
            shifts: []
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getShifts(teamId){
            const shifts = await client.teams.getShifts(teamId)
            this.shifts = shifts.data
        },

        async signup(shiftId, userId){
            await client.shifts.signup({
                id: shiftId,
                userId: userId
            })
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getShifts(this.teamId)
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