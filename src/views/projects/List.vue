
<template>
  <b-container fluid>

    <div class="list-of-projects">
      <b-button squared href="/projects/add"><i class="fas fa-plus"></i>Add project</b-button>
    </div>

    <b-table
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

      <template slot="actions">
        <div class="table-actions">
          <span class="action"><i class="far fa-eye"></i></span>
          <span class="action"><i class="fas fa-pen"></i></span>
          <span class="action text-danger" v-b-modal.modal-1><i class="fas fa-trash-alt"></i></span>
           <b-modal id="modal-1">
    <p class="my-4">Do you want delete this project?</p>
  </b-modal>
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
    delete: function () {
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
