<template>
    <v-row>
        <v-col>
            <v-row class="pb-5">
                <div>
                    <div>
                        <h1>Dashboard</h1>
                        <p>{{ user.name }}</p>
                        <p>{{  user.role  }}</p>
                    </div>
                    <div>
                        <h3>Totals</h3>
                    </div>
                    <div>
                        <strong>Shifts:</strong> {{ totalShiftCount }}
                    </div>
                    <div>
                        <strong>Hours:</strong> {{ totalHours }}
                    </div>
                </div>
            </v-row>
            <v-row v-for="team in teams" :key="team" class="pt-3">
                <div>
                    <v-row>
                        <v-col cols="3">
                            <h2>{{ team.name }}</h2>
                        </v-col>
                        <v-col cols="3">
                            <router-link :to="`/teams/${team.id}/manage`">
                                <action-button v-if="isLeadingThisTeam(team)"
                                    :label="'Manage'"/>
                            </router-link>
                        </v-col>
                    </v-row>
                    <v-row>
                        <shift-table
                            @shift-action="shiftAction"
                            :shifts="filterShiftsForTeam(team.id)"
                            :userShifts="shifts"/>
                    </v-row>
                </div>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'
import ActionButton from '@/domains/shared/components/ActionButton.vue'

export default {
    name: 'DashboardView',
    components: {
        ShiftTable,
        ActionButton
    },
    inject: ['flash'],
    data() {
        return {
            user: {},
            userStore: useUserStore(),
            shifts: [],
            teamShifts: [],
            teams: [],
            isLoading: true
        }
    },
    methods: {
        async getTeams(){
            try {
                const teams = await client.users.getTeams(this.userStore.userId)
                this.teams = teams.data.sort((a, b) => a.name.localeCompare(b.name))
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
        },
        async getShifts(){
            try {
                const shifts = await client.users.getShifts(this.userStore.userId)
                this.shifts = shifts.data.map(shift => {
                    shift.button = {
                        id: shift.id,
                        label: 'Unsignup',
                        action: 'unsignup',
                    }
                    return shift
                })
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
        },
        filterShiftsForTeam(teamId){
            return this.shifts.filter(shift => shift.team === teamId)
        },
        isLeadingThisTeam(team){
            return team.leads.includes(this.userStore.userId)
        },
        async shiftAction(action, shiftId){
            try {
                await client.shifts.unsignup({
                    id: shiftId, 
                    userId: this.userStore.userId
                })
                this.isLoading = false
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
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