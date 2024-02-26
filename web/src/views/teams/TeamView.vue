<template>
    <div>
        {{ team }}
    </div>
</template>
<script>
import { client } from '../../../api-client/client'

export default {
    props: ['id'],
    data() {
        return {
            team: {},
        }
    },
    methods: {
        async getTeamById(id){
            const team = await client.teams.getTeamById(id)
            this.team = team.data
        }
    },
    async created() {
        this.getTeamById(this.id)
    }
}
</script>
<style>
    
</style>