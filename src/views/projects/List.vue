
<template>
  <b-container fluid>

    <div class="list-of-projects">
      <b-button squared href="/projects/add"><i class="fas fa-plus"></i>Add project</b-button>
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
          <span class="action"><i class="far fa-eye"></i></span>
          <router-link :to="{ name: 'projects-edit', params: { projectId: row.item.id }}"><i class="fas fa-pen"></i></router-link>
          <span class="action text-danger" v-b-modal="`modal-${row.index}`"><i class="fas fa-trash-alt"></i></span>
          <b-modal :id="`modal-${row.index}`" @ok="removeElement(row.item.id)"> Do you want delete this project? </b-modal>
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
