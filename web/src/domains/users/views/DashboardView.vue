<template>
    <v-sheet class="mx-8 px-8">
            <v-row class="pb-5">
                <v-col>
                    <v-row>
                        <h1>Dashboard</h1>
                        <p>{{ user.name }}</p>
                        <p>{{  user.role  }}</p>
                    </v-row>
                    <v-row>
                        <h3>Totals</h3>
                    </v-row>
                    <v-row>
                        <strong>Shifts:</strong> {{ totalShiftCount }}
                    </v-row>
                    <v-row>
                        <strong>Hours:</strong> {{ totalHours }}
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <h1>Teams</h1>
            </v-row>
            <v-row v-for="team in teams" :key="team" class="pt-3">
                <v-col>
                    <v-row>
                        <v-col cols="3">
                            <h2>{{ team.name }}</h2>
                        </v-col>
                        <v-col cols="3">
                            <router-link :to="`/teams/${team.id}/manage`">
                                <v-btn v-if="isLeadingThisTeam(team)">Manage</v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                    <v-row>
                        <shift-table
                            @shift-action="shiftAction"
                            :shifts="filterShiftsForTeam(team.id)"
                            :userShifts="shifts"/>
                    </v-row>
                </v-col>
            </v-row>
    </v-sheet>
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
            this.shifts = shifts.data.map(shift => {
                shift.button = {
                    id: shift.id,
                    label: 'Unsignup',
                    action: 'unsignup',
                }
                return shift
            })
        },
        filterShiftsForTeam(teamId){
            return this.shifts.filter(shift => shift.team === teamId)
        },
        isLeadingThisTeam(team){
            return team.leads.includes(this.userStore.userId)
        },
        async shiftAction(action, shiftId){
            await client.shifts.unsignup({
                id: shiftId, 
                userId: this.userStore.userId
            })
            this.isLoading = false
            await this.load()
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