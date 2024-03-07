<template>
    <v-btn
        @click="shiftAction(button.action, button.id)"
        :disabled="isDisabled"
    >
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
        shiftAction(action, shiftId) {
            this.$emit('shift-action', action, shiftId)
        },
    },
    computed: {
        isDisabled(){
            return this.button.action === 'none'
        }
    },
}
</script>

<style scoped>
</style>