<template>
    <div>
        <h1>Dashboard</h1>
        {{ user }}
    </div>
    <div>
        <h1>Shifts</h1>
    </div>
    <v-row>
        <div v-for="shift in shifts" :key="shift">
            <v-col>
                <ShiftSignupCard @unsignup="removeShift"
                        :name="shift.name"
                        :description="shift.description"
                        :start="shift.start"
                        :end="shift.end"
                        :duration="shift.duration"
                        :signups="shift.signups ?? 0"
                        :capacity="shift.capacity"
                        :id="shift.id"
                        :showSignupButton="false"
                        :isUserSignedUp="true"
                        />
            </v-col>
        
        </div>
    </v-row>
</template>
<script>
import { initUserStore } from '../../stores/user'
import { client } from '@client'
import ShiftSignupCard from '../../components/shifts/ShiftSignupCard.vue'

export default {
    name: 'DashboardView',
    components: {
        ShiftSignupCard
    },
    data() {
        return {
            user: {},
            userStore: initUserStore(),
            shifts: [],
        }
    },
    methods: {
        async load() {
            if(this.userId === ''){
                alert('You need to log in first.')
                this.$router.push({path: '/login'})
            }
            const userResponse = await client.users.getUserById(this.userId)
            this.user = userResponse.data
            const shiftsResponse = await client.users.getShifts(this.userId)
            this.shifts = shiftsResponse.data
        },
        removeShift: function(shiftId){
            this.shifts = this.shifts.filter(shift => {
                return shift.id != shiftId
            })
        }
        
    },
    computed: {
        userId() {
            return this.userStore.userId
        },
        token() {
            return this.userStore.token
        },
    },
    async created(){
        await this.load()
    }
}
</script>