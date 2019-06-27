<template>
  <div>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="6">
          <b-card class="p-3 text-left">
            <h2 class="mb-4 text-center">Edit project</h2>
            <b-form @submit.stop.prevent="updateProject" :novalidate="true">
              <b-form-group id="input-group-3" label="New project name:" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="project.name"
                  name="name"
                  v-validate="{ required: true }"
                  :state="validateState('name')"
                  aria-describedby="input-3-live-feedback"
                  placeholder="Enter project name"
                ></b-form-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  <ul>
                    <li v-for="error in errors.collect('name')" :key="error">{{ error }}</li>
                  </ul>
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="alert-danger" v-if="apiErrors.length">
                <div v-for="error in apiErrors" :key="error">
                  {{ error }}
                </div>
              </div>
              <div class="text-center">
                <b-button type="submit" variant="primary" :disabled="errors.any()">Update</b-button>&nbsp;
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import apiService from '../../services/ApiService'
import ProjectService from '../../services/ProjectService'
let projectService = new ProjectService()

export default {
  data () {
    return {
      project: {},
      fields: [],
      apiErrors: []
    }
  },
  mounted () {
    // get the project from API
    this.getProject()
  },
  methods: {
    getProject () {
      projectService
        .findById(parseInt(this.$route.params.projectId))
        .then(project => {
          this.project = project
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateProject () {
      projectService.updateProject(this.$route.params.projectId, this.project).then(() => {
        this.$router.push({ name: 'projects' })
      })
    },
    validateState (ref) {
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.errors.has(ref) ? null : false
      }
      return null
    }
  }
}
</script>
