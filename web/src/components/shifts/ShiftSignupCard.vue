<template>
    <v-card
        max-width="300"
        max-height="265"    
        elevation="2"
        color="primary"
        class="ma-2 pa-2"
    >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ description }}</v-card-subtitle>
    <v-card-text>
        <p>Start: {{ start }}</p>
        <p>End: {{ end }}</p>
        <p>Length: {{ duration }} hours</p>
        <p>Signups: {{ shiftSignups }}</p>
        <p>Capacity: {{ capacity }}</p>
    </v-card-text>
    <v-btn :disabled="isFull" @click="signup">
        <p v-if="isFull">Full</p>
        <p v-else>Signup</p>
    </v-btn>
    </v-card>
</template>
<script>
import { client } from '../../../api-client/client'

export default {
    name: 'ShiftSignupCard',
    data (){
        return{
            isFull: this.signups >= this.capacity,
            shiftId: this.id,
            shiftSignups: this.signups
        }
    },
    props: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        duration: {
            type: Number
        },
        signups: {
            type: Number
        },
        capacity: {
            type: Number
        }
    },
    methods: {
        async signup(){
            await client.shifts.signup({
                id: this.shiftId,
                userId: ''
            })
            this.shiftSignups++
        }
    },
    watch: {
        isFull() {
            return this.shiftSignups >= this.capacity
        },
        shiftSignups() {
                return this.shiftSignups

        }
    }
}
</script>
