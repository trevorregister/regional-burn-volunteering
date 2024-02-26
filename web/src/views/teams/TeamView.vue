<template>
    <div>
        <h1>{{ team.name }}</h1>
        <p>{{ team.description }}</p>
    </div>
    <div>
        <h1>Shifts</h1>
        <v-sheet>
            <div v-for="shift in shifts" :key="shift">
                <ShiftCard 
                    :name="shift.name"
                    :description="shift.description"
                    :start="shift.start"
                    :end="shift.end"
                    :duration="shift.duration"
                    :signups="shift.signups ?? 0"
                    :capacity="shift.capacity"
                    />
                <v-btn :disabled="isShiftFull(shift)" @click="signup(shift.id, userId)">
                    <p v-if="isShiftFull(shift)">Filled</p>
                    <p v-else>Signup</p>
                </v-btn>
            </div>
        </v-sheet>
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
        getSignupCount(shiftMembers){
            return shiftMembers.length
        },
        isShiftFull(shift){
            return shift.signups >= shift.capacity 
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