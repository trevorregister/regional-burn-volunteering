<template>
    <tr>
        {{ isUserSignedUp }}
        <td>{{ name }}</td>
        <td>{{ description }}</td>
        <td>{{ day }}</td>
        <td>{{ start }} - {{ end }}</td>
        <td>{{ duration }} hours</td>
        <td>{{  shiftSignups }}/{{ capacity }}</td>
        <td>
            <v-btn @click="signup">{{ button }}</v-btn>
        </td>
    </tr>
</template>
<script>
import { client } from '../../../api-client/client'
import { initUserStore } from '../../stores/user'

export default {
    name: 'ShiftTableRow',
    emits: ['signup'],
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
        isUserSignedUp: {
            Boolean
        },
        button: {
            type: String
        }
    },
    methods: {
        async signup(){
            try{
/*                 await client.shifts.signup({
                    id: this.shiftId,
                    userId: this.userId
                })
                this.shiftSignups++
                !this.isUserSignedUp */
                await this.$emit('signup', this.shiftId)
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
                this.toggleButton('unsignup')
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
