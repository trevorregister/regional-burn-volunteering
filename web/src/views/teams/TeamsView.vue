<template>
    <div v-for="team in teams" :key="team">
        <TeamCard
        :name="team.name"
        :description="team.description" />
    </div>
</template>
<script>
import { client } from '../../../api-client/client'
import TeamCard from '../../components/teams/TeamCard.vue'
export default {
    name: 'TeamsView',
    components: {
        TeamCard
    },
    data() {
        return {
            teams: []
        }
    },
    methods: {
        async getTeams() {
            const teams = await client.teams.getTeams()
            this.teams = teams.data
        }
    },

    async created() {
        await this.getTeams()
    }
}
</script>