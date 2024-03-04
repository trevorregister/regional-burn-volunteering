<template>
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
                    <ShiftTableRow v-for="shift in shifts" :key="shift"
                        :name="shift.name"
                        :start="shift.start"
                        :end="shift.end"
                        :duration="shift.duration"
                        :signups="shift.signups ?? 0"
                        :capacity="shift.capacity"
                        :id="shift.id"
                        :day="shift.day"
                        @click="shiftAction(shift)"
                        :button="sendButton(shift)"
                        />
                </tbody>
        </v-table>
        </v-row>
    </div>
</template>
<script>
import { client } from '../../../../api-client/client'
import ShiftTableRow from '../../shifts/components/ShiftTableRow.vue'
import { initUserStore } from '@/stores/user'

export default {
    props: ['teamId'],
    components: {
        ShiftTableRow
    }
        ,
    data() {
        return {
            team: {},
            shifts: [],
            userShiftIds: [],
            userShifts: [],
            userStore: initUserStore(),
            buttons: []
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getTeamShifts(teamId){
            const shifts = await client.teams.getShifts(teamId)
            this.shifts = shifts.data
        },
        async getUserShifts(){
            const userShiftIds = []
            const shifts = await client.users.getShifts(this.userStore.userId)
            shifts.data.map(shift => userShiftIds.push(shift.id))

            this.userShiftIds = userShiftIds
            this.userShifts = shifts.data

        },
        isUserSignedUp(shiftId){
            return this.userShiftIds.includes(shiftId)
        },
        buildButtons(){
            this.shifts.map(shift => {
                this.buttons.push({
                    shiftId: shift.id,
                    isFull: this.signups >= this.capacity,
                    isConflict: false,
                    isSignedUp: this.isUserSignedUp(shift.id)
                })
            })
            
        },
        shiftAction(shift){
            let foundButton = this.buttons.find( (button) => {
                if(button.shiftId === shift.id){
                    return {...button, id: button.id, isSignedUp: button.isSignedUp}
                }    
            })

            foundButton.isSignedUp = !foundButton.isSignedUp
        },
        sendButton(shift){
            const buttonToSend = this.buttons.find( (button) => {
                if(button.shiftId === shift.id){
                    return {...button, id: button.id, isSignedUp: button.isSignedUp}
                }    
            })
            return buttonToSend
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getTeamShifts(this.teamId),
                await this.getUserShifts()
            ])
            this.buildButtons()
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