<template>
    <v-card elevation="2">
        <v-img :src="getPicture"></v-img>
        <v-card-title>{{ shift.name }}</v-card-title>
        <v-card-text>
            <p>{{ shift.description }}</p>
            <p><strong>Day: </strong>{{ shift.day }}</p>
            <p><strong>Start: </strong>{{ shift.start }}</p>
            <p><strong>Length: </strong>{{ shift.duration }} hours</p>
            <p><strong>Signups: </strong>{{ shift.signups }}</p>
            <p><strong>Capacity: </strong>{{ shift.capacity }}</p>
        </v-card-text>
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
    computed: {
        getPicture(){
            const n = Math.floor(Math.random() * 1000)
            return `https://picsum.photos/id/${n}/400/200`
        }
    }
}
</script>
<style>
    
</style>