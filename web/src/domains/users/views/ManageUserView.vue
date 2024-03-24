<template>
    <v-container>
        <div>
            <h1>Manage User</h1>
            <p><strong>Name: </strong>{{ user.name }}</p>
            <p><strong>Role: </strong>{{  user.role  }}</p>
            <p><strong>Email: </strong>{{  user.email  }}</p>
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
                <shift-table
                    @shift-action="shiftAction"
                    :shifts="filterShiftsForTeam(team.id)"
                    :userShifts="shifts"
                    />
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import { client } from '../../../../api-client/client'
import ShiftTable from '@/domains/shifts/components/ShiftTable.vue'
import { useUserStore } from '@/stores/user'
export default {
    name: 'ManageUserView',
    components: {
        ShiftTable
    },
    inject: ['flash'],
    data(){
        return {
            userIdToManage: this.$route.params.userId,
            user: {},
            shifts: [],
            teams: [],
            userStore: useUserStore(),
            buttons:[]
        }
    },
    methods: {
        async getUser(){
            try {
                const user = await client.users.getUserById(this.userIdToManage)
                this.user = user.data
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
        },
        async getTeams(){
            try {
                const teams = await client.users.getTeams(this.userIdToManage)
                this.teams = teams.data.sort((a, b) => a.name.localeCompare(b.name))
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
        },
        async getShifts(){
            try {
                const shifts = await client.users.getShifts(this.userIdToManage)
                this.shifts = shifts.data
                this.shifts = this.shifts.map(shift => {
                    this.buildButton(shift)
                    return shift
                })
            } catch (err) {
                this.flash.$error(`${err.data.message}`)
            }
        },
        filterShiftsForTeam(teamId){
            return this.shifts.filter(shift => shift.team === teamId)
        },
        buildButton(shift){
            if(this.canRemoveUserFromShift(shift)){
                shift.button = {
                    id: shift.id,
                    label: 'Remove',
                    action: 'unsignup'
                }
            }
            else {
                shift.button = {
                    id: shift.id,
                    label: 'None',
                    action: 'none'
                }
            }
        },
        canRemoveUserFromShift(shift){
            const team = this.teams.find(team => team.id === shift.team)
            if (team) {
                return team.leads.includes(this.userStore.userId)
            }
            else {
                return false
            }
        },
        async shiftAction(action, shiftId){
            try {
                await client.shifts.unsignup({
                    id: shiftId, 
                    userId: this.userIdToManage
                })
            } catch (err) {
                this.flash.$warning(`${err.data.message}`)
            }
            await this.load()
        },
        async load(){
            await this.getUser()
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
        },

    },
    async created(){
        await this.load()
    }
}
</script>

<style scoped>
</style>