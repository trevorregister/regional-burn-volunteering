<template>
    <v-container>
        <v-row>
                <h1>
                    Manage Team
                </h1>
        </v-row>
        <v-row>
                <v-col>
                    <h1>{{ team.name }}</h1>
                    <p>{{ team.description }}</p>
                </v-col>
                <v-col>
                    <router-link :to="`/teams/${teamId}/add-shift`">
                        <v-btn>Add Shift</v-btn>
                    </router-link>
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
        </v-row>
    </v-container>
</template>
<script>

import { client } from '../../../../api-client/client'
import ShiftTable from '../../shifts/components/ShiftTable.vue'

export default {
    name: 'ManageTeamView',
    components: {
        ShiftTable
        
    },
    data() {
        return {
            teamId: this.$route.params.teamId,
            team: {},
            leads: [],
            shifts: [],
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