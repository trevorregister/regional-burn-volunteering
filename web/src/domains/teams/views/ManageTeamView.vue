<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col cols="3" class="d-flex align-center pa-0">
                    <h1>
                        Manage Team
                    </h1>
                </v-col>
                <v-col cols="2" class="d-flex align-center pa-0">
                    <action-button v-if="!showCol" @click="toggleCol"
                        :label="'Create Shifts'"
                        />
                </v-col>
            </v-row>
            <v-row>
                <h1>{{ team.name }}</h1>
            </v-row>
            <v-row>    
                <p>{{ team.description }}</p>
            </v-row>
            <v-row>
                <v-col>
                    <shift-table
                        @shift-action="shiftAction"
                        :shifts="shifts"
                        :userShifts=[]
                    />
                </v-col>
                <v-col v-if="showCol" cols="4">
                    <create-shift-form   
                        @cancel="toggleCol" 
                        @shifts-created="load"
                    />
                </v-col>
            </v-row> 
        </v-col>
    </v-row>
</template>
<script>

import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'
import CreateShiftForm from '../components/CreateShiftForm.vue'
import ActionButton from '@/domains/shared/components/ActionButton.vue'

export default {
    name: 'ManageTeamView',
    components: {
        ShiftTable,
        CreateShiftForm,
        ActionButton,
    },
    inject: ['flash'],
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
            //await this.load()
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