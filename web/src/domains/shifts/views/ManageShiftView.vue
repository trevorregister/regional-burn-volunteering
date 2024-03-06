<template >
    <v-container>
        <h1>
            {{ shift.name }}
        </h1>
        <p>{{ shift.description }}</p>
        <div>
            <p><strong>Day: </strong>{{ shift.day }}</p>
            <p><strong>Start time: </strong>{{ shift.start }}</p>
            <p><strong>End time: </strong>{{ shift.end }}</p>
            <p><strong>Duration: </strong>{{ shift.duration }} hours</p>
            <p><strong>Signups: </strong>{{ shift.signups }}/{{ shift.capacity }}</p>
        </div>
        <div>
            <h1>
                Members
            </h1>
            <p v-for="member in members" :key="member">{{ member }}</p>
        </div>
    </v-container>
</template>
<script>
import { client } from '../../../../api-client/client'
export default {
    name: 'ManageShiftView',
    data(){
        return {
            shiftId: this.$route.params.shiftId,
            shift: {},
            members:[]
        }
    },
    methods: {
        async getShift(){
            const shift = await client.shifts.getShiftById(this.shiftId)
            this.shift = shift.data
            console.log('shift', this.shift)
        },
        async getMembers(){
            console.log('shift member', this.shift.members, typeof this.shift.members)
            const members = await client.users.getUsersById(this.shift.members)
            this.members = members.data
        },
        async load(){
            await this.getShift()
            await this.getMembers()
        },
    },
    async created(){
        await this.load()
    }
    
}
</script>
<style>
    
</style>