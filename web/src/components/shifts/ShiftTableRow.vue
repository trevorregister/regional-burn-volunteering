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
            <v-btn v-for="button in buttons" :key="button" 
                @click="actionButton(button)"
                >
                {{button.label}}
            </v-btn>
        </td>
    </tr>

<!--         <div align="center" class="ma-1 pa-1">
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
        </div> -->
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
            buttons: this.buildButtons()
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
        actions: {
            type: Array
        },
        isUserSignedUp: {
            Boolean
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
                this.toggleButton('signup')
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
        },
        async actionButton(button){
            switch(button.action){
                case 'signup' :
                    await this.signup()
                    break
                case 'unsignup':
                    await this.unsignup()
                    break
            }
        },
        async toggleButton(action){
            this.buttons = this.buttons.filter(button => {
                return action !== button.action
            })
            if(action === 'signup'){
                this.buttons.push({action: 'unsignup', label: 'UNSIGNUP', isDisabled: false})
            }
            if(action === 'unsignup'){
                this.buttons.push({action: 'signup', label: 'SIGNUP', isDisabled: false})
            }
        },
        buildButtons(){
            console.log(this.isUserSignedUp)
            if(this.isUserSignedUp){
                return [{action: 'unsignup', label: 'UNSIGNUP', isDisabled: false}]
            }
            const buttons = []
            this.actions.map(action => buttons.push({action: action, label: action.toUpperCase(), isDisabled: false}))
            return buttons
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
        buttons(){
            return this.buttons
        }

    }
}
</script>
