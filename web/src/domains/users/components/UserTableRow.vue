<template>
    <tr>
        <td>
            {{ user.name }}
        </td>
        <td>
            {{ user.email }}
        </td>
        <td>
            <v-btn>
                <router-link :to="`/users/${user.id}/manage`">Details</router-link>
            </v-btn>
        </td>
    </tr>
</template>
<script>
import { initUserStore } from '../../../stores/user'

export default {
    name: 'UserTableRow',
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
