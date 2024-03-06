<template>
    <v-container>
        <h1>
            Manage Team 
            {{team.name}}
        </h1>
        <div>
            <h1>{{ team.name }}</h1>
            <p>{{ team.description }}</p>
        </div>
        <shift-table
            @shift-action="load"
            :shifts="shifts"
            :forceManageButton="true"
            :userShifts=[]
        >
        </shift-table>
    </v-container>
</template>
<script>

import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    name: 'ManageTeamView',
    components: {
        ShiftTable
        
    },
    data() {
        return {
            teamId: this.$route.params.teamId,
            team: {},
            leads: [],
            shifts: [],
        }
    },
    methods: {
        async getTeamShifts(){
            let shifts = await client.teams.getShifts(this.teamId)
            shifts = shifts.data
            this.shifts = shifts
        },

        async getTeam(){
            const team = await client.teams.getTeamById(this.teamId)
            this.team = team.data
        },
        async load() {
            await this.getTeam()
            await this.getTeamShifts()
        }
    },
    async created() {
        await this.load()
    }
}
</script>
<style>
    
</style>