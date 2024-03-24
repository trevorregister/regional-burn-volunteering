<template>
    <v-app-bar 
    title="Regional Burn Volunteering" 
    color="primary"
    >
        <v-btn v-if="userId==''" density="comfortable">
            <router-link to="/login">Login</router-link>
        </v-btn>
        <v-btn v-if="userId!==''" density="comfortable">
            <router-link to="/dashboard">Dashboard</router-link>
        </v-btn>
        <v-btn density="comfortable">
            <router-link to="/about">About</router-link>
        </v-btn>
        <v-btn density="comfortable">
            <router-link to="/teams">Teams</router-link>
        </v-btn>
        <v-btn @click="logout" density="comfortable">
            <router-link to="/login">Logout</router-link>
        </v-btn>
    </v-app-bar>
</template>
<script>
import { client } from '../../../api-client/client'
import { useUserStore } from '@/stores/user'
export default {
    name: 'TopNavBar',
    data() {
        return {
            userStore: useUserStore()
        }
    },
    methods: {
        async logout(){
            this.userStore.clearUser()
            await client.users.logout()
            this.$router.push({path: '/login'})
        }
    },
    computed: {
        userId() {
            return this.userStore.userId
        }
    }
}
</script>
<style lang="scss" scoped>
    .v-btn {
        background-color: white;
        margin: 2px;
    }
</style>