<template>
  <v-container>
    <v-table>
      <thead>
        <tr class="text-left">
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <user-table-row v-for="user in users" :key="user" :user="user" />
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import UserTableRow from './UserTableRow.vue'

export default {
  components: {
    UserTableRow
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
tbody tr {
  &:hover {
    background-color: rgb(193, 193, 255);
  }
}
</style>
