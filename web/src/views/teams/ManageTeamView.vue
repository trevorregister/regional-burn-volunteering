<template>
    <div>
       Manage Team 
       {{this.team}}
    </div>
</template>
<script>

import { client } from '../../../api-client/client'

export default {
    props: {
        teamId: {type: String}
    },
    data() {
        return {
            team: {}
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId)
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