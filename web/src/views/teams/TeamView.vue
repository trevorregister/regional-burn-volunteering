<template>
    <div>
        <h1>{{ team.name }}</h1>
        <p>{{ team.description }}</p>
    </div>
    <div>
        <h1>Shifts</h1>
        <div v-for="shift in shifts" :key="shift">
            <h2>{{ shift.name }}</h2>
            <p>Description: {{ shift.description }}</p>
            <p>Start: {{ shift.start }}</p>
            <p>End: {{ shift.end }}</p>
            <p>Length: {{ shift.duration }} hours</p>
            <p>Signups: {{ getSignupCount(shift.members ?? []) }}</p>
            <p>Capacity: {{ shift.capacity }}</p>
        </div>
    </div>
</template>
<script>
import { client } from '../../../api-client/client'

export default {
    props: ['teamId'],
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
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getShifts(this.teamId)
            ])

        },
        getSignupCount(shiftMembers){
            return shiftMembers.length
        }
    },
    async created() {
        this.load()
    }
}
</script>
<style>
    
</style>