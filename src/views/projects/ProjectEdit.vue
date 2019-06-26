<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="6">
          <b-card class="p-3 text-left">
            <b-form @submit.stop.prevent="create" :novalidate="true">

              <b-form-group id="input-group-3" label="New project name:" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.name"
                  name="name"
                  v-validate="{ required: true }"
                  :state="validateState('project name')"
                  aria-describedby="input-3-live-feedback"
                  placeholder="Enter new project name"
                ></b-form-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('name')">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="alert-danger" v-if="apiErrors.length">
                <div v-for="error in apiErrors" :key="error">
                  {{ error }}
                </div>
              </div>
              <div class="text-center">
                <b-button type="submit" variant="primary" :disabled="errors.any()" @click="$editElement">Save</b-button>&nbsp;
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProjectService from '../../services/ProjectService'
import apiService from '../../services/ApiService'
let projectService = new ProjectService()

export default {
  data () {
    return {
      fields: [
        { key: 'id', label: 'ID', class: 'text-center' },
        { key: 'name', label: 'Name' },
        { key: 'actions', label: 'Action', class: 'text-center' }
      ],
      form: {
        name: ''
      },
      apiErrors: []
    }
  },
  methods: {
    editElement (projectId) {
      console.log(projectId)
      let promise = apiService.axios().post(`${apiService.getApiUrl()}/projects/${projectId}`)

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
  },
  create (evt) {
    projectService.create(this.form, 'error')
      .then((response) => {
        location.href = '/projects'
      })
      .catch((error) => {
        console.log(error.message)
        this.apiErrors = [error.message]
      })
  },
  validateState (ref) {
    if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
      return !this.errors.has(ref) ? null : false
    }
    return null
  }
}
</script>
