<template>
    <tr>
        <td>{{user.name}}</td>
        <td>{{ user.email }}</td>
    </tr>
</template>
<script>
import { initUserStore } from '../../../stores/user'

export default {
    name: 'UserTableRow',
    emits: ['user-action'],
    data (){
        return{
            userStore: initUserStore(),
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleUserAction(action, shiftId) {
            this.$emit('user-action', action, shiftId)
        }
    }
}
</script>
