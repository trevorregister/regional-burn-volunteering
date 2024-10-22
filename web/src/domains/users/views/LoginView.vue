<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner>
          The API for this project is hosted on a free service. It may take 1-2 minutes to wake up. If nothing happens, refresh and try again.
        </v-banner>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-sheet width="300" elevation="2" border="md">
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email"> </v-text-field>
          <v-text-field v-model="password" label="Password" type="password"> </v-text-field>
          <action-button @click="login" label="Submit" width="300" />
        </v-form>
      </v-sheet>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn variant="text" @click="toCreateAccount"> Create Account </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { client } from '../../../../api-client/client'
import { useUserStore } from '../../../stores/user'
import ActionButton from '../../shared/components/ActionButton.vue'

export default {
  name: 'LoginView',
  components: {
    ActionButton
  },
  inject: ['flash'],
  data() {
    return {
      email: '',
      password: 'password',
      userStore: useUserStore()
    }
  },
  methods: {
    async login() {
      try {
        const login = await client.users.login({
          email: this.email,
          password: this.password
        })
        this.userStore.setId(login.data.user.id, login.data.user.role)
        this.userStore.authenticate()
        this.$router.push({ path: '/dashboard' })
      } catch (err) {
        this.flash.$error(`${err.data.message}`)
      }
    },
    toCreateAccount() {
      this.$router.push({ path: '/create-account' })
    }
  }
}
</script>
<style lang="scss" scoped></style>
