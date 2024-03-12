<template>
        <v-form  class="add-shift-form">
            <v-text-field
                label="Name"
                v-model="shift.name"
                variant="outlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Description"
                v-model="shift.description"
                variant="outlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Capacity"
                v-model="shift.capacity"
                variant="outlined"
                @blur="floorValues"

            />
            <v-text-field
                label="Day"
                type="date"
                v-model="shift.day"
                variant="outlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Start Time"
                type="time"
                v-model="shift.startTime"
                variant="outlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Duration (hours)"
                type="number"
                v-model="shift.duration"
                variant="outlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Number of shifts"
                type="number"
                v-model="shift.amount"
                variant="outlined"
                @blur="floorValues"
            >
                <v-tooltip
                    activator="parent"
                >
                Create multiple back-to-back shifts
                </v-tooltip>
            </v-text-field>
            <v-row>
                <v-col class="d-flex justify-center pa-1">
                    <v-btn @click="create">
                        Create
                    </v-btn>
                </v-col>
                <v-col class="d-flex justify-center pa-1">
                    <v-btn @click="cancel">
                        Cancel
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
</template>
<script>
import { client } from '../../../../api-client/client'
export default {
    name: 'AddShift',
    emits: ['cancel', 'shifts-created'],
    data() {
        return {
            shift: {
                name: '',
                description: '',
                day: '',
                capacity: 1,
                startTime: '',
                duration: 1,
                amount: 1
            },
            shifts: [],
        }
    },
    methods: {
        cancel(){
            this.$emit('cancel')
        },
        buildShifts(){
            this.shifts = []
            for (let i = 1; i <= this.shift.amount; i++){

                let start = new Date(`${this.shift.day}T${this.shift.startTime}:00`)
                start = new Date(start.getTime() + (this.shift.duration * 60 * 60 * 1000 * i))
                const end = new Date(start.getTime() + (this.shift.duration * 60 * 60 * 1000))

                let shift = {
                    name: this.shift.name,
                    description: this.shift.description,
                    teamId: this.$route.params.teamId,
                    start: start,
                    end: end,
                    capacity: this.shift.capacity
                }
                this.shifts.push(shift)
            }
            return this.shifts
        },
        floorValues(){
            this.shift.capacity = Math.floor(this.shift.capacity)
            this.shift.duration = Math.floor(this.shift.duration)
            this.shift.amount = Math.floor(this.shift.amount)
        },
        async create(){
            const shifts = this.buildShifts()
            for await (const shift of shifts){
                await client.shifts.addShift(shift)
            }
            this.$emit('shifts-created')
        }
    },
}
</script>
<style scoped>
/*     .add-shift-form {
        position: fixed;
        width: 20%;
    } */
</style>