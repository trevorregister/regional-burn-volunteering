<template>
            <v-app-bar title="Alchemy Volunteering" color="primary">
                <v-btn color="black-lighten-3">
                    <RouterLink to="/login">Login</RouterLink>
                </v-btn>
                <v-btn color="black-lighten-3">
                    <RouterLink to="/about">About</RouterLink>
                </v-btn>
                <v-btn @click="logout" color="black-lighten-3">Logout</v-btn>
            </v-app-bar>
</template>
<script>
import { client } from '../../../api-client/client'
export default {
    name: 'TopNavBar',
    data() {
        return {
        }
    },
    methods: {
        async logout(){
            await client.users.logout()
            this.$router.push({path: '/login'})
        }
    }
}
</script>