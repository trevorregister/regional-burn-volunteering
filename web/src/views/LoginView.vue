<template>
  <v-container justify-content="center">
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
        <v-btn type="submit">
          Submit
        </v-btn>
        {{ isAuthenticated }}
        </v-form>
      <v-btn @click="logout">
        Logout
      </v-btn>
    </v-sheet>
  </v-container>
  <v-btn @click="toCreateAccount">
    Create Account
  </v-btn>
</template>

<script>
import { client } from '@client'

export default {
  name: 'LoginView',
  data() {
    return {
      email: 'user45@email.com',
      password: 'password',
      user: {},
      isAuthenticated: false
    }
  },
  methods: {
    async login(){
      const user = await client.users.login({
        email: this.email,
        password: this.password
      })
      this.user = user.data
      this.isAuthenticated = true
    },
    async logout(){
      await client.users.logout()
      this.isAuthenticated = false
    },
    toCreateAccount(){
      this.$router.push({path: '/create-account'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
