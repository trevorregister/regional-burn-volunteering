<template>
    <v-row>
        <v-col v-for="team in teams" :key="team">
                <TeamCard
                    :name="team.name"
                    :description="team.description"
                    :teamId="team.id"
                    :isLeadingThisTeam="isLeadingThisTeam(team)"
                >
                </TeamCard>
        </v-col>
    </v-row>
</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import TeamCard from '../components/TeamCard.vue'
export default {
    name: 'TeamsView',
    components: {
        TeamCard
    },
    data() {
        return {
            teams: [],
            userStore: initUserStore(),
            userShifts: []
        }
    },
    methods: {
        async getTeams() {
            const teams = await client.teams.getTeams()
            this.teams = teams.data
        },
        async load(){
            await this.getTeams()
        },
        isLeadingThisTeam(team){
            return team.leads.includes(this.userId)

        }
    },
    computed: {
        userId(){
            return this.userStore.userId
        },
    },

    async created() {
        await this.load()
    }
}
</script>../../../../api-client