<template>
    <v-btn @click="shiftAction(button.action)">
        {{ button.label }}
    </v-btn>
</template>

<script>
export default {
    name: 'ShiftActionButton',
    emits: ['shift-action'],
    props: {
        button: {
            type: Object,
            required: true
        }
    },
    methods: {
        shiftAction(action) {
            console.log('button', action)
            this.$emit('shift-action', action)
        }
    }
}
</script>

<style scoped>
</style>