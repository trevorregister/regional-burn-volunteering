<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-sheet width="300" elevation="2">
          <v-form @submit.prevent="login">
            <v-text-field
               v-model="email"
              label="Email"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            >
          </v-text-field>
          <v-btn block class="mt-2" color="secondary" type="submit">
            Submit
          </v-btn>
          </v-form>
      </v-sheet>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn variant="text" @click="toCreateAccount">
          Create Account
        </v-btn>
    </v-row>
  </v-container>

</template>

<script>
import { client } from '../../../../api-client/client'
import { initUserStore } from '../../../stores/user'

export default {
  name: 'LoginView',
  data(){
    return {
      email: 'lead87@email.com',
      password: 'password',
      userStore: initUserStore()
    }
  },
  methods: {
    async login(){
      const login = await client.users.login({
        email: this.email,
        password: this.password
      })
      
      this.userStore.setId(login.data.user.id)
      this.userStore.authenticate()
      this.$router.push({path: '/dashboard'})

    },
    toCreateAccount(){
      this.$router.push({path: '/create-account'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
