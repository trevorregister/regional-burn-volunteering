<template>
    <v-container>
        <div>
            <h1>{{ team.name }}</h1>
            <p>{{ team.description }}</p>
        </div>
        <shift-table
            @shift-action="load"
            :shifts="shifts"
            :userShifts="userShifts"
        >
        </shift-table>
    </v-container>
</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    components: {
        ShiftTable
    }
        ,
    data() {
        return {
            teamId: this.$route.params.teamId,
            team: {},
            shifts: [],
            userShifts: [],
            userStore: initUserStore()
        }
    },
    methods: {
        async getTeamShifts(teamId){
            let shifts = await client.teams.getShifts(teamId)
            shifts = shifts.data
            this.shifts = shifts
        },
        async getUserShifts(){
            const shifts = await client.users.getShifts(this.userStore.userId)
            this.userShifts = shifts.data
        }, 
        async getTeam(){
            const team = await client.teams.getTeamById(this.teamId)
            this.team = team.data
        },
        async load() {
            await this.getTeam()
            await this.getTeamShifts(this.teamId)
            await this.getUserShifts()
            this.isLoading = false
    }

    },
    async created() {
        await this.load()
    }
}
</script>
<style>
</style>