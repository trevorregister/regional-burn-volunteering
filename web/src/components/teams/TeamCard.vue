<template>
    <v-card 
        min-width="235"
        max-width="235"  
        elevation="2"
        color="primary"
        class="ma-1 pa-1"
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
