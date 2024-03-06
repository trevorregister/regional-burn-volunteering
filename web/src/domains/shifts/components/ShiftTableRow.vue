<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ day }}</td>
        <td>{{ start }} - {{ end }}</td>
        <td>{{ duration }} hours</td>
        <td>{{  shiftSignups }}/{{ capacity }}</td>
        <td>
            <shift-action-button
            :button="button"
            @shift-action="handleShiftAction"/>
        </td>
    </tr>
</template>
<script>
import { initUserStore } from '../../../stores/user'
import ShiftActionButton from './ShiftActionButton.vue'

export default {
    name: 'ShiftTableRow',
    emits: ['shift-action'],
    components: {
        ShiftActionButton
    },
    data (){
        return{
            shiftId: this.id,
            shiftSignups: this.signups,
            userStore: initUserStore(),
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        signups: {
            type: Number,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        button: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleShiftAction(action) {
            console.log('row', action)
            this.$emit('shift-action', action)
        }
    }
}
</script>
