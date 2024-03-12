<template>
        <v-form>
            <v-text-field
                label="Name"
                v-model="shift.name"
            />
            <v-text-field
                label="Description"
                v-model="shift.description"
            />
            <v-text-field
                label="Capacity"
                v-model="shift.capacity"
            />
            <v-text-field
                label="Day"
                type="date"
                v-model="shift.day"
            />
            <v-text-field
                label="Start Time"
                type="time"
                v-model="shift.startTime"
            />
            <v-text-field
                label="Duration (hours)"
                v-model="shift.duration"
            />
            <v-text-field
                label="Number of shifts"
                v-model="shift.amount"
            />
            <v-row>
                <v-col>
                    <v-btn @click="create">
                        Create
                    </v-btn>
                </v-col>
                <v-col>
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
    emits: ['reset'],
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
        async create(){
            const shifts = this.buildShifts()
            for await (const shift of shifts){
                await client.shifts.addShift(shift)
            }
            this.$emit('shifts-created')
        }
    }
}
</script>
<style>
    
</style>