<template>
    <div v-for="team in teams" :key="team">
        <RouterLink
        :to="{
            name: 'team',
            params: {
                teamId: team.id
            }
        }"
        >
            <TeamCard
                :name="team.name"
                :description="team.description"
            />
        </RouterLink>
    </div>
</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../api-client/client'
import TeamCard from '../../components/teams/TeamCard.vue'
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
        }
    },
    computed: {
        userId(){
            return this.userStore.userId
        }
    },

    async created() {
        await this.load()
    }
}
</script>