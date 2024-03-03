<template>
    <div>
       Manage Team 
       {{team.name}}
    </div>
    <v-row>
        <v-col cols="4" v-for="lead in leads" :key=lead>
            <v-sheet color="secondary" class="rounded-xl">
                <v-container align="center">{{lead.name}}</v-container>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script>

import { client } from '../../../api-client/client'

export default {
    props: {
        teamId: {type: String}
    },
    data() {
        return {
            team: {},
            leads: []
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getLeads(teamId){
            const leads = await client.teams.getLeads(teamId)
            this.leads = leads.data
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getLeads(this.teamId)
            ])
        }
    },
    async created(){
        await this.load()
    }
}
</script>
<style>
    
</style>