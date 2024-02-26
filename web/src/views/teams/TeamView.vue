<template>
    <div>
        <h1>{{ team.name }}</h1>
        <p>{{ team.description }}</p>
    </div>
</template>
<script>
import { client } from '../../../api-client/client'

export default {
    props: ['teamId'],
    data() {
        return {
            team: {},
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        }
    },
    async created() {
        this.getTeamById(this.teamId)
    }
}
</script>
<style>
    
</style>