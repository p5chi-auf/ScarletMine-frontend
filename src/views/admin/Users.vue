<template>
  <div id="users">
  <b-container fluid>

    <div class="list-of-accounts">
      <b-button squared href="/users/add"><i class="fas fa-plus"></i>Add user</b-button>
    </div>

    <b-table
      label-cols-sm
      head-variant="dark"
      bordered
      striped hover
      outlined
      show-empty
      stacked="md"
      :items="userProvider"
      :fields="fields"
    >

      <template slot="roles" slot-scope="row">
        <span class="badge badge-secondary user-role" v-for="role in row.item.roles" @key="role">{{ role.text }}</span>
           </template>

      <template slot="actions" slot-scope="row">
        <div class="table-actions">
         <span v-b-tooltip.hover.top="'View'" class="action"><i class="fas fa-eye"></i></span>
          <router-link v-b-tooltip.hover.top="'Edit'" :to="{ name: 'users-edit', params: { userId: row.item.id }}"><i class="fas fa-pen fa-lg"></i></router-link>&emsp;
        </div>
      </template>
    </b-table>
  </b-container>
  </div>
</template>

<script>
// import apiService from '../../services/ApiService'
import UserService from '../../services/UserService'
const userService = new UserService()

export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'ID', class: 'text-center' },
        { key: 'fullName', label: 'Full name' },
        { key: 'username', label: 'Username' },
        { key: 'roles', label: 'Role' },
        { key: 'actions', label: 'Actions', class: 'text-center' }
      ]
    }
  },
  methods: {
    userProvider () {
      return userService.getAll()
        .catch(error => {
          console.log(error)
          return []
        })
    }
  }
}
</script>
