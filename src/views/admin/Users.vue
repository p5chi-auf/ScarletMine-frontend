<template>
  <b-container fluid>

    <div class="list-of-accounts">
      <a href="/users/add">Add an account</a>
    </div>

    <b-table
      striped-hover
      outlined
      show-empty
      stacked="md"
      :items="userProvider"
      :fields="fields"
    >

      <template slot="roles" slot-scope="row">
        <span class="badge badge-secondary user-role" v-for="role in row.item.roles">{{ role }}</span>
      </template>

      <template slot="actions">
        <div class="table-actions">
         <span class="action"><i class="far fa-eye"></i></span>
         <span class="action"><i class="fas fa-edit"></i></span>
         <span class="action text-danger"><i class="fas fa-trash"></i></span>
        </div>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import apiService from '../../services/ApiService'

export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'ID', class: 'text-center' },
        { key: 'fullName', label: 'Full name' },
        { key: 'username', label: 'Username' },
        { key: 'roles', label: 'Role' },
        { key: 'actions', label: 'Actions' }
      ],
      items: [
        {
          id: 1,
          fullName: 'Dickerson',
          username: 'Macdonald',
          roles: ['ROLE_ADMIN', 'ROLE_USER']
        }
      ]
    }
  },
  methods: {
    userProvider () {
      let promise = apiService.axios().get(`${apiService.getApiUrl()}/users`)

      return promise.then((response) => {
        return response.data
      }).catch(error => {
        console.log(error)
        return []
      })
    }
  }
}
</script>
