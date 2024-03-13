<template>
    <tr>
        <td>
            {{ user.name }}
        </td>
        <td>
            {{ user.email }}
        </td>
        <td>
            <router-link :to="`/users/${user.id}/manage`">
                <action-button :label="'Details'"/>
            </router-link>
        </td>
    </tr>
</template>
<script>
import { initUserStore } from '../../../stores/user'
import ActionButton from '../../shared/components/ActionButton.vue'

export default {
    name: 'UserTableRow',
    components: {
        ActionButton
    },
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
