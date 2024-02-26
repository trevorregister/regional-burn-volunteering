<template>
    <v-card
        max-width="230"
        max-height="265"    
        elevation="2"
        color="primary"
    >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ description }}</v-card-subtitle>
    <v-card-text>
        <p>Start: {{ start }}</p>
        <p>End: {{ end }}</p>
        <p>Length: {{ duration }} hours</p>
        <p>Signups: {{ signups }}</p>
        <p>Capacity: {{ capacity }}</p>
    </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: 'ShiftCard',
    props: {
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
        duration: {
            type: Number
        },
        signups: {
            type: Number
        },
        capacity: {
            type: Number
        }
    }
}
</script>
