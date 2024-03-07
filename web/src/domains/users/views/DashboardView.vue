<template>
        <div>
            <h1>Dashboard</h1>
            <p>{{ user.name }}</p>
            <p>{{  user.role  }}</p>
            <div class="ma-2 pa-2">
                <h3>Totals</h3>
                <p>Shifts: {{ totalShiftCount }}</p>
                <p>Hours: {{ totalHours }}</p>
            </div>
        </div>
        <div>
            <h1>Teams</h1>
        </div>
        <v-row class="ma-2 pa-1">
            <v-container v-for="team in teams" :key="team">
                        <h2>{{ team.name }}</h2>
                        <router-link :to="`/teams/${team.id}/manage`">
                            <v-btn v-if="isLeadingThisTeam(team)">Manage</v-btn>
                        </router-link>
                <shift-table
                    @shift-action="load"
                    :shifts="filterShiftsForTeam(team.id)"
                    :userShifts="shifts"/>
            </v-container>
        </v-row>

</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    name: 'DashboardView',
    components: {
        ShiftTable
    },
    data() {
        return {
            user: {},
            userStore: initUserStore(),
            shifts: [],
            teamShifts: [],
            teams: [],
            isLoading: true
        }
    },
    methods: {
        async getTeams(){
            const teams = await client.users.getTeams(this.userStore.userId)
            this.teams = teams.data.sort((a, b) => a.name.localeCompare(b.name))
        },
        async getShifts(){
            const shifts = await client.users.getShifts(this.userStore.userId)
            this.shifts = shifts.data
        },
        filterShiftsForTeam(teamId){
            return this.shifts.filter(shift => shift.team === teamId)
        },
        isLeadingThisTeam(team){
            return team.leads.includes(this.userStore.userId)
        },
        async load() {
            await this.getTeams()
            await this.getShifts()
        }
        
    },
    computed: {
        totalShiftCount(){
            return this.shifts.length
        },
        totalHours(){
            return this.shifts.reduce( (total, shift) => {
                return total + shift.duration
             }, 0)
        }
    },
    async created(){
        await this.load()
    }
}
</script>