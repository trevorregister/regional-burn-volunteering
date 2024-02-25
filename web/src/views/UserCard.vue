

<template>
    <h1>User</h1>
    <button @click="fetchUserData('654bd58ee53e6817edefa808')">Get</button>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <h2>Shifts</h2>
    <ul v-for="shift in shifts" :key="shift">
      <li>
        <ul v-for="(value, key) in shift" :key="key">
          <li>
            {{ key }}: {{ value }}
          </li>
        </ul>
      </li>
    </ul>
</template>

<script>
import { client } from '../../api-client/client'
export default {
  name: 'UserCard',
  data() {
    return {
      user: null,
      teams: null,
      shifts: null
    }
  },
  methods: {
    async fetchUserData(id){
      const user = await client.users.getUserById(id)
      const teams = await client.users.getTeams(id)
      const shifts = await client.users.getShifts(id)

      this.teams = teams.data
      this.shifts = shifts.data
      this.user = user.data
    }
  }
}
</script>
