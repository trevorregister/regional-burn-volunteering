<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-sheet width="300" elevation="2" border="md">
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
          <action-button
            @click="login"
            label="Submit"
            width="300"/>
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
import { useUserStore } from '../../../stores/user'
import ActionButton from '../../shared/components/ActionButton.vue'
import { loginValidation } from '../../../utils/validations'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'LoginView',
  components: {
    ActionButton
  },
  setup() {
    return { v$: useVuelidate()}
  },
  data(){
    return {
      email: '',
      password: 'password',
      userStore: useUserStore()
    }
  },
  validations(){
    return {
      ...loginValidation
    }
  },
  methods: {
    async login(){
      try {
        const validated = this.v$.$validate()
        if (!validated) {
          throw new Error('Validation failed')
        } else {
          const login = await client.users.login({
            email: this.email,
            password: this.password
          })
          
          this.userStore.setId(login.data.user.id)
          this.userStore.authenticate()
          this.$router.push({path: '/dashboard'})
        }
      } catch (err) {
        throw new Error(`${err.message}`)
      }

    },
    toCreateAccount(){
      this.$router.push({path: '/create-account'})
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
