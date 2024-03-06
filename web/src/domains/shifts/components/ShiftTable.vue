<template>
    <loading-container :loading="false">
        <v-container>
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
                        :button="buildButton(shift)"
                        />
                </tbody>
            </v-table>
        </v-container>
</loading-container>
</template>
<script>
import { client } from '../../../../api-client/client'
import ShiftTableRow from '../../shifts/components/ShiftTableRow.vue'
import { initUserStore } from '@/stores/user'
import LoadingContainer from '@/domains/shared/LoadingContainer.vue'

export default {
    props: {
        shifts: {
            type: Array,
            required: true
        },
        userShifts: {
            type: Array,
            required: true
        },
    },
    components: {
        ShiftTableRow,
        LoadingContainer
    }
        ,
    data() {
        return {
            userStore: initUserStore(),
            isLoading: true
        }
    },
    methods: {
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
            this.$emit('shift-action')
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
    },
}
</script>
<style lang="scss" scoped>
    tbody tr {
        &:hover {
            background-color: rgb(193, 193, 255);
        }
    }
</style>