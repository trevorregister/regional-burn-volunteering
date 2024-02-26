<template>
    <v-card
        max-width="230"
        max-height="265"    
        elevation="2"
        color="primary"
    >
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>{{ description }}</v-card-text>
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
        }
    }
}
</script>
