<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ day }}</td>
        <td>{{ start }} - {{ end }}</td>
        <td>{{ duration }} hours</td>
        <td>{{  shiftSignups }}/{{ capacity }}</td>
    </tr>
</template>
<script>

export default {
    name: 'ManageShiftTableRow',
    data (){
        return{
        }
    },
    props: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        day: {
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
        },
    },
    watch: {
        shiftSignups() {
            return this.signups
        }
    }
}
</script>
<style>
    
</style>