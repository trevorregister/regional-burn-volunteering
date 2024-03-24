<template>
        <v-form  class="add-shift-form">
            <v-text-field
                label="Name"
                v-model="shift.name"
                variant="underlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Description"
                v-model="shift.description"
                variant="underlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Capacity"
                v-model="shift.capacity"
                type="number"
                variant="underlined"
                @blur="floorValues"

            />
            <v-text-field
                label="Day"
                type="date"
                v-model="shift.day"
                variant="underlined"
                @blur="floorValues"
            />
            <v-text-field
                label="Start Time"
                type="time"
                v-model="shift.startTime"
                variant="underlined"
                @blur="roundToNearestHour"
            >
                <v-tooltip activator="parent" >
                    Rounds to nearest hour
                </v-tooltip>
            </v-text-field>
            <v-text-field
                label="Duration (hours)"
                type="number"
                v-model="shift.duration"
                variant="underlined"
                @blur="floorValues"
                >
                <v-tooltip activator="parent">
                    Whole values only
                </v-tooltip>
            </v-text-field>
            <v-text-field
                label="Number of shifts"
                type="number"
                v-model="shift.amount"
                variant="underlined"
                @blur="floorValues"
            >
                <v-tooltip activator="parent">
                    Create multiple back-to-back shifts
                </v-tooltip>
            </v-text-field>
            <v-row>
                <v-col class="d-flex justify-center pa-1">
                    <action-button @click="toggleModal"
                        :label="'Create'"
                    />
                </v-col>
                <v-col class="d-flex justify-center pa-1">
                    <warning-button @click="cancel"
                        :label="'Cancel'"
                    />
                </v-col>
            </v-row>
        </v-form>
    <v-container>
        <v-overlay v-model="showModal"
            scroll-strategy="none"
            class="align-center justify-center"
        >
            <v-sheet elevation="5" class="rounded-lg">
                <div class="pa-2">
                    <h1>Confirm</h1>
                    <p>Create the following shifts?</p>
                </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start</th>
                                <th>Length</th>
                                <th>Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="shift in shifts" :key="shift">
                                <td>{{ shift.name }}</td>
                                <td>{{ formateDate(shift.start) }}</td>
                                <td>{{ (shift.end - shift.start)/3600000 }}</td> <!-- converts to hours -->
                                <td>{{ shift.capacity }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                <v-row justify="space-around" class="py-2">
                    <action-button @click="create"
                        :label="'Confirm'"
                    />
                    <warning-button @click="toggleModal"
                        :label="'Cancel'"
                    />
                </v-row>
            </v-sheet>
        </v-overlay>
    </v-container>
</template>
<script>
import { client } from '../../../../api-client/client'
import ActionButton from '@/domains/shared/components/ActionButton.vue'
import WarningButton from '@/domains/shared/components/WarningButton.vue'
import { createShiftValidation } from '@/utils/validations'
import useVuelidate from '@vuelidate/core'

export default {
    name: 'CreateShiftForm',
    components: {
        ActionButton,
        WarningButton
    },
    inject: ['flash'],
    emits: ['cancel', 'shifts-created'],
    setup(){
        return { v$: useVuelidate()}
    },
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
            showModal: false
        }
    },
    validation() {
        return {
            ...createShiftValidation
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
        formateDate(date){
            return date.toLocaleTimeString('en-US', {timeStyle: 'short'})
        },
        roundToNearestHour() {
            let time = this.shift.startTime.split(":")
            const hours = time[0]
            const minutes = time[1]

            const finalMinutes = "00"

            let finalHours = minutes >= 30 
                ? `${Number(hours) + 1}` //number conversion to prevent string concatenation
                : hours

            finalHours.length === 1 
                ? finalHours = `0${finalHours}` //ensures 2 digit format for hours
                : finalHours

            time = `${finalHours}:${finalMinutes}`
            this.shift.startTime = time
        },
        toggleModal(){
            this.buildShifts()
            this.showModal = !this.showModal
        },
        async create(){
            try {
                const validated = await this.v$.$validate()
                if (!validated) {
                    throw new Error('Validation failed')
                }
                else {
                    this.showModal = false
                    const shifts = this.buildShifts()
                    for await (const shift of shifts){
                        await client.shifts.addShift(shift)
                    }
                    this.$emit('shifts-created')
                }
            } catch (err) {
                this.flash.$warning(`${err}`)
            }
        }
    },
}
</script>
<style scoped>
</style>