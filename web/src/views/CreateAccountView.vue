<template>
  <v-container>
    <v-sheet width="300" elevation="2">
        <v-form @submit.prevent="createUser">
          <v-text-field
             v-model="name"
            label="Name"
          >
          </v-text-field>
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
        </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import { client } from '../../api-client/client'

export default {
  name: 'CreateAccountView',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      role: 'user'
    }
  },
  methods: {
    async createUser(){
      await client.users.addUser({
        email: this.email,
        name: this.name,
        role: this.role,
        password: this.password
      })

      this.$router.push({path: '/login'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
