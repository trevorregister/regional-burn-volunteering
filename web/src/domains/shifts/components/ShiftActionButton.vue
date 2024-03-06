<template>
    <v-btn v-if="button.action !== 'manage'"
        @click="shiftAction(button.action, button.id)"
        :disabled="button.action === 'none'"
    >
        {{ button.label }}
    </v-btn>
    <v-btn v-else>
        <router-link :to="`/shifts/${button.id}/manage`">
            {{ button.label }}
        </router-link>
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
        }
    }
}
</script>

<style scoped>
</style>