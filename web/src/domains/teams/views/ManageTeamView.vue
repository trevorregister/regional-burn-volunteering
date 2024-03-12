<template>
    <v-container>
        <v-row>
                <v-col cols="3">
                    <h1>
                        Manage Team
                    </h1>
                    <v-btn v-if="!showCol" @click="toggleCol">
                        Create Shifts
                    </v-btn>
                </v-col>
        </v-row>
        <v-row>
                <v-col>
                    <h1>{{ team.name }}</h1>
                </v-col>
        </v-row>
        <v-row>    
                <v-col>
                    <p>{{ team.description }}</p>
                </v-col>
        </v-row>
        <v-row>
            <v-col>
                <shift-table
                    @shift-action="shiftAction"
                    :shifts="shifts"
                    :userShifts=[]
                />
            </v-col>
            <v-col v-if="showCol">
                <add-shift-view   
                    @cancel="toggleCol" 
                    @shifts-created="toggleCol"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'
import AddShiftView from '../components/AddShift.vue'

export default {
    name: 'ManageTeamView',
    components: {
        ShiftTable,
        AddShiftView
        
    },
    data() {
        return {
            teamId: this.$route.params.teamId,
            team: {},
            leads: [],
            shifts: [],
            showCol: false
        }
    },
    methods: {
        async getTeamShifts(){
            let shifts = await client.teams.getShifts(this.teamId)
            this.shifts = shifts.data.map(shift => {
                shift.button = {
                    id: shift.id,
                    label: 'Manage',
                    action: 'manage',
                }
                return shift
            })
        },

        async getTeam(){
            const team = await client.teams.getTeamById(this.teamId)
            this.team = team.data
        },
        async shiftAction(action, shiftId){
            this.$router.push(`/shifts/${shiftId}/manage`)
        },
        async toggleCol(){
            this.showCol = !this.showCol
            await this.load()
        },
        async load() {
            await this.getTeam()
            await this.getTeamShifts()
        }
    },
    async created() {
        await this.load()
    }
}
</script>
<style>
    
</style>