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
            <user-table :users="members"/>
        </div>
    </v-container>
</template>
<script>
import { client } from '../../../../api-client/client'
import UserTable from '@/domains/users/components/UserTable.vue'
export default {
    name: 'ManageShiftView',
    components: {
        UserTable
    },
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
        },
        async getMembers(){
            const members = await client.shifts.getMembers(this.shiftId)
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