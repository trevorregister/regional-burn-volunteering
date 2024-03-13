<template>
    <v-btn color="primary">
        {{ label }}
    </v-btn>
</template>
<script>
export default {
    name: 'ActionButton',
    props: {
        label: {
            type: String,
            required: true
        }
    }
    
}
</script>