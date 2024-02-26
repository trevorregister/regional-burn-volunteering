<template>
            <v-app-bar title="Alchemy Volunteering" color="primary">
                <v-btn color="secondary">
                    <RouterLink to="/login">Login</RouterLink>
                </v-btn>
                <v-btn color="secondary">
                    <RouterLink to="/about">About</RouterLink>
                </v-btn>
                <v-btn color="secondary">
                    <RouterLink to="/teams">Teams</RouterLink>
                </v-btn>
                <v-btn @click="logout" color="secondary">Logout</v-btn>
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