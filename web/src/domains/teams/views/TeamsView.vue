<template>
    <loading-container :loading="isLoading">
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
    </loading-container>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import TeamCard from '../components/TeamCard.vue'
import LoadingContainer from '@/domains/shared/LoadingContainer.vue'

export default {
    name: 'TeamsView',
    components: {
        TeamCard,
        LoadingContainer
    },
    data() {
        return {
            teams: [],
            userStore: useUserStore(),
            userShifts: [],
            isLoading: true
        }
    },
    methods: {
        async getTeams() {
            const teams = await client.teams.getTeams()
            this.teams = teams.data
        },
        async load(){
            this.isLoading = true
            await this.getTeams()
            this.isLoading = false
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