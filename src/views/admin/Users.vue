<template>
  <div class="list">
    <h2>USER LIST</h2>
  <b-container fluid class="custom-container">

    <b-row class="filter-page">
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="add-button">
      <a class="btn btn-primary" href="/users/add"><i class="fas fa-plus"></i>Add user</a>
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
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">
        {{ row.value.fullName }}
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>

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

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

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
      items: [],
      fields: [
        { key: 'id', label: 'ID', class: 'text-center' },
        { key: 'fullName', label: 'Full name', sortable: true, sortDirection: 'desc' },
        { key: 'username', label: 'Email', sortable: true, class: 'text-center' },
        { key: 'roles', label: 'Role' },
        { key: 'actions', label: 'Actions', class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      filter: null
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    userProvider () {
      return userService.getAll()
        .catch(error => {
          console.log(error)
          return []
        })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
