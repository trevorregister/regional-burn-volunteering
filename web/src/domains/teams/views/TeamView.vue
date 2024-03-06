<template>
    <loading-container :loading="isLoading">
        <div>
            <h1>{{ team.name }}</h1>
            <p>{{ team.description }}</p>
        </div>
        <div>
            <h1>Shifts</h1>
            <v-row>
                <v-table>
                <thead>
                    <tr class="text-left">
                        <th>Name</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Length</th>
                        <th>Signups</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        <shift-table-row v-for="shift in shifts" :key="shift"
                            @shift-action="shiftAction"
                            :name="shift.name"
                            :start="shift.start"
                            :end="shift.end"
                            :duration="shift.duration"
                            :description="shift.description"
                            :signups="shift.signups ?? 0"
                            :capacity="shift.capacity"
                            :id="shift.id"
                            :day="shift.day"
                            :button="shift.button"
                            />
                    </tbody>
            </v-table>
            </v-row>
        </div>
    </loading-container>
</template>
<script>
import { client } from '../../../../api-client/client'
import ShiftTableRow from '../../shifts/components/ShiftTableRow.vue'
import { initUserStore } from '@/stores/user'
import LoadingContainer from '@/domains/shared/LoadingContainer.vue'

export default {
    props: ['teamId'],
    components: {
        ShiftTableRow,
        LoadingContainer
    }
        ,
    data() {
        return {
            team: {},
            shifts: [],
            userShifts: [],
            userStore: initUserStore(),
            isLoading: true
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getTeamShifts(teamId){
            let shifts = await client.teams.getShifts(teamId)
            shifts = shifts.data
            shifts.map(shift => {
                shift.button = this.buildButton(shift)
            })
            this.shifts = shifts
        },
        async getUserShifts(){
            const shifts = await client.users.getShifts(this.userStore.userId)
            this.userShifts = shifts.data

        },
        buildButton(shift){
            console.log(shift.id)
            return {
                label: 'Sign Up',
                action: 'signup'
            }
        },
        shiftAction(){
            console.log('action')
        },
        async load() {
            this.isLoading = true
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getTeamShifts(this.teamId),
                await this.getUserShifts()
            ])
            this.isLoading = false
        },
    },
    async created() {
        await this.load()
    }
}
</script>
<style lang="scss">
    tr {
        &:hover {
            background-color: rgb(193, 193, 255);
        }
    }
</style>