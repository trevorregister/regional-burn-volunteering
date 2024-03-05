<template>
  <v-container>
    <v-row align="center" justify="center">
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
          <v-text-field
              v-model="leadershipKeyValue"
              label="Leadership code (optional)"
            >
            <v-tooltip
              activator="parent"
              location="end"
            >Only for members of leadership.
            </v-tooltip>
          </v-text-field>
          <v-btn block class="mt-2" color="secondary" type="submit">
            Submit
          </v-btn>
          </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import { initUserStore } from '@/stores/user'
import { client } from '../../../../api-client/client'

export default {
  name: 'CreateAccountView',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      leadershipKeyValue: ' ',
      userStore: initUserStore()
    }
  },
  methods: {
    async createUser(){
      const newUserRes = await client.users.addUser({
        email: this.email,
        name: this.name,
        password: this.password,
        leadershipKeyValue: this.leadershipKeyValue
      })

      const newUser = newUserRes.data

      const login = await client.users.login({
        email: newUser.email,
        password: this.password
      })

      this.userStore.setId(login.data.user.id)

      this.$router.push({path: '/dashboard'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>../../../../api-client
