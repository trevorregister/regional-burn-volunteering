

<template>
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
      >
    </v-text-field>
    <v-btn type="submit">
      Submit
    </v-btn>
    </v-form>
    <p v-for="(value, key) in user" :key="key">
    {{ key }}:  {{ value }}
  </p>
  </v-sheet>
</template>

<script>
import { client } from '../../api-client/client'

export default {
  name: 'LoginView',
  data() {
    return {
      email: 'user45@email.com',
      password: 'password',
      user: {}
    }
  },
  methods: {
    async login(){
      const user = await client.users.login({
        email: this.email,
        password: this.password
      })
      this.user = user.data
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
