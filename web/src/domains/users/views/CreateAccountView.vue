<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-sheet width="300" border="md" class="pa-4">
          <v-form>
            <v-text-field
              v-model="name"
              label="Name"
              variant="underlined"
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              variant="underlined"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="underlined"
            >
          </v-text-field>
          <v-text-field
              v-model="leadershipKeyValue"
              label="Leadership code (optional)"
              variant="underlined"
            >
            <v-tooltip
              activator="parent"
              location="end"
            >Only for members of leadership.
            </v-tooltip>
          </v-text-field>
          <v-col
            class="d-flex justify-center pa-2 align-center"
          >
          <action-button
            @click="createUser"
            :disabled="fieldsFilled"
            label="Submit"
            width="300"
          />
        </v-col>
          </v-form>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { client } from '../../../../api-client/client'
import  ActionButton  from '../../shared/components/ActionButton.vue'

export default {
  name: 'CreateAccountView',
  components: {
    ActionButton
  },
  inject: ['flash'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      leadershipKeyValue: ' ',
      userStore: useUserStore()
    }
  },
  methods: {
    async createUser(){
      try {
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
          this.flash.$success(`Welcome, ${newUser.name}`)
          this.$router.push({path: '/dashboard'})
      } catch (err) {
        this.flash.$error(`${err.data.message}`)}
    }
  },
  computed: {
    fieldsFilled(){
      return (this.name === '' || this.email === '' || this.password === '')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
