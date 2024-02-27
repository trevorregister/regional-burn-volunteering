<template>
    <div>
        <h1>Dashboard</h1>
        {{ user }}
    </div>
</template>
<script>
import { initUserStore } from '../../stores/user'
import { client } from '@client'
export default {
    data() {
        return {
            user: {},
            userStore: initUserStore()
        }
    },
    methods: {
        async load() {
            if(this.userId === ''){
                this.$router.push({path: '/login'})
            }
            const userResponse = await client.users.getUserById(this.userId)
            this.user = userResponse.data
        }
    },
    computed: {
        userId() {
            return this.userStore.userId
        },
        token() {
            return this.userStore.token
        },
    },
    async created(){
        await this.load()
    }
}
</script>