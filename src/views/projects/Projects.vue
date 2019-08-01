<template>
  <div class="list">
  <h2>PROJECT LIST</h2><hr>
  <b-container fluid class="custom-container">

    <div class="add-button">
      <a class="btn btn-primary" href="/projects/add"><i class="fas fa-plus"></i>Add project</a>
    </div>

    <b-table
      id="projects-table"
      label-cols-sm
      head-variant="dark"
      bordered
      striped hover
      outlined
      show-empty
      stacked="md"
      :items="projectProvider"
      :fields="fields"
    >

      <template slot="actions" slot-scope="row">
        <div class="table-actions">
          <router-link v-b-tooltip.hover.top="'Tasks'" :to="{ name: 'tasks', params: { projectId: row.item.id }}" class="action"><i class="fas fa-arrow-up"></i></router-link>
          <router-link v-b-tooltip.hover.top="'Edit'" :to="{ name: 'projects-edit', params: { projectId: row.item.id }}"><i class="fas fa-pen"></i></router-link>
          <span v-b-tooltip.hover.top="'Delete'" class="text-danger" v-b-modal="`modal-${row.index}`"><i class="fas fa-trash-alt"></i></span>
          <b-modal :id="`modal-${row.index}`" @ok="removeElement(row.item.id)"> Do you want delete this project? </b-modal>
        </div>

      </template>
    </b-table>
  </b-container>
  </div>
</template>

<script>
import apiService from '../../services/ApiService'
export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'ID', class: 'text-center' },
        { key: 'name', label: 'Name' },
        { key: 'actions', label: 'Action', class: 'text-center' }
      ]
    }
  },
  methods: {
    removeElement (projectId) {
      console.log(projectId)
      let promise = apiService.axios().delete(`${apiService.getApiUrl()}/projects/${projectId}`)
      return promise.then((response) => {
        this.$root.$emit('bv::refresh::table', 'projects-table')
      }).catch(error => {
        console.log(error)
        return []
      })
    },
    projectProvider () {
      let promise = apiService.axios().get(`${apiService.getApiUrl()}/projects`)
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
