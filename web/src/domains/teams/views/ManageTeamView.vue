<template>
    <h1>
       Manage Team 
       {{team.name}}
    </h1>
    <v-row>
            <v-table>
            <thead>
                <tr class="text-left">
                    <th>Name</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Length</th>
                    <th>Signups</th>
                    <th>Manage</th>
                </tr>
            </thead>
                <tbody>
                    <ManageShiftTableRow v-for="shift in shifts" :key="shift"
                        :name="shift.name"
                        :start="shift.start"
                        :end="shift.end"
                        :duration="shift.duration"
                        :signups="shift.signups ?? 0"
                        :capacity="shift.capacity"
                        :id="shift.id"
                        :day="shift.day"
                        />
                </tbody>
        </v-table>
        </v-row>
</template>
<script>

import { client } from '../../../../api-client/client'

export default {
    name: 'ManageTeamView',
    components: {
        
    },
    props: {
        teamId: {
            type: String
        }
    },
    data() {
        return {
            team: {},
            leads: [],
            shifts: [],
            rows: 1
        }
    },
    methods: {
        async getTeamById(teamId){
            const team = await client.teams.getTeamById(teamId)
            this.team = team.data
        },
        async getLeads(teamId){
            const leads = await client.teams.getLeads(teamId)
            this.leads = leads.data
        },
        async getShifts(teamId){
            const shifts = await client.teams.getShifts(teamId)
            this.shifts = shifts.data
        },
        async load() {
            await Promise.all([
                await this.getTeamById(this.teamId),
                await this.getLeads(this.teamId),
                await this.getShifts(this.teamId)
            ])
        },
        addRow() {
            this.rows++
        }
    },
    computed:{
    },
    async created(){
        await this.load()
    }
}
</script>
<style>
    
</style>../../../../api-client