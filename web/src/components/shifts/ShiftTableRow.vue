<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ day }}</td>
        <td>{{ start }} - {{ end }}</td>
        <td>{{ duration }} hours</td>
        <td>{{  shiftSignups }}/{{ capacity }}</td>
        <td v-if="userId !== ''">
            <v-btn v-if="userButton.isSignedUp" @click="unsignup">Unsignup</v-btn>
            <v-btn v-else-if="shiftSignups >= capacity" :disabled="true">Full</v-btn>
            <v-btn v-else-if="!userButton.isSignedUp" @click="signup">Signup</v-btn>
        </td>
        <td v-else>
            <v-btn>
                <RouterLink to="/login">Login</RouterLink>
            </v-btn>
        </td>
    </tr>
</template>
<script>
import { client } from '../../../api-client/client'
import { initUserStore } from '../../stores/user'

export default {
    name: 'ShiftTableRow',
    emits: ['unsignup'],
    data (){
        return{
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
        day: {
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
        button: {
            Object
        }
    },
    methods: {
        async signup(){
            try{
                await client.shifts.signup({
                    id: this.shiftId,
                    userId: this.userId
                })
                this.shiftSignups++
                !this.isUserSignedUp
            }
            catch(err){
                return null
            }
        },
        async unsignup(){
            try{
                await client.shifts.unsignup({
                    id: this.shiftId,
                    userId: this.userId
                })
                this.shiftSignups--
                await this.$emit('unsignup', this.shiftId)
            }
            catch(err){
                return null
            }
        }
    },
    computed: {
        userId() {
            return this.userStore.userId
        },
        userButton(){
            return this.button ? this.button : 'no'
        },
        isFull() {
            return this.signups >= this.capacity
        },
    },
    watch: {
        shiftSignups() {
            return this.signups
        },
    }
}
</script>
