<template>
    <v-card>
        {{ shift }}
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