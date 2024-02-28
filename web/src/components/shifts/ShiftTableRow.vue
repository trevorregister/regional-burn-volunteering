<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ description }}</td>
        <td>{{ start }}</td>
        <td>{{ end }}</td>
        <td>{{ duration }}</td>
        <td>{{  signups }}</td>
        <td>{{ capacity }}</td>
    </tr>
<!--     <v-card
        max-width="300"
        max-height="265"    
        elevation="2"
        color="primary"
        class="ma-2 pa-2"
    >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ description }} {{ 'inConflict' }}</v-card-subtitle>
    <v-card-text>
        <p>Start: {{ start }}</p>
        <p>End: {{ end }}</p>
        <p>Length: {{ duration }} hours</p>
        <p>Signups: {{ shiftSignups }}</p>
        <p>Capacity: {{ capacity }}</p>
        <p>{{ isUserSignedUp }}</p>
    </v-card-text>
        <div align="center" class="ma-1 pa-1">
            <v-btn v-if="showSignupButton"
                class="ma-1 pa-1" 
                :disabled="isFull || isUserSignedUp"
                @click="signup"
                >
                <p v-if="isFull">Full</p>
                <p v-else-if="isUserSignedUp">Signed Up</p>
                <p v-else>Signup</p>
            </v-btn>
            <v-btn v-if="isUserSignedUp"
                class="ma-1 pa-1"
                @click="unsignup"
                >
                Unsignup
            </v-btn>
        </div>
    </v-card> -->
</template>
<script>
import { client } from '../../../api-client/client'
import { initUserStore } from '../../stores/user'

export default {
    name: 'ShiftTableRow',
    data (){
        return{
            isFull: this.signups >= this.capacity,
            shiftId: this.id,
            shiftSignups: this.signups,
            userStore: initUserStore(),
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
        },
        showSignupButton: {
            type: Boolean
        },
        isUserSignedUp: {
            type: Boolean
        }
    },
    methods: {
        async signup(){
            await client.shifts.signup({
                id: this.shiftId,
                userId: this.userId
            })
            //alert(`Signed up for ${this.name}`)
            this.shiftSignups++
            !this.isUserSignedUp
            await this.$emit('signup', this.shiftId)
        },
        async unsignup(){
            await client.shifts.unsignup({
                id: this.shiftId,
                userId: this.userId
            })
            this.shiftSignups--
            //alert(`Unsignedup for ${this.name}`)
            await this.$emit('unsignup', this.shiftId)
        }
    },
    computed: {
        userId() {
            return this.userStore.userId
        },
        justSignedUp(){
            return '!this.isUserSignedUp'
        }
    },
    watch: {
        isFull() {
            return this.shiftSignups >= this.capacity
        },
        shiftSignups() {
            return this.shiftSignups
        },

    }
}
</script>
