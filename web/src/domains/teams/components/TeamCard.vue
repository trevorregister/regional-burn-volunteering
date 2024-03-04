<template>
    <v-card 
        min-width="235"
        max-width="235"  
        elevation="2"
        color="primary"
    >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>{{ description }}</v-card-text>
    <v-card-actions>
        <v-btn @click="toShifts(teamId)">View Shifts</v-btn>
        <v-btn v-if="isLeadingThisTeam" @click="toManageTeam(teamId)">Manage</v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: 'TeamCard',
    props: {
        name: {
            type: String
        },
        description: {
            type: String
        },
        teamId: {
            type: String
        },
        isLeadingThisTeam: {
            type: Boolean
        }
    },
    methods: {
        toShifts(teamId){
            this.$router.push({path: `/teams/${teamId}`})
        },
        toManageTeam(teamId){
            this.$router.push({path: `/teams/${teamId}/manage`})
        }
    }
}
</script>
