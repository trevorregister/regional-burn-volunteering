<template>
    <v-container>
        <div>
            <h1>{{ team.name }}</h1>
            <p>{{ team.description }}</p>
        </div>
        <shift-table
            @shift-action="shiftAction"
            :shifts="shifts"
        >
        </shift-table>
    </v-container>
</template>
<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    components: {
        ShiftTable
    }
        ,
    data() {
        return {
            teamId: this.$route.params.teamId,
            team: {},
            shifts: [],
            userShifts: [],
            userStore: initUserStore()
        }
    },
    methods: {
        async getTeamShifts(teamId){
            let shifts = await client.teams.getShifts(teamId)
            this.shifts = shifts.data
            this.shifts = this.shifts.map(shift => {
                shift.button = this.buildButton(shift)
                return shift
            })
        },
        async getUserShifts(){
            const shifts = await client.users.getShifts(this.userStore.userId)
            this.userShifts = shifts.data
        }, 
        async getTeam(){
            const team = await client.teams.getTeamById(this.teamId)
            this.team = team.data
        },

        async shiftAction(action, shiftId){
            switch(action){
                case 'signup':
                    await this.signup(shiftId)
                    break
                case 'unsignup':
                    await this.unsignup(shiftId)
                    break
                default:
                    break
            }
            await this.load()
        },
        async signup(shiftId){
            this.isLoading = true
            await client.shifts.signup({
                id: shiftId, 
                userId: this.userStore.userId
            })
            this.isLoading = false
        },
        async unsignup(shiftId){
            this.isLoading = true
            await client.shifts.unsignup({
                id: shiftId, 
                userId: this.userStore.userId
            })
            this.isLoading = false

        },
        buildButton(shift){
            if (this.userShifts.some(userShift => userShift.id === shift.id)) {
                return {
                    id: shift.id,
                    label: 'Unsignup',
                    action: 'unsignup'
                }
            }
            else if(shift.capacity === shift.signups){
                return {
                    id: shift.id,
                    label: 'Full',
                    action: 'none'
                }
            }
            else {
                return {
                    id: shift.id,
                    label: 'Sign Up',
                    action: 'signup'
                }
            }
        },
        async load() {
            await this.getTeam()
            await this.getUserShifts()
            await this.getTeamShifts(this.teamId)
            this.isLoading = false
    }

    },
    async created() {
        await this.load()
    }
}
</script>
<style>
</style>