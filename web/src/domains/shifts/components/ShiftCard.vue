<template>
    <v-card>
        <v-card-title>{{ shift.name }}</v-card-title>
        <v-card-text>{{ shift.description }}</v-card-text>
    </v-card>
</template>
<script>
export default {
    name: 'ShiftCard',
    props: {
        shift: {
            type: Object,
            required: true
        }
    },
}
</script>
<style>
    
</style>