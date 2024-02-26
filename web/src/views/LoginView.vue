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
